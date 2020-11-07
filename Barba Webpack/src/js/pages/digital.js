class Digital {
    namespace = 'digital';

    beforeEnter = data => {
        console.log(data, 'Barba Views is the best place to run custom code.');
    };
}

export default new Digital();
