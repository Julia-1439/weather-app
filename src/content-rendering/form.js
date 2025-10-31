import * as coreControl from '../coreControl.js';
import * as loadingAnimation from './loadingAnimation.js';
import * as weatherData from './weatherData.js';

const form = document.querySelector('form');
const errorDisplay = document.querySelector('form .error-msg');

form.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  wipeErrorMessage();

  loadingAnimation.render();
  const location = new FormData(form).get('location');
  const data = await coreControl.getWeatherData(location)
    .then(weatherData.render)
    .catch((error) => renderErrorMessage(error.message))
    .finally(loadingAnimation.remove);

  form.reset();
});

function renderErrorMessage(msg) {
  errorDisplay.textContent = msg;
}

function wipeErrorMessage() { 
  errorDisplay.textContent = '';
}