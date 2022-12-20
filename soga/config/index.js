// URLs object
const URLS = {
  // Production URL
  prodSerURL: "https://covale.herokuapp.com",
  prodRtcURL: "https://rtcommunication.herokuapp.com",
  // Development URL
  devSerURL: "http://localhost:5005",
  devRtcURL: "http://localhost:5055",
};

const SERVER_ADDRESS = URLS.prodSerURL;
const RTC_ADDRESS = URLS.prodRtcURL;
module.exports = {
  SERVER_ADDRESS,
  RTC_ADDRESS,
};
