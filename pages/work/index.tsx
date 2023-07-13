import React from "react";
import {
  Box,
  useTheme,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  Button,
  Link,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import PersonRemoveAlt1RoundedIcon from "@mui/icons-material/PersonRemoveAlt1Rounded";
import LoadingButton from "@mui/lab/LoadingButton";
import { grey } from "@mui/material/colors";

// My components
import DrawerComponent from "../components/others/DrawerComponent";
import WorktLeft from "../components/work/WorkLeft";

// Hooks
import {
  useCheckLogedinUser,
  useCheckLogedinUserToken,
} from "../../hooks/hooks";

// Services
// import { addFriendById, cancelFriendRequest } from "../../services/user";
// Extra
import LoadingLogo from "../components/others/LoadingLogo";
import { useSelector } from "react-redux";
import { RootState, ThemeInterface } from "../../interfaces/myprofile";
import PostRight from "../components/profile/PostRight";

// Redux

const Work = () => {
  const userLoading = useCheckLogedinUser();
  const userStore = useSelector((state: RootState) => state.user);
  const theme: ThemeInterface = useTheme();
  const [requestSent, setRequestSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  // const token = useCheckLogedinUserToken();
  return (
    <>
      {userLoading ? (
        <LoadingLogo />
      ) : (
        <Box
          sx={{
            display: "flex",
            height: "100%",
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
                  gridTemplateColumns: "55% 45%", // set explicit column widths
                  gridTemplateRows: "auto", // set the row height to auto
                  gap: "1rem",
                  width: "90%",
                  p: 2,
                  // ml: 7,
                  "@media screen and (max-width: 1400px)": {
                    gridTemplateColumns: "repeat(auto-fit, minmax(100%, 1fr))",
                    placeItems: "center",
                  },
                }}
              >
                {/* Post Left */}
                <Box
                  sx={{
                    width: "100%",
                  }}
                >
                  <PostRight />
                </Box>
                {/* Post Right */}
                <Box
                  sx={{
                    overflowY: "scroll",
                    p: 5,
                  }}
                >
                  {/* Connections to know */}
                  <Box
                    sx={{
                      bgcolor: theme.colors.background1,
                      p: 1,
                      borderRadius: 3,
                    }}
                  >
                    <Typography pl={2} variant="h5">
                      Connections you may know
                    </Typography>
                    <List>
                      {Array.from({ length: 4 }).map((_, i) => (
                        <ListItem key={i}>
                          <ListItemButton
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              borderRadius: 2,
                            }}
                          >
                            <Box display={"flex"}>
                              <ListItemAvatar>
                                <Avatar></Avatar>
                              </ListItemAvatar>
                              <Box>
                                <Typography
                                  variant="subtitle2"
                                  fontWeight={700}
                                >
                                  Hello
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  @Hello
                                </Typography>
                              </Box>
                            </Box>

                            <Box
                              sx={{
                                display: "flex",
                                // justifyContent: "space-between",
                              }}
                            >
                              {requestSent ? (
                                <Button
                                  variant="contained"
                                  sx={{
                                    width: "100px",
                                    height: "30px",
                                    margin: "5px",
                                    textTransform: "unset",
                                    display: "flex",
                                    gap: "20%",
                                    bgcolor: grey[500],
                                  }}
                                  color="inherit"
                                  // onClick={() => {
                                  //   cancelFriendRequest(user.id, token).then(() =>
                                  //     setRequestSent(false)
                                  //   );
                                  // }}
                                >
                                  <PersonRemoveAlt1RoundedIcon fontSize="small" />{" "}
                                  Cancel
                                </Button>
                              ) : (
                                <>
                                  {sending ? (
                                    <LoadingButton
                                      loading
                                      variant="contained"
                                      color="secondary"
                                      sx={{
                                        margin: "5px",
                                        height: "35px",
                                        alignSelf: "center",
                                      }}
                                    />
                                  ) : (
                                    <Button
                                      variant="contained"
                                      sx={{
                                        width: "100px",
                                        height: "30px",
                                        margin: "5px",
                                        textTransform: "unset",
                                        display: "flex",
                                        gap: "20%",
                                      }}
                                      color="secondary"
                                      // onClick={() => {
                                      //   setSending(true);
                                      //   addFriendById(user.id, token).then(() => {
                                      //     setRequestSent(true);
                                      //     setSending(false);
                                      //   });
                                      // }}
                                    >
                                      <PersonAddAlt1RoundedIcon fontSize="small" />
                                      Connect
                                    </Button>
                                  )}
                                  <br />
                                </>
                              )}
                            </Box>
                          </ListItemButton>
                        </ListItem>
                      ))}
                      <ListItem>
                        <ListItemButton
                          sx={{
                            borderRadius: 2,
                          }}
                        >
                          <Link
                            sx={{
                              p: 0,
                              color: (theme) => theme.palette.secondary.main,
                            }}
                            underline="none"
                            href="/colleagues/explore"
                          >
                            See more
                          </Link>
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </Box>
                  {/* Organization to follow */}
                  <br />
                  <Box
                    sx={{
                      bgcolor: theme.colors.background1,
                      p: 1,
                      borderRadius: 3,
                    }}
                  >
                    <Typography pl={2} variant="h5">
                      Organization to follow
                    </Typography>
                    <List>
                      {Array.from({ length: 4 }).map((_, i) => (
                        <ListItem key={i}>
                          <ListItemButton
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              borderRadius: 2,
                            }}
                          >
                            <Box display={"flex"}>
                              <ListItemAvatar>
                                <Avatar sx={{ borderRadius: 1 }}></Avatar>
                              </ListItemAvatar>
                              <Box>
                                <Typography
                                  variant="subtitle2"
                                  fontWeight={700}
                                >
                                  Hello
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  @Hello
                                </Typography>
                              </Box>
                            </Box>

                            <Box
                              sx={{
                                display: "flex",
                                // justifyContent: "space-between",
                              }}
                            >
                              {requestSent ? (
                                <Button
                                  variant="contained"
                                  sx={{
                                    width: "100px",
                                    height: "30px",
                                    margin: "5px",
                                    textTransform: "unset",
                                    display: "flex",
                                    gap: "20%",
                                    bgcolor: grey[500],
                                  }}
                                  color="inherit"
                                  // onClick={() => {
                                  //   cancelFriendRequest(user.id, token).then(() =>
                                  //     setRequestSent(false)
                                  //   );
                                  // }}
                                >
                                  Unfollow
                                </Button>
                              ) : (
                                <>
                                  {sending ? (
                                    <LoadingButton
                                      loading
                                      variant="contained"
                                      color="secondary"
                                      sx={{
                                        margin: "5px",
                                        height: "35px",
                                        alignSelf: "center",
                                      }}
                                    />
                                  ) : (
                                    <Button
                                      variant="contained"
                                      sx={{
                                        width: "100px",
                                        height: "30px",
                                        margin: "5px",
                                        textTransform: "unset",
                                        display: "flex",
                                        gap: "20%",
                                      }}
                                      color="secondary"
                                      // onClick={() => {
                                      //   setSending(true);
                                      //   addFriendById(user.id, token).then(() => {
                                      //     setRequestSent(true);
                                      //     setSending(false);
                                      //   });
                                      // }}
                                    >
                                      Follow
                                    </Button>
                                  )}
                                  <br />
                                </>
                              )}
                            </Box>
                          </ListItemButton>
                        </ListItem>
                      ))}
                      <ListItem>
                        <ListItemButton
                          sx={{
                            borderRadius: 2,
                          }}
                        >
                          <Link
                            sx={{
                              p: 0,
                              color: (theme) => theme.palette.secondary.main,
                            }}
                            underline="none"
                            href="/work/organizations/explore"
                          >
                            See more
                          </Link>
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </Box>
                  {/* Connection Request */}
                  <br />
                  <Box
                    sx={{
                      bgcolor: theme.colors.background1,
                      p: 1,
                      borderRadius: 3,
                    }}
                  >
                    <Typography pl={2} variant="h5">
                      Connection Requests
                    </Typography>
                    <List>
                      {Array.from({ length: 4 }).map((_, i) => (
                        <ListItem key={i}>
                          <ListItemButton
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              borderRadius: 2,
                            }}
                          >
                            <Box display={"flex"}>
                              <ListItemAvatar>
                                <Avatar ></Avatar>
                              </ListItemAvatar>
                              <Box>
                                <Typography
                                  variant="subtitle2"
                                  fontWeight={700}
                                >
                                  Hello
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  @Hello
                                </Typography>
                              </Box>
                            </Box>

                            <Box
                              sx={{
                                display: "flex",
                                // justifyContent: "space-between",
                              }}
                            >
                              {requestSent ? (
                                <Button
                                  variant="contained"
                                  sx={{
                                    width: "100px",
                                    height: "30px",
                                    margin: "5px",
                                    textTransform: "unset",
                                    display: "flex",
                                    gap: "20%",
                                    bgcolor: grey[500],
                                  }}
                                  color="inherit"
                                  // onClick={() => {
                                  //   cancelFriendRequest(user.id, token).then(() =>
                                  //     setRequestSent(false)
                                  //   );
                                  // }}
                                >
                                  Unfollow
                                </Button>
                              ) : (
                                <>
                                  {sending ? (
                                    <LoadingButton
                                      loading
                                      variant="contained"
                                      color="secondary"
                                      sx={{
                                        margin: "5px",
                                        height: "35px",
                                        alignSelf: "center",
                                      }}
                                    />
                                  ) : (
                                    <Button
                                      variant="contained"
                                      sx={{
                                        width: "100px",
                                        height: "30px",
                                        margin: "5px",
                                        textTransform: "unset",
                                        display: "flex",
                                        gap: "20%",
                                      }}
                                      color="secondary"
                                      // onClick={() => {
                                      //   setSending(true);
                                      //   addFriendById(user.id, token).then(() => {
                                      //     setRequestSent(true);
                                      //     setSending(false);
                                      //   });
                                      // }}
                                    >
                                      Follow
                                    </Button>
                                  )}
                                  <br />
                                </>
                              )}
                            </Box>
                          </ListItemButton>
                        </ListItem>
                      ))}
                      <ListItem>
                        <ListItemButton
                          sx={{
                            borderRadius: 2,
                          }}
                        >
                          <Link
                            sx={{
                              p: 0,
                              color: (theme) => theme.palette.secondary.main,
                            }}
                            underline="none"
                            href="/work/organizations/explore"
                          >
                            See more
                          </Link>
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </Box>
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

Work.propTypes = {};

export default Work;
