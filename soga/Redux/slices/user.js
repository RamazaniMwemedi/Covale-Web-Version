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
  },
});

const { addUser, removeUser } = userSlice.actions;
const reducer = userSlice.reducer;
module.exports = {
  reducer,
  addUser,
  removeUser,
};
