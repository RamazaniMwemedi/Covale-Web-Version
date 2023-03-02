import axios from "axios";
const { SERVER_ADDRESS } = require("../config/index");

const allUsers = async (token) => {
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
const addFriendById = async (id, token) => {
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

const myFriends = async (token) => {
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
const friendReqRecieved = async (token) => {
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
const friendReqSent = async (token) => {
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
const acceptFriendRequest = async (id, token) => {
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
const removeFriendRequest = async (id, token) => {
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
const cancelFriendRequest = async (id, token) => {
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
const findUserById = async (token, id) => {
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
      console.log("Error in findUserById", error);
      window.location.href = "/login";
    }
  }
};

// Remove user from colleagues
const removeColleague = async (token, id) => {
  if (token) {
    try {
      const response = await axios.post(
        `${SERVER_ADDRESS}/api/v1/users/colleague/remove/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      // Redirect to the login page
      console.log("Error in findUserById", error);
      // window.location.href = "/login";
    }
  }
};

module.exports = {
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
};

