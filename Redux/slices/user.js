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
    updateCoverPhotoe(state, { payload }) {
      if (payload) {
        state = {
          ...state,
          user: (state.user.coverPhotoe = payload),
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

export const {
  addUser,
  removeUser,
  updateProfilePicture,
  updateCoverPhotoe,
  signOut,
} = userSlice.actions;
export const reducer = userSlice.reducer;
