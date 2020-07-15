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
    const img = document.createElement('img');
    img.src = icon;
    img.classList.add('rounded-full');
    showIcon.innerHTML = '';
    showIcon.appendChild(img);
    showCity.textContent = city;

    showCountry.textContent = country;
    showStatus.textContent = status;
    showTemperature.textContent = temperature;
    showPressure.textContent = pressure;
    showHumidity.textContent = humidity;
    showTime.textContent = localtime[1];
  }
}
search.addEventListener('click', async (event) => {
  const textInput = document.querySelector('.text-input').value;
  event.preventDefault();

  if (textInput !== '') {
    await showWeather(textInput);
  }
});

showWeather();
