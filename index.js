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
    const localtime = new Date(response.location.localtime);
  }
}

showWeather();
