import loadingAnimation from './assets/loading.gif';

const container = document.querySelector('form .loading-container');

function render() {
  const img = document.createElement('img');
  img.src = loadingAnimation;
  container.appendChild(img);
}

function remove() {
  container.replaceChildren();
}

export {
  render,
  remove,
};