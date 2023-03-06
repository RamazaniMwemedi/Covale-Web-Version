import Box from "@mui/material/Box";
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
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SearchOffRoundedIcon from "@mui/icons-material/SearchOffRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import PersonRemoveAlt1RoundedIcon from "@mui/icons-material/PersonRemoveAlt1Rounded";

// My Modules
import exploreColleagueservices from "../../../services/user";
import DrawerComponent from "../../components/others/DrawerComponent";
import PeopleLeft from "../../components/colleagues/PeopleLeft";
import DiscoverPeopleSkeleton from "../../components/colleagues/DiscoverPeopleSkeleton";
import { useDispatch, useSelector } from "react-redux";

import { removeColleagueFromExplore } from "../../../Redux/slices/colleagues";
import { useExploreColleagus } from "../../../hooks/colleagues";
import { removeColleague } from "../../../services/user";
import TopComponent from "../../components/colleagues/TopComponent";
import { grey } from "@mui/material/colors";
import { useCheckLogedinUser } from "../../../hooks/hooks";
import LoadingLogo from "../../components/others/LoadingLogo";

export default function Explore() {
  const colleagueStore = useSelector((state) => state.colleagues);
  const exploreColleagues = colleagueStore.colleagues
    ? colleagueStore.colleagues.explore
    : null;
  const router = useRouter();
  const theme = useTheme();
  const [showSearchField, setShowSearchField] = useState(false);

  const userStore = useSelector((state) => state.user);
  const user = userStore.user ? userStore.user : null;
  const token = user ? user.token : null;

  useCheckLogedinUser();
  useExploreColleagus(token);

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

const People = ({
  exploreColleagues,
  showSearchField,
  handleToggleShowSearch,
  token,
}) => {
  const theme = useTheme();
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
          // Display Grid
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, 210px)",
          // gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 2,
          alignContent: "center",
          justifyContent:
            exploreColleagues && exploreColleagues.length < 4
              ? "flex-start"
              : "center",
          pt: 1,
          pl: 1,
        }}
      >
        {!exploreColleagues ? (
          <DiscoverPeopleSkeleton />
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
        marginLeft: "8%",
        marginTop: "13%",
      }}
    >
      <Typography variant="h5">No Discovery at the moment</Typography>
    </Box>
  );
};

const Person = ({ user, token }) => {
  const theme = useTheme();
  const [requestSent, setRequestSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const dispatch = useDispatch();

  const removeColleagueFromUser = async () => {
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
          width: "200px",
          borderRadius: "8px",
          boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
          backgroundColor: theme.colors.textBackground,
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <IconButton
          sx={{
            position: "fixed",
            display: "flex",
            alignSelf: "flex-end",
            bgcolor: theme.colors.textBackground2,
          }}
          size="small"
          onClick={removeColleagueFromUser}
        >
          <HighlightOffRoundedIcon fontSize="medium" />
        </IconButton>
        <Box
          sx={{
            p: 1,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Avatar sx={{ width: 80, height: 80, textTransform: "uppercase" }}>
            {user.firstname[0]}
            {user.lastname[0]}
          </Avatar>
          <Box
            sx={{
              pt: "10px",
              marginLeft: "-10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                gap: 1,
              }}
            >
              <Typography variant="body1">{user.firstname}</Typography>
              <Typography variant="body1">{user.lastname}</Typography>
            </Box>
            <Box sx={{ textAlign: "left" }}>
              <Typography variant="caption">@{user.username}</Typography>
              <br />
              <Typography
                sx={{
                  fontWeight: "bold",
                }}
                variant="caption"
              >
                Gender: {user.gender}
              </Typography>
            </Box>
          </Box>
        </Box>
        <br />
        <Box
          sx={{
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        ></Box>
        <Box
          sx={{
            display: "flow",
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
              color="action"
              onClick={() => {
                exploreColleagueservices
                  .cancelFriendRequest(user.id, token)
                  .then(setRequestSent(false));
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
    </>
  );
};
