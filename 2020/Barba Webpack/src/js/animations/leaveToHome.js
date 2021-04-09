import gsap from 'gsap';

const leaveToHome = (container) => {
    const aboutText = container.querySelectorAll('.about-text');
    // alert("LEAVE TO HOME");
    const tl = gsap.timeline({
        defaults: { duration: 0.6, ease: 'power1.in' }
    });
    tl.to(aboutText, { autoAlpha: 0, y: 20 }, 0.2);
    tl.timeScale(0.5)

    return tl;
}

export default leaveToHome;