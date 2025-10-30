import './style.css';
import * as apiControl from './apiControl.js';

let location = 'los angeles';
location = apiControl.encodeLocation(location);

let date1 = new Date();
date1 = apiControl.encodeDate(date1);

let date2 = (() => {
  const d = new Date();
  d.setDate(d.getDate() + 2);
  return d;
})();
date2 = apiControl.encodeDate(date2);

apiControl.fetchRawData(location, date1, date2)
