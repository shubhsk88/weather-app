async function getWeather(city = null) {
  try {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APP_KEY}`
    );
    const weather = await data.json();
    console.log(weather);
  } catch (err) {
    console.log(err);
  }
}

getWeather('London');
