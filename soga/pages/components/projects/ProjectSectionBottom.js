import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import Typography from "@mui/material/Typography";
import TasksTabPanel from "./TasksTabPanel";

const ProjectSectionBottom = ({
  value,
  taskViewValue,
  taskViewValueChangeHandler,
}) => {
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <TabPanel value="Tasks">
          <Box
            sx={{
              margin: "-20px",
            }}
          >
            <TasksTabPanel
              taskViewValueChangeHandler={taskViewValueChangeHandler}
              taskViewValue={taskViewValue}
            />
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
