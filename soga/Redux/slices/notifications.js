import { createSlice, current } from "@reduxjs/toolkit";

const initialNotificationsState = {};
let notifications = new Array();

const notificationSlice = createSlice({
  name: "notifications",
  initialState: initialNotificationsState,
  reducers: {
    allNotifications(state, { payload }) {
      if (payload) {
        for (let index = 0; index < payload.length; index++) {
          const notificationByIndex = payload[index];
          notifications.push(notificationByIndex);
        }
      }
      state.notifications = notifications;
    },
    addNewNotification(state, { payload }) {
      if (payload) {
        state = {
          ...state,
          notifications: state.notifications.push(payload),
        };
      }
    },
  },
});

const { reducer } = notificationSlice;
const { allNotifications, addNewNotification } = notificationSlice.actions;
module.exports = {
  allNotifications,
  addNewNotification,
  reducer,
};
