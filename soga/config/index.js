const MSG_RTC_SERVER = process.env.NEXT_PUBLIC_MSG_RTC_SERVER;

// Production URL
const prodSerURL = "https://covale.herokuapp.com/";
const prodRtcURL = "https://rtcommunication.herokuapp.com/";

// Development URL
const devSerURL = "http://localhost:5005";
const devRtcURL = "http://localhost:5055";

const SERVER_ADDRESS = devSerURL;
const RTC_ADDRESS = devRtcURL;
module.exports = {
  MSG_RTC_SERVER,
  SERVER_ADDRESS,
  RTC_ADDRESS,
};
