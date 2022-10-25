import React from "react";
import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useTheme } from "@mui/material/styles";

// My components
import DrawerComponent from "../components/DrawerComponent";
import ProjectLeft from "../components/ProjectLeft";

// Hooks
import { useCheckLogedinUser } from "../../hooks/hooks";
import LoadingLogo from "../components/LoadingLogo";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../../Redux/slices/user";
// Redux
import PropTypes from "prop-types";

const Project = (props) => {
  const theme = useTheme();
  const userLoading = useCheckLogedinUser();
  const userStore = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const signoutHandler = () => {
    localStorage.removeItem("logedinUser");
    userStore = null;
    router.push("/login");
    dispatch(removeUser());
  };

  return (
    <>
      {userLoading ? (
        <LoadingLogo />
      ) : (
        <Box
          sx={{
            display: "flex",
            height: "100vh",
          }}
        >
          <CssBaseline />
          {userStore.user ? (
            <>
              <DrawerComponent
                signoutHandler={signoutHandler}
                user={userStore.user}
              />
              <ProjectLeft />
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
