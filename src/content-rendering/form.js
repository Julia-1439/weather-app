import * as coreControl from '../coreControl.js';
import * as widgets from './widgets.js';
import * as weatherData from './weatherData.js';

const form = document.querySelector('form');
const errorDisplay = document.querySelector('form .error-msg');

form.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  wipeErrorMessage();

  widgets.renderLoadingAnimation();
  const location = new FormData(form).get('location');
  const data = await coreControl.getWeatherData(location)
    .then((data) => {
      weatherData.wipeContainer();
      data.forEach(weatherData.renderDay);
    })
    .catch((error) => renderErrorMessage(error.message))
    .finally(widgets.wipeLoadingAnimation);

  form.reset();
});

function renderErrorMessage(msg) {
  errorDisplay.textContent = msg;
}

function wipeErrorMessage() { 
  errorDisplay.textContent = '';
}