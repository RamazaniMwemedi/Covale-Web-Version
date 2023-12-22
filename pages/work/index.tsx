import React, { FC, useState } from "react";
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
  useMediaQuery,
  Toolbar,
  CircularProgress,
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
import hookHooks from "../../hooks/hooks";

// Services
// import { addFriendById, cancelFriendRequest } from "../../services/user";
// Extra
import LoadingLogo from "../components/others/LoadingLogo";
import { useSelector } from "react-redux";
import {
  RootState,
  ThemeInterface,
  UserInterFace,
} from "../../interfaces/myprofile";
import { AddANewPost } from "../components/profile/PostRight";
import { useGetAllPosts } from "../../hooks/work";
import Post from "../components/work/Post";
import { getConnectionsYouMayKnow } from "../../services/work";

// Redux

const Work = () => {
  const userLoading = hookHooks.useCheckLogedinUser();
  const userStore = useSelector((state: RootState) => state.user);
  const theme: ThemeInterface = useTheme();
  const isMobileView = useMediaQuery(() => theme.breakpoints.down("sm"));
  const isVerySmallPcView = useMediaQuery(() => theme.breakpoints.down("md"));
  const mapStateToProps = (state: RootState) => {
    const sortedState = state.work?.work.posts
      .slice()
      .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
    return sortedState;
  };
  const posts = useSelector((state: RootState) => mapStateToProps(state));
  const user = userStore?.user;
  // const { posts } = workStore.

  const loading = useGetAllPosts();

  return (
    <>
      {userLoading ? (
        <LoadingLogo />
      ) : (
        <>
          <CssBaseline />
          {userStore.user ? (
            <Box
              sx={{
                display: "flex",
                bgcolor: theme.colors.background,
              }}
            >
              <DrawerComponent />
              <WorktLeft />
              <Box
                sx={
                  !isMobileView
                    ? {
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }
                    : {}
                }
              >
                {/* Post Left */}
                <Box
                  sx={
                    !isMobileView
                      ? {
                          flex: isVerySmallPcView ? 1 : 0.6,
                        }
                      : {}
                  }
                >
                  <Box p={isVerySmallPcView ? 2 : 6}>
                    <AddANewPost />
                    <Toolbar />
                    {loading ? (
                      <Box
                        display={"grid"}
                        sx={{
                          placeItems: "center",
                          heigh: "100%",
                        }}
                      >
                        <CircularProgress color="secondary" size={30} />
                      </Box>
                    ) : (
                      <>
                        {posts.length > 0 ? (
                          posts.map((post) => (
                            <Post post={post} user={user} key={post.id} />
                          ))
                        ) : (
                          <Box
                            display={"grid"}
                            sx={{
                              placeItems: "center",
                              heigh: "100%",
                            }}
                          >
                            <Box
                              sx={{
                                bgcolor: (theme) => theme.palette.action.hover,
                                borderRadius: 4,
                                mt: 3,
                                p: 4,
                              }}
                            >
                              <Typography variant="h5">
                                No Post to show yet.
                              </Typography>
                              <Typography variant="body2" textAlign={"center"}>
                                Click on "Publish an Update" to create a post.
                              </Typography>
                            </Box>
                          </Box>
                        )}
                      </>
                    )}
                  </Box>
                </Box>
                {/* Post Right */}

                {!isMobileView && <RigthComponent />}
              </Box>{" "}
            </Box>
          ) : (
            <LoadingLogo />
          )}
        </>
      )}
    </>
  );
};

Work.propTypes = {};

export default Work;

const RigthComponent: FC = () => {
  const theme: ThemeInterface = useTheme();
  const [requestSent, setRequestSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const token = hookHooks.useCheckLogedinUserToken();
  const isVerySmallPcView = useMediaQuery(() => theme.breakpoints.down("md"));
  const [connectionsYouMightKnow, setConnectionsYouMightKnow] = useState<
    UserInterFace[]
  >([]);
  const [loadingConYMK, setLoadingConYMK] = useState(true);

  React.useEffect(() => {
    getConnectionsYouMayKnow(token)
      .then((res) => {
        setConnectionsYouMightKnow(res);
        setLoadingConYMK(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);
  return (
    <Box
      flex={0.4}
      sx={{
        position: "sticky",
        top: 55,
        display: isVerySmallPcView ? "none" : "block",
      }}
      p={5}
    >
      <Box
        // p={1}
        sx={{
          position: "sticky",
          top: 10,
          // Scrollable
          height: "90vh",
          overflow: "hidden", // Start with hidden overflow
          "&:hover": {
            overflow: "auto", // Change to visible overflow on hover
          },
        }}
        width={"95%"}
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
            {loadingConYMK ? (
              <Box
                display={"grid"}
                sx={{
                  placeItems: "center",
                  heigh: "100%",
                }}
              >
                <CircularProgress size={30} />
              </Box>
            ) : (
              <>
                {connectionsYouMightKnow &&
                  connectionsYouMightKnow.map((user) => (
                    <ListItem key={user.id}>
                      <ListItemButton
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          borderRadius: 2,
                        }}
                      >
                        <Box display={"flex"}>
                          <ListItemAvatar>
                            <Avatar
                              src={
                                user.profilePic ? user.profilePic.fileUrl : ""
                              }
                            >
                              {user.firstname[0]}
                              {user.lastname[0]}
                            </Avatar>
                          </ListItemAvatar>
                          <Box>
                            <Typography variant="subtitle2" fontWeight={700}>
                              {user.firstname} {user.lastname}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              @{user.username}
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
              </>
            )}

            <ListItem>
              <Link
                sx={{
                  p: 0,
                  color: (theme) => theme.palette.secondary.main,
                  width: "100%",
                }}
                underline="none"
                href="/colleagues/explore"
              >
                <ListItemButton
                  sx={{
                    borderRadius: 2,
                  }}
                >
                  See more
                </ListItemButton>
              </Link>
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
                      <Typography variant="subtitle2" fontWeight={700}>
                        Hello
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
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
              {" "}
              <ListItem>
                <Link
                  sx={{
                    p: 0,
                    color: (theme) => theme.palette.secondary.main,
                    width: "100%",
                  }}
                  underline="none"
                  href="/work/organizations/explore"
                >
                  <ListItemButton
                    sx={{
                      borderRadius: 2,
                    }}
                  >
                    See more
                  </ListItemButton>
                </Link>
              </ListItem>
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
                      <Avatar></Avatar>
                    </ListItemAvatar>
                    <Box>
                      <Typography variant="subtitle2" fontWeight={700}>
                        Hello
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
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
              <ListItem>
                <ListItem>
                  <Link
                    sx={{
                      p: 0,
                      color: (theme) => theme.palette.secondary.main,
                      width: "100%",
                    }}
                    underline="none"
                    href="/colleagues/colleaguerequests"
                  >
                    <ListItemButton
                      sx={{
                        borderRadius: 2,
                      }}
                    >
                      See more
                    </ListItemButton>
                  </Link>
                </ListItem>
              </ListItem>
            </ListItem>
          </List>
        </Box>
      </Box>
    </Box>
  );
};
