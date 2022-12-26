const { useEffect } = require("react");
// React-Redux hooks
const { useDispatch } = require("react-redux");
const {
  getallNotifications,
  deleteNotification,
} = require("../services/notification");
const { allNotifications } = require("../Redux/slices/notifications");

const useGetNotification = (token) => {
  const dispatch = useDispatch();
  useEffect(() => {
    getallNotifications(token).then((data) => {
      dispatch(allNotifications(data));
    });
  }, [token]);
};

module.exports = {
  useGetNotification,
};
