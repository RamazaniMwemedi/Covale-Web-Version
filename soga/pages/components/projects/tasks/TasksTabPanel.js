import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import KanbanLabbel from "./KanbanLabel";
import TableLabbel from "./TablePanelLabbel";
import ListPanelLable from "./ListTabLable";

export default function TasksTabPanel({
  taskViewValue,
  taskViewValueChangeHandler,
}) {
  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={taskViewValue}
        onChange={taskViewValueChangeHandler}
        textColor="action"
        indicatorColor="unset"
        aria-label="secondary tabs example"
        sx={{
          borderRadius: "10px",
        }}
      >
        <Tab
          value="kanban"
          sx={{ textTransform: "none", borderRadius: "10px" }}
          label={<KanbanLabbel value={taskViewValue} />}
        />
        <Tab
          value="table"
          sx={{ textTransform: "none", borderRadius: "10px" }}
          label={<TableLabbel value={taskViewValue} />}
        />
        <Tab
          value="list"
          sx={{ textTransform: "none", borderRadius: "10px" }}
          onClick={() => {
            console.log("ListPanelLable clicked");
          }}
          label={<ListPanelLable value={taskViewValue} />}
        />
      </Tabs>
    </Box>
  );
}
