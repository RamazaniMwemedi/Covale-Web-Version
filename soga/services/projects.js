const axios = require("axios");
const { SERVER_ADDRESS } = require("../config/index");

const getProjects = async (token) => {
  const response = await axios.get(`${SERVER_ADDRESS}/api/v1/project`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const createNewProject = async (token, title, description) => {
  const response = await axios.post(
    `${SERVER_ADDRESS}/api/v1/project`,
    { title, description },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const createNewSubProject = async (
  token,
  title,
  description,
  projectId,
  options
) => {
  const response = await axios.post(
    `${SERVER_ADDRESS}/api/v1/subproject/${projectId}`,
    {
      title,
      description,
      options,
    },
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
  createNewProject,
  createNewSubProject,
};
