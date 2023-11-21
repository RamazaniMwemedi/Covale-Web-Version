import { configureStore } from "@reduxjs/toolkit";
import chatsReducer from "./slices/chat";
import teamReducer from "./slices/team";
import userReducer from "./slices/user";
import projectsReducer from "./slices/projects";
import notificationsReducer from "./slices/notifications";
import calendarReducer from "./slices/calendar";
import colleaguesReducer from "./slices/colleagues";
import keyPairsReducer from "./slices/keys";
import workReducer from "./slices/work";

const store = configureStore({
  reducer: {
    chats: chatsReducer,
    teams: teamReducer,
    user: userReducer,
    projects: projectsReducer,
    notifications: notificationsReducer,
    calendar: calendarReducer,
    colleagues: colleaguesReducer,
    keyPairs: keyPairsReducer,
    work: workReducer,
  },
});
module.exports = store;
