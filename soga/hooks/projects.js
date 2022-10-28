const { useEffect, useState } = require("react");
// React-Redux hooks
const { useDispatch } = require("react-redux");

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

module.exports = {
  useGetProjects,
};
