import axios from "axios";
import config from "../config/index";
export const getallNotifications = async (token: string) => {
  if (token) {
    try {
      const response = await axios.get(
        `${config.SERVER_ADDRESS}/api/v1/notification`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error in getallNotifications", error);
    }
  }
};

export const deleteNotification = async (token: string, id: string) => {
  try {
    const response = await axios.delete(
      `${config.SERVER_ADDRESS}/api/v1/notification/${id}`,
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

const mod = {
  getallNotifications,
  deleteNotification,
};
export default mod;
