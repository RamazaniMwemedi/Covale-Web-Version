import { createSlice, current } from "@reduxjs/toolkit";

const initialNotificationsState = {};
let notifications = new Array();

const notificationSlice = createSlice({
  name: "notifications",
  initialState: initialNotificationsState,
  reducers: {
    allNotifications(state, { payload }) {
      if (payload) {
        // arange the payload by time from the latest to the oldest
        const sortedPayload = payload.sort((a, b) => {
          return new Date(b.time) - new Date(a.time);
        });
        state.notifications = sortedPayload;
      }
    },
    addNewNotification(state, { payload }) {
      if (payload) {
        state = {
          ...state,
          notifications: state.notifications.push(payload),
        };
      }
    },
    deleteNotification(state, { payload }) {
      if (payload) {
        state = {
          ...state,
          notifications: state.notifications.filter(
            (notification) => notification._id !== payload
          ),
        };
      }
    },
    updateReadNotification(state, { payload }) {
      console.log("payload", payload);
      if (payload) {
        state = {
          ...state,
          notifications: (state.notifications.filter(
            (notification) => notification._id == payload
          ).read = true),
        };
      }
    },
  },
});

const { reducer } = notificationSlice;
const {
  allNotifications,
  addNewNotification,
  deleteNotification,
  updateReadNotification,
} = notificationSlice.actions;
module.exports = {
  allNotifications,
  addNewNotification,
  deleteNotification,
  updateReadNotification,
  reducer,
};
