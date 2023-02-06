import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { useState } from "react";
const { useSelector } = require("react-redux");

import ProjectSectionTop from "./ProjectSectionTop";
import ProjectSectionBottom from "./ProjectSectionBottom";
import TasksViews from "./TasksViews";
import { useProject, useSubProjectsTasks } from "../../../hooks/projects";
import { useTheme } from "@mui/styles";

// Get a projects which much the Project Id

const ProjectSection = () => {
  const router = useRouter();
  const projectId = router.query.project;
  const subProjectId = router.query.subproject;
  const project = useProject(projectId);
  const tasks = useSubProjectsTasks(projectId, subProjectId);
  const [tabValue, setTabValue] = useState("Tasks");
  const [taskViewValue, setTaskViewValue] = useState("kanban");

  const theme = useTheme();

  const valueChangeHandler = (e, newValue) => {
    setTabValue(newValue);
  };

  const taskViewValueChangeHandler = (e, newValue) => {
    setTaskViewValue(newValue);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        backgroundColor: theme.colors.background,
      }}
    >
      {project ? (
        <>
          <ProjectSectionTop
            project={project}
            valueChangeHandler={valueChangeHandler}
            value={tabValue}
          />
          <ProjectSectionBottom
            taskViewValue={taskViewValue}
            value={tabValue}
            taskViewValueChangeHandler={taskViewValueChangeHandler}
            project={project}
          />
          <ComponetToDisplayTasks
            tabValue={tabValue}
            taskViewValue={taskViewValue}
            project={project}
          />
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

const ComponetToDisplayTasks = ({ tabValue, taskViewValue, project }) => {
  switch (tabValue) {
    case "Tasks":
      return <TasksViews taskViewValue={taskViewValue} project={project} />;

    default:
      return null;
  }
};
