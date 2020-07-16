const APP_KEY = 'ffa2b0f503f54446b0d77a7cc99187f0';
/* eslint-disable consistent-return,prefer-destructuring */
async function getWeather(city = 'Delhi', unit = 'C') {
  try {
    const data = await fetch(
      `https://api.weatherbit.io/v2.0/current?city=${city}&key=${APP_KEY}${
        unit === 'F' ? '&units=I' : ''
      }`,
    );

    if (data.status === 200) {
      const weather = await data.json();

      return weather.data[0];
    }
  } catch (err) {
    return 'Error';
  }
}

export default getWeather;
