import axios from "axios";
import config from "../config/index";

export const getProjects = async (token: string) => {
  const response = await axios.get(`${config.SERVER_ADDRESS}/api/v1/project`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createNewProject = async (project: string, token: string) => {
  const response = await axios.post(
    `${config.SERVER_ADDRESS}/api/v1/project`,
    project,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const createNewSubProject = async (
  token: string,
  title: string,
  description: string,
  projectId: string,
  options: {
    all: [boolean, boolean];
    member: boolean;
    manager: boolean;
  }
) => {
  const response = await axios.post(
    `${config.SERVER_ADDRESS}/api/v1/subproject/${projectId}`,
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

export const createNewTask = async (
  token: string,
  formData: FormData,
  subProjectId: string
) => {
  const response = await axios.post(
    `${config.SERVER_ADDRESS}/api/v1/subproject/${subProjectId}/task/new`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const commmentTask = async (
  token: string,
  taskId: string,
  content: string
) => {
  const response = await axios.post(
    `${config.SERVER_ADDRESS}/api/v1/subproject/tasks/${taskId}/comment`,
    { content },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const modifyTask = async (
  token: string,
  taskId: string,
  data: { flag: string; status: string }
) => {
  //  flag, status;
  if (token && taskId) {
    const response = await axios.patch(
      `${config.SERVER_ADDRESS}/api/v1/subproject/tasks/${taskId}/modify`,
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

const mod = {
  getProjects,
  createNewProject,
  createNewSubProject,
  createNewTask,
  commmentTask,
  modifyTask,
};

export default mod;
