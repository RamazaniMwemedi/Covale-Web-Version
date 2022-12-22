import axios from "axios";
const { SERVER_ADDRESS } = require("../config/index");

const getTeams = async (token) => {
  const response = await axios.get(`${SERVER_ADDRESS}/api/team`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getTeamById = async (token, id) => {
  const response = await axios.get(`${SERVER_ADDRESS}/api/team/${id}`, {
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
      `${SERVER_ADDRESS}/api/team`,
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
const inviteFriends = async (token, teamId, friends) => {
  if (token) {
    if (friends.length > 0) {
      const response = await axios.post(
        `${SERVER_ADDRESS}/api/team/invite`,
        { teamId, friends },
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

module.exports = {
  getTeams,
  createNewTeam,
  getTeamById,
  inviteFriends,
};
