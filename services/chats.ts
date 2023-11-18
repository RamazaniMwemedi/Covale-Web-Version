import axios from "axios";
import config from "../config/index";
// http://localhost:3000/
const sendMessege = async (token: string, id: string, formData: FormData) => {
  const response = await axios.post(
    `${config.SERVER_ADDRESS}/api/v1/chats/message/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const sendMessageToColleague = async (
  token: string,
  colleaguesId: string,
  message: string
) => {
  const response = await axios.post(
    `${config.SERVER_ADDRESS}/api/v1/chats/message/colleague/${colleaguesId}`,
    {
      message,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Get all chats
const getChats = async (token: string) => {
  const response = await axios.get(`${config.SERVER_ADDRESS}/api/v1/chats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getChatById = async (token: string, id: string) => {
  const response = await axios.get(
    `${config.SERVER_ADDRESS}/api/v1/chats/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const mod = {
  sendMessege,
  sendMessageToColleague,
  getChats,
  getChatById,
};

export default mod;
