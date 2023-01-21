import axios from "axios";
const { SERVER_ADDRESS } = require("../config/index");

const allUsers = async (token) => {
  const response = await axios.get(
    `${SERVER_ADDRESS}/api/authorizeduser/friend/explore`,
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
    `${SERVER_ADDRESS}/api/authorizeduser/friend/add/${id}`,
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
    `${SERVER_ADDRESS}/api/authorizeduser/friend/myFriends`,
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
    `${SERVER_ADDRESS}/api/authorizeduser/friend/friendReqRecieved`,
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
    `${SERVER_ADDRESS}/api/authorizeduser/friend/friendReqSent`,
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
  const response = await axios.post(
    `${SERVER_ADDRESS}/api/authorizeduser/friend/accept/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.status;
};

// Remove Friend Request
const removeFriendRequest = async (id, token) => {
  const response = await axios.post(
    `${SERVER_ADDRESS}/api/authorizeduser/friend/remove/${id}`,
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
    `${SERVER_ADDRESS}/api/authorizeduser/friend/cancel/${id}`,
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
      const response = await axios.get(`${SERVER_ADDRESS}/api/users/${id}`, {
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
};
