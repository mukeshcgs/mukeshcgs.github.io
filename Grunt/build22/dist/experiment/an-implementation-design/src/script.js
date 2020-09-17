const parent = document.querySelector('main');
const details = [...document.querySelectorAll('article > .layer')];

function showDetails(optionNr) {
  parent.classList.add('hide');
  details[optionNr - 1].classList.add('show');
}

function hideDetails() {
  parent.classList.remove('hide');
  details.forEach(layer => {
    layer.classList.remove('show');
  });
}