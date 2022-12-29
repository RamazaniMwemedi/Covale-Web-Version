import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
let teams = new Array();

const teamSlice = createSlice({
  name: "teams",
  initialState: initialState,
  reducers: {
    allTeams(state, { payload }) {
      if (payload) {
        for (let index = 0; index < payload.length; index++) {
          const teamByIndex = payload[index];
          teams.push(teamByIndex);
        }
      }
      state.teams = teams;
    },
    addNewMessageToTeamId(state, { payload }) {
      if (payload) {
        state = {
          ...state,
          teams: state.teams
            .filter((team) => team.id === payload.teamId)[0]
            .messages.push(payload.teamNewMessage),
        };
      }
    },

    updateTeamMessageId(state, { payload }) {
      if (payload) {
        state = {
          ...state,
          teams: (state.teams
            .filter((team) => team.id === payload.teamId)[0]
            .messages.filter((message) => {
              return message.idFromClient == payload.idFromClient;
            })[0].id = payload.id),
        };
      }
    },
    addNewMessageToTeamIdFromSender(state, { payload }) {
      console.log("addNewMessageToTeamIdFromSender :>>", payload);
      // Add new message to team
      // IF the data.id is not in the team.messages array THEN add the new message to the team.messages array ELSE do nothing
      if (
        !state.teams
          .filter((team) => team.id === payload.teamId)[0]
          .messages.some((message) => message.id === payload.data.id)
      ) {
        state = {
          ...state,
          teams: state.teams
            .filter((team) => team.id === payload.teamId)[0]
            .messages.push(payload.data),
        };
      }
    },
  },
});

const {
  allTeams,
  addNewMessageToTeamId,
  addNewMessageToTeamIdFromSender,
  updateTeamMessageId,
} = teamSlice.actions;
const reducer = teamSlice.reducer;
module.exports = {
  reducer,
  allTeams,
  addNewMessageToTeamId,
  addNewMessageToTeamIdFromSender,
  updateTeamMessageId,
};
