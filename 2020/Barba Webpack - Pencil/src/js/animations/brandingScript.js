
import gsap from 'gsap';
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
const brandingScript = (container) => {

    var slider_img = document.querySelector('.card-img2');
    var slider_name = document.querySelector('.card-header');
    var slider_type = document.querySelector('.card-theme');
    var slider_tec = document.querySelector('.card-tec');
    var slider_btn = document.querySelector('.card-link');
    var slider_dis = document.querySelector('.card-para');
    var data = [
        {
            name: "Image 01",
            clientName: "Studio See Saw",
            discription: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam facere, dicta illum dolores adipisci doloremque animi vitae commodi ipsa assumenda, perferendis at nostrum.",
            url: "https://greensock.com/docs/v3/GSAP/gsap.timeline()",
            img: './images/a.jpg',
            type: "Identity",
            technology: "Identity 01"
        },
        {
            name: "Image 02",
            clientName: "Amfah India",
            discription: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam facere, dicta illum dolores adipisci doloremque animi vitae commodi ipsa assumenda, perferendis at nostrum.",
            url: "https://greensock.com/docs/v3/GSAP/gsap.timeline()",
            img: './images/b.jpg',
            type: "Identity",
            technology: "Identity 03"
        },
        {
            name: "Image 03",
            clientName: "Indian School Of Hospitality",
            discription: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam facere, dicta illum dolores adipisci doloremque animi vitae commodi ipsa assumenda, perferendis at nostrum.",
            url: "https://greensock.com/docs/v3/GSAP/gsap.timeline()",
            img: './images/c.jpg',
            type: "Identity",
            technology: "Identity 04"
        }, {
            name: "Image 03",
            clientName: "Srikant Villuri		",
            discription: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam facere, dicta illum dolores adipisci doloremque animi vitae commodi ipsa assumenda, perferendis at nostrum.",
            url: "https://greensock.com/docs/v3/GSAP/gsap.timeline()",
            img: './images/d.jpg',
            type: "Identity",
            technology: "Identity 05"
        },
        {
            name: "Image 03",
            clientName: "Ravebizz Solutions",
            discription: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam facere, dicta illum dolores adipisci doloremque animi vitae commodi ipsa assumenda, perferendis at nostrum.",
            url: "https://greensock.com/docs/v3/GSAP/gsap.timeline()",
            img: './images/e.jpg',
            type: "Identity",
            technology: "Identity 06"
        },
    ];
    var i = 0;
    const pp = document.getElementById("prev2");
    pp.addEventListener("click", (event) => {
        event.preventDefault();
        if (i <= 0) i = data.length;
        i--;
        return setData();

    });
    const nn = document.getElementById("next2");
    nn.addEventListener("click", (event) => {
        event.preventDefault();
        if (i >= data.length - 1) i = -1;
        i++;
        return setData();

    });

    function setData() {
        //gsap.timeline({onComplete: myFunction, repeat: 2, repeatDelay: 1, yoyo: true});
        var tl = gsap.timeline({ defaults: { duration: 0.5, ease: 'power4.easeIn' } });
        tl
            .to(slider_img, { x: -20, opacity: 0 },'-=0.2')
            .to(slider_name, { y: -20, opacity: 0 },'-=0.3')
            .to(slider_type, { y: -20, opacity: 0 },'-=0.3')
            .to(slider_tec, { y: -20, opacity: 0 },'-=0.3')
            .to(slider_btn, { y: -20, opacity: 0 },'-=0.3')
            .to(slider_dis, { y: -20, opacity: 0 },'-=0.3')
            ;

        return setTimeout(function () {
            tl.reverse();
            // slider_img.setAttribute('src', "images/" + data[i].img);
            slider_img.style.backgroundImage = "url("+data[i].img+")";
            slider_btn.setAttribute('href', data[i].url);
            slider_name.innerHTML = data[i].clientName;
            slider_type.innerHTML = data[i].type;
            slider_tec.innerHTML = data[i].technology;
            slider_dis.innerHTML = data[i].discription;
            // dd.innerHTML = HTML;
        }, 2000);
    }

}

export default brandingScript;