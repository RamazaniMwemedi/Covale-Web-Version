// URLs object
const URLS = {
  // Production URL
  prodSerURL: "https://covale.herokuapp.com",
  prodRtcURL: "https://rtcommunication.herokuapp.com",
  prodSecSerURL: "https://covale-secrete.herokuapp.com",
  // Development URL
  devSerURL: "http://localhost:5005",
  devRtcURL: "http://localhost:5055",
  devSecSerURL: "http://localhost:5006",
  // Secrete server url
};
module.exports = {
  SERVER_ADDRESS: URLS.devSerURL,
  RTC_ADDRESS: URLS.devRtcURL,
  SECRETE_SERVER_ADDRESS: URLS.devSecSerURL,
};
