import { createSlice, current } from "@reduxjs/toolkit";

const initialNotificationsState = {};
let notifications = new Array();

const notificationSlice = createSlice({
  name: "notifications",
  initialState: initialNotificationsState,
  reducers: {
    allNotifications(state, { payload }) {
      if (payload) {
        state.notifications = payload;
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
  },
});

const { reducer } = notificationSlice;
const { allNotifications, addNewNotification, deleteNotification } =
  notificationSlice.actions;
module.exports = {
  allNotifications,
  addNewNotification,
  deleteNotification,
  reducer,
};
