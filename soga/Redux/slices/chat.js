import { createSlice, current } from "@reduxjs/toolkit";

const initialChatsState = {};
let chats = new Array();

const chatSlice = createSlice({
  name: "chats",
  initialState: initialChatsState,
  reducers: {
    allChats(state, { payload }) {
      if (payload) {
        for (let index = 0; index < payload.length; index++) {
          const chatByIndex = payload[index];
          chats.push(chatByIndex);
        }
      }
      state.chats = chats;
    },
    addNewMessageToChatId(state, { payload }) {
      if (payload) {
        state = {
          ...state,
          chats: state.chats
            .filter((chat) => chat.id === payload.chatId)[0]
            .messages.push(payload.newMessage),
        };
      }
    },
    updateMessageId(state, { payload }) {
      if (payload) {
        state = {
          ...state,
          chats: (state.chats
            .filter((chat) => chat.id === payload.chatId)[0]
            .messages.filter((message) => {
              return message.idFromClient == payload.idFromClient;
            })[0].id = payload.id),
        };
      }
    },
    addNewMessageToChatIdFromSender(state, { payload }) {
      if (payload && payload.boolForReceive) {
        state = {
          ...state,
          chats: state.chats
            .filter((chat) => chat.id === payload.chatId)[0]
            .messages.push(payload.data),
        };
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
