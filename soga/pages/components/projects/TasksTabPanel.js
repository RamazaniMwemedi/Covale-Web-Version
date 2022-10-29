import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import KanbanLabbel from "./KanbanLabel";
import TableLabbel from "./TablePanelLabbel";
import ListPanelLable from "./ListTabLable";

export default function ColorTabs() {
  const [value, setValue] = React.useState("kanban");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="action"
        indicatorColor="unset"
        aria-label="secondary tabs example"
      >
        <Tab
          value="kanban"
          sx={{ textTransform: "none" }}
          label={<KanbanLabbel value={value} />}
        />
        <Tab
          value="table"
          sx={{ textTransform: "none" }}
          label={<TableLabbel value={value} />}
        />
        <Tab
          value="list"
          sx={{ textTransform: "none" }}
          label={<ListPanelLable value={value} />}
        />
      </Tabs>
    </Box>
  );
}
