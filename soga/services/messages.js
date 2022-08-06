const axios = require("axios");
const baseUrl = "https://covalnt.herokuapp.com";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

const sendMessege = async (friendId, token, messege) => {
  socket.emit("send_message", { message, room });

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

const sendMessageChatRoom = async (chatRoomId, token, message) => {
  if (chatRoomId !== "") {
    socket.emit("join_room", chatRoomId);
    console.log(`User joined room: ${chatRoomId}`);
  }

  socket.emit("send_message", { message, chatRoomId });

  const response = await axios.post(
    `${baseUrl}/api/messege/chatroom/${chatRoomId}`,
    { message },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

module.exports = {
  sendMessege,
  sendMessageChatRoom,
};
