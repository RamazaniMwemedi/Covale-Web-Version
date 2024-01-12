import { useEffect } from "react";
// React-Redux hooks
import { useDispatch } from "react-redux";

import io from "socket.io-client";
import config from "../config";
// Socket.IO
// https://rtcommunication.herokuapp.com/
// http://localhost:5005/
const socketIO: any = io;

const notificationSocket = socketIO.connect(
  `${config.RTC_ADDRESS}/notification`
);

import {
  getallNotifications,
  deleteNotification,
} from "../services/notification";
import {
  allNotifications,
  addNewNotification,
} from "../Redux/slices/notifications";

export const useGetNotification = (token: string) => {
  const dispatch = useDispatch();
  useEffect(() => {
    getallNotifications(token).then((data: any) => {
      dispatch(allNotifications(data));
    });
  }, [token]);
};

export const useJoinNotificationRoom = (userId: string) => {
  useEffect(() => {
    if (userId) {
      notificationSocket.emit("join_notification_room", userId);
    }
  }, [userId]);
};

export const useRecieveNewNotification = (userId: string) => {
  const dispatch = useDispatch();
  useEffect(() => {
    notificationSocket.on("new_notification", (data: any) => {
      dispatch(addNewNotification(data));
    });
  }, [notificationSocket, userId]);
};

module.exports = {
  useGetNotification,
  useJoinNotificationRoom,
  useRecieveNewNotification,
};
