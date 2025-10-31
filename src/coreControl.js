import * as apiControl from './apiControl.js';

const currData = [];

function postWeatherData(data) {
  currData.length = 0;
  data.forEach((day) => currData.push(day));
}

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
  const processedData = rawData.days.map(processDayData);

  postWeatherData(processedData);
  return readWeatherData();

  function processDayData(data) {
    const desiredProps = ['datetime', 'tempmax', 'tempmin', 'precip', 'precipprob', 'description', 'icon'];
    const processedData = Object.fromEntries(
      Object.entries(data).filter(([key, _]) => desiredProps.includes(key))
    ); // filter the day's data based on `desiredProps`

    return processedData;
  }
}

function swapTempUnitTo(unit) {
  const data = readWeatherData();
  const converter = {
    'c': convertToCelsius,
    'f': convertToFahrenheit,
  }[unit];

  data.forEach((day) => {
    day.tempmax = converter(day.tempmax);
    day.tempmin = converter(day.tempmin);
  });

  postWeatherData(data);
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