import axios from "axios";
import config from "../config/index";

export const createNewPostService = async (
  token: string,
  formData: FormData
) => {
  if (token && formData) {
    const response = await axios.post(
      `${config.SERVER_ADDRESS}/api/v1/work/circle/post/new`,
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
      `${config.SERVER_ADDRESS}/api/v1/work/circle/post/${postId}/comment/new`,
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
 * @param commentId id for the comment
 * @returns new comment
 */
export const postNewReplyToComment = async (
  token: string,
  formData: FormData,
  postId: string,
  commentId: string
) => {
  if (token && formData) {
    const response = await axios.post(
      `${config.SERVER_ADDRESS}/api/v1/work/circle/post/${postId}/comment/${commentId}/reply`,
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
      `${config.SERVER_ADDRESS}/api/v1/work/circle/post/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
};

// Get all posts
/**
 *
 * @param token servers token
 * @returns Post[]
 */
export const getAllPosts = async (token: string) => {
  if (token) {
    const response = await axios.get(
      `${config.SERVER_ADDRESS}/api/v1/work/circle/posts`,
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
 * @param token server token
 * @param postId Id of the post to be reacted
 * @param reaction the reaction
 * @returns reaction
 */
export const reactOnApost = async (
  token: string,
  postId: string,
  reaction:
    | "like"
    | "love"
    | "celebrate"
    | "insightful"
    | "curious"
    | "support"
    | "funny"
) => {
  if (token && postId) {
    const response = await axios.put(
      `${config.SERVER_ADDRESS}/api/v1/work/circle/post/${postId}/react`,
      {
        reaction,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.status;
  }
};
/**
 *
 * @param token server token
 * @param commentId Id of the post to be reacted
 * @param reaction the reaction
 * @returns reaction
 */
export const reactOnApostComment = async (
  token: string,
  commentId: string,
  reaction:
    | "like"
    | "love"
    | "celebrate"
    | "insightful"
    | "curious"
    | "support"
    | "funny"
) => {
  if (token && commentId) {
    const response = await axios.put(
      `${config.SERVER_ADDRESS}/api/v1/work/circle/post/comment/${commentId}/react`,
      {
        reaction,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.status;
  }
};

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
