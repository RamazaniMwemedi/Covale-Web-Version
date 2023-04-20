import { createSlice, current } from "@reduxjs/toolkit";

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
    professionalSummaryUpdate(state, { payload }) {
      if (payload) {
        state = {
          ...state,
          user: (state.user.professionalSummary = payload),
        };
      }
    },
    addWorkExperienceToState(state, { payload }) {
      if (payload) {
        state = {
          ...state,
          user: state.user.workExperiences.push(payload),
        };
      }
    },
    updateworkexperienceState(state, { payload }) {
      if (payload) {
        state = {
          ...state,
          user: state.user.workExperiences
            .filter((item) => item._id === payload._id)
            .map((p) => console.log("This is P:>>",current(p))),
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
  professionalSummaryUpdate,
  addWorkExperienceToState,
  updateworkexperienceState,
} = userSlice.actions;
export const reducer = userSlice.reducer;
