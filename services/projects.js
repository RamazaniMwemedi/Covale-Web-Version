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

const createNewProject = async (project, token) => {
  const response = await axios.post(
    `${SERVER_ADDRESS}/api/v1/project`,
    project,
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

const createNewTask = async (token, formData, subProjectId) => {
  const response = await axios.post(
    `${SERVER_ADDRESS}/api/v1/subproject/${subProjectId}/task/new`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const commmentTask = async (token, taskId, content) => {
  const response = await axios.post(
    `${SERVER_ADDRESS}/api/v1/subproject/tasks/${taskId}/comment`,
    { content },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const modifyTask = async (token, taskId, data) => {
  //  flag, status;
  if (token && taskId) {
    const response = await axios.patch(
      `${SERVER_ADDRESS}/api/v1/subproject/tasks/${taskId}/modify`,
      { flag: data.flag, status: data.status },
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
  getProjects,
  createNewProject,
  createNewSubProject,
  createNewTask,
  commmentTask,
  modifyTask,
};
