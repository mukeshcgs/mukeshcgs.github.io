//Libs
import 'gsap'
import { Tone } from 'tone';
import { TimelineMax, Power4 } from 'gsap';
import ScrollMagic from 'scrollmagic/scrollmagic/minified/ScrollMagic.min';

import 'animation.gsap';
import 'debug.addIndicators';

import AbstractModule from "./AbstractModule";

// import Ractive from 'ractive';
// ==========================================================================
// Generic module
// ==========================================================================
export default class extends AbstractModule {
    constructor(options) {
        super(options);
        this.getProjwcta()
        this.projectController = this.initProjectController();

        console.log("PROJECTS");
    }
    initProjectController() {
        //GSAP SCROLL MAGIC
        var controller = new ScrollMagic.Controller();

        // TEXT animatation Code
        var welcomeTL = new TimelineMax({ paused: false })
        welcomeTL
            .staggerFrom('.hidden-text', 1.2, { y: "110%", ease: Power4.easeOut }, 0.5)

        // document.querySelector('button').addEventListener("click", letsAnimate)
        // function letsAnimate() {
        //     welcomeTL.play();
        // }


        // // init controller
        // $(".project").each(function () {
        //     var $overlay = $(this).find(".overlay"),
        //         $projectInfo = $(this).find(".project-info"),
        //         $smallTitle = $(this).find(".small-title"),
        //         $projectLink = $(this).find("project-link"),
        //         $h5 = $(this).find("h5")

        //     var animateIn = new TimelineMax();

        //     animateIn
        //         .fromTo($overlay, 2, { scale: 1.5, skewX: 30 }, { skewX: 0, xPercent: 100, transformOrigin: "0% 100%", ease: Power4.easeOut })
        //         .from($projectInfo, 0.5, { scaleY: 0, transformOrigin: "bottom left" }, "-=1.5")
        //         .from($h5, 0.3, { autoAlpha: 0, y: 30, ease: Power4.easeOut }, "-=0.2")
        //         .from($smallTitle, 0.3, { autoAlpha: 0, y: 30, ease: Power4.easeOut }, "-=0.5")
        //         .from($projectLink, 0.3, { autoAlpha: 0, y: 30, ease: Power4.easeOut }, "-=0.3")

        //     //make a scrollmagic scene
        //     var scene = new ScrollMagic.Scene({
        //         triggerElement: this,
        //     }).addIndicators().setTween(animateIn).addTo(controller)
        // })


    }
    getProjwcta() {
        function getCategoryBrochures() {
            const that = this,
                isProductSearch = window.document.querySelector(".get-pages").getAttribute("data-page-type") === "get-pages",
                allPages = `http://localhost/www/mukeshthankar.com/wordpress/wp-json/wp/v2/pages`,
                parent33 = `http://localhost/www/mukeshthankar.com/wordpress/wp-json/wp/v2/pages?parent=33`,
                URL = (isProductSearch) ? parent33 : allPages;

            showSpinner()
                .then(() => {
                    hideSearchError();
                    fetch(URL, { method: "GET", credentials: 'include' }).then(response => response.json())
                        .then(json => {
                            if (json.length > 0) {
                                renderAllPages(json)
                                    .then(() => hideSpinner())
                                    .then(() => {
                                        // initFilter();
                                        // attachResultEvents();
                                    })
                                    .catch(error => {
                                        console.error(error);
                                    });
                            } else {
                                hideSpinner().then(() => showBrochureNotThereError());
                            }
                        })
                        .catch(error => {
                            hideSpinner().then(() => showSearchError());
                            console.error(error);
                        });
                })
        };
        function showSpinner() {
            return new Promise((resolve, reject) => {
                resolve(true);
            })
        }
        function hideSpinner() {
            return new Promise((resolve, reject) => {
                resolve(true);
            })
        }
        function showSearchError() {
            // const target = this.el.querySelector(".jcb-brochure-download--categories > .container"),
            //     errorMsg = document.createRange().createContextualFragment("<p class=\"search-error-message\"><span class=\"icon\">!</span> " + this.i18n.genericErrorMsg +" </p>");
            // target.appendChild(errorMsg);
            // anims.fadeIn(this.el.querySelector(".search-error-message"));
        }
        function hideSearchError() {
            return new Promise((resolve, reject) => {
                //   const target = this.el.querySelector(".search-error-message");
                //   if (target) {
                //     anims.fadeOut(target)
                //       .then(() => {
                //         target.parentNode.removeChild(target);
                //         resolve(true);
                //       });
                //   } else {
                //     resolve(true);
                //   }
                resolve(true);
            })
        }
        function showBrochureNotThereError() { }


        function renderAllPages(json) {
            return new Promise((resolve, reject) => {
                console.log(json);
                const target = window.document.querySelector(".get-pages");
                const pagesArray = json,
                    resultStr = document.createRange().createContextualFragment(`${pagesArray.map((item, index) => `<section>
                    <div class="grid-12 project  ${index % 2 ? "project-right" : "project-left"}">
                        <div class="box">
                            <img src="${item.acf.project_image_desktop}" alt="">
                            <div class="overlay"></div>
                        </div>
                    <div class="project-info" style="border-bottom:2px solid ${item.acf.primary_color}">
                        <p class="small-title"> ${item.acf.company}</p>
                        <p class="duration">${item.acf.project_time}</p>
                        
                        <h4 class="project-title">${item.acf.project_name}</h4>
                        <p class="type"> ${item.acf.project_type.map(typeItem => { return `<span class="typeItem">${typeItem}</span>` }).join("")}</p>
                        <p class="tech"> ${item.acf.technologies.map(techItem => { return `<span class="techItem">${techItem}</span>` }).join("")}</p>
                        <p class="project-link" > <a href="${item.acf.url}">See Case study</a></p>
                    </div>
                    </section>`).join("")}`);
                target.innerHTML = "";
                target.appendChild(resultStr);
                handleImageLoads();
                projectAnimation();
                resolve(true);
            })
        }
        function projectAnimation() {
            // var tl = new TimelineMax({ paused: false })
            // var $ht = $(document).find('.hidden-text');
            // tl.staggerFrom($ht, 1.5, { y: "110%", ease: Power4.easeOut }, 0.5)

            var controller = new ScrollMagic.Controller();

            // init controller
            $(".project").each(function () {
                var $overlay = $(this).find(".overlay"),
                    $projectInfo = $(this).find(".project-info"),
                    $smallTitle = $(this).find(".small-title"),
                    $projectLink = $(this).find(".project-link"),
                    $h4 = $(this).find("h4"),
                    $tech = $(this).find(".techItem")

                var animateIn = new TimelineMax();

                animateIn
                    .fromTo($overlay, 2, { scale: 1.5, skewX: 30 }, { skewX: 0, xPercent: 100, transformOrigin: "0% 100%", ease: Power4.easeOut })
                    .from($projectInfo, 0.3, { scaleY: 0, transformOrigin: "bottom left" }, "-=1.5")
                    .from($h4, 0.3, { autoAlpha: 0, x: 30, ease: Power4.easeOut }, "-=1.2")
                    .from($tech, 0.3, { autoAlpha: 0, x: 30, ease: Power4.easeOut }, "1")
                    .from($smallTitle, 0.3, { autoAlpha: 0, y: 30, ease: Power4.easeOut }, "-=0.5")
                    .from($projectLink, 0.3, { autoAlpha: 0, y: 10, ease: Power4.easeOut }, "-=0.3")

                //make a scrollmagic scene
                var scene = new ScrollMagic.Scene({
                    triggerElement: this,
                }).addIndicators().setTween(animateIn).addTo(controller)
            })
        }
        //Handle Image load
        function handleImageLoads() {
            // const brochureImages = Array.prototype.slice.call(this.el.querySelectorAll(".jcb-brochure-download--results--item-image img")),
            //     that = this;
            // for (let i in brochureImages) {
            //     brochureImages[i].addEventListener("onload", function () {
            //         that.shuffler.layout();
            //     });
            // }
        }
        getCategoryBrochures();
    }
};
