let sliderIndex = 0;
const layers = [...document.querySelectorAll('.layer')];

function switchLayer(step = 1) {
  const nextSlide = (sliderIndex + step) % 3;
  for(let i of layers) {
    i.classList.remove('displayed');
    i.classList.remove('displayed-next');
    if(i.dataset.scene == nextSlide + 1) {
      i.classList.add('displayed');
    }
    if(i.dataset.scene == ((nextSlide + 1) % 3) + 1) {
      i.classList.add('displayed-next');
    }
  }
  sliderIndex = nextSlide;
}