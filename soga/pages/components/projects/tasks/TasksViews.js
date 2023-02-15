import { TabContext, TabPanel } from "@mui/lab";
import { Box } from "@mui/system";
import React from "react";
import KanbanView from "./KanbanView";
import ListView from "./ListView";
import TableView from "./TableView";
import TasksTabPanel from "./TasksTabPanel";

const TasksViews = ({ taskViewValue }) => {
  const [value, setValue] = React.useState("kanban");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{
      width: "100%",
    }}>
      <TasksTabPanel
        taskViewValue={value}
        taskViewValueChangeHandler={handleChange}
      />
      <Box>
        <ViewToReturn taskViewValue={value} />
      </Box>
    </Box>
  );
};

export default TasksViews;

const ViewToReturn = ({ taskViewValue }) => {
  console.log("taskViewValue", taskViewValue);
  switch (taskViewValue) {
    case "kanban":
      return <KanbanView />;
    case "table":
      return <TableView />;
    case "list":
      return <ListView />;
    default:
      return <KanbanView />;
  }
};
