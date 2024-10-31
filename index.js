
const { fetchMyIP, fetchCoordsByIP } = require('./iss');

// First, fetch the IP address
fetchMyIP((error, ip) => {
  if (error) {
    console.log("Error fetching IP:", error);
    return; // Exit if there's an error
  }
  
  console.log("IP Address:", ip); // Log the fetched IP

  // Now fetch the coordinates using the fetched IP
  fetchCoordsByIP(ip, (error, data) => {
    console.log("Error:", error);
    console.log("Data:", data);
  });
});
