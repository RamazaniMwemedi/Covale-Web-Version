import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {};

const teamSlice = createSlice({
  name: "teams",
  initialState: initialState,
  reducers: {
    allTeams(state, { payload }) {
      if (payload) {
        state.teams = payload;
      }
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
            })[0].file = payload.file),
          teams: (state.teams
            .filter((team) => team.id === payload.teamId)[0]
            .messages.filter((message) => {
              return message.idFromClient == payload.idFromClient;
            })[0].id = payload.id),
          // add the message topic to the topic array
          teams: state.teams
            .filter((team) => team.id === payload.teamId)[0]
            .topics.push(payload.topic),
        };
      }
    },
    addNewMessageToTeamIdFromSender(state, { payload }) {
      // Add new message to team
      // IF the data.id is not in the team.messages array THEN add the new message to the team.messages array ELSE do nothing
      if (
        !state.teams
          .filter((team) => team.id === payload.data.teamId)[0]
          .messages.some((message) => message.id === payload.data.message.id)
      ) {
        state = {
          ...state,
          teams: state.teams
            .filter((team) => team.id === payload.data.teamId)[0]
            .messages.push(payload.data.message),
        };
      }
    },
    removeTeamFromTeamsById(state, { payload }) {
      if (payload) {
        state = {
          ...state,
          teams: state.teams.filter((team) => team.id != payload),
        };
      }
    },
    replyToTopicId(state, { payload }) {
      if (payload) {
        state = {
          ...state,
          teams: state.teams
            .filter((team) => team.id === payload.teamId)[0]
            .topics.filter((topic) => topic.id === payload.topicId)[0]
            .messages.push(payload.topicNewMessage),
        };
      }
    },
    updateTopicMessageId(state, { payload }) {
      if (payload) {
        state = {
          ...state,
          teams: (state.teams
            .filter((team) => team.id === payload.teamId)[0]
            .topics.filter((topic) => topic.id === payload.topicId)[0]
            .messages.filter(
              (message) => message.idFromClient === payload.idFromClient
            )[0].id = payload.id),
          teams: (state.teams
            .filter((team) => team.id === payload.teamId)[0]
            .topics.filter((topic) => topic.id === payload.topicId)[0]
            .messages.filter(
              (message) => message.idFromClient === payload.idFromClient
            )[0].file = payload.file),
          // Add files to the team
          teams: state.teams
            .filter((team) => team.id === payload.teamId)[0]
            .files.push(payload.file),
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
  removeTeamFromTeamsById,
  replyToTopicId,
  updateTopicMessageId,
} = teamSlice.actions;
const reducer = teamSlice.reducer;
module.exports = {
  reducer,
  allTeams,
  addNewMessageToTeamId,
  addNewMessageToTeamIdFromSender,
  updateTeamMessageId,
  removeTeamFromTeamsById,
  replyToTopicId,
  updateTopicMessageId,
};
