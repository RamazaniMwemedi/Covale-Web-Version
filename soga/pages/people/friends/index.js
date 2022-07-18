import { ListItem, ListItemButton } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@mui/styles";
// My Modules
import DrawerComponent from "../../components/DrawerComponent";
import PeopleLeft from "../../components/PeopleLeft";
import Friend from "../../components/Friend";
import Loader from "../../components/Loader"

import userServices from "../../services/user";

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
  const [loading, setLoading] = React.useState(true)
  const router = useRouter();

  const token = user ? user.token : null;

  // Loged in user from window.locationStorage
  React.useEffect((router) => {
    const signedInUser = JSON.parse(window.localStorage.getItem("logedinUser"));
    if (!signedInUser) {
      router.push("/");
    }
    if (user === null) {
      setUser(signedInUser);
    }
  }, [user]);

  // Get all my friends
  React.useEffect(() => {
    if (token) {
      userServices.myFriends(token).then((data) => {
        setFriends(data)
        setLoading(false)
      });
    }
  }, [token]);

  // Signout Handler
  const signoutHandler = () => {
    setUser(null);
    window.localStorage.removeItem("logedinUser");
    router.push("/");
  }
  return (
    <Box sx={{ display: "flex", flex: 1 }}>
      <CssBaseline />
      <DrawerComponent signoutHandler={signoutHandler} user={user} />
      <PeopleLeft />
      <Box
        component="main"
        sx={{
          backgroundColor: "aliceblue",
          flex: 1,
          grow: 1,
          height: "100%",
          width: "100pc",
          marginLeft: "-4rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <h1 style={{ color: "purple" }}>Your Friends</h1>
         
          <div
            className="redirectToSentReq"
            onClick={() => {
              router.push("/people/friendrequests/requestsent");
            }}
          >
            <Typography
              variant="caption"
              sx={{
                borderRadius: "15px",
                borderStyle: "solid",
                borderColor: "plum",
                borderWidth: "1.5px",
                padding: "8px",
              }}
            >
              Friend Request Sent
            </Typography>
          </div>
        </div>
        {loading ? (
          <Loader />
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
  const classes = useStyles();

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
      <div className="redirect" >
        <Typography
          variant="h5"
          className={classes.text}
          color="secondary"
          onClick={() => router.push("/people/explore")}
        >
          Explore New People{" "}
        </Typography>
      </div>
    </Box>
  );
};

const Search = () => { 
  return(
    <div id="search">
    <h1>Search field</h1>
    </div>
  )
 }