import axios from "axios";
import config from "../config/index";

// Get all chats
const getEventsForCalendar = async (token) => {
  const response = await axios.get(`${config.SERVER_ADDRESS}/api/v1/calendar/event`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Create a new Event
const createNewEventForCalendar = async (token, formData) => {
  const response = await axios.post(
    `${config.SERVER_ADDRESS}/api/v1/calendar/event/new`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export { getEventsForCalendar, createNewEventForCalendar };
