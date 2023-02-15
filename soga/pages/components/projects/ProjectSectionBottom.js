import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import Typography from "@mui/material/Typography";
import TasksTabPanel from "./tasks/TasksTabPanel";
import TasksViews from "./tasks/TasksViews";
import ProjectMember from "./ProjectMember";
const ProjectSectionBottom = ({ value, project }) => {
  return (
    <Box sx={{ width: "100%", typography: "body1" , overflow:"hidden"}}>
      <TabContext value={value}>
        <TabPanel value="Tasks">
          <Box
            sx={{
              margin: "-20px",
            }}
          >
            {" "}
            <TasksViews project={project} />
          </Box>
        </TabPanel>
        <TabPanel value="Overview">
          <Box
            sx={{
              margin: "-20px",
            }}
          >
            {" "}
            <Typography>Overviews</Typography>
          </Box>
        </TabPanel>
        <TabPanel value="Files">
          <Box
            sx={{
              margin: "-20px",
            }}
          >
            {" "}
            <Typography>Files</Typography>
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
            <ProjectMember />
          </Box>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default ProjectSectionBottom;
