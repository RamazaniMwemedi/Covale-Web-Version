const axios = require("axios");
const { SERVER_ADDRESS } = require("../config/index");

const getProjects = async (token) => {
  const response = await axios.get(`${SERVER_ADDRESS}/api/project`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const createNewProjeect = async (token, title, description) => {
  const response = await axios.post(
    `${SERVER_ADDRESS}/api/project`,
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
