import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { useState } from "react";

import ProjectSectionTop from "./ProjectSectionTop";
import ProjectSectionBottom from "./ProjectSectionBottom";
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
  const [showChats, setShowChats] = useState(false);

  const toggleShowChat = () => setShowChats((prev) => !prev);
  const theme = useTheme();

  const valueChangeHandler = (e, newValue) => {
    e.preventDefault();
    setTabValue(newValue);
  };

  const taskViewValueChangeHandler = (e, newValue) => {
    setTaskViewValue(newValue);
  };

  return (
    <Box
      sx={{
        // height: "100vh",
        width: "100%",
        backgroundColor: theme.colors.background,
        // display: "grid",
        placeItems: !project && "center",
      }}
    >
      {project ? (
        <>
          <ProjectSectionTop
            project={project}
            valueChangeHandler={valueChangeHandler}
            value={tabValue}
            toggleShowChat={toggleShowChat}
            showChats={showChats}
          />
          <ProjectSectionBottom
            taskViewValue={taskViewValue}
            value={tabValue}
            taskViewValueChangeHandler={taskViewValueChangeHandler}
            showChats={showChats}
            project={project}
          />
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            textAlign: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h3">Choose a project to</Typography>

          <Typography variant="h3"> begin working on it</Typography>
        </Box>
      )}
    </Box>
  );
};
export default ProjectSection;
