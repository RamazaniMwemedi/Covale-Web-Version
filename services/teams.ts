import axios from "axios";
import config from "../config/index";
const getTeams = async (token: string) => {
  const response = await axios.get(`${config.SERVER_ADDRESS}/api/v1/team`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getTeamById = async (token: string, id: string) => {
  const response = await axios.get(
    `${config.SERVER_ADDRESS}/api/v1/team/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const createNewTeam = async (
  token: string,
  teamName: string,
  isPrivate: string,
  teamMission: string,
  teamVission: string
) => {
  if (token) {
    const response = await axios.post(
      `${config.SERVER_ADDRESS}/api/v1/team`,
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
const inviteFriends = async (
  token: string,
  teamId: string,
  colleagues: string[]
) => {
  if (token) {
    if (colleagues.length > 0) {
      const response = await axios.post(
        `${config.SERVER_ADDRESS}/api/v1/team/invite`,
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

const acceptInvite = async (userToken: string, invitationToken: string) => {
  if (userToken && invitationToken) {
    const response = await axios.post(
      `${config.SERVER_ADDRESS}/api/v1/team/invite/accept`,
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

const declineInvite = async (userToken: string, invitationToken: string) => {
  if (userToken && invitationToken) {
    const response = await axios.post(
      `${config.SERVER_ADDRESS}/api/v1/team/decline`,
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
const sendTeamMessege = async (
  token: string,
  id: string,
  formData: FormData
) => {
  if (token) {
    const response = await axios.post(
      `${config.SERVER_ADDRESS}/api/v1/team/messages/new/${id}`,
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
const deleteTeamById = async (token: string, id: string) => {
  if (token) {
    const response = await axios.delete(
      `${config.SERVER_ADDRESS}/api/v1/team/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.status;
  }
};

const createATopic = async (
  token: string,
  teamId: string,
  topicObject: {
    title: string;
    description: string;
  }
) => {
  if (token) {
    const response = await axios.post(
      `${config.SERVER_ADDRESS}/api/v1/team/${teamId}/topics/new`,
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
const replyToTopic = async (
  token: string,
  topicId: string,
  messageObject: FormData
) => {
  if (token) {
    const response = await axios.post(
      `${config.SERVER_ADDRESS}/api/v1/team/topics/${topicId}/reply`,
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

export {
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
