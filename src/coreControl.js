import * as apiControl from './apiControl.js';

let currData = [];

function readWeatherData() {
  return [...currData];
}

async function getWeatherData(location) {
  location = apiControl.encodeLocation(location);
  
  let date1 = new Date();
  let date2 = new Date().setDate(new Date().getDate() + 2); // 2 days from now
  [date1, date2] = [date1, date2].map(apiControl.encodeDate);
  
  const rawData = await apiControl.fetchData(location, date1, date2)
    .catch((error) => { 
      throw new Error(error.message); 
    });
  const processedData = processData(rawData);

  currData = [...processedData];
  return readWeatherData();

  function processData(rawData) {
    const desiredProps = ['datetime', 'tempmax', 'tempmin', 'precip', 'precipprob', 'description', 'icon'];
    const processedData = rawData.days.map((dayData) => {
      let working;
      working = Object.fromEntries( // filter the day's data based on `desiredProps`
        Object.entries(dayData).filter(([key, _]) => desiredProps.includes(key))
      ); 
      working.tempunit = 'f';
      return working;
    })

    return processedData;
  }
}

function swapTempUnitTo(unit) {
  if (currData.length === 0) 
    return;
  if (currData[0].tempunit === unit) 
    return;
  
  const converter = {
    'c': convertToCelsius,
    'f': convertToFahrenheit,
  }[unit];
  currData.forEach((day) => {
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