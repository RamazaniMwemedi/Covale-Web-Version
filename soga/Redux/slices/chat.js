import { createSlice, current } from "@reduxjs/toolkit";

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
      state.chat.chat.messege.push(payload);
    },
    addNewMessageFromSever(state, { payload }) {
      // Bug when updating a message
      // Its still not working
      let State = current(state);
      // return [
      //   ...State,
      //   State.chat.chat.messege
      //     .map((m) => {
      //       return m.idFromClient == payload.idFromClient;
      //     })
      //     .filter((ms) => {
      //       return (ms = payload);
      //     }),
      //   ];
    },
  },
});
// console.log("Message length", state.chat.chat.messege.length);
// state.chat.chat.messege.filter((message) => {
//   let theMessage = message.idFromClient == payload.idFromClient;
//   console.log("Messsage Before :", theMessage);
//   theMessage = payload;
//   console.log("Messsage After :", theMessage);
//   console.log("Message length", state.chat.chat.messege.length);
// });

const { chatAdd, chatReset, addNewMessage, addNewMessageFromSever } =
  chatSlice.actions;
const reducer = chatSlice.reducer;
module.exports = {
  reducer,
  chatAdd,
  chatReset,
  addNewMessage,
  addNewMessageFromSever,
};
