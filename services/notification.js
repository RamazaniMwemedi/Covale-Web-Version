const axios = require("axios");
const { SERVER_ADDRESS } = require("../config/index");

const getallNotifications = async (token) => {
  if (token) {
    try {
      const response = await axios.get(`${SERVER_ADDRESS}/api/v1/notification`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error in getallNotifications", error);
    }
  }
};

const deleteNotification = async (token, id) => {
  try {
    const response = await axios.delete(
      `${SERVER_ADDRESS}/api/v1/notification/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in deleteNotification", error);
  }
};

module.exports = {
  getallNotifications,
  deleteNotification,
};
