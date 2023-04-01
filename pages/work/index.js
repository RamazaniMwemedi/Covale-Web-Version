import React from "react";
import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useTheme } from "@mui/material/styles";

// My components
import DrawerComponent from "../components/others/DrawerComponent";
import WorktLeft from "../components/work/WorkLeft";

// Hooks
import { useCheckLogedinUser } from "../../hooks/hooks";
import LoadingLogo from "../components/others/LoadingLogo";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../../Redux/slices/user";
// Redux
import PropTypes from "prop-types";

const Work = (props) => {
  const theme = useTheme();
  const userLoading = useCheckLogedinUser();
  const userStore = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const signoutHandler = () => {
    localStorage.removeItem("logedinUser");
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
              <WorktLeft user={userStore.user} />
            </>
          ) : (
            <LoadingLogo />
          )}
        </Box>
      )}
    </>
  );
};

Work.propTypes = {};

export default Work;
