const axios = require("axios");

const baseUrl = "https://covale.herokuapp.com";

const getProjects = async (token) => {
  const response = await axios.get(`${baseUrl}/api/project`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

module.exports = {
  getProjects,
};
