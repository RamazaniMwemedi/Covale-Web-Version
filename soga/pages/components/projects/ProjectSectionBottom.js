import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Typography from "@mui/material/Typography";
import TasksTabPanel from "./TasksTabPanel";



const ProjectSectionBottom = ({ value }) => {
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <TabPanel value="Tasks">
          <Box
            sx={{
              margin: "-20px",
            }}
          >
            <TasksTabPanel/>
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
        <TabPanel value="Members">
          <Box
            sx={{
              margin: "-20px",
            }}
          >
            {" "}
            <Typography>Members</Typography>
          </Box>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default ProjectSectionBottom;
