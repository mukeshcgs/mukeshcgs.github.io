import dealerContactOverlay from './dealerContactOverlay.js';
import dealerSearchOverlay from './dealerSearchOverlay.js';

(function ($) {

    "use strict";

    //youtube script
    var tag = document.createElement('script');
    tag.src = "//www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    //if Editmode is on
    var isEditMode = $("body").data('iseditmode');

    $(document).ready(function() {
        dealerContactOverlay.init();
        dealerSearchOverlay.init();
        heroBanners();
        introComponent();
        specificComponent();
        galleryComponent();
        galleryComponentModal();
        specificationComp();
        tabsComponents();
        testimonialComponent();
        newsEventsCarouselComponent();
        premiumProductsComponent();
        accordionComponent();
        relatedComponent();
        imageComponentFilter(); // might be temporary Filter
        heroBannerWithYoutubeTesting();
        componentFilters();
        selectDropDownUI();
        rangeSliderUI();
        floatingReturnLink();
        customTooltip();
        productListing();
        productRange();
        oddEven();
        smoothScrollToEle();
        brochureDownloadModal();
        regionSelectModal();


        $("#dateofvisit").datepicker({
            minDate: 0,
            dateFormat: "yy-mm-dd"
        });


        $('form:not([data-form-title="used-equipment"]:not([data-form-title="brochure-modal-form"])').submit(function () {
            if ($(this).valid()) {
                $('input[type="submit"]').prop("disabled", true);
                $('input[type="submit"]').val('Please wait');
            }
        });
    });

    $(window).load(function () { });

    $(window).on('scroll', function () {
        var $timeline_block = $('#cd-timeline .cd-timeline-block');
        $timeline_block.each(function () {
            if ($(this).offset().top <= $(window).scrollTop() + $(window).height() * 0.75 && $(this).find('.cd-timeline-img').hasClass('is-hidden')) {
                $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
            }
        });
    });

    function smoothScrollToEle() {
        $('.decade-nav, .smooth-scroll').each(function () {
            var decadeTime = $(this),
                anchor = decadeTime.find('a');
            anchor.click(function (e) {
                e.preventDefault();

                var target = this.hash;
                var $target = $(target);

                $('html, body').stop().animate({
                    'scrollTop': $target.offset().top
                }, 900, 'swing', function () {
                    window.location.hash = target;
                });
            });

        });
    }

    function oddEven() {
        if ($('.col-md-6.year-item-container').length > 0) {
            $(".container.timelines").each(function () {
                $(this).find('.col-md-6.year-item-container:odd').addClass('odd');
                $(this).find('.col-md-6.year-item-container:even').addClass('even');
            });
        }
    }

    function productRange() {
        var captionWrap = $(".product-range-component").find("figure figcaption");

        if (captionWrap.length > 0) {
            captionWrap.matchHeight();
        }
    }

    function productListing() {
        var productListWrap = $(".product-listing-component-inner");

        productListWrap.each(function (e) {
            var wrap = $(this),
                item = wrap.find('.product-list'),
                editorContentH = wrap.find(".editor-content");

            editorContentH.matchHeight().promise().done(function () {
                item.matchHeight();
            });

            item.on('mouseenter', function () {
                wrap.addClass("ishovered");
            });
            item.on('mouseleave', function () {
                wrap.removeClass("ishovered");
            });
        });
    }

    //Components Filters
    function componentFilters() {

        // ########### HERO BANNER FILTER ###########
        var heroOuter = $(".jcb-hero-outer");

        //Variables Dropdowns
        var productPriceDD = $("#productPriceCopyDD"),
            herobannerStyleDD = $("#herobannerStyleDD"),
            heroTranslucentDD = $("#heroTextTranslucent"),
            copyBoxAlign = $("#heroCopyBoxAlignDD");

        // Hero Style select
        herobannerStyleDD.change(function () {
            var option = $(this);
            //remove same group classes first and then inject the new class, below
            heroOuter.removeClass("var-home-hero-outer var-product-hero-outer var-standard-hero-outer var-text-only-hero-outer");
            heroOuter.addClass(option.val());
        });

        //Product Price/Copy Show Hide select
        productPriceDD.change(function () {
            var option = $(this);
            //remove same group classes first and then inject the new class, below
            heroOuter.removeClass("var-show-product-price var-show-product-no-price-copy var-no-price-no-copy");
            heroOuter.addClass(option.val());
        });

        //Product Translucent
        heroTranslucentDD.change(function () {
            var option = $(this);
            //remove same group classes first and then inject the new class, below
            heroOuter.find('.jcb-editor-copy').removeClass("var-translucent var-no-translucent");
            heroOuter.find('.jcb-editor-copy').addClass(option.val());
        });

        // Copy Box Align - Left/Center/Right
        copyBoxAlign.change(function () {
            var option = $(this);
            //remove same group classes first and then inject the new class, below
            heroOuter.find('.jcb-editor-copy').removeClass("var-copy-left var-copy-center var-copy-right");
            heroOuter.find('.jcb-editor-copy').addClass(option.val());
        });

        // ##### DIVIDER STYLE #####
        var dividerStyleDD = $("#dividerStyleDropdown"),
            dividerColourDD = $("#dividerBgColorDropdown"),
            dividerOuterWrap = $("[data-id=divider-component-outer]"),
            defaultClass = "divider-component-outer";
        // Divider Style Selector
        dividerStyleDD.change(function () {
            var option = $(this);
            dividerOuterWrap.removeClass().addClass(defaultClass + " " + option.val());
            dividerColourDD.find('option:eq(0)').prop('selected', true); // Reset the colour option back to default
        });
        // Divider Colour Selector
        dividerColourDD.change(function () {
            var option = $(this);
            dividerOuterWrap.removeClass("var-bg-color-dark-grey var-bg-color-yellow").addClass(" " + option.val());
        });

        // ##### DUAL CONTENT #####
        $("#dualContentStyleDD").change(function () {
            var option = $(this),
                resetStyleClass = "";
            resetStyleClass += "var-dual-content-primary-copy-left ";
            resetStyleClass += "var-dual-content-primary-copy-right ";
            $(".dual-content-component-outer").removeClass(resetStyleClass).addClass(option.val());
        });
        $("#dualContentBGColorDD").change(function () {
            var option = $(this),
                resetBGColorClass = "";
            resetBGColorClass += "var-bg-color-white ";
            resetBGColorClass += "var-bg-color-dark-gray ";
            $(".dual-content-component-outer").removeClass(resetBGColorClass).addClass(option.val());
        });

        // ##### STANDARD COMPONENT #####
        $("#standardContentStyleDD").change(function () {
            var option = $(this),
                resetStyleClass = "";
            resetStyleClass += "var-standard-component-media-left ";
            resetStyleClass += "var-standard-component-media-right ";
            $(".standard-component-outer").removeClass(resetStyleClass).addClass(option.val());
        });

        // ##### CTA BLOCK COMPONENT #####
        $("#ctaBlockColorsDD").change(function () {
            var option = $(this),
                resetStyleClass = "";
            resetStyleClass += "var-cta-block--background-grey ";
            resetStyleClass += "var-cta-block--background-white ";
            $(".jcb-cta-block").removeClass(resetStyleClass).addClass(option.val());
        });
        $("#ctaBlockFeaturesDD").change(function () {
            var option = $(this).val();
            $('.jcb-cta-block').find('[class$="--divider"], [class$="--copy"]').hide();
            if (option !== "none") {
                $('.jcb-cta-block').find('[class*="' + option + '"]').show();
            }
        });

        // ##### BLOCKS COMPONENT #####
        $("#blockComponentColorsDD").change(function () {
            var option = $(this),
                resetStyleClass = "";
            resetStyleClass += "var-block-component--background-grey ";
            resetStyleClass += "var-block-component--background-white ";
            $(".jcb-block-component").removeClass(resetStyleClass).addClass(option.val());
        });
        $("#blockComponentCountDD").change(function () {
            var option = $(this).val();
            if (option === "var-block-component--three-up") {
                $('.jcb-block-component').removeClass("var-block-component--four-up").addClass(option).find('.jcb-block-component--block:last-child').hide();
            } else {
                $('.jcb-block-component').removeClass("var-block-component--three-up").addClass(option).find('.jcb-block-component--block:last-child').show();
            }
        });
        $("#blockComponentCtaDD").change(function () {
            var option = $(this).val(),
                cta = $(".jcb-block-component").find(".jcb-btn-primary");
            if (option === "none") {
                cta.hide();
            } else {
                cta.show();
            }
        });
        $("#blockComponentTitleAlignmentDD").change(function () {
            var option = $(this).val(),
                resetStyleClass = "";
            resetStyleClass += "var-block-component--title-center ";
            resetStyleClass += "var-block-component--title-left";
            $(".jcb-block-component h3").removeClass(resetStyleClass).addClass(option);
        });

        // ##### DUAL LINKS BLOCK COMPONENT #####
        $("#dualLinksBlockFormatDD").change(function () {
            var option = $(this).val();
            $(".jcb-dual-links-block").hide();
            if (option !== "") {
                $(".jcb-dual-links-block." + option).show();
            } else {
                $(".jcb-dual-links-block:first-child").show();
            }
        });
    }

    // Image Components Filters for Brand guidelines Template
    function imageComponentFilter() {
        var imageOuter = $('.image-component-outer'),
            translucentWrap = imageOuter.find('.image-item'),
            titleWrap = imageOuter.find('.title-copy'),
            subTitleWrap = imageOuter.find('.sub-title-copy'),
            bodyCopyWrap = imageOuter.find('.body-copy'),
            btnWrap = imageOuter.find('.cta-group .jcb-btn'),
            bgImageWrap = imageOuter.find('.image-background'),
            bgImage = bgImageWrap.find('img'),
            imageStyleDD = $('#imageStyleDropdown'),
            imageTextTranslucent = $("#imageStyleTextTranslucent"),
            titleColorDD = $('#titleTextColor'),
            subTitleColorDD = $('#subTitleTextColor'),
            bodyCopyColorDD = $('#bodyTextColor'),
            btnStyleDD = $('#buttonStyle'),
            bgImageStyleDD = $("#bgImageStyleDD");

        imageStyleDD.change(function () {
            var option = $(this),
                classes = imageOuter.attr('class').split(' ');
            imageOuter.removeClass(classes[1]).addClass(option.val());
        });

        imageTextTranslucent.change(function () {
            var option = $(this),
                classes = translucentWrap.attr('class').split(' ');
            translucentWrap.removeClass(classes[1]).addClass(option.val());
        });

        //Text colours
        titleColorDD.change(function () {
            var option = $(this),
                classes = titleWrap.attr('class').split(' ');
            titleWrap.removeClass(classes[1]).addClass(option.val());
        });

        subTitleColorDD.change(function () {
            var option = $(this),
                classes = subTitleWrap.attr('class').split(' ');
            subTitleWrap.removeClass(classes[1]).addClass(option.val());
        });

        bodyCopyColorDD.change(function () {
            var option = $(this),
                classes = bodyCopyWrap.attr('class').split(' ');
            bodyCopyWrap.removeClass(classes[1]).addClass(option.val());
        });

        //Button style
        btnStyleDD.change(function () {
            var option = $(this),
                classes = btnWrap.attr('class').split(' ');
            btnWrap.removeClass(classes[1]).addClass(option.val());
        });

        //Demo Only: Change Background Image
        bgImageStyleDD.change(function () {
            var option = $(this);
            bgImageWrap.css({ 'background-image': 'url(' + option.val() + ')' });
            bgImage.attr('src', option.val());
        });
            
    }

    function premiumProductsComponent() {
        console.log('premiumProductsComponent');
        var relAttOuter = $(".premium-products-component--outer");

        relAttOuter.each(function () {
            var rAOuter = $(this),
                sliderWrap = rAOuter.find('.premium-products-component--items'),
                sliderItems = sliderWrap.find(".premium-products-component--item"),
                customNavWrap = rAOuter.find('.js--premium-products-component--header--nav');

                console.log('customNavWrap', customNavWrap);

            if (sliderItems.length) {
                sliderWrap.owlCarousel({
                    items: 1,
                    loop: false,
                    autoplay: true,
                    mouseDrag: true,
                    navContainer: customNavWrap,
                    nav: true,
                    navText: '',
                    dots: false,
                    autoHeight: true,
                    autoHeightClass: 'owl-height',
                    video: true,
                    videoWidth: false,
                    videoHeight: false,
                    lazyLoad: false,
                    margin: 30,
                    stagePadding: 0,
                    responsive: {
                        0: {
                            margin: 20,
                        },
                        575: {
                            items: 2,
                        },
                        768: {
                            items: 2,
                            margin: 30,
                        },

                        920: {
                            items: 2,
                            margin: 80,
                        },
                        1024: {
                            items: 3,
                            margin: 50,
                        }
                    },
                });
            }
        });
    }

    function newsEventsCarouselComponent() {
        var relAttOuter = $(".news-events-carousel-component--outer");

        relAttOuter.each(function () {
            var rAOuter = $(this),
                sliderWrap = rAOuter.find('.news-events-carousel-component--items'),
                sliderItems = sliderWrap.find(".news-events-carousel-component--item"),
                customNavWrap = rAOuter.find('.js--carousel-component--header--nav');

            if (sliderItems.length) {
                sliderWrap.owlCarousel({
                    items: 1,
                    loop: false,
                    autoplay: true,
                    mouseDrag: true,
                    navContainer: customNavWrap,
                    nav: true,
                    navText: '',
                    dots: false,
                    autoHeight: true,
                    autoHeightClass: 'owl-height',
                    video: true,
                    videoWidth: false,
                    videoHeight: false,
                    lazyLoad: false,
                    margin: 30,
                    stagePadding: 0,
                    responsive: {
                        0: {
                            margin: 20,
                        },
                        475: {
                            items: 2,
                        },
                        768: {
                            items: 3,
                            margin: 30,
                        },

                        920: {
                            items: 3,
                        },
                        1024: {
                            items: 4,
                        }
                    },
                });
            }
        });
    }


    function relatedComponent() {
        var relAttOuter = $(".related-component-outer");

        relAttOuter.each(function () {
            var rAOuter = $(this),
                sliderWrap = rAOuter.find('.related-items'),
                sliderItems = sliderWrap.find(".related-item"),
                customNavWrap = rAOuter.find('#customOwlNavJS');

            if (sliderItems.length) {
                sliderWrap.owlCarousel({
                    items: 1,
                    loop: true,
                    autoplay: false,
                    //mouseDrag: false,
                    // move navContainer outside the primary owl wrapper
                    navContainer: customNavWrap,
                    nav: true,
                    navText: '',
                    dots: false,
                    //dotClass: 'gallery-dots',
                    autoHeight: true,
                    autoHeightClass: 'owl-height',
                    video: true,
                    videoWidth: false,
                    videoHeight: false,
                    margin: 30,
                    stagePadding: 30,
                    responsive: {
                        0: {
                            items: 1,
                            stagePadding: 30,
                            margin: 0,
                            loop: true,
                        },
                        567: {
                            items: 1,
                            stagePadding: 100,
                            margin: 20,
                            loop: true,
                        },
                        750: {
                            items: 1,
                            stagePadding: 150,
                            margin: 20,
                            loop: true,
                        },
                        992: {
                            items: 2,
                            stagePadding: 0,
                            margin: 30,
                            loop: false,
                        }
                    },
                });
            }
        });
    }

    function accordionComponent() {
        var accrodionOuter = $(".accordion-component-outer");

        accrodionOuter.each(function () {
            var aWrap = $(this),
                accordionWrap = aWrap.find('.accordion-items');

            accordionWrap.accordion({
                active: (aWrap.hasClass("is-mrrp")) ? false : 0,
                collapsible: true,
                autoHeight: false,
                heightStyle: "content"
            });

        });
    }

    function testimonialComponent() {
        var tWrap = $(".testimonial-component-outer");

        tWrap.each(function () {
            var oWrap = $(this),
                sliderWrap = oWrap.find('.testimonial-items'),
                item = sliderWrap.find('.testimonial-item');
            if (item.length) {
                sliderWrap.owlCarousel({
                    items: 1,
                    loop: false,
                    mouseDrag: false,
                    autoplay: false,
                    dots: true,
                    dotClass: 'flat-dot',
                    //dotData: true,
                    //dotsEach: 'number',
                    autoHeight: true,
                    autoHeightClass: 'owl-height',
                    video: true,
                    videoWidth: false,
                    videoHeight: false,
                });
            } else {
                sliderWrap.removeClass("owl-carousel");
            }
        });

    }

    function specificationComp() {
        var sComp = $('.specific-component-inner'),
            sheader = sComp.find('.spec-header');

        if (sheader.length) {
            sheader.matchHeight({
                byRow: true,
                property: 'height',
            })
        }
    }

    function tabsComponents() {
        var tabsWrap = $('.tabs-components-inner .tabs-wrap');
        if (tabsWrap.length) {
            $(tabsWrap).each(function () {
                $(this).tabs();
            });
        }

        if ($(".tabs-navigation .tab-nav-name").length) {
            $(".tabs-navigation .tab-nav-name").matchHeight({
                byRow: true,
                property: 'height',
            })
        }

        $('.ui-tabs-tab').click(function (event) {
            var pos = tabsWrap.scrollLeft() + 100;
            //tabsWrap.scrollLeft(pos);
            tabsWrap.animate({ scrollLeft: pos }, 1000)
        });
    }
    

    function downloadBrochure(brochureUrl) {
        var fullUrl = window.location.protocol + '//' + window.location.hostname + brochureUrl;
        window.open(fullUrl, '_blank');
    }

    function populateBrochureModalFormSalesforceField(product = null, range = null) {
        const salesForceField = document.getElementById("Input-Range-Models");

        if (salesForceField && range) {
            salesForceField.value = range;
        }

        if(salesForceField && product && range) {
            salesForceField.value = range + ";" + product;
        }
    }

    function getSkipButton(name) {
        var skipButton = document.getElementById("formSkip");
        if (skipButton) {
            skipButton.classList.add(name);
        }

        return skipButton;
    }

    function setupSkipButtonForBrochureDownloadModal(name) {

        var skipButton = getSkipButton(name);
        if (skipButton) {
            skipButton.addEventListener("click", skipBrochureModalForm);
        }

        return skipButton;
    }
    
    function brochureDownloadModal() {
        $('#brochureDownloadModal .js-close-modal').on('click', function (e) {
            e.preventDefault();
            closeModal($(this).data('dismiss'));
        });
        var skipButton = setupSkipButtonForBrochureDownloadModal("brochure-modal");

        $(document).on('click', '.js-brochure-download', function (e) {
            e.preventDefault();

            var brochureUrl = $(this).attr("data-brochure-asset-url");
            var product = $(this).attr("data-name");
            var range = $(this).attr("data-category-english-name");

            if ($(this).attr('data-ismodalenabled').toLowerCase() === 'true') {
                $('#brochureDownloadModal').attr('data-brochure-url', brochureUrl);
                populateBrochureModalFormSalesforceField(product, range);

                if (skipButton) {
                    skipButton.setAttribute("data-brochure-asset-url", brochureUrl);
                }

                openModal('#brochureDownloadModal', $(this).data('name'));

                $('#brochureDownloadModal form').submit(function () {
                    if ($(this).valid()) {
                        if (brochureUrl) {
                            downloadBrochure(brochureUrl);
                        }
                    }
                });

            } else {
                if (brochureUrl) {
                    downloadBrochure(brochureUrl);
                }
            }
        });


        $('.js-disable-popup').on('click', function () {
            closeModal($(this).data('dismiss'));
            document.cookie = 'js-jcb_brochure_popup_disabled=1; path=/';
        });

        $('.js-modal-form').on('click', function () {

            if ($('#modal-form_' + $(this).data('form')).hasClass('is-active')) {
                $('.modal-form').removeClass('is-active'); // Remove all active classes
            } else {
                $('.modal-form').removeClass('is-active'); // Remove all active classes
                $('#modal-form_' + $(this).data('form')).toggleClass('is-active');
            }
        });

        function openModal(id, name) {
            $(id).addClass('active');
            $(id).removeClass('fade');

            $('.js-productName').each(function () {
                console.log('js-productName', $(this));

                $(this).html($(this).html().replace(/({productName})/g, '<span class="productName">' + name + '</span>'));
            });
        }

        function closeModal(id) {
            $('#' + id).addClass('fade');

            setTimeout(function () {
                $('#' + id).removeClass('active');

                $('.js-productName').each(function () {
                    $(this).find('.productName').replaceWith('{productName}')
                });
            }, 600);
        }

        function showPostBrochureDownloadContent() {
            document.cookie = 'js-jcb_brochure_form_completed=1; path=/';
            $('#brochureDownloadModal').addClass('submitted');
        }
    }

    function skipBrochureModalForm() {
        downloadBrochure($(this).attr("data-brochure-asset-url"));
    }

    function galleryComponentModal() {
        $('.swipebox').swipebox({
            useCSS: true, // false will force the use of jQuery for animations
            useSVG: true, // false to force the use of png for buttons
            initialIndexOnArray: 0, // which image index to init when a array is passed
            hideCloseButtonOnMobile: false, // true will hide the close button on mobile devices
            removeBarsOnMobile: true, // false will show top bar on mobile devices
            hideBarsDelay: 3000, // delay before hiding bars on desktop
            videoMaxWidth: 1140, // videos max width
            beforeOpen: function () { }, // called before opening
            afterOpen: null, // called after opening
            afterClose: function () { }, // called after closing
            loopAtEnd: false // true will return to the first image after the last image is reached
        });
    }


    function galleryComponent() {
        var galleryItemsWrap = $('.gallery-component-outer');


        galleryItemsWrap.each(function () {
            var outerWrap = $(this),
                itemsWrap = outerWrap.find('.gallery-items'),
                item = itemsWrap.find('.gallery-item');

            if (item.length) {
                itemsWrap.owlCarousel({
                    items: 1,
                    loop: false,
                    autoplay: false,
                    mouseDrag: false,
                    nav: true,
                    dots: true,
                    dotClass: 'gallery-dots',
                    autoHeight: true,
                    autoHeightClass: 'owl-height',
                    video: true,
                    videoWidth: false,
                    videoHeight: false,
                });
            } else {
                itemsWrap.removeClass("owl-carousel");
            }

            // total slides count
            var i = 1,
                total = outerWrap.find('.owl-dots div').length;
            outerWrap.find('.gallery-dots').each(function () {
                $(this).text(i);
                i++;
            });
            outerWrap.find('.slider-nav .thumb .total-no-slider').text(total);

            // Listen to owl events:
            itemsWrap.on('changed.owl.carousel', function (event) {
                var currentItem = event.item.index;
                //window.location.hash = currentItem + 1;
                outerWrap.find('.slider-nav .thumb .current-no-slider').text(currentItem + 1);
            });

        });
    }

    function specificComponent() {
        var specWrap = $('.specific-component-outer');

        specWrap.each(function () {
            var sWrap = $(this),
                toggleWrap = sWrap.find('.toggle-editor-content'),
                toggleContent = toggleWrap.find('.toggle-editor-content-inner'),
                btn = toggleWrap.find('.jcb-btn');

            btn.on('click', function (e) {
                e.preventDefault();
                toggleWrap.toggleClass("expand-overlay").promise().done(
                    setTimeout(function () {
                        toggleContent.slideToggle('fast');
                    }, 300));

                $('html, body').animate({
                    scrollTop: (sWrap.offset().top)
                }, 300);
            });
        });
    }

    function introComponent() {
        var introCompo = $(".intro-component-outer");

        introCompo.each(function () {
            var introWrap = $(this),
                listCompo = introWrap.find(".compo-list-content"),
                listTitle = introWrap.find(".list-title"),
                listItems = introWrap.find(".list-items"),
                listBtn = introWrap.find(".copy-toggle-btn");

            listBtn.on("click", function (e) {
                e.preventDefault();
                var btn = $(this),
                    btnTextMore = btn.find(".text-more"),
                    btnTextLess = btn.find(".text-less");
                if (listCompo.length) {
                    listItems.slideToggle("fast", function () {
                        if (listItems.is(":visible")) {
                            btn.addClass("open-overlay");
                            btnTextMore.hide();
                            btnTextLess.show();
                        } else {
                            btn.removeClass("open-overlay");
                            btnTextMore.show();
                            btnTextLess.hide();

                            $('html, body').animate({
                                scrollTop: (introWrap.offset().top)
                            }, 300);
                        }
                    });
                    listTitle.slideToggle("fast");
                }
            });

        });
    }

    function heroBanners() {
        // Hero Banner
        var jcbHeroSlider = $(".jcb-hero-outer");

        jcbHeroSlider.each(function () {
            var heroSliderWrap = $(this),
                hSlider = heroSliderWrap.find('.jcb-hero-inner');

            //Is Edit Mode on
            var trueIfNotEditMode = true;
            if (isEditMode === "True") {
                trueIfNotEditMode = false;
            }


            //Owl Carousel Setting
            if (heroSliderWrap.find(".jcb-hero-item").length > 1) {
                hSlider.owlCarousel({
                    items: 1,
                    loop: trueIfNotEditMode,
                    animateOut: 'fadeOut',
                    autoplay: trueIfNotEditMode,
                    autoplayTimeout: 5000,
                    mouseDrag: trueIfNotEditMode,
                    dots: true,
                    dotClass: 'jcb-hero-dots',
                    autoHeight: true,
                    autoHeightClass: 'owl-height',
                    video: true,
                    videoWidth: false,
                    videoHeight: false,
                    onInitialized: function (e) {
                        heroSliderWrap.find('.owl-item.active').find('.owl-video-play-icon').trigger('click', function () {
                            heroSliderWrap.find('iframe').attr('src', '');

                            var newPara = "?enablejsapi=1&version=3?&autoplay=1&rel=0&theme=light&showinfo=0&disablekb=1&modestbranding=1&hd=1";
                            heroSliderWrap.data('id', newPara);

                        });

                    },
                    onTranslated: function (e) {
                        setTimeout(function () {
                            heroSliderWrap.find('.owl-item.active .owl-video-play-icon').trigger('click');
                        }, 100);
                    }
                });

            } else {
                heroSliderWrap.find(".jcb-hero-inner.owl-carousel").removeClass("owl-carousel");
            }
        });
    }

    function heroBannerWithYoutubeTesting() {
        // Hero Banner
        var jcbHeroSlider = $(".jcb-hero-outer.testingJSFunction");

        jcbHeroSlider.each(function () {
            var heroSliderWrap = $(this),
                hSlider = heroSliderWrap.find('.jcb-hero-inner');

            //Owl Carousel Setting
            if (heroSliderWrap.find(".jcb-hero-item").length > 0) {
                hSlider.owlCarousel({
                    items: 1,
                    autoplay: false,
                    autoplayTimeout: 6000,
                    mouseDrag: false,
                    dots: true,
                    dotClass: 'jcb-hero-dots',
                    autoHeight: true,
                    autoHeightClass: 'owl-height',
                    video: true,
                    videoWidth: false,
                    videoHeight: false,
                    onInitialized: function (e) {
                        heroSliderWrap.find('.owl-item.active').find('.owl-video-play-icon').trigger('click');
                    },
                    onTranslated: function (e) {
                        setTimeout(function () {
                            heroSliderWrap.find('.owl-item.active .owl-video-play-icon').trigger('click');
                        }, 100);
                    }
                });

            } else {
                heroSliderWrap.find(".jcb-hero-inner.owl-carousel").removeClass("owl-carousel");
            }
        });
    }

    function selectDropDownUI() {
        //jQuery UI - DropDown Style
        $(function () {
            $("select.jcb-yellow-select").selectmenu({
                classes: {
                    "ui-selectmenu-menu": "jcb-yellow-drop-down",
                    "ui-selectmenu-button": "jcb-yellow-drop-down"
                }
            });
            $("select.jcb-white-select").selectmenu({
                classes: {
                    "ui-selectmenu-menu": "jcb-white-drop-down",
                    "ui-selectmenu-button": "jcb-white-drop-down"
                }
            });
        })
    }

    function rangeSliderUI() {
        $(".slider-range").each(function () {
            let min = parseInt($(this).attr('data-min'));
            let max = parseInt($(this).attr('data-max'));
            let values = [
                parseInt($(this).find('.slider-range__min-input').val()) || 0,
                parseInt($(this).find('.slider-range__max-input').val()) || 1
            ];
            let that = this;

            $(that).children('.slider').slider({
                range: true,
                min,
                max,
                values,
                slide: function (event, ui) {
                    $(that).find('.slider-range__min-input').val(ui.values[0]);
                    $(that).find('.slider-range__max-input').val(ui.values[1]);

                    $(that).find('.slider-range__min').attr('data-number', ui.values[0]);
                    $(that).find('.slider-range__max').attr('data-number', ui.values[1]);
                },
                create: function (event, ui) {
                    $(that).find('.slider-range__min').attr('data-number', values[0]);
                    $(that).find('.slider-range__max').attr('data-number', values[1]);
                }
            });
        });
    }

    function floatingReturnLink() {
        $(function () {
            $('.floating-return-link').each(function () {
                let $element = $($(this).attr('href'));

                $(window).bind('load resize scroll', function () {
                    if ($(this).offset().top > $element.offset().top + $element.height()) {
                        $(this).fadeIn();
                    } else {
                        $(this).fadeOut();
                    }
                }.bind(this));
            });
        });
    }

    function customTooltip() {
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        });

        $(function () {
            $('[data-toggle="popover"]').popover({
                trigger: 'hover',
            });
        });
    }


    function regionSelectModal() {

        function init() {
            if ($('.region-select-modal-container').length) {
                if (!isCountryCookieSet()) {
                    openModal();
                }
            }

        }

        function openModal() {
            $('.region-select-modal-container').addClass('active');
            $('body').addClass('modal-open');
            $('html').addClass('modal-open');
        }

        function closeModal() {
            $('.region-select-modal-container').removeClass('active');
            $('body').removeClass('modal-open');
            $('html').removeClass('modal-open');
        }

        function isCountryCookieSet() {

            if (document.cookie.split(';').filter(function (item) {
                return item.indexOf('jcb-selected-region=') >= 0
            }).length) {
                return true;
            } else {
                return false;
            }

            return false;
        }

        function getCookieCountryValue() {
            var pair = document.cookie.match(new RegExp('jcb-selected-region=([^;]+)'));
            return !!pair ? pair[1] : null;
        }


        function renderOptions() {
            var selectedRegion = $('.js-region-dropdown').val();
            var options = [];
            var text, value, region, url, isoCode;

            options.push('<option value="">Please select country</option>');

            $(".js-all-countries > option").each(function () {
                text = $(this).text();
                value = $(this).val();
                region = $(this).attr('data-region');
                url = $(this).attr('data-country-url');
                isoCode = $(this).attr('data-country-iso');

                if (selectedRegion == $(this).attr('data-region')) {
                    options.push('<option data-region="' + region + '" data-country-url="' + url + '" data-country-iso="' + isoCode + '" value="' + value + '">' + text + '</option>');
                    document.cookie = `jcb-selected-region=true; domain=${document.domain}; expires=Sun, 16 Jul 3567 06:23:41 GMT`;
                }
            });

            $('.js-country-dropdown').empty().append(options).selectmenu("refresh");
            $('.js-country-dropdown').selectmenu("enable");
            $('.js-country-dropdown').selectmenu("open");

        }

        function countryPreferenceChanged() {
            updateCountryCookie();
            redirectToCountryUrl();
        }

        function updateCountryCookie() {

            document.cookie = `jcb-selected-region=true; domain=${document.domain}; expires=Sun, 16 Jul 3567 06:23:41 GMT`;
        }

        function redirectToCountryUrl() {
            var selectedCountryUrl = $(".js-country-dropdown option:selected").attr('data-country-url');

            var regExp = /www.jcb.*$/;
            var found = selectedCountryUrl.match(regExp);

            if (found) {
                $(location).attr('href', selectedCountryUrl);
            }
        }


        $(".js-region-dropdown").selectmenu({
            classes: {
                "ui-selectmenu-menu": "jcb-yellow-drop-down",
                "ui-selectmenu-button": "jcb-yellow-drop-down"
            },
            change: function (event, ui) {
                renderOptions();
            }
        });


        $(".js-country-dropdown").selectmenu({
            classes: {
                "ui-selectmenu-menu": "jcb-yellow-drop-down",
                "ui-selectmenu-button": "jcb-yellow-drop-down"
            },
            change: function (event, ui) {
                closeModal();
                countryPreferenceChanged();
            },
            disabled: true
        });


        $('.js--close-modal').on('click', function (e) {
            e.preventDefault();
            closeModal();
        });


        init();

    }

    /*    $.validator.setDefaults({
          ignore: ":hidden:not(.do-not-ignore)"
        });
      */
    //$(".form-component-outer form").submit(function (e) {
    //$('.form-component-outer form').validate({
    //  ignore: ":not(input[type='hidden'][data-val='true'])"
    //});
    // return $(this).isValid();
    // });
    // $('.form-component-outer form').ignore(":not(input[type='hidden'][data-val='true'])");
    $.validator.setDefaults({
        ignore: "input[type='hidden']:not([data-val='true'])"
    });

    $.validator.addMethod("validCharcters", function (value, element) {
        // allow any non-whitespace characters as the host part
        return !(/[~`#%^*()/]+/.test(value));
        return !(/[~`#%^*()/]+/.test(value));
        return !(/[~`#%^*()/]+/.test(value));
        return !(/[~`#%^*()/]+/.test(value));
        return !(/[~`#%^*()/]+/.test(value));
        return !(/[~`#%^*()/]+/.test(value));
        return !(/[~`#%^*()/]+/.test(value));
        return !(/[~`#%^*()/]+/.test(value));
        return !(/[~`#%^*()/]+/.test(value));
        return !(/[~`#%^*()/]+/.test(value));
        return !(/[~`#%^*()/]+/.test(value));
        return !(/[~`#%^*()/]+/.test(value));
        return !(/[~`#%^*()/]+/.test(value));
        return !(/[~`#%^*()/]+/.test(value));
        return !(/[~`#%^*()/]+/.test(value));
        return !(/[~`#%^*()/]+/.test(value));
        return !(/[~`#%^*()/]+/.test(value));

    }, 'Please enter a valid character.');




    (function usedEquipmentForm() {


        //watch the select boxes for change
        $('[data-form-title="used-equipment"] .form-control').on("selectmenuchange", function (event, ui) {
            if ($(this).is('select')) {
                var currentSelectElm = $(this);
                var selectedVal = ui.item['value'];

                if (selectedVal != '') {
                    currentSelectElm.attr("data-is-selected", true);
                }
                else {
                    currentSelectElm.attr("data-is-selected", false);
                }

                var result = fetchSelectFilterOptions();
            }
        });

        $('[data-form-title="used-equipment"] input[type=checkbox]').on("change", function (event, ui) {
            var currentSelectElm = $(this);

            if (currentSelectElm !== undefined) {
                var result = fetchSelectFilterOptions();
            }
        });


        $('[data-form-title="used-equipment"]').on("submit", function (event) {
            event.preventDefault();
            var usedEquipmentForm = this;

            usedEquipmentForm.querySelector("input[type=submit]").disabled = true;

            function reSetSearchBtn() {
                usedEquipmentForm.querySelector("input[type=submit]").disabled = false;
            }

            var lang = $('html').attr('lang');
            var requestURIBase = "/api/v1/used/" + lang + "/search"
            var formData = $('[data-form-title="used-equipment"]').serializeArray();
            var formDataArry = [];
            jQuery.each(formData, function (i, field) {

                var isSelected = false;
                var optionArray = [];

                if (field.name.indexOf("Form.Fields") !== -1) {
                    var fieldElm = $('select[name="' + field.name + '"]');

                    if (fieldElm != undefined && fieldElm != null) {
                        isSelected = $('select[name="' + field.name + '"]').attr("data-is-selected");

                    }

                    if (isSelected) {
                        var values = jQuery.each($('select[name="' + field.name + '"] option'), function (i, option) {
                            optionArray.push(option.value);
                        });
                        field.options = optionArray;
                    }
                }

                formDataArry.push({
                    isSelected: isSelected != undefined ? isSelected : "false",
                    name: field.name,
                    value: field.value,
                    options: optionArray
                });
            });
            // write to storage
            sessionStorage.setItem('jcb-used-formfields', JSON.stringify(formDataArry));
            resetSortOptions();

            $.ajax({
                type: "POST",
                url: requestURIBase,
                data: formData,
                success: function (data) {
                    renderUsedEquipmentResults(data);
                    scrollToUsedEquipmentResults();
                    reSetSearchBtn();                
                },
                error: function () {
                    reSetSearchBtn();
                }
            });

        });

        //sort by
        $('.js--used-sortby').on("selectmenuchange", function (e) {
            e.preventDefault();
            sessionStorage.setItem('jcb-used-sortby', $(this).val());
            var order = $(this).val().split("/");
            var limit = $('.js--show-more-used-equipments').data('perpage');
            var lang = $('html').attr('lang');
            var col = order[0];
            var dir = order[1];
            $('.js--show-more-used-equipments').attr('data-sort-col', col).attr('data-sort-dir', dir);

            var requestURIBase = "/api/v1/used/" + lang + "/search/" + 0 + "/" + limit + "/" + col + "/" + dir;
            $.ajax({
                type: "GET",
                url: requestURIBase,
                success: function (data) {
                    if (data.length > 0) {
                        renderUsedEquipmentResults(data);
                    }
                }
            });
        });

        //load more
        $('.js--show-more-used-equipments').on("click", function (e) {
            e.preventDefault();
            var limit = $(this).attr('data-perpage');
            var lang = $('html').attr('lang');
            var count = $('.used-equipment-results--item').length;
            var col = $(this).attr('data-sort-col');
            var dir = $(this).attr('data-sort-dir');
            var requestURIBase = "/api/v1/used/" + lang + "/search/" + count + "/" + limit + "/" + col + "/" + dir;

            $.ajax({
                type: "GET",
                url: requestURIBase,
                success: function (data) {
                    if (data.length > 0) {
                        renderUsedEquipmentResults(data, true);
                    }
                }
            });

        });



        function watchKeywordSearchInput() {
            let typingTimer;
            let doneTypingInterval = 1000;
            let usedKeywords = $('[data-form-title="used-equipment"]  #used-keywords');

            usedKeywords.on('keyup', function () {
                clearTimeout(typingTimer);
                typingTimer = setTimeout(doneTyping, doneTypingInterval);
            });

            //on keydown, clear the countdown
            usedKeywords.on('keydown', function () {
                clearTimeout(typingTimer);
            });

            function doneTyping() {
                fetchSelectFilterOptions();
            }
        };

        function watchKeywordSearchInputDealer() {
            let typingTimer;
            let doneTypingInterval = 1000;
            let usedKeywords = $('[data-form-title="dealer-used-equipment"]  #used-keywords');

            usedKeywords.on('keyup', function () {
                clearTimeout(typingTimer);
                typingTimer = setTimeout(doneTyping, doneTypingInterval);
            });

            //on keydown, clear the countdown
            usedKeywords.on('keydown', function () {
                clearTimeout(typingTimer);
            });

            function doneTyping() {
                fetchSelectFilterOptions();
            }
        };

        watchKeywordSearchInput();
        watchKeywordSearchInputDealer();


        //fetches form data from API and then returns an object
        function fetchSelectFilterOptions() {
            var lang = $('html').attr('lang');
            var dealer = $('#used-dealer-search').data('dealer-name');
            var uri;

            if (dealer == null) {
                uri = '/api/v1/used/' + lang + '/search-options';
            } else {
                uri = '/api/v1/used/' + lang + '/' + dealer + '/dealer-search-options';
            }

            const requestURIBase = uri;
            
            var limit = $('.js--show-more-used-equipments').data('perpage');
            var myForm = document.querySelectorAll('[data-form-title]');

            var formData = $('[data-form-title="used-equipment"]').serializeArray();

            $.ajax({
                type: "POST",
                url: requestURIBase,
                data: formData,
                success: function (data) {
                    populateSelectOptions(data.Fields);
                    updateSearchResultValue(data.ResultCount);
                    $('.js--show-more-used-equipments').attr("data-total", data.ResultCount).hide();
                }
            });
        }

        function updateSearchResultValue(data) {

            var submitBtn = $('[data-form-title="used-equipment"] :submit');
            var newValue = i18n.UsedSearch.searchButton + " (" + (data) + ")";
            submitBtn.attr("value", newValue);

        }

        function populateSelectOptions(data) {
            var fieldsObj = data;

            for (var i = 0, l = fieldsObj.length; i < l; i++) {
                var obj = fieldsObj[i];
                var objId = obj['Id'];
                var objOptionsArr = obj['Value'];

                $('[data-form-title="used-equipment"] select.form-control').each(function () {
                    if ($(this).attr("id") == objId) {
                        populateSelect($(this), objOptionsArr, $(this).find(":selected").text());
                    }
                });
            }
        }

        //populates the select using the passed options
        function populateSelect(element, options, defaultOption = undefined) {
            var select = element;
            var options = options;

            //grab default option
            var firstOption = $(select).find('option:first');

            //empty select
            $(select).find('option').remove();

            $(select).append(firstOption);


            //Populate select
            $.each(options, function (index, value) {
                if (value !== "") {
                    var optionHtml = '<option value="' + value + '">' + value + '</option>';
                    if (defaultOption === value) {
                        optionHtml = '<option value="' + value + '" selected>' + value + '</option>';
                    }

                    $(select).append(optionHtml);
                }
            });

            //rebuild the selectmenu
            $(select).selectmenu("refresh");
        }


        //Results

        function renderUsedEquipmentResults(data, append) {

            var stored = JSON.parse(sessionStorage.getItem('jcb-used-data')) || [];
            var searchResultsContainer = document.getElementById('used-equipment-search-results');


            if (append !== true) {
                searchResultsContainer.innerHTML = "";
                stored = data;
            } else {
                for (var i = 0; i < data.length; i++) stored.push(data[i]);
            }
            sessionStorage.setItem('jcb-used-data', JSON.stringify(stored));

            var usedEquipmentResults = data;

            if (searchResultsContainer) {

                $.each(usedEquipmentResults, function (i, item) {
                    var price = item.Price;
                    var name = item.Name;
                    var url = item.Url;
                    var imageUrl = item.MainImageUrl;
                    var manufacturer = item.Manufacturer;
                    var range = item.Range;
                    var hours = item.Hours;
                    var year = item.ManufacturerYear;
                    var currency = item.Currency;

                    var labelCurrency = currency;
                    var labelManufacturer = i18n.UsedSearch.manufacturer;
                    var labelRange = i18n.UsedSearch.range;
                    var labelHours = i18n.UsedSearch.hours;
                    var labelYear = i18n.UsedSearch.year;
                    var labelViewDetails = i18n.UsedSearch.viewDetails;

                    searchResultsContainer.innerHTML += '<div class="used-equipment-results--item col-sm-6 col-lg-4 col-xl-12">' +
                        '<div class="product-list" style="">' +
                        '<div class="container-fluid">' +
                        '<div class="row">' +
                        '<div class="col-xl-3">' +
                        '<div class="img-wrap" style="background-image:url(' + imageUrl + ')">' +
                        '<img src="' + imageUrl + '" alt="Some Text">' +
                        '</div>' +
                        '</div>' +
                        '<div class="col-xl-9">' +
                        '<div class="row">' +
                        '<div class="col-xl-12">' +
                        '<div class="row">' +
                        '<div class="col-xl-8">' +
                        '<div class="editor-content" style="">' +
                        ' <h2>' + name + '</h2>' +
                        '</div>' +
                        '</div>' +
                        '<div class="col-xl-4">' +
                        '<div class="product-price-info-wrap">' +
                        '<div class="product-price-info-inner">' +
                        ' <div class="installment-price-box">' +
                        '<span class="price-wrap">' +
                        '<span class="item-currency">' + labelCurrency + '</span><span class="item-price" data-price="' + price + '">' + price + '</span>' +
                        '</span>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="col-xl-12">' +
                        '<div class="row">' +
                        '<div class="col-xl-8">' +
                        '<div class="product-spec">' +
                        '<div class="row">' +
                        '<div class="col-6 col-md-3">' +
                        '<dl>' +
                        '<dt>' + labelManufacturer + '</dt>' +
                        '<dd>' + manufacturer + '</dd>' +
                        '</dl>' +
                        '</div>' +
                        '<div class="col-6 col-md-4">' +
                        '<dl>' +
                        '<dt>' + labelRange + '</dt>' +
                        '<dd>' + range + '</dd>' +
                        '</dl>' +
                        '</div>' +
                        '<div class="col-6 col-md-2">' +
                        '<dl>' +
                        '<dt>' + labelHours + '</dt>' +
                        '<dd>' + hours + '</dd>' +
                        '</dl>' +
                        '</div>' +
                        '<div class="col-6 col-md-3">' +
                        '<dl>' +
                        '<dt>' + labelYear + '</dt>' +
                        '<dd>' + year + '</dd>' +
                        '</dl>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="col-xl-4">' +
                        '<a href="' + url + '" class="jcb-btn-primary">' +
                        '<span>' + labelViewDetails + '</span>' +
                        '</a>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';

                });
            }

            var total = $('.js--show-more-used-equipments').attr("data-total");
            var current = $('.used-equipment-results--item').length;

            if (current < total) {
                $('.js--show-more-used-equipments').show();
            } else {
                $('.js--show-more-used-equipments').hide();
            }

            $('.js--used-sort-block').show();
            sessionStorage.setItem('jcb-used-data-total', total);
        };

        function scrollToUsedEquipmentResults() {
            if ($('#used-equipment-search-results').length > 0) {
                var $target = $('#js--used-scroll-to');
                $('html, body').animate({
                    'scrollTop': $target.offset().top
                }, 700, 'swing');
            }
        }


        //only run on the page load - restore search results from the saved session data
        function restoreFromSession() {
            var data = JSON.parse(sessionStorage.getItem('jcb-used-data')) || [];
            var isPage = ($('#used-equipment-search-results').length > 0);
            var formFields = JSON.parse(sessionStorage.getItem('jcb-used-formfields')) || [];
            var sortBy = sessionStorage.getItem('jcb-used-sortby');
            var total = sessionStorage.getItem('jcb-used-data-total');

            if (isPage && data.length > 0) {
                //set the form fields
                if (formFields && formFields.length > 0) {
                    setTimeout(function () {
                        for (var x = 0; x < formFields.length; x++) {

                            var field = $('[name="' + formFields[x].name + '"]');
                            field.val(formFields[x].value).attr("data-is-selected", formFields[x].isSelected);

                            if (field.is("select")) {
                                var options = formFields[x].options;
                                if (options != undefined && options.length > 0) {

                                    var defaultOption = undefined;

                                    if (formFields[x].value !== "") {
                                        defaultOption = formFields[x].value;
                                    }
                                    populateSelect(field, options, defaultOption);
                                }
                            }

                            if (field.is(":checkbox")) {
                                field.attr('checked', formFields[x].value);
                            }
                        }
                    }, 200);

                }
                if (sortBy != null) {
                    var order = sortBy.split("/");
                    var col = order[0];
                    var dir = order[1];
                    setTimeout(function () {
                        $('.js--used-sortby').val(sortBy).selectmenu("refresh");
                    }, 500);
                }
                $('.js--show-more-used-equipments').attr('data-sort-col', col).attr('data-sort-dir', dir).attr('data-total', total);
                renderUsedEquipmentResults(data);
                updateSearchResultValue(total);
                scrollToUsedEquipmentResults();
            }
            else if (isPage) {
                fetchSelectFilterOptions();
            }

        }

        function resetSortOptions() {
            var sortBy = "lastModified/desc";
            if (sortBy != null) {
                setTimeout(function () {
                    $('.js--used-sortby').val(sortBy).selectmenu("refresh");
                }, 500);
            }
        }

        // hide the load more button by default
        $('.js--show-more-used-equipments').hide();
        $('.js--used-sort-block').hide();


        restoreFromSession();

        window.isTopBarDealer = function (ele) {
            if ($(ele).closest('.dealer--top-bar').length > 0) {
                return true;
            }

            return false;
        }

        window.isMobileMenuOpen = function () {
            if ($('body').is('.menu-open')) {
                return true;
            }
            return false;
        }

        $('.js--dealer-contact').on('click', function () {
            if (window.isMobileMenuOpen()) {
                window.closeMobileMenu();
            }

            if ($(this).is('.active')) {
                window.closeDealerContactModal();
            } else {
                window.openDealerContactModal();
            }
        });

        window.openDealerContactModal = function () {
            console.log('[openDealerContactModal] ------> dealer contact modal - show');

            setTimeout(function () {
                $('.js--dealer-contact').each(function () {
                    $(this).find('.chevron-to-cross').addClass('active');
                    $(this).addClass('active');
                });
            }, 100);

            $('.dealer-contact--modal').fadeIn('fast');
        }

        window.closeDealerContactModal = function () {
            console.log('[closeDealerContactModal] ------> dealer contact modal - hide');

            setTimeout(function () {
                $('.js--dealer-contact').each(function () {
                    $(this).find('.chevron-to-cross').removeClass('active');
                    $(this).removeClass('active');
                });
            }, 100);

            $('.dealer-contact--modal').fadeOut('fast');
        }

    })();


})(jQuery);
