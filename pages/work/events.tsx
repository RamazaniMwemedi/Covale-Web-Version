import React, { FC, useState } from "react";
import { Box, useTheme, Typography, Divider, Button } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

// My components
import DrawerComponent from "../components/others/DrawerComponent";
import WorktLeft from "../components/work/WorkLeft";

// Hooks
import { useCheckLogedinUser } from "../../hooks/hooks";

import LoadingLogo from "../components/others/LoadingLogo";
import { useSelector } from "react-redux";
import { RootState, ThemeInterface } from "../../interfaces/myprofile";
const Events = () => {
  const userLoading = useCheckLogedinUser();
  const userStore = useSelector((state: RootState) => state.user);
  const theme: ThemeInterface = useTheme();
  const [buttonIndex, setButtonIndex] = useState(0);
  return (
    <>
      {userLoading ? (
        <LoadingLogo />
      ) : (
        <Box
          sx={{
            display: "flex",
            height: "100vh",
            bgcolor: theme.colors.background,
          }}
        >
          <CssBaseline />
          {userStore.user ? (
            <>
              <DrawerComponent />
              <WorktLeft />
              <Box
                sx={{
                  display: "grid",
                  //   gridTemplateColumns: "55% 45%", // set explicit column widths
                  gridTemplateRows: "auto", // set the row height to auto
                  gap: "1rem",
                  width: "90%",
                  pt: 2,
                  // ml: 7,
                  //   "@media screen and (max-width: 1400px)": {
                  //     gridTemplateColumns: "repeat(auto-fit, minmax(100%, 1fr))",
                  //     placeItems: "center",
                  //   },
                }}
              >
                {/* Post Left */}
                <Box>
                  <Box>
                    <Typography variant="h5"> Events</Typography>
                    <br />
                    <Box display={"flex"} gap={1}>
                      <Button
                        variant="contained"
                        color="inherit"
                        sx={{
                          bgcolor:
                            buttonIndex === 0
                              ? (theme) => theme.palette.secondary.main
                              : theme.colors.background1,
                          "&:hover": {
                            bgcolor: (theme) => theme.palette.secondary.main,
                          },
                          textTransform: "none",
                          borderRadius: 2.5,
                        }}
                        size="small"
                      >
                        Upcoming
                      </Button>
                      <Button
                        variant="contained"
                        color="inherit"
                        sx={{
                          bgcolor:
                            buttonIndex === 1
                              ? (theme) => theme.palette.secondary.main
                              : theme.colors.background1,
                          "&:hover": {
                            bgcolor: (theme) => theme.palette.secondary.main,
                          },
                          textTransform: "none",
                          borderRadius: 2.5,
                        }}
                        size="small"
                      >
                        Invitations
                      </Button>
                      <Button
                        variant="contained"
                        color="inherit"
                        sx={{
                          bgcolor:
                            buttonIndex === 2
                              ? (theme) => theme.palette.secondary.main
                              : theme.colors.background1,
                          "&:hover": {
                            bgcolor: (theme) => theme.palette.secondary.main,
                          },
                          textTransform: "none",
                          borderRadius: 2.5,
                        }}
                        size="small"
                      >
                        Host
                      </Button>
                      <Button
                        variant="contained"
                        color="inherit"
                        sx={{
                          bgcolor:
                            buttonIndex === 3
                              ? (theme) => theme.palette.secondary.main
                              : theme.colors.background1,
                          "&:hover": {
                            bgcolor: (theme) => theme.palette.secondary.main,
                          },
                          textTransform: "none",
                          borderRadius: 2.5,
                        }}
                        size="small"
                      >
                        Past
                      </Button>
                    </Box>
                  </Box>
                  <br />
                  <Divider />
                </Box>
              </Box>{" "}
            </>
          ) : (
            <LoadingLogo />
          )}
        </Box>
      )}
    </>
  );
};

export default Events;
