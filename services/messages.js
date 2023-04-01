const axios = require("axios");
const baseUrl = "https://covale.herokuapp.com";

const sendMessege = async (friendId, token, messege) => {
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

const sendMessageChatRoom = async (chatRoomId, token, message, userId) => {};

module.exports = {
  sendMessege,
  sendMessageChatRoom,
};
