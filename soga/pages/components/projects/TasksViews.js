import { TabContext, TabPanel } from "@mui/lab";
import { Box } from "@mui/system";
import React from "react";
import KanbanView from "./KanbanView";
import ListView from "./ListView";
import TableView from "./TableView";

const TasksViews = ({ taskViewValue }) => {
  return (
    <Box>
      <Box>
        <ViewToReturn taskViewValue={taskViewValue} />
      </Box>
    </Box>
  );
};

export default TasksViews;

const ViewToReturn = ({taskViewValue}) => {
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
