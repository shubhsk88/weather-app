const APP_KEY = 'ffa2b0f503f54446b0d77a7cc99187f0';
/* eslint-disable consistent-return,prefer-destructuring */
async function getWeather(city = 'Delhi') {
  try {
    const data = await fetch(
      `https://api.weatherbit.io/v2.0/current?city=${city}&key=${APP_KEY}`,
    );
    if (data.status === 200) {
      const weather = await data.json();

      return weather.data[0];
    }
  } catch (err) {
    return 'Error';
  }
}

const showCity = document.querySelector('.city');
const showCountry = document.querySelector('.country');
const showStatus = document.querySelector('.status');
const showIcon = document.querySelector('.icon');
const showTemperature = document.querySelector('.temperature');
const showHumidity = document.querySelector('#humidity');
const showPressure = document.querySelector('#pressure');
const search = document.querySelector('.searcher');
const button = document.querySelector('#label-button');

let temperatureCheck;
async function showWeather(city) {
  const response = await getWeather(city);

  if (response) {
    const city = response.city_name;
    const country = response.country_code;
    const status = response.weather.description;
    const icon = ` https://www.weatherbit.io/static/img/icons/${response.weather.icon}.png`;
    const temperature = Math.floor(response.app_temp);

    const pressure = Math.floor(response.pres);
    const humidity = response.rh;

    temperatureCheck = temperature;
    const img = document.createElement('img');
    img.src = icon;
    img.classList.add('rounded-full');
    showIcon.innerHTML = '';
    showIcon.appendChild(img);
    showCity.textContent = city;

    showCountry.textContent = country;
    showStatus.textContent = status;
    showTemperature.textContent = `${temperature}ºC`;
    showPressure.textContent = pressure;
    showHumidity.textContent = humidity;
  }
}

function converter(celsius) {
  return (9 / 5) * celsius + 32;
}
search.addEventListener('click', async (event) => {
  const textInput = document.querySelector('.text-input').value;

  if (textInput !== '') {
    event.preventDefault();
    await showWeather(textInput);
  }
});
button.addEventListener('click', () => {
  const name = document.querySelector('input[name="toggle"]');
  const last = name.parentElement;

  if (last.classList[7] === 'bg-gray-400') {
    const fahreneit = converter(temperatureCheck);
    showTemperature.textContent = '';
    showTemperature.textContent = `${fahreneit} ºF`;
  } else {
    showTemperature.textContent = '';
    showTemperature.textContent = `${temperatureCheck}ºC`;
  }
});
showWeather();
