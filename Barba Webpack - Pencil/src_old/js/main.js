function delay(n) {
    n = n || 2000;
    return new Promise((done) => {
        setTimeout(() => {
            done();
        }, n);
    });
}

function pageTransition() {
    var tl = gsap.timeline();
    tl.to(".loading-screen", {
        duration: 1.2,
        width: "100%",
        left: "0%",
        ease: "Expo.easeInOut",
    });

    tl.to(".loading-screen", {
        duration: 1,
        width: "100%",
        left: "100%",
        ease: "Expo.easeInOut",
        delay: 0.3,
    });
    tl.set(".loading-screen", { left: "-100%" });
}

function contentAnimation() {
    var tl = gsap.timeline();
    tl.from(".animate-this", { duration: 1, y: 30, opacity: 0, stagger: 0.4, delay: 0.2 });
}

// NAVBAR
function navbar() {
    TweenMax.staggerFrom(".navbar ul li", 1.5, {
        delay: 1.5,
        opacity: 0,
        y: "-20",
        ease: Expo.easeInOut
    }, 0.08);
}
// MEDIA
function media() {
    TweenMax.staggerFrom(".media ul li", 1.5, {
        delay: 1.5,
        opacity: 0,
        y: "-20",
        ease: Expo.easeInOut
    }, 0.08);

}

$(function () {
    barba.init({
        sync: true,

        transitions: [
            {
                async leave(data) {
                    const done = this.async();
                    pageTransition();
                    await delay(1000);
                    done();
                },

                async enter(data) {
                    contentAnimation();
                    navbar()
                    media();
                },

                async once(data) {
                    contentAnimation();
                    navbar()
                    media();
                },
            },
        ],
    });
});

//https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=AIzaSyDIvSjWpQZKyZJiLUpieTdgvRMpXU3FMlc
// https://www.googleapis.com/auth/books?key=AIzaSyDIvSjWpQZKyZJiLUpieTdgvRMpXU3FMlc
// AIzaSyDIvSjWpQZKyZJiLUpieTdgvRMpXU3FMlc