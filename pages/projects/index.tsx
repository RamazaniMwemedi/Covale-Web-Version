import React from "react";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

// My components
import DrawerComponent from "../components/others/DrawerComponent";
import ProjectLeft from "../components/projects/ProjectLeft";
import ProjectSection from "../components/projects/ProjectSection";

// Hooks
import {
  useCheckLogedinUser,
  useCheckLogedinUserToken,
} from "../../hooks/hooks";
import LoadingLogo from "../components/others/LoadingLogo";
import { useSelector,  } from "react-redux";
// Redux
import { useGetProjects } from "../../hooks/projects";
import { useGetTeams } from "../../hooks/teams";
import { RootState } from "../../interfaces/myprofile";

const Project = () => {
  const userLoading = useCheckLogedinUser();
  const userStore = useSelector((state: RootState) => state.user);
  
  const token = useCheckLogedinUserToken();
  

  // Hooks
  useGetProjects(token);
  useGetTeams(token);


  return (
    <>
      {userLoading ? (
        <LoadingLogo />
      ) : (
        <Box
          sx={{
            display: "flex",
            height: "100vh",
            width: "100vw",
          }}
        >
          <CssBaseline />
          {userStore.user ? (
            <>
              <DrawerComponent />
              <ProjectLeft />
              <ProjectSection />
            </>
          ) : (
            <LoadingLogo />
          )}
        </Box>
      )}
    </>
  );
};

Project.propTypes = {};

export default Project;
