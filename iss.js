
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

module.exports = { fetchMyIP };
