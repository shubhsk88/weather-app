async function getWeather(city = 'London') {
  try {
    const data = await fetch(
      `http://api.weatherstack.com/current?access_key=${APP_KEY}&query=${city}`
    );
    if (data.status === 200) {
      const weather = await data.json();

      return weather;
    }
  } catch (err) {
    console.log(err);
  }
}

function msToTime(duration) {
  let minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  let timezone;
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  timezone = hours > 12 ? 'P.M.' : 'A.M.';
  return hours + ':' + minutes + ' ' + timezone;
}
const showCity = document.querySelector('.city');
const showCountry = document.querySelector('.country');
const showTime = document.querySelector('.time');
const showStatus = document.querySelector('.status');
const showIcon = document.querySelector('.icon');
const showTemperature = document.querySelector('.temperature');
const showHumidity = document.querySelector('#humidity');
const showPressure = document.querySelector('#pressure');
const search = document.querySelector('.searcher');
const button = document.querySelector('#label-button');
const check = document.querySelector('input[name="toggle"]');
let temperatureCheck;
async function showWeather(city) {
  const response = await getWeather(city);

  if (response) {
    const city = response.location.name;
    const country = response.location.country;
    const status = response.current.weather_descriptions[0];
    const icon = response.current.weather_icons[0];
    const temperature = response.current.temperature;
    const pressure = response.current.pressure;
    const humidity = response.current.humidity;
    const localtime = response.location.localtime.split(' ');
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
    showTime.textContent = localtime[1];
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
