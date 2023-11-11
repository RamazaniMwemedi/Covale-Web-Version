// URLs object
const URLS = {
  // Production URL
  prodServerURL: "https://covale.onrender.com",
  prodRtcURL: "https://covalertc.onrender.com",
  prodSecuritySerURL: "https://covatesecurity.onrender.com",
  // Development URL
  devServerURL: "http://localhost:5005",
  devRtcURL: "http://localhost:5055",
  devSecuritySerURL: "http://localhost:5006",
  // Secrete server url
};
module.exports = {
  SERVER_ADDRESS: URLS.devServerURL,
  RTC_ADDRESS: URLS.devRtcURL,
  SECRETE_SERVER_ADDRESS: URLS.devSecuritySerURL,
};
