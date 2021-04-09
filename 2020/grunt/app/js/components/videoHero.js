export default class videoHero {
  constructor(el) {
    console.log('videoHero');
    this.el = el;

    this.initVideo();
  }

  initVideo() {
    const video = this.el.querySelector('video');

    var player = new MediaElement(video, {
        features: [],

        success: function (mediaElement, domObject) { 
            mediaElement.addEventListener('ended', function(e) {
                console.log('video ended, go to next slide');
            }, false);

            // call the play method
            console.log('success!!');
            mediaElement.play();
        },
    });
  }
}