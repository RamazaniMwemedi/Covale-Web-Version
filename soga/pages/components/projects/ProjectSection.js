import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { useState } from "react";
const { useSelector } = require("react-redux");

import ProjectSectionTop from "./ProjectSectionTop";
import ProjectSectionBottom from "./ProjectSectionBottom";
import TasksViews from "./TasksViews";
import { useProject } from "../../../hooks/projects";

// Get a projects which much the Project Id

const ProjectSection = () => {
  const router = useRouter();
  const projectId = router.query.project;
  const allProjects = useSelector((state) => state.projects);
  const project = useProject(projectId);
  const [value, setValue] = useState("Tasks");
  const [taskViewValue, setTaskViewValue] = useState("kanban");

  const valueChangeHandler = (e, newValue) => {
    setValue(newValue);
  };

  const taskViewValueChangeHandler = (e, newValue) => {
    setTaskViewValue(newValue);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
      }}
    >
      {project ? (
        <>
          <ProjectSectionTop
            project={project}
            valueChangeHandler={valueChangeHandler}
            value={value}
          />
          <ProjectSectionBottom
            taskViewValue={taskViewValue}
            value={value}
            taskViewValueChangeHandler={taskViewValueChangeHandler}
            project={project}
          />
          <ComponetToDisplay taskViewValue={taskViewValue} project={project} />
        </>
      ) : (
        <Box>
          <Typography variant="h1">Click a project</Typography>
        </Box>
      )}
    </Box>
  );
};
export default ProjectSection;

const ComponetToDisplay = ({ taskViewValue, project }) => {
  switch (taskViewValue) {
    case "Task":
      return <TasksViews taskViewValue={taskViewValue} project={project} />;

    default:
      return <TasksViews taskViewValue={taskViewValue} project={project} />;
  }
};
