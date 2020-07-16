import getWeather from './api';

const showCity = document.querySelector('.city');
const showCountry = document.querySelector('.country');
const showStatus = document.querySelector('.status');
const showIcon = document.querySelector('.icon');
const showTemperature = document.querySelector('.temperature');
const showHumidity = document.querySelector('#humidity');
const showPressure = document.querySelector('#pressure');
const search = document.querySelector('.searcher');
const button = document.querySelector('#label-button');
const textInput = document.querySelector('.text-input');

async function showWeather(city = 'Delhi', unit = 'C') {
  const response = await getWeather(city, unit);

  if (response) {
    const city = response.city_name;
    const country = response.country_code;
    const status = response.weather.description;
    const icon = ` https://www.weatherbit.io/static/img/icons/${response.weather.icon}.png`;
    const temperature = Math.floor(response.app_temp);

    const pressure = Math.floor(response.pres);
    const humidity = response.rh;

    const img = document.createElement('img');
    img.src = icon;
    img.classList.add('rounded-full');
    showIcon.innerHTML = '';
    showIcon.appendChild(img);
    showCity.textContent = city;

    showCountry.textContent = country;
    showStatus.textContent = status;
    showTemperature.textContent = `${temperature}º${unit === 'F' ? 'F' : 'C'}`;
    showPressure.textContent = pressure;
    showHumidity.textContent = humidity;
  }
}

search.addEventListener('click', async (event) => {
  if (textInput.value !== '') {
    event.preventDefault();
    await showWeather(textInput.value);
  }
});
button.addEventListener('click', async () => {
  const name = document.querySelector('input[name="toggle"]');
  const last = name.parentElement;

  if (last.classList[7] !== 'bg-gray-400') {
    if (textInput.value !== '') {
      await showWeather(textInput.value, 'C');
    } else await showWeather('Delhi', 'C');
  } else if (textInput.value !== '') {
    await showWeather(textInput.value, 'F');
  } else await showWeather('Delhi', 'F');
});
showWeather();
