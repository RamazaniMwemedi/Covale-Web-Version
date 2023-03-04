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
import TopComponent from "../../components/colleagues/TopComponent";
import { useSelector } from "react-redux";
import { useCheckLogedinUser } from "../../../hooks/hooks";
import { useExploreColleagus } from "../../../hooks/colleagues";

const useStyles = makeStyles({
  text: {
    "& :hover": {
      cursor: "progress",
    },
  },
});

export default function People() {
  const [friends, setFriends] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
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

  // Get all my friends
  React.useEffect(() => {
    if (token) {
      userServices.myFriends(token).then((data) => {
        setFriends(data);
        setLoading(false);
      });
    }
  }, [token]);

  return (
    <Box sx={{ height: "100vh", bgcolor: theme.colors.background }}>
      <Box sx={{ display: "flex", flex: 1 }}>
        <CssBaseline />
        <DrawerComponent />
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
          <TopComponent
            showSearchField={showSearchField}
            handleToggleShowSearch={handleToggleShowSearch}
            title="My Colleagues"
            routeText="Colleagues Request Sent"
            routeUrl="/colleagues/colleaguerequests/sent"
          />

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
      <Typography variant="h5">You have no colleagues yet.</Typography>
      <Typography variant="h5">Explore new people </Typography>
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

const Search = () => {
  return (
    <div id="search">
      <h1>Search field</h1>
    </div>
  );
};
