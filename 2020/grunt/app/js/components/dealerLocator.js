const anims = require("./animations.js");

export default class DealerLocator {
    constructor(el) {
        this.el = el;

        this.init();
    }

    init() {
        this.apiKey = this.el.getAttribute("data-apikey")
        this.i18n = i18n.DealerSearch;
        if (this.el.querySelector(".dealer-filter-input")) {
            this.initSearchTypeTabs();
            this.initSearchForm();
            this.handleSearchData();
        } else if (this.el.querySelector(".result-item")) {
            this.generateResultsJson()
                .then(() => {
                    this.attachResultsEvents();
                    $('#dealerSearchBox').fadeTo("slow", "1");
                    this.createMap();
                    this.plotResultMarkers();
                });
        }

        //this.createMap();
    }



    /**
     * SEARCH FORM FUNCTIONS
     */

    initSearchForm() {
        const form = this.el.querySelector(".dealer-filter-input"),
            locationField = form.querySelector(".form-control.location"),
            that = this;

        form.addEventListener("submit", (event) => that.handleSearchFormSubmit(event));
        locationField.addEventListener("keyup", (event) => that.checkLocationField(event));
        locationField.addEventListener("blur", () => that.removeSuggestionsList());
    }

    getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    handleSearchData() {
        const locationSearchVal = this.getUrlParameter("location"),
            dealerSearchVal = this.getUrlParameter("dealername"),
            dealerNameField = this.el.querySelector(".form-control.dealer-name"),
            locationField = this.el.querySelector(".form-control.location"),
            that = this;
        if (locationSearchVal !== "") {
            locationField.value = locationSearchVal;
            this.handleSearchFormSubmit();
        }
        else if (dealerSearchVal !== "") {
            document.querySelector('.dealer-search-tab li[data-id="searchByDealerName"]').addEventListener('click', function () {
                setTimeout(function () {
                    dealerNameField.value = dealerSearchVal;
                    that.handleSearchFormSubmit();
                }, 1000);
            });
            document.querySelector('.dealer-search-tab li[data-id="searchByDealerName"]').click();
        }
    }
    checkLocationField(event) {
        const field = this.el.querySelector(".form-control.location"),
            list = this.el.querySelector(".search-predictions-list");

        if (field.value.length < 3) {
            this.removeSuggestionsList();
            return;
        }
        if (event.keyCode === 27 && list) { // Escape
            field.value = this.locationSearchValue;
            this.removeSuggestionsList();
        } else if (event.keyCode === 13) { // Return
            return;
        } else if (event.keyCode === 38 && list) { // Up
            event.preventDefault();
            this.selectSuggestion("previous")
        } else if (event.keyCode === 40 && list) { // Down
            event.preventDefault();
            this.selectSuggestion("next")
        } else {
            this.locationSearchValue = field.value;
            this.getSearchSuggestions(field.value);
        }
    }

    selectSuggestion(direction) {
        const field = this.el.querySelector(".form-control.location"),
            list = this.el.querySelector(".search-predictions-list"),
            selected = list.querySelector(".is-active");

        let targetItem;

        switch (true) {
            case (!selected && direction === "previous"):
                list.querySelector("li:last-child").classList.add("is-active");
                break;
            case (!selected && direction === "next"):
                list.querySelector("li:first-child").classList.add("is-active");
                break;
            case (selected && direction === "previous"):
                targetItem = selected.previousSibling;
                selected.classList.remove("is-active");
                if (targetItem) {
                    targetItem.classList.add("is-active");
                }
                break;
            case (selected && direction === "next"):
                targetItem = selected.nextSibling;
                selected.classList.remove("is-active");
                if (targetItem) {
                    targetItem.classList.add("is-active");
                }
                break;
        }
        field.value = (list.querySelector(".is-active")) ? list.querySelector(".is-active").innerText : this.locationSearchValue;
    }

    getSearchSuggestions(text) {
        const that = this;
        const autocompleteService = new google.maps.places.AutocompleteService();
        autocompleteService.getPlacePredictions(
            {
                'input': text,
                'offset': text.length
            },
            function listentoresult(list, status) {
                if (list == null || list.length == 0) {
                    console.log("No results");
                } else {
                    that.showSearchSuggestions(list);
                }
            }
        );
    }

    showSearchSuggestions(json) {
        const locationField = this.el.querySelector(".form-control.location");

        let predictionsList = this.el.querySelector(".search-predictions-list") || document.createElement("ul");
        predictionsList.classList.add("search-predictions-list");
        predictionsList.innerHTML = "";

        let predictionItems = document.createRange().createContextualFragment(`${json.map((prediction, index) => `<li class="prediction-item">${prediction.description}</li>`).join("")}`);
        predictionsList.appendChild(predictionItems);
        if (!this.el.querySelector(".search-predictions-list")) {
            locationField.parentNode.appendChild(predictionsList);
        }
        this.handleSearchSuggestionClicks();
    }

    handleSearchSuggestionClicks() {
        const suggestions = Array.prototype.slice.call(this.el.querySelectorAll(".prediction-item")),
            that = this;

        for (let s in suggestions) {
            suggestions[s].addEventListener("mousedown", (event) => {
                that.clickSuggestion(event);
            });
        }
    }

    clickSuggestion(event) {
        const searchField = this.el.querySelector(".form-control.location");
        console.log("clicked:", event.target.innerText);
        searchField.value = event.target.innerText;
        this.removeSuggestionsList();
    }

    removeSuggestionsList() {
        const list = this.el.querySelector(".search-predictions-list");
        if (list) {
            list.parentNode.removeChild(list);
        }
    }

    handleSearchFormSubmit(event) {
        if (event) {
            event.preventDefault();
        }
        this.removeSuggestionsList();
        this.hideSearchError()
            .then(() => {
                if (this.searchFormIsValid) {
                    console.log("Form is valid!");
                    this.hideInvalidSearchError();
                    this.doSearch();
                } else {
                    console.log("Form is not valid!");
                    this.showInvalidSearchError();
                }
            })
    }

    showInvalidSearchError() {
        anims.fadeIn(this.el.querySelector(".form-group.input-variant.is-active .field-validation-error"));
    }

    hideInvalidSearchError() {
        anims.fadeOut(this.el.querySelector(".form-group.input-variant.is-active .field-validation-error"));
    }

    doSearch() {
        const endpoint = this.searchEndpointAddress,
            that = this;
        this.showSpinner()
            .then(() => {
                fetch(endpoint, { method: "GET", credentials: 'include' })
                    .then(response => response.json())
                    .then(json => {
                        console.log("Search results:", json);
                        if (json.length > 0) {
                            that.currentSearchResults = json;
                            that.renderSearchResults()
                                .then(() => that.hideSpinner())
                                .then(() => {
                                    that.showSearchResults();
                                    that.createMap();
                                    that.plotResultMarkers();
                                });
                        } else {
                            that.hideSpinner()
                                .then(() => that.showSearchError());
                        }
                    }).catch(error => {
                        that.hideSpinner()
                            .then(() => that.showSearchError());
                        console.error(error);
                    });
            });
    }

    generateResultsJson() {
        return new Promise((resolve, reject) => {
            const dealers = Array.prototype.slice.call(this.el.querySelectorAll(".result-item"));
            let resultsObj = [];

            dealers.forEach((dealer, index) => {
                const dealerName = dealer.querySelector('.dealer-name').innerText,
                    dealerLatitude = dealer.getAttribute("data-latitude"),
                    dealerLongitude = dealer.getAttribute("data-longitude"),
                    dealerId = dealer.getAttribute("data-uid"),
                    dealerObj = {
                        Name: dealerName,
                        Latitude: dealerLatitude,
                        Longitude: dealerLongitude,
                        Id: dealerId
                    };
                resultsObj.push(dealerObj);
            });
            this.currentSearchResults = resultsObj;
            console.log("Generated search results:", this.currentSearchResults);
            resolve(true);
        });
    }

    showSpinner() {
        return new Promise((resolve, reject) => {
            const frag = document.createRange().createContextualFragment("<div class=\"search-waiting-overlay\"><div class=\"loader\">Searching...</div></div>"),
                target = this.el.querySelector(".dealer-filter-wrap");
            target.appendChild(frag);
            anims.fadeIn(this.el.querySelector(".search-waiting-overlay"))
                .then(() => resolve(true));
        });

    }

    hideSpinner() {
        return new Promise((resolve, reject) => {
            const spinner = this.el.querySelector(".search-waiting-overlay"),
                target = this.el.querySelector(".dealer-filter-wrap");
            anims.fadeOut(spinner)
                .then(() => {
                    target.removeChild(spinner);
                    resolve(true);
                });
        })
    }

    showSearchError() {
        const target = this.el.querySelector(".dealer-search-form"),
            errorMsg = document.createRange().createContextualFragment("<p class=\"search-error-message\"><span class=\"icon\">!</span>" + this.i18n.error + "</p>");
        target.appendChild(errorMsg);
        anims.fadeIn(this.el.querySelector(".search-error-message"));
    }

    hideSearchError() {
        return new Promise((resolve, reject) => {
            const target = this.el.querySelector(".search-error-message");
            if (target) {
                anims.fadeOut(target)
                    .then(() => {
                        target.parentNode.removeChild(target);
                        resolve(true);
                    });
            } else {
                resolve(true);
            }
        })
    }

    get searchFormIsValid() {
        return this.el.querySelector(".form-group.input-variant.is-active input").value.length > 0
    }

    get resultItems() {
        return Array.prototype.slice.call(this.el.querySelectorAll(".dealers-contact-details li.result-item"));
    }

    get searchEndpointAddress() {
        const activeSearchField = this.el.querySelector(".form-group.input-variant.is-active input"),
            searchTerm = activeSearchField.value,
            isLocationSearch = activeSearchField.classList.contains("location");
        let country = (this.el.querySelector(".country-select").value === "") ? "-" : this.el.querySelector(".country-select").value,
            dealerType = (this.el.querySelector(".dealer-type-select").value === "") ? "-" : this.el.querySelector(".dealer-type-select").value,
            endpoint;

        if (isLocationSearch) {
            endpoint = `/api/v1/datahandler/dealers/${searchTerm}/${country}/-/${dealerType}/`;
            this.searchType = "location";
        } else {
            endpoint = `/api/v1/datahandler/dealers/-/${country}/${searchTerm}/${dealerType}/`;
            this.searchType = "dealerName";
        }
        this.searchTerm = searchTerm;

        return endpoint;
    }



    /**
     * SEARCH RESULTS FUNCTIONS
     */

    renderSearchResults() {
        const results = this.currentSearchResults, that = this;
        return new Promise((resolve, reject) => {
            const resultStr = document.createRange().createContextualFragment(`${results.map((result, index) => `<li class="result-item" data-uid="${result.Id}" data-latitude="${result.Latitude}" data-longitude="${result.Longitude}">
                          <div class="li--inner-block">
                              <div class="dealer-header-info">
                                  <span class="count">${index + 1}</span>
                                  <span class="dealer-name">${result.Name}</span>
                                  <br/><span class="distance">(${result.DistanceInSearch} ${that.i18n.miles}, ${result.DistanceInSearchKm} ${that.i18n.kilometers})</span>
                              </div>
                              <div class="dealer-address-info">
                                  <span class="address">
                                    ${result.BillingStreet ? `${result.BillingStreet.replace("\n", ", ")}` : ``}
                                    ${result.BillingCity ? `, ${result.BillingCity.trim()}` : ``}
                                    ${result.BillingState ? `, ${result.BillingState.trim()}` : ``}
                                    ${result.BillingPostCode ? `, ${result.BillingPostCode.trim()}` : ``}
                                    ${result.BillingCountry ? `, ${result.BillingCountry.trim()}` : ``}
                                  </span>
                              </div>
                              <div class="toggle-content">
                                  <div class="opening-info">
                                    <span class="opening-info--title">${that.i18n.openingTimes}</span>
                                    <ul>
                                      ${(result.OpeningMonday && result.OpeningMonday !== "-") ? `<li><span class="day">${this.i18n.monday}:</span> ${result.OpeningMonday}` : ``}
                                      ${(result.OpeningTuesday && result.OpeningTuesday !== "-") ? `<li><span class="day">${this.i18n.tuesday}:</span> ${result.OpeningTuesday}` : ``}
                                      ${(result.OpeningWednesday && result.OpeningWednesday !== "-") ? `<li><span class="day">${this.i18n.wednesday}:</span> ${result.OpeningWednesday}` : ``}
                                      ${(result.OpeningThursday && result.OpeningThursday !== "-") ? `<li><span class="day">${this.i18n.thursday}:</span> ${result.OpeningThursday}` : ``}
                                      ${(result.OpeningFriday && result.OpeningFriday !== "-") ? `<li><span class="day">${this.i18n.friday}:</span> ${result.OpeningFriday}` : ``}
                                      ${(result.OpeningSaturday && result.OpeningSaturday !== "-") ? `<li><span class="day">${this.i18n.saturday}:</span> ${result.OpeningSaturday}` : ``}
                                      ${(result.OpeningSunday && result.OpeningSunday !== "-") ? `<li><span class="day">${this.i18n.sunday}:</span> ${result.OpeningSunday}` : ``}
                                    </ul>
                                  </div>
                                  <div class="phone-info">
                                      ${result.Phone ? `<span><span class="jcb-yellow-text">${that.i18n.tel}</span> ${result.Phone}</span>` : ``}
                                      ${result.Fax ? `<span><span class="jcb-yellow-text">${that.i18n.fax}</span> ${result.Fax}</span>` : ``}
                                  </div>

                                  <div class="tags">${result.DealerType.replace(/;/g, ", ")}</div>

                                  <div class="directions">
                                      <a href="#" class="jcb-yellow-text view-on-map">${that.i18n.viewOnMap}</a>
                                      <a href="https://www.google.com/maps/dir/Current+Location/${result.Latitude},${result.Longitude}" class="jcb-yellow-text" target="_blank">${that.i18n.getDirections}</a>
                                  </div>

                                  <div class="cta-group">
                                      ${result.Website ? `<a href="${result.Website}" class="jcb-btn-primary-sm" target="_blank">${that.i18n.website}</a>` : ``}
                                      ${that.i18n.callbackUrl ? `<a href="${that.i18n.callbackUrl}${result.Name}" class="jcb-btn-secondary-sm">${that.i18n.callback}</a>` : ``}
                                  </div>
                              </div>
                          </div>
                      </li>`).join("")}`);

            let totalDealersStr;
            if (this.searchType === "location") {
                totalDealersStr = `<span class="jcb-yellow-text">${results.length}</span> ${this.i18n.dealersNearby} ${this.searchTerm}`;
            } else {
                totalDealersStr = `<span class="jcb-yellow-text">${results.length}</span> ${this.i18n.dealerMatches} ${this.searchTerm}`;
            }
            const target = this.el.querySelector(".dealers-contact-details");
            const totalTarget = this.el.querySelector(".dealers-total-result");
            target.innerHTML = "";
            target.appendChild(resultStr);
            totalTarget.innerHTML = totalDealersStr;
            this.attachResultsEvents();

            resolve(true);
        });
    }

    attachResultsEvents() {
        const resultItems = this.resultItems,
            that = this;
        console.info(resultItems);
        for (let r in resultItems) {
            const itemHeader = resultItems[r].querySelector(".dealer-header-info");
            let idx = parseInt(r, 10) + 1;
            idx = idx.toString();
            itemHeader.addEventListener("click", () => that.toggleDealerDetail(resultItems[r]));
            const viewOnMapLink = resultItems[r].querySelector(".view-on-map");
            viewOnMapLink.addEventListener("click", (event) => {
                event.preventDefault();
                that.centerMarker(resultItems[r], idx);
            });
        }
    }

    toggleDealerDetail(item) {
        const items = this.resultItems,
            isOpen = item.classList.contains("show-additional-copy");

        for (let i in items) {
            items[i].classList.remove("show-additional-copy");
        }

        if (!isOpen) {
            item.classList.add("show-additional-copy");
        }
    }

    showSearchResults() {
        $('#dealerSearchBox').css({ "display": "block" });

        if ($('#dealerSearchBox').length > 0) {
            var $target = $('#dealerSearchBox');
            $('html, body').animate({
                'scrollTop': $target.offset().top
            }, 700, 'swing', function () {
                $('#dealerSearchBox').fadeTo("slow", "1");
            });
        }
    }

    searchAgain() {
        var $target = $(".dealer-locator-component-outer");
        $('html, body').animate({
            "scrollTop": $target.offset().top
        }, 700, 'swing');
    }



    /**
     * MAP FUNCTIONS
     */

    createMap() {
        const that = this;
        let searchAgainButton = document.createElement("button");

        searchAgainButton.setAttribute("class", "search-again jcb-btn-secondary-sm");
        searchAgainButton.innerText = "Search again";
        searchAgainButton.addEventListener("click", event => that.searchAgain());

        if (!that.Gmap) {
            that.Gmap = new mapTools({
                id: "google-map-container",
                lat: 52.953447,
                lng: -1.848197,
                async: false,
                type: "ROADMAP"
            }, function (err, map) {
                if (!err) {
                    console.info("Map loaded!", that.Gmap.instance);
                } else {
                    console.error("Map error :(", err);
                }
            });
            if (that.el.querySelector(".dealer-filter-input")) {
                document.getElementById("google-map-container").appendChild(searchAgainButton);
            }
        }
    }

    clearMarkers() {
        this.Gmap.removeMarker();
    }

    plotResultMarkers() {
        this.clearMarkers();
        for (let r in this.currentSearchResults) {
            let idx = parseInt(r, 10) + 1;
            idx = idx.toString();
            this.addMarker(this.currentSearchResults[r], idx);
        }
        this.centerMapAroundMarkers();
        console.log("Plotted markers:", this.Gmap.findMarker({ visible: true }));
    }

    addMarker(result, index) {
        const that = this;
        console.log("Plotting result:", result);
        this.Gmap.addMarker({
            lat: result.Latitude,
            lng: result.Longitude,
            title: result.Name,
            zIndex: parseInt(index, 10),
            icon: {
                url: "/assets/images/dealer-locator-pin.png"
            },
            label: {
                color: "#262626",
                fontFamily: "JCBEuro-Bold",
                fontSize: "2em",
                text: index
            },
            data: {
                uid: result.Id
            },
            on: {
                click: function () {
                    const event = new MouseEvent("click", {
                        "view": window,
                        "bubbles": true,
                        "cancelable": true
                    })
                    that.el.querySelector("[data-uid=\"" + result.Id + "\"] .dealer-header-info").dispatchEvent(event);
                    anims.scrollTo(that.el.querySelector(".dealers-list").parentNode, that.el.querySelector("[data-uid=\"" + result.Id + "\"]"), 500);
                    that.el.querySelector("[data-uid=\"" + result.Id + "\"] .view-on-map").dispatchEvent(event);
                }
            }
        });
    }

    centerMarker(el, index) {
        var markers = this.Gmap.findMarker({ visible: true }),
            uid = el.getAttribute("data-uid");
        this.Gmap.resetMarker(markers, ['icon', 'label', 'zIndex']);
        this.Gmap.updateMarker({ uid: uid }, {
            zIndex: 20,
            icon: {
                url: "/assets/images/dealer-locator-pin.png",
                scaledSize: { width: 66, height: 99 }
            },
            label: {
                color: "#ffffff",
                fontFamily: "JCBEuro-Bold",
                fontSize: "3em",
                text: index
            }
        });
        this.Gmap.instance.panTo({ lat: parseFloat(el.getAttribute("data-latitude")), lng: parseFloat(el.getAttribute("data-longitude")) });
        this.Gmap.zoom(12);
    }

    centerMapAroundMarkers() {
        const results = this.resultItems;
        let bounds = new google.maps.LatLngBounds();
        for (let i = 0; i < results.length; i++) {
            bounds.extend({ lat: parseFloat(results[i].getAttribute("data-latitude")), lng: parseFloat(results[i].getAttribute("data-longitude")) });
        }

        this.Gmap.instance.fitBounds(bounds);
        console.log("Centering map around markers!");
    }



    /**
     * TAB FUNCTIONS
     */

    initSearchTypeTabs() {
        const tabs = this.searchTypeTabs,
            that = this;

        console.log("Tabs:", tabs);
        for (let t in tabs) {
            tabs[t].addEventListener("click", (event) => that.toggleSearchType(event));
        }
    }

    toggleSearchType(event) {
        const clicked = event.target,
            currentInput = this.el.querySelector(".form-group.input-variant.is-active"),
            newInput = this.el.querySelector(".form-group.input-variant:not(.is-active)");

        if (!clicked.classList.contains("is-active")) {
            anims.fadeOut(currentInput)
                .then(() => {
                    this.el.querySelector(".dealer-search-tab .is-active").classList.remove("is-active");
                    anims.fadeIn(newInput);
                    clicked.classList.add("is-active");
                    currentInput.classList.remove("is-active");
                    newInput.classList.add("is-active");
                });
        }
    }

    get searchTypeTabs() {
        return Array.prototype.slice.call(this.el.querySelectorAll(".dealer-search-tab > li"));
    }
}
