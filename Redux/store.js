const { configureStore } = require("@reduxjs/toolkit");
const chatsReducer = require("./slices/chat");
const teamReducer = require("./slices/team");
const userReducer = require("./slices/user");
const projectsReducer = require("./slices/projects");
const notificationsReducer = require("./slices/notifications");
const calendarReducer = require("./slices/calendar");
const colleaguesReducer = require("./slices/colleagues");
const keyPairsReducer = require("./slices/keys");
const workReducer = require("./slices/work");

const store = configureStore({
  reducer: {
    chats: chatsReducer.reducer,
    teams: teamReducer.reducer,
    user: userReducer.reducer,
    projects: projectsReducer.reducer,
    notifications: notificationsReducer.reducer,
    calendar: calendarReducer.reducer,
    colleagues: colleaguesReducer.reducer,
    keyPairs: keyPairsReducer.reducer,
    work: workReducer.reducer,
  },
});
module.exports = store;
