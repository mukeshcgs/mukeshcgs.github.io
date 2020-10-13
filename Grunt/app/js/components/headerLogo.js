export default class HeaderLogo {
  constructor(el) {
    this.el = el;
    this.bindListener();
  }

  bindListener() {
    this.el.addEventListener('click', (e) => {
      e.preventDefault();
      this.clicked();
    })
  }

  clicked() {
    this.deleteIndustryCookie('jcb-user-industry');
    this.navigateToPage();
  }

  deleteIndustryCookie(name) {
    var d = new Date();
    d.setTime(d.getTime() - (1000*60*60*24));
    var expires = "expires=" + d.toGMTString();
    window.document.cookie = name+"="+"; "+expires +"; path=/;";
  }

  navigateToPage() {
    const path = this.el.getAttribute('href');
    const url = `${window.location.protocol}//${window.location.hostname}${path}`

    window.location = url;
  }

}