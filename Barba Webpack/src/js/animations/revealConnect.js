import gsap from 'gsap';

const revealConnect = (container) => {
    const pageWrapper = container.querySelectorAll('.page-wrapper');
    const images = container.querySelectorAll('.image');
    // const h1 = container.querySelectorAll('h1');
    const img = container.querySelectorAll('.pro-img');
    const hero = container.querySelector('.hero');
    console.log("REVEL CONNECTS22");

    const tl = gsap.timeline({
        defaults: {
            duration: 1.2, ease: 'power4.out'
        }
    });
    tl
        .set(hero, { autoAlpha: 1 })
        .from(images, { xPercent: -101, stagger: 0.1 }, 0)
        .from(img, {xPercent: 101,stagger: 0.1}, 0)
        // .from(h1, { xPercent: 70, autoAlpha: 0 }, 0)
        // .from(home, { yPercent: 10, stagger: 0.1 }, 0)
        .from(pageWrapper, { autoAlpha: 0, y: 20 }, 0.2);
    return tl;
}

export default revealConnect;