import './style.css';
import * as coreControl from './coreControl.js';

async function run() {
  let inF = await coreControl.getWeatherData('los angeles');
  console.log(inF); // doesn't print in f for some reason

  let inC = coreControl.swapTempUnitTo('c');
  console.log(inC);
}

run();