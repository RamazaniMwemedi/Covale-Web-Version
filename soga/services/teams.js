import axios from "axios";
const baseUrl = "https://covale.herokuapp.com";
const baseUrlDev = "http://localhost:5005";
const getTeams = async (token) => {
  const response = await axios.get(`${baseUrl}/api/team`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getTeamById = async (token, id) => {
  const response = await axios.get(`${baseUrl}/api/team/${id}`, {
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
      `${baseUrl}/api/team`,
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
        `${baseUrl}/api/team/invite`,
        { teamId, friends },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.status;
    }
  }
};

module.exports = {
  getTeams,
  createNewTeam,
  getTeamById,
  inviteFriends,
};
