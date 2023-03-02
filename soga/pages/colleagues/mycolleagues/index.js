import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  ListItem,
  ListItemButton,
  OutlinedInput,
} from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@mui/styles";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SearchOffRoundedIcon from "@mui/icons-material/SearchOffRounded";
import { useState } from "react";

// My Modules
import DrawerComponent from "../../components/others/DrawerComponent";
import PeopleLeft from "../../components/colleagues/PeopleLeft";
import Friend from "../../components/colleagues/Friend";

import userServices from "../../../services/user";
import { useTheme } from "@emotion/react";

const useStyles = makeStyles({
  text: {
    "& :hover": {
      cursor: "progress",
    },
  },
});

export default function People() {
  const [friends, setFriends] = React.useState([]);
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();
  const theme = useTheme();
  const [showSearchField, setShowSearchField] = useState(false);

  const token = user ? user.token : null;
  const handleToggleShowSearch = () => {
    setShowSearchField((prev) => !prev);
  };
  // Loged in user from window.locationStorage
  React.useEffect(
    (router) => {
      const signedInUser = JSON.parse(
        window.localStorage.getItem("logedinUser")
      );
      if (!signedInUser) {
        router.push("/");
      }
      if (user === null) {
        setUser(signedInUser);
      }
    },
    [user]
  );

  // Get all my friends
  React.useEffect(() => {
    if (token) {
      userServices.myFriends(token).then((data) => {
        setFriends(data);
        setLoading(false);
      });
    }
  }, [token]);

  // Signout Handler
  const signoutHandler = () => {
    setUser(null);
    window.localStorage.removeItem("logedinUser");
    router.push("/login");
  };
  return (
    <Box sx={{ display: "flex", flex: 1 }}>
      <CssBaseline />
      <DrawerComponent signoutHandler={signoutHandler} user={user} />
      <PeopleLeft />
      <Box
        component="main"
        sx={{
          flex: 1,
          grow: 1,
          height: "100%",
          width: "100pc",
          marginLeft: "-4rem",
        }}
      >
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
            My Colleagues
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
              Colleagues Request Sent
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            flex: 1,
            grow: 1,
            height: "100%",
            marginLeft: "-4rem",
          }}
        >
          {loading ? (
            <p>Loading</p>
          ) : (
            <>
              {friends.length > 0 ? (
                <Friends friends={friends} token={token} />
              ) : (
                <NoFriends />
              )}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

const Friends = ({ friends, token }) => {
  return (
    <>
      <Box
        sx={{
          // Display Grid
          display: "grid",
          gridTemplateColumns: "200px 200px 200px ",
          gridColumnGap: "125px",
          marginLeft: "20px",
          marginTop: "30px",
          gridRowGap: "30px",
        }}
      >
        {friends.map((friend) => (
          <Friend key={friend.id} token={token} friend={friend} />
        ))}
      </Box>
    </>
  );
};

const NoFriends = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        textAlign: "center",
        justifyContent: "center",
        marginTop: "190px",
      }}
    >
      <Typography variant="h2">You Have No Friend Now</Typography>
      <br />
      <Button
        variant="contained"
        color="secondary"
        onClick={() => router.push("/colleagues/explore")}
      >
        Explore New People{" "}
      </Button>
    </Box>
  );
};

const Search = () => {
  return (
    <div id="search">
      <h1>Search field</h1>
    </div>
  );
};
