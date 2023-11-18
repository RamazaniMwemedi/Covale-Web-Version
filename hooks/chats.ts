import { ChatInterface, RootState } from "../interfaces/myprofile";
import { useEffect, useState } from "react";
// React-Redux hooks
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";

import { addNewMessageToChatIdFromSender } from "../Redux/slices/chat";
import config from "../config";
// Socket.IO
// https://rtcommunication.herokuapp.com/
// http://localhost:5005/
const socketIO: any = io;
const chatSocket = socketIO.connect(`${config.RTC_ADDRESS}/chat`) as any;

export const useChatId = (id: string) => {
  const allChats: {
    chats: ChatInterface[];
  } = useSelector((state: RootState) => state.chats);
  const [chat, setChat] = useState<ChatInterface>();
  useEffect(() => {
    if (allChats.chats) {
      if (allChats.chats.length > 0 && id) {
        setChat(allChats.chats.find((chat) => chat.id === id));
      }
    }
  }, [allChats, id]);

  return chat;
};

export const useJoinChatRoom = (id: string) => {
  useEffect(() => {
    if (id) {
      chatSocket.emit("join_room", id);
    }
  }, [id]);
};

export const useRecieveNewChatMessage = (user: string, userId: string) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (userId) {
      chatSocket.on("receive_message", (data: any) => {
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
const mod = {
  useChatId,
  useJoinChatRoom,
  useRecieveNewChatMessage,
};

export default mod;
