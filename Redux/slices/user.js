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
        const updatedWorkExperiences = state.user.workExperiences.map((item) =>
          item.id === payload.id ? payload : item
        );

        state.user = {
          ...state.user,
          workExperiences: updatedWorkExperiences,
        };
      }
    },
    removeWorkExperienceFromState(state, { payload }) {
      if (payload) {
        state = {
          ...state,
          user: state.user.workExperiences.filter(
            (experience) => experience.id !== payload.id
          ),
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
  removeWorkExperienceFromState,
} = userSlice.actions;
const reducer = userSlice.reducer;
export default reducer;
