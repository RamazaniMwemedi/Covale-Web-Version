import axios from "axios";
import { SERVER_ADDRESS } from "../config/index";

export const createNewPostService = async(token: string, formData: FormData) => {
  if (token && formData) {
      const response = await axios.post(
      `${SERVER_ADDRESS}/api/v1/work/circle/post/new`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
};
