/**
 * @module 
 * @see https://www.visualcrossing.com/resources/documentation/weather-api/timeline-weather-api/
 * 
 * Design choices: leave up the 3 day span thing to coreControl as that's more of an app-specific thing than an api thing
 */

import { format as dateFormatter } from "date-fns";

const KEY = 'QUBGK9LW8JFXX56B6NN3TH3M4';
const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

/**
 * 
 * @param {String} location pre-processed with encodeLocation
 * @param {String} date1 optional Date object pre-processed with encodeDate
 * @param {String} date2 optional Date object pre-processed with encodeDate. Should only
 * be provided if `date1` is also provided
 */
async function fetchData(location, date1 = '', date2 = '') {
  // request the api
  const url = BASE_URL
    + `/${location}` 
    + (date1 && `/${date1}`)
    + (date2 && `/${date2}`)
    + `?key=${KEY}`;
    
  const response = await fetch(url);
  if (!response.ok) {
    const errorMsg = await response.text();
    throw new Error(`${response.status}: ${errorMsg}`);
  }
  const rawData = await response.json();
  return rawData;
}

/**
 * 
 * @param {String} location 
 * @returns 
 */
function encodeLocation(location) {
  return encodeURIComponent(location);
}

/**
 * 
 * @param {Date} date 
 * @returns 
 */
function encodeDate(date) {
  return dateFormatter(date, 'yyyy-MM-dd');
}

export { 
  fetchData,
  encodeLocation,
  encodeDate,
};