import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import Typography from "@mui/material/Typography";
import TasksTabPanel from "./tasks/TasksTabPanel";
import TasksViews from "./tasks/TasksViews";
import ProjectMember from "./ProjectMember";
import { useRouter } from "next/router";
import FileDisplayComponent from "../mediaFiles/FileDisplayComponent";
import { useState } from "react";
import Files from "./files";
const ProjectSectionBottom = ({ value, project, showChats }) => {
  const router = useRouter();

  const subProject = router.query.subproject
    ? project.subProjects.find(
        (subProject) => subProject.id === router.query.subproject
      )
    : project.subProjects[0];

  // taskStatus
  const taskStatus = project.taskStatus;

  // All Tasks
  const allTasks = new Array();
  for (let index = 0; index < project.subProjects.length; index++) {
    const subProjectFromProject = project.subProjects[index];
    for (let index = 0; index < subProjectFromProject.tasks.length; index++) {
      const task = subProjectFromProject.tasks[index];
      allTasks.push(task);
    }
  }

  const [showFile, setShowFile] = useState(false);
  const [file, setFile] = useState(null);
  const handleShowFile = (file) => {
    // If file.fileUrl includes https:// then setFile to file and setShowVideoPlayer to true
    if (file.fileUrl.includes("https://")) {
      setFile(file);
      setShowFile(true);
    }
  };
  const handleCloseShowFile = () => {
    setShowFile(false);
  };

  return (
    <Box
      sx={{
        width: "100%",
        typography: "body1",
        overflow: "hidden",
        display: "flex",
      }}
    >
      {showFile && (
        <FileDisplayComponent
          handleCloseShowVideoPlayer={handleCloseShowFile}
          file={file}
        />
      )}

      <Box
        sx={{
          flex: 0.6,
        }}
      >
        <TabContext value={value}>
          <TabPanel value="Tasks">
            <Box
              sx={{
                margin: "-20px",
              }}
            >
              {" "}
              <TasksViews
                subProject={subProject}
                taskStatus={taskStatus}
                project={project}
                handleShowFile={handleShowFile}
                showChats={showChats}
              />
            </Box>
          </TabPanel>
          {/* <TabPanel value="Overview">
          <Box
            sx={{
              margin: "-20px",
            }}
          >
            {" "}
            <Typography>Overviews</Typography>
          </Box>
        </TabPanel> */}
          <TabPanel value="Files">
            <Box
              sx={{
                margin: "-20px",
              }}
            >
              {" "}
              <Files files={project.files} handleShowFile={handleShowFile} />
            </Box>
          </TabPanel>

          <TabPanel value="Members">
            <Box
              sx={{
                margin: "-20px",
              }}
            >
              {" "}
              <Typography variant="h2">Members</Typography>
              <ProjectMember
                members={project.members}
                managers={project.managers}
                taskStatus={project.taskStatus}
                allTasks={allTasks}
              />
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
      {showChats && (
        <Box
          sx={{
            flex: 0.4,
            height: "85vh",
            width: "40%",
            bgcolor: "red",
          }}
        ></Box>
      )}
    </Box>
  );
};

export default ProjectSectionBottom;
