import gsap from 'gsap';

const leaveToConnect = (container) => {
    const pageWrapper = container.querySelectorAll('.page-wrapper');

    // const navLinks = container.querySelectorAll('.menus ul li');
    // const projects = container.querySelectorAll('.image');
    // const images = container.querySelectorAll('.pro-img');
    const tl = gsap.timeline({
        onStart: () => console.log('starting animationLeave'),
        onComplete: () => console.log('completed animationLeave'),
        defaults: {
            duration: 0.4, ease: 'power1.in'
        }
    });
    tl
        .to(pageWrapper, { autoAlpha: 0, y: 20 }, 0.2);
    return tl;
}

export default leaveToConnect;