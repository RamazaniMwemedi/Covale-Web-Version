import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    addUser(state, { payload }) {
      state.user = payload;
    },
    updateProfilePicture(state, { payload }) {
      if (payload) {
        state = {
          ...state,
          user: (state.user.profilePic = payload),
        };
      }
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

const { addUser, removeUser, updateProfilePicture, signOut } =
  userSlice.actions;
const reducer = userSlice.reducer;
module.exports = {
  reducer,
  addUser,
  removeUser,
  updateProfilePicture,
  signOut,
};
