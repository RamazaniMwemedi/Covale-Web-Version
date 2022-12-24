const { configureStore } = require("@reduxjs/toolkit");
const chatsReducer = require("./slices/chat");
const teamReducer = require("./slices/team");
const userReducer = require("./slices/user");
const projectsReducer = require("./slices/projects");
const notificationsReducer = require("./slices/notifications");

const store = configureStore({
  reducer: {
    chats: chatsReducer.reducer,
    teams: teamReducer.reducer,
    user: userReducer.reducer,
    projects: projectsReducer.reducer,
    notifications: notificationsReducer.reducer,
  },
});
module.exports = store;
