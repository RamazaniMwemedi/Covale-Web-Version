const { configureStore } = require("@reduxjs/toolkit");
const chatReducer = require("./slices/chat");
const teamReducer = require("./slices/team");
const userReducer = require("./slices/user");

const store = configureStore({
  reducer: {
    chat: chatReducer.reducer,
    team: teamReducer.reducer,
    user: userReducer.reducer,
  },
});
module.exports = store;
