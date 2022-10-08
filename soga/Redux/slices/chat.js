import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const chatSlice = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {
    chatAdd(state, { payload }) {
      state = payload;
    },
    chatReset() {
      state = initialState;
    },
  },
});

const { chatAdd, chatReset } = chatSlice.actions;
const reducer = chatSlice.reducer;
module.exports = {
  reducer,
  chatAdd,
  chatReset,
};
