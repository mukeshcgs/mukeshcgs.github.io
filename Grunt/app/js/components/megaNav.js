const hoverIntent = require("hoverintent");

export default class MegaNav {
    constructor(el) {
        this.el = el;

        this.init();
    }


    init() {
        console.log("MegaNav module init");
        var span = this.el.querySelector(".meganav-dropdown-hover-li > a > span");
        if (span != null) {
            this.otherIndustriesText = span.innerText;
        }
        this.initCarousel();
        this.initOtherIndustries();
        //this.initFirstLevelNav();
        this.initSecondLevelNav();
        this.initThirdLevelNav();
        this.initTertiaryNav();
        this.handleItemHoverState();

    }


    initFirstLevelNav() {
        const topLinks = this.topLinks,
            that = this;

        topLinks.forEach((link, index) => {
            link.addEventListener("click", () => {
                that.setActiveTopLink(link);
            });
        });
    }

    initOtherIndustries() {
        const otherIndustryItems = Array.prototype.slice.call(this.el.querySelectorAll(".meganav-dropdown-hover-li .dropdown-item-jcb"));

        otherIndustryItems.forEach((item, index) => {
            item.addEventListener("click", (event) => {
                console.log("Other industry selected!");
                const changeIndustrySelector = item.querySelector(":scope > a").innerText;

                var span = this.el.querySelector(".meganav-dropdown-hover-li > a > span");
                if (span != null) {
                    this.el.querySelector(".meganav-dropdown-hover-li > a > span").innerText = changeIndustrySelector;
                }
            });
        });
    }


    initSecondLevelNav() {
        const secondLevelNav = Array.prototype.slice.call(this.el.querySelectorAll(".dropdown-menu-jcb.active")),
            secondLinks = this.secondLinks,
            that = this;

        console.log("second level nav:", secondLevelNav);

        secondLinks.forEach((link, index) => {
            if (!link.getAttribute("data-class")) {
                link.classList.add("direct-secondary-link");
            }

            hoverIntent(link, () => {
                if (link.classList.contains("mega-nav")) {
                    that.openThirdLevelNav(link);
                } else {
                    that.closeThirdLevelNav();
                }
            }, () => {

            }).options({
                interval: 150,
                sensitivity: 30
            });
        });

        if (secondLevelNav.length > 0) {
            secondLevelNav.forEach((item, index) => {
                item.addEventListener("mouseleave", () => {
                    console.log("Mouse has left area");
                    that.closeThirdLevelNav();
                });
            });

        }

        Array.prototype.slice.call(this.el.querySelectorAll(".direct-secondary-link")).forEach((item, index) => {
            item.addEventListener("mouseenter", () => {
                document.querySelector(".mega-nav-box").classList.remove("show-mega-nav-box");
            });
        });
    }


    initThirdLevelNav() {
        const tabs = this.thirdLevelTabs,
            that = this;

        tabs.forEach((tab, index) => {
            if (tab.getAttribute("data-toggle") === "tab") {
                hoverIntent(tab, () => {
                    that.activateFourthLevelNav(tab);
                }, () => {

                })
            } else {
                hoverIntent(tab, () => {
                    secondLinks.forEach((item, index) => {
                        const menu = item.querySelector(".meganav-menu-jcb");
                        if (menu && !link.contains(menu)) {
                            menu.classList.remove("active");
                            item.querySelector(":scope > a").classList.remove("active");
                        }
                    });
                    link.querySelector(":scope > a").classList.add("active");
                }, () => {

                })
            }
        });
    }


    initTertiaryNav() {
        const dealerToggle = this.el.querySelector(".js-dealer-link"),
            dealerInput = document.getElementById("dealer-input"),
            searchToggle = this.el.querySelector(".open-search"),
            searchInput = document.getElementById("search-input"),
            countryToggle = this.el.querySelector(".js-country-link"),
            closeButtons = this.closeButtons,
            that = this;

        // dealer locator, search
        if (dealerToggle != null) {
            dealerToggle.addEventListener("click", event => {
                event.preventDefault();
                that.openTargetOverlay(event.target);
            });
        }
        if (searchToggle != null) {
            searchToggle.addEventListener("click", event => {
                event.preventDefault();
                that.openTargetOverlay(event.target);
            });
        }
        if (dealerInput != null) {
            dealerInput.addEventListener("keyup", event => {
                that.toggleFormSubmittable(event.target);
            });
        }
        if (searchInput != null) {
            searchInput.addEventListener("keyup", event => {
                that.toggleFormSubmittable(event.target);
            });
        }

        // country selector
        if (countryToggle != null) {
            countryToggle.addEventListener("click", event => {
                event.preventDefault();
                that.openTargetOverlay(event.target);
            });
        }

        // close buttons
        if (closeButtons != null) {
            closeButtons.forEach((link, index) => {
                link.addEventListener("click", event => {
                    that.closeTargetOverlay(event.target);
                });
            });
        }
    }


    openThirdLevelNav(link) {
        const secondLinks = this.secondLinks,
            meganavPane = link.querySelector(".meganav-menu-jcb"),
            tabContent = meganavPane.querySelector(".tab-content"),
            meganavHeight = (tabContent) ? tabContent.offsetHeight : meganavPane.querySelector(".container-fluid").offsetHeight;

        console.log(tabContent);

        secondLinks.forEach((item, index) => {
            const menu = item.querySelector(".meganav-menu-jcb");
            if (menu && !link.contains(menu)) {
                menu.classList.remove("active");
                item.querySelector(":scope > a").classList.remove("active");
            }
        });
        meganavPane.classList.add("active");
        link.querySelector(":scope > a").classList.add("active");

        // sets the meganav fixed height for transition purposes
        meganavPane.style.height = meganavHeight + "px";

        document.querySelector(".overlay-on-meganav").classList.add("active");

    }

    closeThirdLevelNav() {
        const overlay = document.querySelector(".overlay-on-meganav"),
            activeItem = document.querySelector(".meganav-menu-jcb.active"),
            activeLink = this.el.querySelector(".secondary-nav-wrapper .dropdown-item-jcb > a.active");

        console.log("closing third level nav");
        if (overlay) { overlay.classList.remove("active"); }
        if (activeItem) { activeItem.classList.remove("active"); }
        if (activeLink) { activeLink.classList.remove("active"); }
    }


    activateFourthLevelNav(tab) {
        const selectedTab = tab.getAttribute("href"),
            selectedTabContent = tab.closest(".meganav-menu-jcb").querySelector(`[data-id="${selectedTab}"]`);

        console.log("selected tab target:", selectedTab);
        console.log("selected tab element:", selectedTabContent);

        tab.closest(".nav-tabs").querySelector(".nav-link-meganav.active").classList.remove("active");
        tab.classList.add("active");

        let activeItems = Array.prototype.slice.call(selectedTabContent.parentElement.querySelectorAll(".active"));
        activeItems.forEach((item, index) => {
            item.classList.remove("active");
        });

        selectedTabContent.classList.add("active");

        // sets the meganav fixed height for transition purposes
        let currentNav = tab.closest(".meganav-menu-jcb"),
            meganavHeight = selectedTabContent.offsetHeight;

        currentNav.style.height = meganavHeight + "px";
    }


    handleItemHoverState() {
      const items = this.hoverStateImageItems,
            appendableRangeImage = document.querySelector(".mega-nav-box"),
            boxAppendLocations = this.boxAppendLocations;

        appendableRangeImage.style.display = "block";
        boxAppendLocations.forEach((location, index) => {
            location.appendChild(appendableRangeImage.cloneNode(true));
        });
        appendableRangeImage.parentNode.removeChild(appendableRangeImage);

        items.forEach((item, index) => {
            var hoverImgElment = item.parentElement.querySelector(".hover-image");
            if (hoverImgElment != null) {
                const imgSvg = hoverImgElment.innerHTML,
                    title = item.textContent,
                    targetSvg = item.closest(".container-fluid").querySelector(".meganav-range-image-wrapper"),
                    targetText = item.closest(".container-fluid").querySelector(".meganav-range-title");

                item.addEventListener("mouseenter", () => {
                    targetText.innerText = title;
                    targetSvg.innerHTML = imgSvg;
                });

                item.addEventListener("mouseleave", () => {
                    targetText.innerText = "";
                    targetSvg.innerHTML = "";
                });
            }
        });
    }


    openTargetOverlay(el) {
        const targetId = el.getAttribute("data-target"),
            targetEl = document.querySelector(targetId),
            targetInput = targetEl.querySelector("input");

        console.log("[OPENING] Target input:", targetInput);
        targetEl.classList.add("open");
        if (window.dataLayer) {
            dataLayer.push({
                "event": "open-" + targetId.replace("#", "")
            });
        }
        if (targetInput !== null) {
            targetInput.focus();
        } else {
            document.documentElement.classList.add("overlay-hidden-html");
        }
    }


    closeTargetOverlay(el) {
        const targetId = el.getAttribute("data-target"),
            targetEl = document.querySelector(targetId),
            targetInput = targetEl.querySelector("input");

        console.log("[CLOSING] Target input:", targetInput);
        targetEl.classList.remove("open");
        if (targetInput !== null) {
            targetInput.blur();
        } else {
            document.documentElement.classList.remove("overlay-hidden-html");
        }
    }


    toggleFormSubmittable(el) {
        const field = el,
            form = field.parentNode,
            button = form.querySelector("button");

        if (field.value.length !== 0) {
            console.log("Form is valid - Enabling button!", form, button);
            button.removeAttribute("disabled");
        } else {
            console.log("Form is invalid - Disabling button!", form, button);
            button.setAttribute("disabled", "true");
        }
    }


    setActiveTopLink(link) {
        const topLinks = this.topLinks;
        topLinks.forEach(el => {
            el.classList.remove("active");
            el.nextElementSibling.classList.remove("active");
        });
        link.classList.add("active");
        link.nextElementSibling.classList.add("active");
    }


    initCarousel() {
        $(".meganav-carousel").owlCarousel({
            navigation: false,
            slideSpeed: 400,
            autoplay: true,
            singleItem: true,
            dots: false,
            items: 1,
            pagination: false,
        });
    }


    get topLinks() {
        return Array.prototype.slice.call(this.el.querySelectorAll(".nav-item.dropdown-jcb .nav-link"));
    }


    get secondLinks() {
        return Array.prototype.slice.call(this.el.querySelectorAll(".secondary-nav-wrapper .dropdown-item-jcb"));
    }


    get thirdLevelTabs() {
        return Array.prototype.slice.call(this.el.querySelectorAll(".nav-link-meganav"));
    }


    get boxAppendLocations() {
        return Array.prototype.slice.call(this.el.querySelectorAll(".js-append-carousel"));
    }


    get hoverStateImageItems() {
        return Array.prototype.slice.call(this.el.querySelectorAll("[data-image-hover]"));
    }


    get closeButtons() {
        return Array.prototype.slice.call(document.querySelectorAll("#find-dealer .icon-close, #search-overlay .icon-close, #country-selector .icon-close"));
    }

}

