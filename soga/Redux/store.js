const { configureStore } = require("@reduxjs/toolkit");
const chatReducer = require("./slices/chat");
const teamReducer = require("./slices/team");

const store = configureStore({
  reducer: {
    chat: chatReducer.reducer,
    team: teamReducer.reducer,
  },
});
module.exports = store;