import { TabContext, TabPanel } from "@mui/lab";
import { Box } from "@mui/system";
import React from "react";
import KanbanView from "./KanbanView";
import ListView from "./ListView";
import TableView from "./TableView";
import TasksTabPanel from "./TasksTabPanel";

const TasksViews = ({
  subProject,
  taskStatus,
  project,
  handleShowFile,
  showChats,
}) => {
  const [value, setValue] = React.useState("kanban");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{}}>
      <TasksTabPanel
        taskViewValue={value}
        taskViewValueChangeHandler={handleChange}
      />
      <Box>
        <ViewToReturn
          taskViewValue={value}
          subProject={subProject}
          taskStatus={taskStatus}
          project={project}
          handleShowFile={handleShowFile}
          showChats={showChats}
        />
      </Box>
    </Box>
  );
};

export default TasksViews;

const ViewToReturn = ({
  taskViewValue,
  subProject,
  taskStatus,
  project,
  handleShowFile,
  showChats,
}) => {
  switch (taskViewValue) {
    case "kanban":
      return (
        <KanbanView
          subProject={subProject}
          taskStatus={taskStatus}
          project={project}
          handleShowFile={handleShowFile}
          showChats={showChats}
        />
      );
    case "table":
      return (
        <TableView
          subProject={subProject}
          taskStatus={taskStatus}
          project={project}
        />
      );
    case "list":
      return (
        <ListView
          subProject={subProject}
          taskStatus={taskStatus}
          project={project}
        />
      );
    default:
      return (
        <KanbanView
          subProject={subProject}
          taskStatus={taskStatus}
          project={project}
        />
      );
  }
};
