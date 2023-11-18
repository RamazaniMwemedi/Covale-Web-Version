import axios from "axios";
import config from "../config/index";
const baseUrl = config.SERVER_ADDRESS;

const sendMessege = async (
  friendId: string,
  token: string,
  messege: string
) => {
  const response = await axios.post(
    `${baseUrl}/api/v1/messege`,
    { messege, friendId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// const sendMessageChatRoom = async (chatRoomId, token, message, userId) => {};

module.exports = {
  sendMessege,
  // sendMessageChatRoom,
};
