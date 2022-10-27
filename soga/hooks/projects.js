const { useEffect, useState } = require("react");
const { getProjects } = require("../services/projects");

const useGetProjects = (token) => {
  const [projects, setProjects] = useState(null);
  useEffect(() => {
    if (token) {
      getProjects(token).then((res) => {
        setProjects(res);
      });
    }

    return () => {};
  }, [token]);
  return projects;
};

module.exports = {
  useGetProjects,
};
