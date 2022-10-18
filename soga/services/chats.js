import axios from "axios";
const baseUrl = "https://covale.herokuapp.com";
// http://localhost:3000/
const sendMessege = async (friendId, token, messege) => {
  const response = await axios.post(
    `${baseUrl}/api/messege`,
    { messege, friendId },
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
  const response = await axios.get(`${baseUrl}/api/chats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getChatById = async (token, id) => {
  const response = await axios.get(`${baseUrl}/api/chats/${id}`, {
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
