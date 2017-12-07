const request = require('request');
const fs = require('fs');

var fetchCred = fs.readFileSync('../geocode/private.json');
var keyObj = JSON.parse(fetchCred);

var geocodeAddress = (address) => {
    return new Promise( (resolve, reject) => {
      request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${keyObj.googleKey}`,
        json: true
      }, (error, response, body) =>{
        if (error){
          reject("Unable to connect to Google servers.");
        }
        else if(body.status === 'ZERO_RESULTS'){
          reject('Could not find the address');
        }
        else if(body.status === 'OK'){
          resolve({
            addr: body.results[0].formatted_address,
            lat: body.results[0].geometry.location.lat,
            lgd: body.results[0].geometry.location.lng
          });
        }
      });
    });
};

geocodeAddress('Mall Avenue Lucknow').then((addrObj)=> {
  console.log(JSON.stringify(addrObj, undefined, 2));
}, (errorMessage) => {
  console.log(errorMessage);
});
