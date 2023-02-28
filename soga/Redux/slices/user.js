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
    addKeys(state, { payload }) {
      state.user.keys = [payload];
    },
    signOut(state) {
      state = {};
    },
  },
});

const { addUser, removeUser, addKeys, signOut } = userSlice.actions;
const reducer = userSlice.reducer;
module.exports = {
  reducer,
  addUser,
  addKeys,
  removeUser,
  signOut,
};
