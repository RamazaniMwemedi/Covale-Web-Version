import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { useState } from "react";

import ProjectSectionTop from "./ProjectSectionTop";
import ProjectSectionBottom from "./ProjectSectionBottom";

const ProjectSection = () => {
  const router = useRouter();
  const project = router.query.project;

  const [value, setValue] = useState("Tasks");

  const valueChangeHandler = (e, newValue) => {
    setValue(newValue);
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
      <ProjectSectionBottom value={value} />{" "}
    </Box>
  );
};
export default ProjectSection;
