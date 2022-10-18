import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const teamSlice = createSlice({
  name: "team",
  initialState: initialState,
  reducers: {
    teamAdd(state, { payload }) {
      state.team = payload;
    },
    teamReset(state) {
      state.team = initialState;
    },
    addNewMessageToTeam(state, { payload }) {
      state.team.messages.push(payload);
    },
  },
});

const { teamAdd, teamReset, addNewMessageToTeam } = teamSlice.actions;
const reducer = teamSlice.reducer;
module.exports = {
  reducer,
  teamAdd,
  teamReset,
  addNewMessageToTeam,
};
