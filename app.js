const yargs = require('yargs');

const getWeatherInfo = require('./geocode/geocode');
const weatherInfo = require('./geocode/weatherInfo');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch the weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

getWeatherInfo.getWeather(argv.a, (errorMessage, results) => {
  if(errorMessage){
    console.log(errorMessage);
  }
  else{
    console.log("-----");
    console.log(`Address: ${results.address}`);
    console.log(`Latitude: ${results.latitude}`);
    console.log(`Longitude: ${results.longitude}`);

    var coordinates = {
      lat: results.latitude,
      lgd: results.longitude
    };

    weatherInfo.temperatureFinder(coordinates, (errorMessage, results) =>{
      if(errorMessage){
        console.log(errorMessage);
      }
      else{
        console.log(`The weather is currently ${results.weatherSummary}`);
        console.log(`Current temperature: ${results.temperature} celsius`);
      }
    });


  }
});
