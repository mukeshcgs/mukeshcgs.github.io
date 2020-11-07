import gsap from 'gsap';

const revealHome = (container) => {
    const aboutText = container.querySelectorAll('.about-text');
    // alert("REVEL HOME");
    const tl = gsap.timeline({
        defaults: { duration: 1.2, ease: 'power4.out' }
    });
    if (aboutText) {
        tl.from(aboutText, { autoAlpha: 0, x: 20 }, 0.2);
    }
    tl.timeScale(0.5)
    return tl;
}

export default revealHome;