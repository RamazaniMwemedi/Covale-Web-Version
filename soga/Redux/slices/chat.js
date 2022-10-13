import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const chatSlice = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {
    chatAdd(state, { payload }) {
      state.chat = payload;
    },
    chatReset() {
      state.chat = initialState;
    },
    addNewMessage(state, { payload }) {
      console.log(payload);
      state.chat.chat.messege.push(payload);
    },
  },
});

const { chatAdd, chatReset, addNewMessage } = chatSlice.actions;
const reducer = chatSlice.reducer;
module.exports = {
  reducer,
  chatAdd,
  chatReset,
  addNewMessage,
};
