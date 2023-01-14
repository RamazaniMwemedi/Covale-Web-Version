const { useEffect, useState } = require("react");
// React-Redux hooks
const { useDispatch, useSelector } = require("react-redux");
const io = require("socket.io-client");

const { addNewMessageToChatIdFromSender } = require("../Redux/slices/chat");
const { RTC_ADDRESS } = require("../config");
// Socket.IO
// https://rtcommunication.herokuapp.com/
// http://localhost:5005/

const chatSocket = io.connect(`${RTC_ADDRESS}/chat`);

const useChatId = (id) => {
  const allChats = useSelector((state) => state.chats);
  const [chat, setChat] = useState(null);
  useEffect(() => {
    if (allChats.chats) {
      if (allChats.chats.length > 0 && id) {
        setChat(allChats.chats.find((chat) => chat.id === id));
      }
    }
  }, [allChats, id]);

  return chat;
};

const useJoinChatRoom = (id) => {
  useEffect(() => {
    if (id) {
      chatSocket.emit("join_room", id);
    }
  }, [id]);
};

const useRecieveNewChatMessage = (user, userId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (userId) {
      chatSocket.on("receive_message", (data) => {
        if (data && data.sender != userId) {
          dispatch(
            addNewMessageToChatIdFromSender({
              chatId: data.chatRoom,
              data: [data],
            })
          );
        }
      });
    }
  }, [chatSocket, user]);
};
module.exports = {
  useChatId,
  useJoinChatRoom,
  useRecieveNewChatMessage,
};
