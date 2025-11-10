import { format as dateFormatter } from 'date-fns';
import * as coreControl from '../coreControl.js';

const resolvedAddress = document.querySelector('#resolved-address');
const container = document.querySelector('#weather-cards-container');
const fTempBtn = document.querySelector('#f-temp-btn');
const cTempBtn = document.querySelector('#c-temp-btn');

fTempBtn.addEventListener('click', () => {
  const data = coreControl.swapTempUnitTo('f');
  if (data) 
    render(data);
});

cTempBtn.addEventListener('click', () => {
  const data = coreControl.swapTempUnitTo('c');
  if (data) 
    render(data);
});

async function render(data) {
  container.replaceChildren();
  resolvedAddress.textContent = `Forecast for: ${data.resolvedAddress}`;
  data.days.forEach(async (dayData) => renderDay(dayData));  
}

async function renderDay(data) {
  console.log(data);
  const card = document.createElement('div');
  card.classList.add('weather-card');

  const header = document.createElement('div')
  header.classList.add('header');
  const date = document.createElement('p');
  date.classList.add('date');
  date.textContent = data.datetime + dateFormatter(data.datetime, ', EEEE');

  const middle = document.createElement('div');
  middle.classList.add('middle');
  const iconContainer = document.createElement('div');
  iconContainer.classList.add('icon-container');
  const icon = document.createElement('img');
  icon.classList.add('icon');
  const {default: imgURL} = await import(`./assets/icons/${data.icon}.png`);
  icon.src = imgURL;
  const stats = document.createElement('div');
  stats.classList.add('stats');
  const tempMaxContainer = document.createElement('div');
  tempMaxContainer.classList.add('maxtemp')
  const tempMaxPara = document.createElement('p');
  tempMaxPara.classList.add('stat-header');
  tempMaxPara.textContent = 'Max';
  const tempMax = document.createTextNode(data.tempmax + (data.tempunit === 'f' ? '°F' : '°C'));
  const tempMinContainer = document.createElement('div');
  tempMinContainer.classList.add('mintemp')
  const tempMinPara = document.createElement('p');
  tempMinPara.classList.add('stat-header');
  tempMinPara.textContent = 'Min';
  const tempMin = document.createTextNode(data.tempmin + (data.tempunit === 'f' ? '°F' : '°C'));
  const precipContainer = document.createElement('div');
  precipContainer.classList.add('precip');
  const precipPara = document.createElement('p');
  precipPara.classList.add('stat-header');
  precipPara.textContent = 'Rain';
  const precip = document.createTextNode(data.precip + ' in');
  const precipProbContainer = document.createElement('div');
  precipProbContainer.classList.add('precipprob');
  const precipProbPara = document.createElement('p');
  precipProbPara.classList.add('stat-header');
  precipProbPara.textContent = 'Precip %';
  const precipProb = document.createTextNode(data.precipprob + ' %');
  
  const footer = document.createElement('div');
  footer.classList.add('footer');
  const description = document.createElement('p');
  description.classList.add('description');
  description.textContent = data.description;

  header.append(date);
  middle.append(iconContainer, stats);
  iconContainer.append(icon);
  stats.append(tempMaxContainer, tempMinContainer, precipContainer, precipProbContainer);
  tempMaxContainer.append(tempMaxPara, tempMax);
  tempMinContainer.append(tempMinPara, tempMin);
  precipContainer.append(precipPara, precip);
  precipProbContainer.append(precipProbPara, precipProb);
  footer.append(description);
  card.append(header, middle, footer);
  container.append(card);
}

export {
  render,
};