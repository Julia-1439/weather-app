import './style.css';
import * as coreControl from './coreControl.js';

async function run() {
  const location = 'los angelfa3 dff34 f43g fgdffsdfdses';
  const inF = await coreControl.getWeatherData(location)
    .then(console.log) // doesn't print in f for some reason
    .catch((error) => { console.log(error.message) });

  // const inC = coreControl.swapTempUnitTo('c');
  // console.log(inC);
}

run();