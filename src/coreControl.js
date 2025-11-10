/**
 * The skeleton of the app - what you would see if the display/CSS were wiped 
 * away. Holds the last fetched weather data and defines the interactive 
 * features of the app. 
 * @module coreControl
 */

import * as apiControl from './apiControl.js';

let currData = {};
const NUM_DAYS_IN_ADVANCE = 2;

/**
 * 
 * @returns {Array} a copy of the current data in storage
 */
function readWeatherData() {
  return {...currData};
}

/**
 * 
 * @param {String} location, can take straight from the form in raw form
 * @returns {Array} a copy of the weather data fetched
 */
async function getWeatherData(location) {
  location = apiControl.encodeLocation(location);
  
  let date1 = new Date();
  let date2 = new Date().setDate(new Date().getDate() + NUM_DAYS_IN_ADVANCE);
  [date1, date2] = [date1, date2].map(apiControl.encodeDate);
  
  const rawData = await apiControl.fetchData(location, date1, date2)
    .catch((error) => { 
      throw new Error(error.message); 
    });
  const processedData = processData(rawData);

  currData = {...processedData};
  return readWeatherData();

  function processData(rawData) {
    const processedData = {};
    processedData.resolvedAddress = rawData.resolvedAddress;
    processedData.days = rawData.days.map((dayData) => {
      const desiredProps = ['datetime', 'tempmax', 'tempmin', 'precip', 'precipprob', 'description', 'icon'];
      let working;
      working = Object.fromEntries( // filter the day's data based on `desiredProps`
        Object.entries(dayData).filter(([key, _]) => desiredProps.includes(key))
      ); 
      working.tempunit = 'f';
      return working;
    });

    return processedData;
  }
}

/**
 * 
 * @param {String} unit, 'f' or 'c' 
 * @returns {Array | undefined} a copy of the converted weather data, or 
 * undefined if there's no data to work on or if current data is already in said
 * unit. 
 */
function swapTempUnitTo(unit) {
  if (Object.entries(currData).length === 0) 
    return;
  if (currData.days[0].tempunit === unit) 
    return;
  
  const converter = {
    'c': convertToCelsius,
    'f': convertToFahrenheit,
  }[unit];
  currData.days.forEach((day) => {
    day.tempmax = converter(day.tempmax);
    day.tempmin = converter(day.tempmin);
    day.tempunit = unit;
  });

  return readWeatherData();

  function convertToCelsius(tempF) {
    const roundingFactor = 10;
    return Math.round(
      ((tempF - 32) * 5/9) * roundingFactor
    ) / roundingFactor;
  }

  function convertToFahrenheit(tempC) {
    const roundingFactor = 10;
    return Math.round(
      (tempC * 9/5 + 32) * roundingFactor
    ) / roundingFactor;
  }
}

export {
  getWeatherData,
  swapTempUnitTo,
};