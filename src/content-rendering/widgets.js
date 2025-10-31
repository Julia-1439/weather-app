import loadingAnimation from './assets/loading.gif';

const switchTempBtn = document.querySelector('#switch-temp-unit');
const loadingContainer = document.querySelector('form .loading-container');

switchTempBtn.addEventListener('click', () => {
  // ...
});

function renderLoadingAnimation() {
  const img = document.createElement('img');
  img.src = loadingAnimation;

  loadingContainer.appendChild(img);
}

function wipeLoadingAnimation() {
  loadingContainer.replaceChildren();
}

export {
  renderLoadingAnimation,
  wipeLoadingAnimation,
};