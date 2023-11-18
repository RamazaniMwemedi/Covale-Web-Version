import { useEffect, useState } from "react";
// React-Redux hooks
import { useDispatch, useSelector } from "react-redux";

import projectServices from "../services/projects";
import { addProjects } from "../Redux/slices/projects";
import {
  ProjectInterface,
  RootState,
  SubProjectsInterface,
} from "../interfaces/myprofile";

export const useGetProjects = (token: string) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      projectServices.getProjects(token).then((res) => {
        dispatch(addProjects(res));
      });
    }
  }, [token]);
};

export const useProject = (id: string) => {
  const allProjects = useSelector((state: RootState) => state.projects);
  const [project, setProject] = useState<ProjectInterface>();
  useEffect(() => {
    if (allProjects.projects) {
      if (allProjects.projects.length > 0 && id) {
        setProject(allProjects.projects.find((project) => project.id === id));
      }
    }
  }, [allProjects, id]);

  return project;
};

export const useSubProjectsTasks = (
  projectId: string,
  subprojectId: string
) => {
  const allProjects = useSelector((state: RootState) => state.projects);
  const [subProjectTasks, setSubProjectTasks] =
    useState<SubProjectsInterface>();
  useEffect(() => {
    if (allProjects.projects) {
      let project;
      if (allProjects.projects.length > 0 && projectId && subprojectId) {
        project = allProjects.projects.find(
          (project) => project.id === projectId
        );
        if (project) {
          setSubProjectTasks(
            project.subProjects.find((subproject) => subproject.tasks)
          );
        }
      }
    }
  }, [projectId, subprojectId]);

  return subProjectTasks;
};

const mod = {
  useGetProjects,
  useProject,
  useSubProjectsTasks,
};

export default mod;
