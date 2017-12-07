const fs = require('fs');
const request = require('request');

var fetchCred = fs.readFileSync('./geocode/private.json');
var keyObj = JSON.parse(fetchCred);

var getWeather = (address, callback) => {
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${keyObj.googleKey}`,
    json: true
  },(error, response, body) =>{

    if (error){

      callback("Unable to connect to Google servers. Please try again.");
    }
    else if(body.status === 'ZERO_RESULTS'){

      callback("Unable to find the address.");
    }
    else if(body.status === 'OK'){

      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
    }
  });
};

module.exports = {
  getWeather
};
