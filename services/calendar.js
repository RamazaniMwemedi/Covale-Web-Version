import axios from "axios";
import { SERVER_ADDRESS } from "../config/index";

// Get all chats
const getEventsForCalendar = async (token) => {
  const response = await axios.get(`${SERVER_ADDRESS}/api/v1/calendar/event`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Create a new Event
const createNewEventForCalendar = async (token, formData) => {
  const response = await axios.post(
    `${SERVER_ADDRESS}/api/v1/calendar/event/new`,
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
