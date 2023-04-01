const { useEffect } = require("react");
// React-Redux hooks
const { useDispatch } = require("react-redux");

const io = require("socket.io-client");
const { RTC_ADDRESS } = require("../config");
// Socket.IO
// https://rtcommunication.herokuapp.com/
// http://localhost:5005/

const notificationSocket = io.connect(`${RTC_ADDRESS}/notification`);

const {
  getallNotifications,
  deleteNotification,
} = require("../services/notification");
const {
  allNotifications,
  addNewNotification,
} = require("../Redux/slices/notifications");

const useGetNotification = (token) => {
  const dispatch = useDispatch();
  useEffect(() => {
    getallNotifications(token).then((data) => {
      dispatch(allNotifications(data));
    });
  }, [token]);
};

const useJoinNotificationRoom = (userId) => {
  useEffect(() => {
    if (userId) {
      notificationSocket.emit("join_notification_room", userId);
    }
  }, [userId]);
};

const useRecieveNewNotification = (user) => {
  const dispatch = useDispatch();
  useEffect(() => {
    notificationSocket.on("new_notification", (data) => {
      dispatch(addNewNotification(data));
    });
  }, [notificationSocket, user]);
};

module.exports = {
  useGetNotification,
  useJoinNotificationRoom,
  useRecieveNewNotification,
};
