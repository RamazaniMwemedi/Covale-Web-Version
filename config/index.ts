// URLs object
const URLS = {
  // Production URL
  prodServerURL: "https://covale.onrender.com",
  prodRtcURL: "https://covale-rtc-server.onrender.com",
  prodSecuritySerURL: "https://covale-security-server.onrender.com",
  // Development URL
  devServerURL: "http://localhost:5005",
  devRtcURL: "http://localhost:5055",
  devSecuritySerURL: "http://localhost:5006",
  // Secrete server url
};
const mod = {
  SERVER_ADDRESS: URLS.prodServerURL,
  RTC_ADDRESS: URLS.prodRtcURL, 
  SECRETE_SERVER_ADDRESS: URLS.prodSecuritySerURL,
};

export default mod;
