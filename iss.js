
const needle = require('needle');

// Function to fetch IP address
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

// Function to fetch coordinates by IP address
const fetchCoordsByIP = function(ip, callback) {
  const url = `https://ipwho.is/${ip}`;

  needle.get(url, (error, response) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (!response.body.success) {
      callback(Error(`Success status was ${response.body.success}. Server message: ${response.body.message}`), null);
      return;
    }

    const { latitude, longitude } = response.body;
    callback(null, { latitude, longitude });
  });
};

// Function to fetch ISS flyover times by coordinates
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

// Orchestrates the three previous functions in order
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(coords, (error, passes) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, passes);
      });
    });
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };
