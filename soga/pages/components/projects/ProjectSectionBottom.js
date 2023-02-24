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
import TeamChats from "./teamMessages";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/styles";
import { Avatar } from "@mui/material";
import FileIcone from "../mediaFiles/FileIcon";
import moment from "moment";
const ProjectSectionBottom = ({ value, project, showChats }) => {
  const theme = useTheme();
  const teamStore = useSelector((state) => state.teams);
  const teamList = teamStore ? teamStore.teams : null;
  const allProjectTeams = new Array();

  for (let index = 0; index < project.teams.length; index++) {
    const teamId = project.teams[index];
    const team = teamList.find((team) => team.id == teamId);
    allProjectTeams.push(team);
  }

  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleSelectTeam = (teamId) => {
    setSelectedTeam(allProjectTeams.find((team) => team.id == teamId));
  };

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
            // width: "40%",
            bgcolor: theme.colors.background1,
            borderTop: `1px solid ${theme.colors.border}`,
          }}
        >
          {!selectedTeam && (
            <Box>
              {allProjectTeams.map((team) => {
                const lastMessageObject = team.messages
                  ? team.messages[team.messages.length - 1]
                  : null;
                console.log("Last message :>>", lastMessageObject);
                const lastMessage = lastMessageObject
                  ? lastMessageObject.message
                  : "";
                return (
                  <Box
                    sx={{
                      bgcolor: theme.colors.textBackground,
                      p: 1,
                      m: 1,
                      boxShadow: 1,
                      borderRadius: "5px",
                      display: "flex",
                    }}
                    key={team.id}
                    onClick={() => handleSelectTeam(team.id)}
                  >
                    <Avatar>{team.teamName[0]}</Avatar>
                    <Box>
                      <Typography variant="body1">{team.teamName}</Typography>
                      <Box
                        sx={{
                          bgcolor: theme.colors.textBackground2,
                          p: 1,
                          m: 1,
                          boxShadow: 1,
                          borderRadius: "5px",
                          width: "240px",
                          display: "flex",
                          gap: 2,
                        }}
                      >
                        <Avatar
                          sx={{
                            height: 20,
                            width: 20,
                            fontSize: "10px",
                          }}
                        >
                          {lastMessageObject.sender.firstname[0]}
                          {lastMessageObject.sender.lastname[0]}
                        </Avatar>
                        <Box>
                          <Typography variant="body2">
                            {lastMessageObject.sender.firstname}{" "}
                            {lastMessageObject.sender.lastname}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              gap: "5px",
                            }}
                          >
                            {lastMessageObject.file.map((file) => (
                              <FileIcone
                                fileType={file.fileType}
                                height={20}
                                width={20}
                              />
                            ))}
                            <Typography variant="body2">
                              {lastMessage}
                            </Typography>
                            <Typography variant="caption">
                              {moment(lastMessage.createdAt).format(
                                "dd DD, MMMM"
                              )}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          )}
          {selectedTeam && <TeamChats selectedTeam={selectedTeam} />}
        </Box>
      )}
    </Box>
  );
};

export default ProjectSectionBottom;
