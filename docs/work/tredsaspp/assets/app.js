function closeMenuAndGoTo(query) {
  document.querySelector('#hero-menu').classList.toggle('ft-menu--js-show')
  setTimeout(() => {
    const element = document.querySelector(query)
    window.scrollTo({
      top: element.getBoundingClientRect().top,
      behavior: 'smooth'
    })
  }, 250);
}

document.querySelector('#hero-menu').
  querySelectorAll('[href]').
  forEach(function (link) {
    link.onclick = function (event) {
      event.preventDefault()
      closeMenuAndGoTo(link.getAttribute('href'))
    }
  })

window.onscroll = function () { myFunction() };

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

$( document ).ready(function() {

  $(document).on('click', 'a[href^="#"]', function (e) {
    // target element id
    var id = $(this).attr('href');
console.log(id);
    // target element
    var $id = $(id);
    if ($id.length === 0) {
      return;
    }

    // prevent standard hash navigation (avoid blinking in IE)
    e.preventDefault();

    // top position relative to the document
    var pos = $id.offset().top;

    // animated top scrolling
    $('body, html').animate({ scrollTop: pos });
  });
    console.log( "ready!" );
});