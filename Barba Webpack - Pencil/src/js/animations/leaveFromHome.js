import gsap from 'gsap';

const leaveFromHome = (container) => {
    const aboutText = container.querySelectorAll('.about-text');
    // alert("LEAVE FROM HOME");
    const tl = gsap.timeline({
        defaults: { duration: 1, ease: 'power1.in' }
    });
    tl.to(aboutText, { yPercent: 101 }, 0);
    tl.timeScale(0.5)

    return tl;
}

export default leaveFromHome;