const Shuffle = require('shufflejs'),
      _ = require('lodash'),
      Swiper = require('swiper'),
      anims = require("./animations.js");

export default class Quote {
  constructor(el) {
    this.el = el;
    this.lang = document.getElementsByTagName("html")[0].getAttribute("lang");
    this.shufflerFilter = [];
    this.selectedItems = [];
    this.selectedIds = [];
    this.activeStep = "#step1";
    this.loadingCount = 0;
    this.init();
  }

  get windowWidth() {
    return window.innerWidth;
  }

  get categoryListItems() {
    // return results as true array rather than node list
    return Array.prototype.slice.call(this.el.querySelectorAll(".jcb-quote-form--categories--item"));
  }

  get categoryListWrapperWidth() {
    return this.el.querySelector(".jcb-quote-form--categories--list-wrapper").offsetWidth;
  }

  get sliderOptions() {
    let options = {},
        windowWidth = this.windowWidth;
    switch (true) {
      case (windowWidth >= 1200):
        options.multiplier = .25;
        options.slidesInView = 4;
        options.centered = false;
        break;
      case (windowWidth >= 992):
        options.multiplier = .25;
        options.slidesInView = 4;
        options.centered = false;
        break;
      case (windowWidth >= 768):
        options.multiplier = .333;
        options.slidesInView = 3;
        options.centered = false;
        break;
      case (windowWidth >= 576):
        options.multiplier = .5;
        options.slidesInView = 2;
        options.centered = false;
        break;
      default:
        options.multiplier = .5;
        options.slidesInView = 2;
        options.centered = true;
    }
    return options;
  }

  get categoryItemWidth() {
    return this.el.querySelector(".jcb-quote-form--categories--item:first-child").offsetWidth;
  }

  get categoryModels() {
    const modelsArr = [],
      modelTags = Array.prototype.slice.call(this.el.querySelectorAll('.jcb-quote-form--results--tag'));

    for (let t in modelTags) {
      modelsArr.push({ uid: modelTags[t].getAttribute("data-model"), modelName: modelTags[t].getAttribute("data-model-name") });
    }
    return _.uniqWith(modelsArr, _.isEqual);
  }

  get filterItems() {
    return Array.prototype.slice.call(this.el.querySelectorAll(".jcb-quote-form--results--filter-item"));
  }

  get resultItems() {
    return Array.prototype.slice.call(this.el.querySelectorAll(".jcb-quote-form--results--item"));
  }

  init() {    
    this.setCategoryItemWidth();
    this.setCategoryListWidth();
    this.inlineCategoryIcons();
    this.attachCategoryEvents();
    this.initCategoryCarousel();
    this.initSearchTypeTabs();
    this.initCollapsibleForm();
    this.handleQuerystringData();
    this.handleFormSubmit();
  }

  setCategoryItemWidth() {

    let items = this.categoryListItems,
      itemWidth = (this.categoryListWrapperWidth * this.sliderOptions.multiplier);

    for (let i in items) {
      let item = items[i];
      item.style.width = itemWidth + "px";
    }
  }

  setCategoryListWidth() {
    this.el.querySelector(".jcb-quote-form--categories--list").style.width = ((this.categoryListItems.length * this.categoryItemWidth) + this.categoryListItems.length) + "px";
  }

  inlineCategoryIcons() {
    /*let items = this.categoryListItems;

    for (let i in items) {
      let item = items[i],
        img = item.querySelector("img");

      this.inlineIcon(img);
    }*/
    //setTimeout(() => {
      this.el.querySelector(".jcb-quote-form--categories--list").classList.remove("is-pre-init");
    //}, 500);
  }

  attachCategoryEvents() {
    const categories = this.categoryListItems,
      that = this;

    for (let c in categories) {
      categories[c].addEventListener("click", (event) => {
        const categoryItem = event.target.closest('[data-category]'),
              categoryType = categoryItem.getAttribute('data-category-type');
        
        that.selectCategory(categoryItem);
        if (this.sliderOptions.centered) {
          this.slideCategoryCarouselToSelected(); 
        }
        that.activeStep = "#step1";        
      }); 
    }    
  }

  slideCategoryCarouselToSelected() {
    const list = this.el.querySelector('.jcb-quote-form--categories--list');
    const selectedProduct = list.querySelector('.is-active');
    const slideToIndex = selectedProduct ? [...list.children].indexOf(selectedProduct) : 0;
    const categoryCarousel = this.el.querySelector(".jcb-quote-form--categories--list-wrapper").swiper;
    categoryCarousel.slideTo(slideToIndex);
  }

  slideProductCarouselToSelected() {
    const list = this.el.querySelector('.jcb-quote-form--results--list');
    const selectedProduct = list.querySelector('.is-selected');
    const slideToIndex = selectedProduct ? [...list.children].indexOf(selectedProduct) : 0;
    const productCarousel = this.el.querySelector(".jcb-quote-form--results--list-wrapper").swiper;
    productCarousel.slideTo(slideToIndex);
  }

  initCategoryCarousel() {
    let range = document.createRange();
    range.selectNode(document.body);
    const categorySection = this.el.querySelector(".jcb-quote-form--categories .container"),
      existingNav = this.el.querySelector(".jcb-quote-form--categories--nav"),   
      nextPrevButtons = range.createContextualFragment("<div class=\"jcb-quote-form--categories--nav\"><div class=\"jcb-quote-form--categories--nav-buttons\"><button class=\"previous\"><i class=\"fa fa-angle-left\"></i></button><button class=\"next\"><i class=\"fa fa-angle-right\"></i></button></div></div>"),
      that = this;

    if (!existingNav) {
      categorySection.insertBefore(nextPrevButtons, categorySection.childNodes[0]);
    }

    this.allCategorySlides = this.categoryListItems;

    this.categoryCarousel = new Swiper(".jcb-quote-form--categories--list-wrapper", {
      slidesPerView: this.sliderOptions.slidesInView,
      slideClass: "jcb-quote-form--categories--item",
      wrapperClass: "jcb-quote-form--categories--list",
      nextButton: '.jcb-quote-form--categories--nav .next',
      prevButton: '.jcb-quote-form--categories--nav .previous',
      centeredSlides: this.sliderOptions.centered,
      observer: true,
      onImagesReady: function () {
        setTimeout(function () {
          that.slideCategoryCarouselToSelected();
        }, 400);
      }
    });
  }

  initProductCarousel() {
    let range = document.createRange();
    range.selectNode(document.body);
    const productsSection = this.el.querySelector(".jcb-quote-form--results"),
        container = productsSection.querySelector(".container"),
        heading = productsSection.querySelector('h3'),
        existingNav = this.el.querySelector(".jcb-quote-form--products--nav"),        
        nextPrevButtons = range.createContextualFragment("<div class=\"jcb-quote-form--results--nav\"><div class=\"jcb-quote-form--results--nav-buttons\"><button class=\"previous\"><i class=\"fa fa-angle-left\"></i></button><button class=\"next\"><i class=\"fa fa-angle-right\"></i></button></div></div>"),
        orginal_html = container.innerHTML,
        new_html = `<div class="jcb-quote-form--results--list-wrapper"> 
                      <div class="jcb-quote-form--results--list">
                        ${orginal_html} 
                      </div>
                    </div>`,        
        that = this;

    container.innerHTML = new_html;
    container.insertBefore(heading.cloneNode(true), container.childNodes[0])
    if (!existingNav) {
      container.insertBefore(nextPrevButtons, container.childNodes[0]);
    }

    this.showSpinner();

    this.updateTabClassesOnSecondSlider();    

    const allProductSlides = Array.prototype.slice.call(this.el.querySelectorAll(".jcb-quote-form--results--item"));
    const productItemWidth = this.el.querySelector(".jcb-quote-form--results--item:first-child").offsetWidth;

    let items = allProductSlides,
      itemWidth = (this.el.querySelector(".jcb-quote-form--results--list-wrapper").offsetWidth * this.sliderOptions.multiplier);

    for (let i in items) {
      let item = items[i];
      item.style.width = itemWidth + "px";
    }

    this.el.querySelector(".jcb-quote-form--results--list").style.width = ((allProductSlides.length * productItemWidth) + allProductSlides.length) + "px";

    this.productCarousel = new Swiper(".jcb-quote-form--results--list-wrapper", {
      slidesPerView: this.sliderOptions.slidesInView,
      slideClass: "jcb-quote-form--results--item",
      wrapperClass: "jcb-quote-form--results--list",
      nextButton: '.jcb-quote-form--results--nav .next',
      prevButton: '.jcb-quote-form--results--nav .previous',
      centeredSlides: this.sliderOptions.centered,
      observer: true,
      onImagesReady: () => {
        that.slideProductCarouselToSelected();
        setTimeout(function () {
          that.scrollTo(that.activeStep);
          that.hideSpinner();
        }, 400);
      }
    });
      
  }

  handleQuerystringData() {
    const urlRange = this.getUrlParameter("range"),
          urlModel = this.getUrlParameter("model");

    if (urlRange !== "") {
      const rangeItem = this.el.querySelector(`.jcb-quote-form--categories--item[data-category="${urlRange}"]`);

      if (urlModel !== "") {
        //this.selectCategory(rangeItem, this.selectModelFilter, urlModel);
        this.selectCategory(rangeItem, this.selectModelFromQueryString, urlModel);
        this.activeStep = "#step3";
        this.openCollapsibleForm();
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
    
  }

  selectCategory(categoryItem) {
    const currentCategoryItem = _.findIndex(this.allCategorySlides, (item) => item.classList.contains("is-active")),
      currentCategory = (currentCategoryItem > -1) ? this.allCategorySlides[currentCategoryItem].getAttribute("data-category") : null,
      newCategory = categoryItem.getAttribute("data-category"),
      categoryType = categoryItem.getAttribute("data-category-type"),
      callback = arguments[1],
      modelUid = arguments[2],
      categoryList = this.el.querySelector('.jcb-quote-form--categories--list');

    categoryList.className = "jcb-quote-form--categories--list"; //remove other classes
    categoryList.classList.add('selected-' + categoryType); 

    if (currentCategoryItem > -1 && currentCategory !== newCategory) {
      for (let s in this.allCategorySlides) {
        this.allCategorySlides[s].classList.remove("is-active");
      }
    }
    if (currentCategory !== newCategory) {
      for (let s2 in this.allCategorySlides) {
        if (this.allCategorySlides[s2].getAttribute("data-category") === newCategory) {
          this.allCategorySlides[s2].classList.add("is-active");
          console.log("Set new active category item:", this.allCategorySlides[s2]);
          if (callback) {
            this.getRangeModels(newCategory, callback, modelUid);
          } else {
              this.getRangeModels(newCategory);
          }
        }
      }
    }


  }

  updateModelCount() {
    const totalModels = this.el.querySelectorAll(".jcb-quote-form--results--item"),
          visibleModels = this.el.querySelectorAll(".jcb-quote-form--results--item:not([aria-hidden])").length,
          activeFilters = this.shufflerFilter,
          activeRange = this.el.querySelector(".jcb-quote-form--categories--item.is-active").getAttribute("data-category-english-name"),
          resultsHeading = this.el.querySelector(".jcb-quote-form--results--heading"),
          resultsCount = resultsHeading.querySelector(".count"),
          resultsRange = resultsHeading.querySelector(".range"),
          resultsMatching = resultsHeading.querySelector(".matching"),
          resultsMatchingTags = resultsHeading.querySelector(".tags");

    if (totalModels.length === 0) {
      resultsHeading.style.display = "none";
    } else {
      resultsHeading.style.display = "block";
      resultsCount.innerText = visibleModels + "";
      resultsRange.innerText = activeRange;
      if (activeFilters.length > 0) {
        resultsMatchingTags.innerText = activeFilters.join(", ");
        resultsMatching.style.display = "inline";
      } else {
        resultsMatching.style.display = "none";
      }
    }
  }

  getRangeModels(uid, callback, modelUid) {
    const that = this,
        isProductSearch = this.el.querySelector(".jcb-quote-form--categories--item.is-active").getAttribute("data-category-type") === "product",
        url = (isProductSearch) ? `/api/v1/datahandler/machines/${this.lang}/${uid}` : `/api/v1/datahandler/attachments/${this.lang}/${uid}`;


    this.showSpinner()
        .then(() => {
          that.hideSearchError();
          fetch(url, {method: "GET", credentials: 'include'})
          .then(response => response.json())
          .then(json => {
            console.log("Response from API:", json);
            if (json.length > 0) {
              that.renderModels(json)
                .then(() => {
                  that.initProductCarousel();                 
                  that.attachResultEvents();
                  
                  if (callback) {
                    callback.apply(that, [modelUid]);
                  }
                  that.hideSpinner();
                  
                })
                .catch(error => {
                  console.error(error);
                });
            } else {
              that.hideSpinner()
                .then(() => that.showSearchError());
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
    return new Promise((resolve, reject) => {
      if (this.loadingCount < 1) {
        let range = document.createRange();
        range.selectNode(document.body);
        const frag = range.createContextualFragment("<div class=\"search-waiting-overlay\"><div class=\"loader\">Searching...</div></div>"),
          target = this.el;

        this.loadingCount++;
        target.appendChild(frag);
        anims.fadeIn(target.querySelector(".search-waiting-overlay"))
          .then(() => resolve(true));
      
      } else {
        this.loadingCount++;
        resolve(true)
      }
    });
  }

  hideSpinner() {
    return new Promise((resolve, reject) => {
      if (this.loadingCount == 1) {
        const spinner = this.el.querySelector(".search-waiting-overlay"),
          target = this.el;

        this.loadingCount--;
        anims.fadeOut(spinner)
          .then(() => {
            target.removeChild(spinner);
            resolve(true);
          });
      
      } else {
        this.loadingCount--;
        resolve(true);
      }
    });
  }

  showSearchError() {
    let range = document.createRange();
    range.selectNode(document.body);
    const target = this.el.querySelector(".jcb-quote-form--categories > .container"),    
        errorMsg = range.createContextualFragment("<p class=\"search-error-message\"><span class=\"icon\">!</span>Something went wrong. Please try again</p>");

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

  renderModels(json) {

    return new Promise((resolve, reject) => {
      let range = document.createRange();
      range.selectNode(document.body);
      const models = json,
          target = this.el.querySelector(".jcb-quote-form--results > .container"),
          resultStr = range.createContextualFragment(`${models.map((item, index) => `<div class="jcb-quote-form--results--item" id="${item.Id}" data-groups="">
                      <span class="jcb-quote-form--results--item-image">
                        <img src="${(item.Thumbnail)? `${item.Thumbnail}` : `http://placehold.it/300x250`}" alt="${item.Name}">
                      </span>
                      <span class="jcb-quote-form--results--tags">
                      </span>
                      <span class="jcb-quote-form--results--name">${item.Name}</span>
                      <span class="jcb-quote-form--results--checkmark"><i class="fa fa-check"></i></span>
                  </div>`).join("")}`);

      target.innerHTML = "";
      target.appendChild(resultStr);
      //this.handleImageLoads();
      resolve(true);
    });
  }

  handleImageLoads() {
    const images = Array.prototype.slice.call(this.el.querySelectorAll(".jcb-quote-form--results--item-image img")),
          that = this;
    for (let i in images) {
      images[i].addEventListener("onload", function() {
        that.shuffler.layout();
      });
    }
  }

  attachFilterEvents() {
    const filters = this.filterItems,
          filterToggle = this.el.querySelector(".jcb-quote-form--results--filter-toggle"),
          that = this;
    for (let f in filters) {
      filters[f].addEventListener("click", function() {
        that.toggleFilterState(filters[f]);
      });
    }
    if (!filterToggle.classList.contains("init")) {
      filterToggle.addEventListener("click", function() {
        that.toggleFilter();
      });
      filterToggle.classList.add("init");
    }
  }

  selectModelFilter(uid) {
    const targetFilter = this.el.querySelector(`.jcb-quote-form--results--filter-item[data-model="${uid}"]`);
    this.toggleFilterState(targetFilter);
  }

  selectModelFromQueryString(uid) {
    const Model = this.el.querySelector(`[id="${uid}"]`);
    this.updateCart(Model);
  }

  attachResultEvents() {
    const results = this.resultItems,
          that = this;
    for (let r in results) {
      results[r].addEventListener("click", (event) => {
        
        that.updateCart(event);
        that.scrollTo('#step3');
        this.openCollapsibleForm();
      });
    }
  }

  toggleFilter() {
    const button = this.el.querySelector(".jcb-quote-form--results--filter-toggle"),
          target = this.el.querySelector(".jcb-quote-form--results--filter");

    if (target.classList.contains("is-active")) {
      target.classList.remove("is-active");
      button.classList.remove("is-active");
      button.innerHTML = button.innerHTML.replace("Hide", "Show");
      $(target).slideUp("fast");
    } else {
      target.classList.add("is-active");
      button.classList.add("is-active");
      button.innerHTML = button.innerHTML.replace("Show", "Hide");
      $(target).slideDown("fast");
    }
  }

  toggleFilterState(el) {
    const model = el.getAttribute("data-model-name");
    if (el.classList.contains("is-active")) {
      el.classList.remove("is-active");
      el.querySelector('i').setAttribute("class", "fa fa-square-o");
      this.filterResults("remove", model);
    } else {
      el.classList.add("is-active");
      el.querySelector("i").setAttribute("class", "fa fa-check-square");
      this.filterResults("add", model);
    }
  }

  filterResults(method, model) {
    if (method === "remove") {
      _.pull(this.shufflerFilter, model);
    } else {
      this.shufflerFilter.push(model);
    }
    console.log(this.shufflerFilter);
    this.shuffler.filter(this.shufflerFilter);
    this.updateModelCount();
  }

  updateCart(event) {
    const target = event.target ? event.target.closest('[data-groups]') : event,
          id = target.getAttribute("id"),
          models = target.getAttribute("data-groups").split(","),
          name = target.querySelector('.jcb-quote-form--results--name').innerText,
          img = target.querySelector("img").getAttribute("src"),
          category = this.el.querySelector(".jcb-quote-form--tab.is-active").getAttribute("data-category-type"),
          range = this.el.querySelector(".jcb-quote-form--categories--item.is-active").getAttribute("data-category-english-name"),
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
    let range = document.createRange();
    range.selectNode(document.body);
    const that = this,
      cartList = document.querySelector(".jcb-quote-form--cart--items"),
      li = document.createElement('li'),    
      cartItem = range.createContextualFragment("<span class=\"jcb-quote-form--cart--checkmark\"><i class=\"fa fa-check\"></i></span>" + _.join(item.models, ", ") + " " + item.name);

    // for quote form we only want a single model, so clear out the current version
    this.selectedItems.forEach((i, index) => {
        that.removeFromCart(i);
    });

    this.selectedItems.push(item);
    this.selectedIds.push(item.id);    

    this.el.querySelector('.jcb-quote-form--results--list').classList.add('selected');
    item.el.classList.add("is-selected");   

    li.className = "jcb-quote-form--cart--item";
    li.setAttribute("data-id", item.id);
    li.appendChild(cartItem);
    li.addEventListener("click", () => {
      that.removeFromCart(item);
    });
    cartList.appendChild(li);

    this.updateCartDisplay();

    if (this.categoryItemCentered) {
      this.slideProductCarouselToSelected();
    }
  }

  removeFromCart(item) {
    const cartItem = document.querySelector("[data-id=\"" + item.id + "\"]");

    cartItem.parentNode.removeChild(cartItem);

    this.selectedItems = [];
    this.selectedIds = [];
    item.el.classList.remove("is-selected");
    document.querySelector('.jcb-quote-form--results--list').classList.remove('selected');

    this.updateCartDisplay();
    this.scrollTo('#step1');
  }

  updateCartDisplay() {
      this.populateCartInfoForSubmit()    
  }

  


 /**
  * TABS FUNCTIONS
  */

  initSearchTypeTabs() {
    const tabs = this.searchTypeTabs,
          that = this,
          selectedTab = this.getUrlParameter("tab") || 0;

    for (let t in tabs) {
      tabs[t].addEventListener("click", (event) => that.toggleSearchType(event));
    }
    this.updateCategoryItems(this.el.querySelector(".jcb-quote-form--tabs > .is-active").getAttribute("data-category-type"));

    tabs[selectedTab].click();
  }

  toggleSearchType(event) {
    const clicked = event.target,
      categoryType = clicked.getAttribute("data-category-type"),
      tabsWrapper = this.el.querySelector('.jcb-quote-form--tabs-wrapper');

    if (!clicked.classList.contains("is-active")) {
      this.updateCategoryItems(categoryType);
      this.el.querySelector(".jcb-quote-form--tabs .is-active").classList.remove("is-active");
      clicked.classList.add("is-active");
      tabsWrapper.className = "jcb-quote-form--tabs-wrapper"; //remove other classes
      tabsWrapper.classList.add(categoryType + '-tab-active');
    }
  }

  updateTabClassesOnSecondSlider() {
    const categoryType = this.el.querySelector(".jcb-quote-form--categories--item").getAttribute("data-category-type"),
      jcbQuoteFormResults = this.el.querySelector('.jcb-quote-form--results');

    jcbQuoteFormResults.className = "jcb-quote-form--results"; //remove other classes
    jcbQuoteFormResults.classList.add(categoryType + '-results');
  }
  updateCategoryItems(categoryType) {
    const allItems = this.allCategorySlides;
    const categoryFormField = document.getElementById('category');

    categoryFormField.value = categoryType;
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
    this.slideCategoryCarouselToSelected(); 
  }

  get searchTypeTabs() {
    return Array.prototype.slice.call(this.el.querySelectorAll(".jcb-quote-form--tabs > li"));
  }



/**
  * FORM FUNCTIONS
  */

  handleFormSubmit() {
    const form = document.querySelector(".form-component-outer form"),
          that = this;
      form.addEventListener("submit", () => {
          that.populateCartInfoForSubmit();
          if ($(form).valid()) {
              form.querySelector("input[type=submit]").disabled = true;
          }
    });
  }

  populateCartInfoForSubmit() {
    const salesForceField = document.getElementById("Input-Range-Models");

    let salesForceList = [];

    console.log("Selected Items:", this.selectedItems);

    this.selectedItems.forEach((item, index) => {        
        salesForceList.push(item.range + ";" + item.name);        
    });          
      
    salesForceField.value = _.uniq(salesForceList).join("|");

    console.log("SalesForce: ", salesForceList);   
    console.log("SalesForce field value:", salesForceField.value);
    

    return true;
  }

  scrollTo(element) {
    $('html, body').animate({
      scrollTop: $(element).offset().top
    }, 500);
  } 

  initCollapsibleForm() {
    const component = document.querySelector('.form-component-outer .form-component-inner');
    const heading = component.querySelector('.title');
    const chevron = document.createElement("i");
    const form = component.querySelector('form');
    const cart = this.el.querySelector('.jcb-quote-form--cart');

    let fragment = document.createDocumentFragment();
    fragment.appendChild(heading);

    heading.classList.remove('title');
    heading.classList.add('collapser');
    heading.setAttribute('data-toggle', 'collapse');
    heading.setAttribute('data-target', '.collapse-form');
    heading.appendChild(chevron);

    chevron.classList.add('fa');
    chevron.classList.add('fa-angle-down');      

    form.classList.add("collapse");
    form.classList.add("collapse-form");

    heading.addEventListener("click", function () {
      this.querySelector('.fa').classList.toggle('fa-angle-down');
      this.querySelector('.fa').classList.toggle('fa-angle-up');
    });

    form.insertBefore(cart, form.childNodes[0]);

    component.insertBefore(fragment, component.childNodes[0]);  

    component.parentElement.classList.add('var-collapsible');
    
  }

  openCollapsibleForm() {
    const component = document.querySelector('.form-component-outer .form-component-inner');
    const heading = component.querySelector('.collapser');

    heading.querySelector('.fa').classList.remove('fa-angle-down');
    heading.querySelector('.fa').classList.add('fa-angle-up');

    $('.form-component-outer.var-collapsible form').collapse('show');
  }
}