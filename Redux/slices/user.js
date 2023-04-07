import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    addUser(state, { payload }) {
      state.user = payload;
    },
    removeUser(state) {
      state.user = initialState;
    },
    signOut(state) {
      // Clear the user state
      state.user = {};
    },
  },
});

const { addUser, removeUser, signOut } = userSlice.actions;
const reducer = userSlice.reducer;
module.exports = {
  reducer,
  addUser,
  removeUser,
  signOut,
};
