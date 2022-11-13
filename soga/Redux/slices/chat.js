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
    chatsReset() {
      state.chat = initialState;
    },
  },
});
const { chatAdd, chatReset, addNewMessage, addNewMessageFromSever, allChats } =
  chatSlice.actions;
const reducer = chatSlice.reducer;
module.exports = {
  reducer,
  chatAdd,
  chatReset,
  addNewMessage,
  addNewMessageFromSever,
  allChats,
};

// chatAdd(state, { payload }) {
//   state.chat = payload;
// },
