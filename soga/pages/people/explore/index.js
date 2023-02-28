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

// My Modules
import userServices from "../../../services/user";
import DrawerComponent from "../../components/others/DrawerComponent";
import PeopleLeft from "../../components/colleagues/PeopleLeft";
import DiscoverPeopleSkeleton from "../../components/colleagues/DiscoverPeopleSkeleton";

export default function Explore() {
  const [users, setUsers] = React.useState([]);
  const [logedinUser, setLogedinUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
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

  React.useEffect(() => {
    if (token) {
      userServices.allUsers(token).then((res) => {
        setUsers(res);
        setLoading(false);
      });
    }
  }, [token]);

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
          users={users}
          loading={loading}
          logedinUser={logedinUser}
          showSearchField={showSearchField}
          handleToggleShowSearch={handleToggleShowSearch}
        />
      </Box>
    </Box>
  );
}

const People = ({
  users,
  loading,
  logedinUser,
  showSearchField,
  handleToggleShowSearch,
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
            <FormControl sx={{ m: 1 }} variant="outlined">
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
              router.push("/people/friendrequests/requestsent");
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
        {loading ? (
          <DiscoverPeopleSkeleton />
        ) : users.length < 1 ? (
          <NoDiscToShow />
        ) : (
          <>
            {users.map((user) => (
              <Person user={user} key={user.id} logedinUser={logedinUser} />
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

const Person = ({ user, logedinUser }) => {
  const theme = useTheme();
  const [requestSent, setRequestSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);
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
            display: "flex",
            alignSelf: "flex-end",
          }}
          size="small"
        >
          <HighlightOffRoundedIcon fontSize="small" />
        </IconButton>
        <Box
          sx={{
            p: 1,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Avatar sx={{ width: 58, height: 58, textTransform: "uppercase" }}>
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
                userServices
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
                  }}
                  color="secondary"
                  onClick={() => {
                    setSending(true);
                    userServices
                      .addFriendById(user.id, logedinUser.token)
                      .then(() => {
                        setRequestSent(true);
                        setSending(false);
                      });
                  }}
                >
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
