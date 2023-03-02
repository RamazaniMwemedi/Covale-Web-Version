import Box from "@mui/material/Box";
import * as React from "react";
import { useRouter } from "next/router";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SearchOffRoundedIcon from "@mui/icons-material/SearchOffRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";

// My Modules
import DrawerComponent from "../../components/others/DrawerComponent";
import PeopleLeft from "../../components/colleagues/PeopleLeft";
import PersonRequest from "../../components/colleagues/PersonRequest";
import userServices from "../../../services/user";
import { useTheme } from "@mui/system";

export default function Explore() {
  const [users, setUsers] = React.useState([]);
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();
  const [showSearchField, setShowSearchField] = React.useState(false);
  const theme = useTheme();

  const token = user ? user.token : null;
  const handleToggleShowSearch = () => {
    setShowSearchField((prev) => !prev);
  };

  React.useEffect(() => {
    // Loged in user from localStorage
    const signedInUser = JSON.parse(localStorage.getItem("logedinUser"));
    if (!signedInUser) {
      router.push("/");
    } else {
      setUser(signedInUser);
    }
  }, []);

  React.useEffect(() => {
    if (token) {
      userServices.friendReqRecieved(token).then((res) => {
        setUsers(res);
        setLoading(false);
      });
    }
  }, [token]);

  // Signout Handler
  const signoutHandler = () => {
    localStorage.removeItem("logedinUser");
    setUser(null);
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
      {" "}
      {/* <CssBaseline /> */}
      <DrawerComponent signoutHandler={signoutHandler} user={user} />
      <PeopleLeft />{" "}
      <Box
        sx={{
          flex: 1,
          grow: 1,
          height: "100%",
          marginLeft: "-4rem",
        }}
      >
        <Box
          sx={{
            // flex: 1,
            // grow: 1,
            height: "100%",
          }}
        >
          {" "}
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
              Colleague Requests
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
                  router.push("/colleagues/colleaguerequests/sent");
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
                Colleagues Request Sent
              </Button>
            </Box>
          </Box>
          {loading ? (
            <p>Loadind</p>
          ) : (
            <>
              {users.length > 0 ? (
                <People users={users} token={token} />
              ) : (
                <NoFriendsRequest />
              )}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

const People = ({ users, token }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "10px",
      }}
    >
      {users.map((user) => (
        <PersonRequest key={user.id} user={user} token={token} />
      ))}
    </Box>
  );
};

const NoFriendsRequest = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        textAlign: "center",
        justifyContent: "center",
        marginTop: "190px",
      }}
    >
      <Typography variant="h5">
        You Have No Friend Request At The Momemt
      </Typography>
      <br />
      <Button
        variant="contained"
        color="secondary"
        size="small"
        onClick={() => router.push("/colleagues/explore")}
      >
        Explore New People{" "}
      </Button>
    </Box>
  );
};
