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

const createNewProjeect = async (token, title, description) => {
  const response = await axios.post(
    `${baseUrl}/api/project`,
    { title, description },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

module.exports = {
  getProjects,
  createNewProjeect,
};
