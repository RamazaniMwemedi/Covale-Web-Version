import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { useState } from "react";

import ProjectSectionTop from "./ProjectSectionTop";
import ProjectSectionBottom from "./ProjectSectionBottom";
import TasksViews from "./TasksViews";

const ProjectSection = () => {
  const router = useRouter();
  const project = router.query.project;

  const [value, setValue] = useState("Tasks");
  const [taskViewValue, setTaskViewValue] = useState("kanban");

  const valueChangeHandler = (e, newValue) => {
    setValue(newValue);
  };

  const taskViewValueChangeHandler = (e, newValue) => {
    setTaskViewValue(newValue);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <ProjectSectionTop
        valueChangeHandler={valueChangeHandler}
        value={value}
      />
      <ProjectSectionBottom
        taskViewValue={taskViewValue}
        value={value}
        taskViewValueChangeHandler={taskViewValueChangeHandler}
      />
      <TasksViews taskViewValue={taskViewValue} />
    </Box>
  );
};
export default ProjectSection;
