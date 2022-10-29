import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";

import ProjectSectionTop from "./ProjectSectionTop";
import ProjectSectionBottom from "./ProjectSectionBottom";

const ProjectSection = () => {
  const router = useRouter();
  const project = router.query.project;

  return (
    <Box sx={{
            height: "100vh",
            width: "100vw",
          }}>
      <ProjectSectionTop />
      <ProjectSectionBottom />{" "}
    </Box>
  );
};
export default ProjectSection;
