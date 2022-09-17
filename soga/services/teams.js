import axios from "axios";
const baseUrl = "https://covalnt.herokuapp.com";
const getTeams = async (token) => {
   const response = await axios.get(`${baseUrl}/api/team`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

module.exports = {
    getTeams
}