
import gsap from 'gsap';
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
const workScript2 = (container) => {

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
            discription: "a multi-disciplinary design studio based out of Mumbai, India. Work on design solutions to help your business grow multiple folds.",
            url: "https://greensock.com/docs/v3/GSAP/gsap.timeline()",
            img: '/images/a.jpg',
            type: "Website",
            technology: "Wordpress 01"
        },
        {
            name: "Image 02",
            clientName: "Amfah India",
            discription: "AMFAH India, an industry leader in air treatment products, is a group company from AMFAH General LLC Dubai. The 12-year-old company has introduced many such products to India, including domestic/commercial dehumidifiers, air purifiers and portable air conditioners.",
            url: "https://greensock.com/docs/v3/GSAP/gsap.timeline()",
            img: '/images/b.jpg',
            type: "Website",
            technology: "Wordpress"
        },
        {
            name: "Image 03",
            clientName: "Indian School Of Hospitality",
            discription: "We’re proud to be a college founded by the industry, for the industry. This means we understand the needs of the industry – and can create talented professionals who can flourish in numerous streams of the landscape.",
            url: "https://greensock.com/docs/v3/GSAP/gsap.timeline()",
            img: '/images/c.jpg',
            type: "Website",
            technology: "Wordpress 03"
        }, {
            name: "Image 03",
            clientName: "Srikant Villuri		",
            discription: "As a kid I was mesmerized by the magic of cinema and the art of story telling. To give a nudge to the art of storytelling, joined the premium - Film and Television Institute of India, Pune.",
            url: "https://greensock.com/docs/v3/GSAP/gsap.timeline()",
            img: '/images/d.jpg',
            type: "Website",
            technology: "Wordpress 03"
        },
        {
            name: "Image 03",
            clientName: "Ravebizz Solutions",
            discription: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam facere, dicta illum dolores adipisci doloremque animi vitae commodi ipsa assumenda, perferendis at nostrum? Nam reiciendis adipisci ad sint, minus error!",
            url: "https://greensock.com/docs/v3/GSAP/gsap.timeline()",
            img: '/images/e.jpg',
            type: "Website",
            technology: "Wordpress 03"
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
        let img = document.getElementsByTagName('img')
        let text = document.getElementsByTagName('p')
        //gsap.timeline({onComplete: myFunction, repeat: 2, repeatDelay: 1, yoyo: true});
        var tl = gsap.timeline({ defaults: { duration: 1, ease: 'power4.easeInOut' } });
        tl
            .to(slider_img, { x: -20, opacity: 0 })
            .to(slider_name, { y: -20, opacity: 0 })
            .to(slider_type, { y: -20, opacity: 0 })
            .to(slider_tec, { y: -20, opacity: 0 })
            .to(slider_btn, { y: -20, opacity: 0 })
            .to(slider_dis, { y: -20, opacity: 0 })
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

export default workScript2;