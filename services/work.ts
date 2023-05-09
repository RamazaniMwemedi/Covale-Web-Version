import axios from "axios";
import { SERVER_ADDRESS } from "../config/index";

export const createNewPostService = async (
  token: string,
  formData: FormData
) => {
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

/**
 *
 * @param token the main server token for the logged in user
 * @param formData of the comment which includes comment text and files
 * @param postId id of the post being commented
 * @returns new comment
 */
export const postNewCommentToPost = async (
  token: string,
  formData: FormData,
  postId: string
) => {
  if (token && formData) {
    const response = await axios.post(
      `${SERVER_ADDRESS}/api/v1/work/circle/post/${postId}/comment/new`,
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


/**
 * 
 * @param token servers token 
 * @param userId loggedin user id
 * @returns Post[]
 */
export const getUserPosts = async (token: string, userId: string) => {
  if (token) {
    const response = await axios.get(
      `${SERVER_ADDRESS}/api/v1/work/circle/post/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
};
