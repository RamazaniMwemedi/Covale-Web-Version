// URLs object
const URLS = {
  // Production URL
  prodServerURL: "http://34.244.219.105:5005",
  prodRtcURL: "http://34.244.219.105:5055",
  prodSecuritySerURL: "http://34.244.219.105:5006",
  // Development URL
  devServerURL: "http://localhost:5005",
  devRtcURL: "http://localhost:5055",
  devSecuritySerURL: "http://localhost:5006",
  // Secrete server url
};
const mod = {
  SERVER_ADDRESS: URLS.devServerURL,
  RTC_ADDRESS: URLS.devRtcURL,
  SECRETE_SERVER_ADDRESS: URLS.devSecuritySerURL,
};

export default mod;
