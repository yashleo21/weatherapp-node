const fs = require('fs');
const request = require('request');

var fetchCred = fs.readFileSync('./geocode/private.json');
var keyObj = JSON.parse(fetchCred);

var temperatureFinder = (coordinates,callback) => {

  request({
    url: `https://api.darksky.net/forecast/${keyObj.weatherKey}/${coordinates.lat},${coordinates.lgd}?exclude=["minutely","hourly","daily","alerts","flags"]&units=auto`,
    json: true
  },(error, response, body) =>{
    if (!error && response.statusCode === 200){
      callback(undefined, {

        temperature: body.currently.temperature,
        weatherSummary: body.currently.summary
      });
    }
    else{
      callback("Unable to fetch weather information.");
    }

  });

};

module.exports = {
  temperatureFinder
}
