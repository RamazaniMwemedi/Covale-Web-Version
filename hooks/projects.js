const { useEffect, useState } = require("react");
// React-Redux hooks
const { useDispatch, useSelector } = require("react-redux");

const { getProjects } = require("../services/projects");
const { addProjects } = require("../Redux/slices/projects");

const useGetProjects = (token) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      getProjects(token).then((res) => {
        dispatch(addProjects(res));
      });
    }

  }, [token]);
};

const useProject = (id) => {
  const allProjects = useSelector((state) => state.projects);
  const [project, setProject] = useState(null);
  useEffect(() => {
    if (allProjects.projects) {
      if (allProjects.projects.length > 0 && id) {
        setProject(allProjects.projects.find((project) => project.id === id));
      }
    }
  }, [allProjects, id]);

  return project;
};

const useSubProjectsTasks = (projectId, subprojectId) => {
  const allProjects = useSelector((state) => state.projects);
  const [subProjectTasks, setSubProjectTasks] = useState([]);
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

module.exports = {
  useGetProjects,
  useProject,
  useSubProjectsTasks,
};
