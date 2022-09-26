import axios from "axios";
const baseUrl = "https://covalnt.herokuapp.com";
const baseUrlDev= "http://localhost:5005"
const getTeams = async (token) => {
   const response = await axios.get(`${baseUrl}/api/team`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const createNewTeam =async (token, teamName, isPrivate,teamMission,teamVission) => { 
  if (token) {

    if (teamName,isPrivate, teamMission,teamVission) {
      const response = await axios.post(`${baseUrl}/api/team`,{ teamName, isPrivate,teamMission,teamVission }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
    }
  } 
 }

module.exports = {
    getTeams,createNewTeam
}