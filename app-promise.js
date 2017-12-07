const yargs = require('yargs');
const fs = require('fs');
const axios = require('axios');

var fetchCred = fs.readFileSync('./geocode/private.json');
var keyObj = JSON.parse(fetchCred);

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

var encodedAddress = encodeURIComponent(argv.address);
geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${keyObj.googleKey}`;

axios.get(geocodeUrl).then( (response) => {
  if(response.data.status === 'ZERO_RESULTS'){
      throw new Error('Unable to find that address');
  }

  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  var weatherUrl = `https://api.darksky.net/forecast/${keyObj.weatherKey}/${lat},${lng}?exclude=["minutely","hourly","daily","alerts","flags"]&units=auto`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then( (response) =>{
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`It's currently ${temperature} celsius. It feels like ${apparentTemperature} celsius.`);
})
.catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect to API servers.');
  }
  else {
    console.log(e.message);
  }

});
