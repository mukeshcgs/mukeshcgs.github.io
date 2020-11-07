class About {
    namespace = 'about';

    beforeEnter = data => {
        console.log(data, 'on About page');
        
    };
}

export default new About();
