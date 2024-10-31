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
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  needle.get(url, (error, response) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${response.body}`), null);
      return;
    }

    const passes = response.body.response;
    callback(null, passes);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };

