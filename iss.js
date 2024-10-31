
const needle = require('needle');

const fetchMyIP = function(callback) {
  const url = 'https://api.ipify.org?format=json';

  needle.get(url, (error, response) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${response.body}`), null);
      return;
    }

    const ip = response.body.ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {

  console.log(`Fetching coordinates for IP: ${ip}`);

  callback(null, { latitude: 40.7128, longitude: -74.0060 }); // Example coordinates
}

module.exports = { fetchMyIP, fetchCoordsByIP };
