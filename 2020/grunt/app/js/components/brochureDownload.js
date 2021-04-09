const Shuffle = require('shufflejs'),
      _ = require('lodash'),
      Swiper = require('swiper'),
      anims = require("./animations.js");

export default class BrochureDownload {


  constructor(el) {
    this.el = el;
    this.shufflerFilter = [];
    this.selectedItems = [];
    this.selectedIds = [];
    this.selectedRange = null;
    this.init();
  }

  init() {
      console.log('Starting brochure download init...');
    this.i18n = i18n.BrochureDownload; 
    this.setCategoryItemWidth();
    this.setCategoryListWidth();
    this.inlineCategoryIcons();
    this.attachCategoryEvents();
    this.initCategoryCarousel();
    this.initSearchTypeTabs();
    this.handleQuerystringData();

    console.log('Finished brochure download init.');
  }

    handleQuerystringData() {
    const urlRange = this.getUrlParameter("range"),
          urlModel = this.getUrlParameter("model");


          console.log('urlRange', urlRange);
          console.log('urlModel', urlModel);
          

    if (urlRange !== "") {
      const rangeItem = this.el.querySelector(`.jcb-brochure-download--categories--item[data-category="${urlRange}"]`);
      
      console.log('RangeItem', rangeItem);

      if (urlModel !== "") {
        this.selectCategory(rangeItem, this.selectModelFilter, urlModel);
      } else {
        this.selectCategory(rangeItem);
      }
    }
  }

  getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  setCategoryItemWidth() {
    console.log("Setting category item widths");

    let items = this.categoryListItems,
        itemWidth = (this.categoryListWrapperWidth * this.categoryItemWidthMultiplier);

    for (let i in items) {
      let item = items[i];
      item.style.width = itemWidth + "px";
    }
  }

  setCategoryListWidth() {
    console.log("Setting categories list width");
    this.el.querySelector(".jcb-brochure-download--categories--list").style.width = ((this.categoryListItems.length * this.categoryItemWidth) + this.categoryListItems.length) + "px";

  }

  initCategoryCarousel() {
    const categorySection = this.el.querySelector(".jcb-brochure-download--categories .container"),
          existingNav = this.el.querySelector(".jcb-brochure-download--categories--nav"),
          nextPrevButtons = document.createRange().createContextualFragment("<div class=\"jcb-brochure-download--categories--nav\"><div class=\"jcb-brochure-download--categories--nav-buttons\"><button class=\"previous\"><i class=\"fa fa-chevron-left\"></i></button><button class=\"next\"><i class=\"fa fa-chevron-right\"></i></button></div></div>");


    if (!existingNav) {
        categorySection.insertBefore(nextPrevButtons, categorySection.childNodes[0]);
    }

    this.allCategorySlides = this.categoryListItems;

    this.categoryCarousel = new Swiper(".jcb-brochure-download--categories--list-wrapper", {
      slidesPerView: "auto",
      slideClass: "jcb-brochure-download--categories--item",
      wrapperClass: "jcb-brochure-download--categories--list",
      nextButton: '.jcb-brochure-download--categories--nav .next',
      prevButton: '.jcb-brochure-download--categories--nav .previous',
      observer: true
    });
  }

  inlineCategoryIcons() {
    let items = this.categoryListItems;

    for (let i in items) {
      let item = items[i],
          img = item.querySelector("img");
        if (img !== null) {
          this.inlineIcon(img);
        }
    }
    setTimeout(() => {
      this.el.querySelector(".jcb-brochure-download--categories--list").classList.remove("is-pre-init");
    }, 500);
  }

  inlineIcon(img) {
      const src = img.getAttribute("src");
    if (src.indexOf("svg") !== -1) {
      fetch(src)
        .then(
          response => response.text()
        ).then(svg => {
          let parser = new DOMParser(),
              svgDOM = parser.parseFromString(svg, "image/svg+xml"),
              svgEl = svgDOM.querySelector("svg"),
              item = img.parentNode;
          item.insertBefore(svgEl, img);
          item.removeChild(img);
        })
      }
  }

  initFilter() {
    const container = this.el.querySelector('.jcb-brochure-download--results > .container'),
          filterContainer = this.el.querySelector('.jcb-brochure-download--results--filter-options');

    this.shufflerFilter = [];
    this.shuffler = new Shuffle(container, {
      delimeter: ',',
      itemSelector: '.jcb-brochure-download--results--item'
    });

    let models = this.categoryModels,
        frag = document.createDocumentFragment();
        let placeholder = document.createRange().createContextualFragment(`<option value="" >Filter by model</option>`);
        frag.appendChild(placeholder);
        let allOption = document.createRange().createContextualFragment(`<option value="all" data-model-name="all">Show All</option>`);
        frag.appendChild(allOption);
    for (let m in models) {
      let option = document.createRange().createContextualFragment(`<option value="${models[m].modelName}" id="${models[m].uid}" data-model="${models[m].uid}" data-model-name="${models[m].modelName}" >${models[m].modelName}</option>`);
      frag.appendChild(option);
    }

    filterContainer.innerHTML = "";
    filterContainer.appendChild(frag);

    this.attachDropdownFilterEvents();

    this.updateBrochureCount();
  }

  selectCategory(categoryItem) {
      const currentCategoryItem = _.findIndex(this.allCategorySlides, (item) => item.classList.contains("is-active")),
          currentCategory = (currentCategoryItem > -1) ? this.allCategorySlides[currentCategoryItem].getAttribute("data-category") : null,
          newCategory = categoryItem.getAttribute("data-category"),
          callback = arguments[1],
          modelUid = arguments[2];

    console.log("Entered selectCategory function. CategoryItem:", newCategory);

      this.selectedRange = categoryItem;
 
    if (currentCategoryItem > -1 && currentCategory !== newCategory) {
      for (let s in this.allCategorySlides) {
        this.allCategorySlides[s].classList.remove("is-active");
      }
      //categoryItem.parentNode.querySelector('.is-active').classList.remove('is-active');
    }
    if (currentCategory !== newCategory) {
      //categoryItem.classList.add('is-active');
      for (let s2 in this.allCategorySlides) {
        if (this.allCategorySlides[s2].getAttribute("data-category") === newCategory) {
          this.allCategorySlides[s2].classList.add("is-active");
          console.log("Set new active category item:", this.allCategorySlides[s2]);
          if (callback) {
            this.getCategoryBrochures(newCategory, callback, modelUid);
          } else {
            this.getCategoryBrochures(newCategory);
          }
        }
      }
    }
  }

  updateBrochureCount() {
    const totalBrochures = this.el.querySelectorAll(".jcb-brochure-download--results--item"),
          visibleBrochures = this.el.querySelectorAll(".jcb-brochure-download--results--item:not([aria-hidden])").length,
          activeFilters = this.shufflerFilter,
          activeRange = this.el.querySelector(".jcb-brochure-download--categories--item.is-active").getAttribute("data-category-name"),
          resultsHeading = this.el.querySelector(".jcb-brochure-download--results--header"),
          resultsCount = resultsHeading.querySelector(".count"),
          resultsRange = resultsHeading.querySelector(".range"),
          //resultsMatching = resultsHeading.querySelector(".matching"),
          //resultsMatchingTags = resultsHeading.querySelector(".tags"),
          resultsContainer = this.el.querySelector(".jcb-brochure-download--results");

    if (totalBrochures.length === 0) {
      resultsHeading.classList.remove('visible');
    } else {
      resultsHeading.classList.add('visible');
      resultsCount.innerText = visibleBrochures + "";
      resultsRange.innerText = activeRange;
      // if (activeFilters.length > 0) {
      //   resultsMatchingTags.innerText = activeFilters.join(", ");
      //   resultsMatching.style.display = "inline";
      // } else {
      //   resultsMatching.style.display = "none";
      // }
    }
  }

  getCategoryBrochures(uid, callback, modelUid) {
    const that = this,
          isProductSearch = this.el.querySelector(".jcb-brochure-download--categories--item.is-active").getAttribute("data-category-type") === "product",
          url = (isProductSearch) ? `/api/v1/datahandler/brochures/machine/${uid}` : `/api/v1/datahandler/brochures/attachment/${uid}`;

    console.log("Entered getCategoryBrochures function! uid:", uid);

    this.showSpinner()
        .then(() => {
          that.hideSearchError();
          fetch(url, {method: "GET", credentials: 'include'})
          .then(response => response.json())
          .then(json => {
            console.log("Response from brochures API:", json);
            if (json.Brochures.length > 0) {
              that.renderCategoryBrochures(json)
                  .then(() => that.hideSpinner())
                  .then(() => {
                    that.initFilter();
                    that.attachResultEvents();
                    if (callback) {
                      callback.apply(that, [modelUid]);
                    }
                  })
                  .catch(error => {
                    console.error(error);
                  });
            } else {
              that.hideSpinner()
                  .then(() => that.showBrochureNotThereError());
            }
          })
          .catch(error => {
            that.hideSpinner()
              .then(() => that.showSearchError());
            console.error(error);
          });
        });
  }

  showSpinner() {
    return new Promise ((resolve, reject) => {
      const frag = document.createRange().createContextualFragment("<div class=\"search-waiting-overlay\"><div class=\"loader\">Searching...</div></div>"),
          target = this.el;
      target.appendChild(frag);
      anims.fadeIn(this.el.querySelector(".search-waiting-overlay"))
        .then(() => resolve(true));
    });

  }

  hideSpinner() {
    return new Promise ((resolve, reject) => {
      const spinner = this.el.querySelector(".search-waiting-overlay"),
            target = this.el;
      console.log("removing spinner");
      anims.fadeOut(spinner)
        .then(() => {
          target.removeChild(spinner);
          resolve(true);
        });
    })
  }

    showSearchError() {
    const target = this.el.querySelector(".jcb-brochure-download--categories > .container"),
        errorMsg = document.createRange().createContextualFragment("<p class=\"search-error-message\"><span class=\"icon\">!</span> " + this.i18n.genericErrorMsg +" </p>");
    target.appendChild(errorMsg);
    anims.fadeIn(this.el.querySelector(".search-error-message"));
  }
  
  showBrochureNotThereError() {
    const target = this.el.querySelector(".jcb-brochure-download--categories > .container"),
        errorMsg = document.createRange().createContextualFragment("<p class=\"search-error-message\"><span class=\"icon\">!</span> " + this.i18n.brochureNotThereErrorMsg + "</p>");
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

  renderCategoryBrochures(json) {

      return new Promise((resolve, reject) => {
      const range = json.Range
      const brochures = json.Brochures,
            target = this.el.querySelector(".jcb-brochure-download--results > .container"),
            resultStr = document.createRange().createContextualFragment(`${brochures.map((item, index) => `<div class="jcb-brochure-download--results--item" id="${item.Id}" data-groups="${(item.Models)? item.Models.map((model) => `${model.Name}`).join(",") : ""}">
                        <span class="jcb-brochure-download--results--item-image">
                          <img src="${(item.Asset)? `${item.Asset.ThumbnailUrl}` : `http://placehold.it/300x250`}" alt="${item.Name}">
                        </span>
                        <span class="jcb-brochure-download--results--tags">
                          ${(item.Models)? item.Models.map((model) => `<span class="jcb-brochure-download--results--tag" data-model="${model.Id}" data-model-name="${model.Name}">${model.Name}</span>`).join("") : ""}
                        </span>
                        <span class="jcb-brochure-download--results--name">${item.Name}</span>
                        <a href="${item.Asset.Url}" data-brochure-asset-url="${item.Asset.Url}" target="_blank" class="jcb-brochure-download--results--download  js-brochure-download" ${(item.Models) ? item.Models.map((model) => `data-name="${model.Name}"`).join("") : ""} data-category-english-name="${range.EnglishName}" data-ismodalenabled="${this.selectedRange.getAttribute("data-ismodalenabled")}"><i class="fa fa-arrow-down"></i></a>
                    </div>`).join("")}`);

      target.innerHTML = "";
      target.appendChild(resultStr);
      this.handleImageLoads();
      resolve(true);
    });
  }

  handleImageLoads() {
    const brochureImages = Array.prototype.slice.call(this.el.querySelectorAll(".jcb-brochure-download--results--item-image img")),
          that = this;
    for (let i in brochureImages) {
      brochureImages[i].addEventListener("onload", function() {
        that.shuffler.layout();
      });
    }
  }

  attachCategoryEvents() {
    const categories = this.categoryListItems,
          that = this;

    for (let c in categories) {
        categories[c].addEventListener("click", (event) => {
        const categoryItem = event.target.closest('[data-category]');
        console.log("category clicked!", categoryItem);
        that.selectCategory(categoryItem);
      });
    }
  }

  attachDropdownFilterEvents() {
    console.log('attachDropdownFilterEvents(');

    const selectFilter = this.el.querySelector(".jcb-brochure-download--results--filter-options"),
          that = this;
    let instance  = $('.jcb-brochure-download--results--filter-options').selectmenu("instance");

    if(instance) {
      console.log('selectmenu already exists, DESTROY AT ONCE!');
      $('.jcb-brochure-download--results--filter-options').selectmenu("destroy");
    }

    $('.jcb-brochure-download--results--filter-options').selectmenu({
      classes: {
        "ui-selectmenu-menu": "jcb-yellow-drop-down",
        "ui-selectmenu-button": "jcb-yellow-drop-down"
      },
      change: function(event, ui) {
        let model =  selectFilter.options[selectFilter.selectedIndex].getAttribute('data-model-name');
        console.log('=====> MODEL', model);
        that.filterResults(model);
      }
    });
  }

  refreshDropdownFilter(uid) {
    const modelDropdown = this.el.querySelector(".jcb-brochure-download--results--filter-options");
    modelDropdown.options.namedItem(uid).selected = true;
    $(modelDropdown).selectmenu( "refresh" );
  }

  selectModelFilter(uid) {
    console.log('selectModelFilter() uid', uid);
    const modelDropdown = this.el.querySelector(".jcb-brochure-download--results--filter-options");

    const targetFilter = modelDropdown.options.namedItem(uid);
    const model = targetFilter.getAttribute('data-model-name');

    this.refreshDropdownFilter(uid);
    this.filterResults(model);
  }

  attachResultEvents() {
    const results = this.resultItems,
          that = this;
    for (let r in results) {
      console.log("Click!");
      // results[r].addEventListener("click", (event) => that.updateCart(event));
    }
  }

  toggleFilter() {
    const button = this.el.querySelector(".jcb-brochure-download--results--filter-toggle"),
          target = this.el.querySelector(".jcb-brochure-download--results--filter");

    if (target.classList.contains("is-active")) {
      target.classList.remove("is-active");
      button.classList.remove("is-active");      
      $(target).slideUp("fast");
    } else {
      target.classList.add("is-active");
      button.classList.add("is-active");
      $(target).slideDown("fast");
    }
  }

  filterResults(model) {
    this.shufflerFilter = [];

    if(model) {
      if(model !== 'all') {
        console.log('NOT ALL');
        this.shufflerFilter.push(model);
      }
  
      console.log(this.shufflerFilter);
      this.shuffler.filter(this.shufflerFilter);
      this.updateBrochureCount();
    }

  }

  updateCart(event) {
    const target = event.target ? event.target.closest('[data-groups]') : event,
          id = target.getAttribute("id"),
          models = target.getAttribute("data-groups").split(","),
          name = target.querySelector('.jcb-brochure-download--results--name').innerText,
          img = target.querySelector("img").getAttribute("src"),
          category = this.el.querySelector(".jcb-brochure-download--tab.is-active").getAttribute("data-category-type"),
          range = this.el.querySelector(".jcb-brochure-download--categories--item.is-active").getAttribute("data-category-english-name"),
          el = target,
          item = {id, name, category, range, models, img, el};

    if (_.indexOf(this.selectedIds, id) > -1) {
      // item is in selection and needs to be removed
      this.removeFromCart(item);
    } else {
      // add item to selection
      this.addToCart(item);
    }
    console.log(this.selectedItems);
  }

  addToCart(item) {
    const cartList = this.el.querySelector(".jcb-brochure-download--cart--items"),
          that = this,
          cartItem = document.createRange().createContextualFragment("<span class=\"jcb-brochure-download--cart--checkmark\"><i class=\"fa fa-check\"></i></span>" + _.join(item.models, ", ") + " " + item.name),
          li = document.createElement('li');

    this.selectedItems.push(item);
    this.selectedIds.push(item.id);
    item.el.classList.add("is-selected");

    li.className = "jcb-brochure-download--cart--item";
    li.setAttribute("data-id", item.id);
    li.appendChild(cartItem);
    li.addEventListener("click", () => {
      that.removeFromCart(item);
    });
    cartList.appendChild(li);

    this.updateCartDisplay();
  }

  removeFromCart(item) {
    const cartItem = this.el.querySelector("[data-id=\"" + item.id + "\"]");
    for (let i in this.selectedItems) {
      if (_.includes(this.selectedItems[i], item.id)) {
        _.pullAt(this.selectedItems, i);
        break;
      }
    }
    _.pull(this.selectedIds, item.id);
    item.el.classList.remove("is-selected");
    cartItem.parentNode.removeChild(cartItem);

    this.updateCartDisplay();
  }

  updateCartDisplay() {
     this.populateCartInfoForSubmit()
    const items = this.selectedItems.length;

    this.el.querySelector(".jcb-brochure-download--cart--total").innerText = items;

    this.el.querySelector(".jcb-brochure-download--cart--plural").style.display = (items !== 1)? "inline" : "none";
  }

  get windowWidth() {
    return window.innerWidth
  }

  get categoryListItems() {
    // return results as true array rather than node list
    return Array.prototype.slice.call(this.el.querySelectorAll(".jcb-brochure-download--categories--item"));
  }

  get categoryListWrapperWidth() {
    return this.el.querySelector(".jcb-brochure-download--categories--list-wrapper").offsetWidth;
  }

  get categoryItemWidthMultiplier() {
    let multiplier,
        windowWidth = this.windowWidth;
    switch(true) {
      case (windowWidth >= 1200):
        multiplier = .16666;
        break;
      case (windowWidth >= 992):
        multiplier = .2;
        break;
      case (windowWidth >= 768):
        multiplier = .25;
        break;
      case (windowWidth >= 576):
        multiplier = .33333;
        break;
      default:
        multiplier = .5;
    }
    return multiplier;
  }

  get categoryItemWidth() {
    return this.el.querySelector(".jcb-brochure-download--categories--item:first-child").offsetWidth;
  }

  get categoryModels () {
    const modelsArr = [],
          modelTags = Array.prototype.slice.call(this.el.querySelectorAll('.jcb-brochure-download--results--tag'));

    for (let t in modelTags) {
      modelsArr.push({uid: modelTags[t].getAttribute("data-model"), modelName: modelTags[t].getAttribute("data-model-name")});
    }
    //console.log("Category Models:", _.uniq(modelsArr));
    return _.uniqWith(modelsArr, _.isEqual);
  }

  get resultItems() {
    return Array.prototype.slice.call(this.el.querySelectorAll(".jcb-brochure-download--results--item"));
  }


 /**
  * TABS FUNCTIONS
  */

  initSearchTypeTabs() {
    const tabs = this.searchTypeTabs,
          that = this,
          selectedTab = this.getUrlParameter("tab") || 0;

    console.log("Tabs:", tabs);
    for (let t in tabs) {
      tabs[t].addEventListener("click", (event) => that.toggleSearchType(event));
    }
    this.updateCategoryItems(this.el.querySelector(".jcb-brochure-download--tabs > .is-active").getAttribute("data-category-type"));

    tabs[selectedTab].click();
  }

  toggleSearchType(event) {
    const clicked = event.target,
          targetCategoryType = clicked.getAttribute("data-category-type");

    if (!clicked.classList.contains("is-active")) {
      this.updateCategoryItems(targetCategoryType);
      //this.categoryCarousel.update(true);
      this.el.querySelector(".jcb-brochure-download--tabs .is-active").classList.remove("is-active");
      clicked.classList.add("is-active");
    }
  }

  updateCategoryItems(categoryType) {
    const allItems = this.allCategorySlides;

    this.categoryCarousel.removeAllSlides();

    console.log("Target category type:", categoryType);
    console.log("All category items:", allItems);
    for (let i in allItems) {
      if (allItems[i].getAttribute("data-category-type") === categoryType) {
        //anims.fadeIn(allItems[i]);
        this.categoryCarousel.appendSlide(allItems[i]);
      }
    }
    
    this.categoryCarousel.update();
    this.categoryCarousel.slideTo(0,0);
  }

  get searchTypeTabs() {
    return Array.prototype.slice.call(this.el.querySelectorAll(".jcb-brochure-download--tabs > li"));
  }

}
