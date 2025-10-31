import * as coreControl from '../coreControl.js';
import { renderLoadingAnimation, wipeLoadingAnimation } from './widgets.js';

const form = document.querySelector('form');
const errorDisplay = document.querySelector('form .error-msg');

form.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  wipeErrorMessage();

  renderLoadingAnimation();
  const location = new FormData(form).get('location');
  const data = await coreControl.getWeatherData(location)
    .catch((error) => renderErrorMessage(error.message))
    .finally(wipeLoadingAnimation);

  form.reset();
});

function renderErrorMessage(msg) {
  errorDisplay.textContent = msg;
}

function wipeErrorMessage() { 
  errorDisplay.textContent = '';
}