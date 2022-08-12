const io = require("socket.io-client");

const axios = require("axios");
const baseUrl = "https://covalnt.herokuapp.com";

const socket = io.connect(`http://localhost:3001`);

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

const sendMessageChatRoom = async (chatRoomId, token, message, userId) => {
  socket.emit("send_message", { message, chatRoomId, userId });
};

module.exports = {
  sendMessege,
  sendMessageChatRoom,
};
