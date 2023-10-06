import axios from "axios";
import { SERVER_ADDRESS } from "../config/index";

export const allUsers = async (token: string) => {
  const response = await axios.get(
    `${SERVER_ADDRESS}/api/v1/users/colleague/explore`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Add a friend
export const addFriendById = async (id: string, token: string) => {
  const response = await axios.post(
    `${SERVER_ADDRESS}/api/v1/users/colleague/add/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const myFriends = async (token: string) => {
  const response = await axios.get(
    `${SERVER_ADDRESS}/api/v1/users/colleague/mycolleagues`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Friend Requests Received
export const friendReqRecieved = async (token: string) => {
  const response = await axios.get(
    `${SERVER_ADDRESS}/api/v1/users/colleague/colleaguesReqRecieved`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Friend Requests Sent
export const friendReqSent = async (token: string) => {
  const response = await axios.get(
    `${SERVER_ADDRESS}/api/v1/users/colleague/colleagueReqSent`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Accept Friend Request
export const acceptFriendRequest = async (id: string, token: string) => {
  if (token && id) {
    const response = await axios.post(
      `${SERVER_ADDRESS}/api/v1/users/colleague/accept/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
};

// Remove Friend Request
export const removeFriendRequest = async (id: string, token: string) => {
  const response = await axios.post(
    `${SERVER_ADDRESS}/api/v1/users/colleague/remove/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.status;
};

//Cancel Friend Request
export const cancelFriendRequest = async (id: string, token: string) => {
  const response = await axios.post(
    `${SERVER_ADDRESS}/api/v1/users/colleague/cancel/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.status;
};

// Find userBy id
export const findUserById = async (token: string, id: string) => {
  if (token) {
    try {
      const response = await axios.get(`${SERVER_ADDRESS}/api/v1/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      // Redirect to the login page
      window.location.href = "/login";
    }
  }
};

// Remove user from colleagues
export const removeColleague = async (token: string, id: string) => {
  if (token) {
    try {
      const response = await axios.post(
        `${SERVER_ADDRESS}/api/v1/users/colleague/explore/remove/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error in findUserById", error);
    }
  }
};

export const addProfilePic = async (token: string, formData: FormData) => {
  if (token && formData) {
    const response = await axios.post(
      `${SERVER_ADDRESS}/api/v1/users/profilePic`,
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
export const addCoverPic = async (token: string, formData: FormData) => {
  if (token && formData) {
    const response = await axios.post(
      `${SERVER_ADDRESS}/api/v1/users/coverPhoto`,
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
export const updateProfessionalSum = async (
  token: string,
  professionalSumm: string
) => {
  if (token && professionalSumm) {
    const response = await axios.post(
      `${SERVER_ADDRESS}/api/v1/users/updateProfessionalSummary`,
      { professionalSummary: professionalSumm },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
};

export const addWorkExperience = async (
  token: string,
  workExperience: string
) => {
  if (token && workExperience) {
    const response = await axios.post(
      `${SERVER_ADDRESS}/api/v1/users/addworkexperience`,
      workExperience,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  }
};

export const updateWorkexperience = async (
  token: string,
  workExperience: string,
  id: string
) => {
  if (token && id) {
    const response = await axios.put(
      `${SERVER_ADDRESS}/api/v1/users/updateworkexperience/${id}`,
      workExperience,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
};

export const deleteWorkExperience = async (token: string, id: string) => {
  if (token && id) {
    const response = await axios.delete(
      `${SERVER_ADDRESS}/api/v1/users/updateworkexperience/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
};

export const recoverAccountConfirmEmail = async (
  email: string
): Promise<boolean | string> => {
  if (email) {
    const res = await axios.post(
      `${SERVER_ADDRESS}/api/v1/users/recover/${email}`
    );

    if (res.data.isAvailabe) {
      return true;
    } else {
      return res.data.error;
    }
  }
  return false;
};

export default {
  allUsers,
  addFriendById,
  myFriends,
  friendReqRecieved,
  friendReqSent,
  acceptFriendRequest,
  removeFriendRequest,
  cancelFriendRequest,
  findUserById,
  removeColleague,
  addProfilePic,
  addCoverPic,
  updateProfessionalSum,
  addWorkExperience,
  updateWorkexperience,
  deleteWorkExperience,
};
