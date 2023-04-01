import axios from "axios";
const { SERVER_ADDRESS } = require("../config/index");

const getTeams = async (token) => {
  const response = await axios.get(`${SERVER_ADDRESS}/api/v1/team`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getTeamById = async (token, id) => {
  const response = await axios.get(`${SERVER_ADDRESS}/api/v1/team/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const createNewTeam = async (
  token,
  teamName,
  isPrivate,
  teamMission,
  teamVission
) => {
  if (token) {
    const response = await axios.post(
      `${SERVER_ADDRESS}/api/v1/team`,
      { teamName, isPrivate, teamMission, teamVission },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
};
const inviteFriends = async (token, teamId, colleagues) => {
  if (token) {
    if (colleagues.length > 0) {
      const response = await axios.post(
        `${SERVER_ADDRESS}/api/v1/team/invite`,
        { teamId, colleagues },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    }
  }
};

const acceptInvite = async (userToken, invitationToken) => {
  if (userToken && invitationToken) {
    const response = await axios.post(
      `${SERVER_ADDRESS}/api/v1/team/invite/accept`,
      { token: invitationToken },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    return response;
  }
};

const declineInvite = async (userToken, invitationToken) => {
  if (userToken && invitationToken) {
    const response = await axios.post(
      `${SERVER_ADDRESS}/api/v1/team/decline`,
      { token: invitationToken },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    return response;
  }
};

// send a team message
const sendTeamMessege = async (token, id, formData) => {
  if (token) {
    const response = await axios.post(
      `${SERVER_ADDRESS}/api/v1/team/messages/new/${id}`,
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

// delete TEAM BY ID
const deleteTeamById = async (token, id) => {
  if (token) {
    const response = await axios.delete(`${SERVER_ADDRESS}/api/v1/team/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.status;
  }
};

const createATopic = async (token, teamId, topicObject) => {
  if (token) {
    const response = await axios.post(
      `${SERVER_ADDRESS}/api/v1/team/${teamId}/topics/new`,
      topicObject,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
};

// /topics/:topicId/reply
const replyToTopic = async (token, topicId, messageObject) => {
  if (token) {
    const response = await axios.post(
      `${SERVER_ADDRESS}/api/v1/team/topics/${topicId}/reply`,
      messageObject,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
};

module.exports = {
  getTeams,
  createNewTeam,
  getTeamById,
  inviteFriends,
  acceptInvite,
  declineInvite,
  sendTeamMessege,
  createATopic,
  replyToTopic,
  // Delete
  deleteTeamById,
};
