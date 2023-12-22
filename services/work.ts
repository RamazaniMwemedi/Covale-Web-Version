import axios from "axios";
import config from "../config/index";

// Get connections you may know

/**
 *
 * @param token server token
 * @returns User[]
 */

export const getConnectionsYouMayKnow = async (token: string) => {
  if (token) {
    const response = await axios.get(
      `${config.SERVER_ADDRESS}/api/v1/work/circle/connectionsYouMK`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
};
