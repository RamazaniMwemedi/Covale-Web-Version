const { useEffect, useState } = require("react");
// React-Redux hooks
const { useDispatch, useSelector } = require("react-redux");

const { getProjects } = require("../services/projects");
const { addProjects } = require("../Redux/slices/projects");

const useGetProjects = (token) => {
  const dispatch = useDispatch();
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    if (token) {
      getProjects(token).then((res) => {
        dispatch(addProjects(res));
        setProjects(res);
      });
    }

    return () => {
      setProjects(null);
    };
  }, [token]);
  return projects;
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

module.exports = {
  useGetProjects,
  useProject,
};
