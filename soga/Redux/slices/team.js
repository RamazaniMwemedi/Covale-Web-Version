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
      if (payload && payload.boolForReceive) {
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
