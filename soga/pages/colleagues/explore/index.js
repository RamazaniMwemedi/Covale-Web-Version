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

// My Modules
import exploreColleagueservices from "../../../services/user";
import DrawerComponent from "../../components/others/DrawerComponent";
import PeopleLeft from "../../components/colleagues/PeopleLeft";
import DiscoverPeopleSkeleton from "../../components/colleagues/DiscoverPeopleSkeleton";
import { useDispatch, useSelector } from "react-redux";

import { removeColleagueFromExplore } from "../../../Redux/slices/colleagues";
import { useExploreColleagus } from "../../../hooks/colleagues";

export default function Explore() {
  const colleagueStore = useSelector((state) => state.colleagues);
  const exploreColleagues = colleagueStore.colleagues
    ? colleagueStore.colleagues.explore
    : null;
  const [logedinUser, setLogedinUser] = React.useState(null);
  const router = useRouter();
  const theme = useTheme();

  const [showSearchField, setShowSearchField] = useState(false);

  const token = logedinUser ? logedinUser.token : null;

  const handleToggleShowSearch = () => {
    setShowSearchField((prev) => !prev);
  };

  React.useLayoutEffect(() => {
    // Loged in user from localStorage
    const signedInUser = localStorage.getItem("logedinUser");
    if (!signedInUser) {
      router.push("/");
    }
    if (logedinUser === null) {
      setLogedinUser(JSON.parse(signedInUser));
    }
  }, [logedinUser]);

  useExploreColleagus(token);

  // Signout Handler
  const signoutHandler = () => {
    localStorage.removeItem("logedinUser");
    router.push("/login");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        height: "100vh",
        bgcolor: theme.colors.background,
      }}
    >
      {/* <CssBaseline /> */}
      <DrawerComponent user={logedinUser} signoutHandler={signoutHandler} />
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
          logedinUser={logedinUser}
          showSearchField={showSearchField}
          handleToggleShowSearch={handleToggleShowSearch}
          token={token}
        />
      </Box>
    </Box>
  );
}

const People = ({
  exploreColleagues,
  logedinUser,
  showSearchField,
  handleToggleShowSearch,
  token,
}) => {
  const theme = useTheme();
  const router = useRouter();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: "center",
          position: "sticky",
          top: "0",
          bgcolor: theme.colors.background1,
          p: 1,
          zIndex: 1,
        }}
      >
        <Typography variant="h4" color="secondary">
          Connect with Colleagues
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {showSearchField ? (
            <FormControl
              sx={{
                m: 1,
              }}
              variant="outlined"
            >
              <OutlinedInput
                startAdornment={
                  <InputAdornment
                    sx={{
                      marginLeft: "-15px",
                    }}
                    position="start"
                  >
                    <IconButton onClick={handleToggleShowSearch}>
                      <SearchOffRoundedIcon color="secondary" />
                    </IconButton>
                  </InputAdornment>
                }
                id="outlined-adornment-password"
                type="text"
                sx={{
                  height: "35px",
                  borderRadius: "15px",
                }}
                color="secondary"
              />
            </FormControl>
          ) : (
            <IconButton onClick={handleToggleShowSearch}>
              <SearchRoundedIcon color="secondary" />
            </IconButton>
          )}
          <Button
            onClick={() => {
              router.push("/colleagues/friendrequests/requestsent");
            }}
            variant="contained"
            sx={{
              ml: 1,
              borderRadius: "8px",
              borderColor: "plum",
              borderWidth: "1.5px",
              padding: "8px",
              textTransform: "unset",
              height: "25px",
            }}
            color="secondary"
          >
            Connections sent
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          // Display Grid
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, 210px)",
          // gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 2,
          alignContent: "center",
          justifyContent: "center",
          pt: 1,
        }}
      >
        {!exploreColleagues ? (
          <DiscoverPeopleSkeleton />
        ) : exploreColleagues.length < 1 ? (
          <NoDiscToShow />
        ) : (
          <>
            {exploreColleagues.map((user) => (
              <Person
                user={user}
                key={user.id}
                token={token}
                logedinUser={logedinUser}
              />
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
      <Typography variant="h2">No Discovery at the moment</Typography>
    </Box>
  );
};

const Person = ({ user, logedinUser, token }) => {
  const theme = useTheme();
  const [requestSent, setRequestSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const dispatch = useDispatch();

  const removeColleague = async () => {
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
          onClick={removeColleague}
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
                width: "95%",
                margin: "5px",
                alignSelf: "center",
              }}
              color="error"
              onClick={() => {
                exploreColleagueservices
                  .cancelFriendRequest(user.id, logedinUser.token)
                  .then(setRequestSent(false));
              }}
            >
              Cancel requestSent
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
                      .addFriendById(user.id, logedinUser.token)
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
