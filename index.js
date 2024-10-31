const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("Error fetching IP:", error);
    return;
  }

  fetchCoordsByIP(ip, (error, coords) => {
    if (error) {
      console.log("Error fetching coordinates:", error);
      return;
    }

    fetchISSFlyOverTimes(coords, (error, passes) => {
      if (error) {
        console.log("Error fetching ISS flyover times:", error);
        return;
      }

      console.log("Flyover times:", passes);
    });
  });
});

