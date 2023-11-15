import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import {
  Avatar,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Box,
  Typography,
  Skeleton,
} from "@mui/material";
import { useTheme } from "@mui/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import PersonRemoveAlt1RoundedIcon from "@mui/icons-material/PersonRemoveAlt1Rounded";

// My Modules
import exploreColleagueservices from "../../../services/user";
import DrawerComponent from "../../components/others/DrawerComponent";
import PeopleLeft from "../../components/colleagues/PeopleLeft";
import { useDispatch, useSelector } from "react-redux";

import { removeColleagueFromExplore } from "../../../Redux/slices/colleagues";
import { useExploreColleagus } from "../../../hooks/colleagues";
import { removeColleague } from "../../../services/user";
import TopComponent from "../../components/colleagues/TopComponent";
import { grey } from "@mui/material/colors";
import { useCheckLogedinUser } from "../../../hooks/hooks";
import LoadingLogo from "../../components/others/LoadingLogo";
import {
  RootState,
  ThemeInterface,
  UserInterFace,
} from "../../../interfaces/myprofile";
import Image from "next/image";

export default function Explore() {
  const colleagueStore = useSelector((state: RootState) => state.colleagues);
  const exploreColleagues = colleagueStore.colleagues
    ? colleagueStore.colleagues.explore
    : null;
  const router = useRouter();
  const theme: ThemeInterface = useTheme();
  const [showSearchField, setShowSearchField] = useState(false);

  const userStore = useSelector((state: RootState) => state.user);
  const user = userStore.user ? userStore.user : null;
  const token = user ? user.token : null;

  useCheckLogedinUser();
  useExploreColleagus(token ? token : "");

  const handleToggleShowSearch = () => {
    setShowSearchField((prev) => !prev);
  };

  return (
    <>
      {user ? (
        <Box
          sx={{
            display: "flex",
            flex: 1,
            height: "100vh",
            bgcolor: theme.colors.background,
          }}
        >
          {/* <CssBaseline /> */}
          <DrawerComponent />
          <PeopleLeft />
          <Box
            sx={{
              flex: 1,
              grow: 1,
              height: "100%",
              marginLeft: "-4rem",
            }}
          >
            <People
              exploreColleagues={exploreColleagues}
              showSearchField={showSearchField}
              handleToggleShowSearch={handleToggleShowSearch}
              token={token}
            />
          </Box>
        </Box>
      ) : (
        <LoadingLogo />
      )}
    </>
  );
}

const People: React.FC<{
  exploreColleagues: UserInterFace[] | null;
  showSearchField: boolean;
  handleToggleShowSearch: () => void;
  token: string | null;
}> = ({
  exploreColleagues,
  showSearchField,
  handleToggleShowSearch,
  token,
}) => {
  const theme: ThemeInterface = useTheme();
  const router = useRouter();
  return (
    <>
      <TopComponent
        handleToggleShowSearch={handleToggleShowSearch}
        showSearchField={showSearchField}
        title="Connect with Colleagues"
        routeText="Connections sent"
        routeUrl="/colleagues/colleaguerequests/sent"
      />
      <Box
        sx={{
          p: 1,
        }}
      >
        {!exploreColleagues ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 2,
              alignContent: "center",
            }}
          >
            {Array.from({ length: 9 }).map((_, i) => (
              <Box
                key={i}
                sx={{
                  width: "300px",
                  borderRadius: "8px",
                  boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
                  // alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                }}
              >
                <Skeleton
                  variant="circular"
                  width={30}
                  height={30}
                  style={{ position: "absolute", top: 5, right: 5 }}
                />
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={150}
                  style={{ borderRadius: 8 }}
                />
                <Box
                  sx={{
                    p: 1,
                    display: "flex",
                    flexDirection: "column",
                    mt: -5,
                  }}
                >
                  <Box display={"flex"} justifyContent={"space-around"}>
                    <Skeleton variant="circular" width={80} height={80} />
                    <Box
                      sx={{
                        display: "flow",
                        mt: 5,
                      }}
                    >
                      <Skeleton
                        variant="rectangular"
                        width={100}
                        height={30}
                        style={{ margin: "5px", borderRadius: 8 }}
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      mt: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Skeleton variant="text" width={60} />
                      <Skeleton variant="text" width={60} />
                    </Box>
                    <Box sx={{ textAlign: "left" }}>
                      <Skeleton variant="text" width={80} />
                      <Skeleton variant="text" width={"100%"} />
                      <Skeleton variant="text" width={"80%"} />
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        ) : exploreColleagues.length < 1 ? (
          <NoDiscToShow />
        ) : (
          <>
            {exploreColleagues.map((user) => (
              <Person user={user} key={user.id} token={token} />
            ))}
          </>
        )}
      </Box>
    </>
  );
};

const NoDiscToShow = () => {
  return (
    <Box
      sx={{
        display: "flex",
        textAlign: "center",
        alignItems: "center",
        position: "absolute",
      }}
    >
      <Typography variant="h5">No Discovery at the moment</Typography>
    </Box>
  );
};

const Person: React.FC<{
  user: UserInterFace;
  token: string | null;
}> = ({ user, token }) => {
  const theme: ThemeInterface = useTheme();
  const [requestSent, setRequestSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const dispatch = useDispatch();

  const removeColleagueFromUser = async () => {
    if (!token) return;
    const res = await removeColleague(token, user.id);
    if (res) {
      dispatch(
        removeColleagueFromExplore({
          colleagueId: user.id,
        })
      );
    }
  };
  return (
    <>
      <Box
        sx={{
          width: "300px",
          borderRadius: "8px",
          boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
          backgroundColor: theme.colors.textBackground,
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <IconButton
          sx={{
            position: "absolute",
            top: 5,
            right: 5,
            bgcolor: theme.colors.textBackground2,
          }}
          size="small"
          onClick={removeColleagueFromUser}
        >
          <HighlightOffRoundedIcon fontSize="medium" />
        </IconButton>
        {user.coverPic.fileUrl ? (
          <Image
            alt="Cover Photo"
            src={user.coverPic.fileUrl}
            width={1000}
            height={1000}
            style={{
              height: 150,
              width: "100%",
              borderRadius: 8,
            }}
          />
        ) : (
          <Box
            sx={{
              height: 150,
              width: "100%",
              backgroundColor: (theme) => theme.palette.action.disabled,
              borderRadius: 8,
            }}
          />
        )}
        <Box
          sx={{
            p: 1,
            display: "flex",
            flexDirection: "column",
            mt: -5,
          }}
        >
          <Box display={"flex"} justifyContent={"space-around"}>
            <Avatar
              src={user.profilePic.fileUrl}
              sx={{ width: 80, height: 80, textTransform: "uppercase" }}
            >
              {user.firstname[0]}
              {user.lastname[0]}
            </Avatar>
            <Box
              sx={{
                display: "flow",
                mt: 5,
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
                  onClick={() => {
                    if (!token) return;
                    exploreColleagueservices
                      .cancelFriendRequest(user.id, token)
                      .then(() => setRequestSent(false));
                  }}
                >
                  <PersonRemoveAlt1RoundedIcon fontSize="small" /> Cancel
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
                      onClick={() => {
                        if (!token) return;
                        setSending(true);
                        exploreColleagueservices
                          .addFriendById(user.id, token)
                          .then(() => {
                            setRequestSent(true);
                            setSending(false);
                          });
                      }}
                    >
                      <PersonAddAlt1RoundedIcon fontSize="small" />
                      Connect
                    </Button>
                  )}
                  <br />
                </>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              mt: -2,
              // marginLeft: "-10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                // justifyContent: "space-evenly",
                gap: 1,
              }}
            >
              <Typography fontWeight={700} variant="body1">
                {user.firstname}
              </Typography>
              <Typography fontWeight={700} variant="body1">
                {user.lastname}
              </Typography>
            </Box>
            <Box sx={{ textAlign: "left" }}>
              <Typography variant="caption" color="text.secondary">
                @{user.username}
              </Typography>
              <br />
              <Typography variant="caption">
                {user.professionalSummary}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
