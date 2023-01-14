const axios = require("axios");
const { SERVER_ADDRESS } = require("../config/index");
// http://localhost:3000/
const sendMessege = async (token, id, formData) => {
  const response = await axios.post(
    `${SERVER_ADDRESS}/api/chats/message/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Get all chats
const getChats = async (token) => {
  const response = await axios.get(`${SERVER_ADDRESS}/api/chats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getChatById = async (token, id) => {
  const response = await axios.get(`${SERVER_ADDRESS}/api/chats/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

module.exports = {
  sendMessege,
  getChats,
  getChatById,
};
