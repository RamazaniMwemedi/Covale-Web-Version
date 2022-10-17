import axios from "axios";
const baseUrl = "https://covalnt.herokuapp.com";

const allUsers = async (token) => {
  const response = await axios.get(
    `${baseUrl}/api/authorizeduser/friend/explore`,
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
    `${baseUrl}/api/authorizeduser/friend/add/${id}`,
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
    `${baseUrl}/api/authorizeduser/friend/myFriends`,
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
    `${baseUrl}/api/authorizeduser/friend/friendReqRecieved`,
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
    `${baseUrl}/api/authorizeduser/friend/friendReqSent`,
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
    `${baseUrl}/api/authorizeduser/friend/accept/${id}`,
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
    `${baseUrl}/api/authorizeduser/friend/remove/${id}`,
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
    `${baseUrl}/api/authorizeduser/friend/cancel/${id}`,
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
    const response = await axios.get(`${baseUrl}/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return response;
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
