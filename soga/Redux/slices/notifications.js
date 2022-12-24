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
    acceptJoinTeamRequest(state, { payload }) {
      if (payload) {
        state = {
          ...state,
          notifications: state.notifications.filter(
            (notification) => notification.id !== payload
          ),
        };
      }
    },
    rejectJoinTeamRequest(state, { payload }) {
      if (payload) {
        state = {
          ...state,
          notifications: state.notifications.filter(
            (notification) => notification.id !== payload
          ),
        };
      }
    },
  },
});

const { reducer } = notificationSlice;
const {
  allNotifications,
  addNewNotification,
  acceptJoinTeamRequest,
  rejectJoinTeamRequest,
} = notificationSlice.actions;
module.exports = {
  allNotifications,
  addNewNotification,
  acceptJoinTeamRequest,
  rejectJoinTeamRequest,
  reducer,
};
