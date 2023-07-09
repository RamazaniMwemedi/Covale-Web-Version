import { Box, useTheme, CssBaseline } from "@mui/material";
import React from "react";
import { RootState, ThemeInterface } from "../../../interfaces/myprofile";
import DrawerComponent from "../../components/others/DrawerComponent";
import { useSelector } from "react-redux";
import LoadingLogo from "../../components/others/LoadingLogo";
import { useCheckLogedinUser } from "../../../hooks/hooks";

const Profile = () => {
  const theme: ThemeInterface = useTheme();
 useCheckLogedinUser();
  const userStore = useSelector((state: RootState) => state.user);
  const user = userStore?.user;
  return (
    <Box sx={{ height: "100vh", bgcolor: theme.colors.background }}>
      {user ? (
        <Box sx={{ display: "flex", flex: 1 }}>
          <CssBaseline />
          <DrawerComponent />
        </Box>
      ) : (
        <LoadingLogo />
      )}
    </Box>
  );
};

export default Profile;
