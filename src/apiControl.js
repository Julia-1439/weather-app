/**
 * Handles the API calls to Visual Crossing Weather API and provides utility 
 * functions to construct the URL. 
 * @module apiControl
 * @see https://www.visualcrossing.com/resources/documentation/weather-api/timeline-weather-api/
 */

import { format as dateFormatter } from "date-fns";

const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';
const KEY = 'QUBGK9LW8JFXX56B6NN3TH3M4';

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