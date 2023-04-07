import { createSlice } from "@reduxjs/toolkit";

const initialChatsState = {};

const chatSlice = createSlice({
  name: "chats",
  initialState: initialChatsState,
  reducers: {
    allChats(state, { payload }) {
      if (payload) {
        state.chats = payload;
      }
    },
    addNewMessageToChatId(state, { payload }) {
      if (payload) {
        state = {
          ...state,
          chats: state.chats
            .filter((chat) => chat.id === payload.chatId)
            .map((chat) => {
              chat.messages.push(payload.newMessage);
            }),
        };
      }
    },
    updateMessageId(state, { payload }) {
      const { idFromClient, files, chatId } = payload;
      // update the message id and each file url
      if (payload) {
        state = {
          ...state,
          chats: (state.chats
            .filter((chat) => chat.id === chatId)[0]
            .messages.filter((message) => {
              return message.idFromClient == idFromClient;
            })[0].files = files),
          chats: (state.chats
            .filter((chat) => chat.id === chatId)[0]
            .messages.filter((message) => {
              return message.idFromClient == idFromClient;
            })[0].id = payload.id),
          // Add the files to chat.files
          chats: (state.chats.filter((chat) => chat.id === chatId)[0].files = [
            ...state.chats.filter((chat) => chat.id === chatId)[0].files,
            ...files,
          ]),
        };
      }
    },
    addNewMessageToChatIdFromSender(state, { payload }) {
      if (payload) {
        // Add new message to chat
        // IF the data.id is not in the chat.messages array THEN add the new message to the chat.messages array ELSE do nothing

        if (
          !state.chats
            .filter((chat) => chat.id === payload.chatId)[0]
            .messages.some((message) => message.id === payload.data[0].id)
        ) {
          state = {
            ...state,
            chats: state.chats
              .filter((chat) => chat.id === payload.chatId)[0]
              .messages.push(payload.data[0]),
          };
        }
      }
    },
    chatsReset() {
      state.chat = initialState;
    },
  },
});
const {
  chatAdd,
  chatReset,
  addNewMessageToChatId,
  updateMessageId,
  addNewMessageToChatIdFromSender,
  allChats,
} = chatSlice.actions;
const reducer = chatSlice.reducer;
module.exports = {
  reducer,
  chatAdd,
  chatReset,
  addNewMessageToChatId,
  updateMessageId,
  allChats,
  addNewMessageToChatIdFromSender,
};
