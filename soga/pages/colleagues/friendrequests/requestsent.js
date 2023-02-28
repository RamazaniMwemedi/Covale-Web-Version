import Box from "@mui/material/Box";
import * as React from "react";
import { useRouter } from "next/router";

// My Modules
import DrawerComponent from "../../components/others/DrawerComponent";
import PeopleLeft from "../../components/colleagues/PeopleLeft";
import PersonRequestSent from "../../components/colleagues/PersonRequestSent";
import userServices from "../../../services/user";
import { IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Explore() {
  const [reqSent, sentReqSent] = React.useState([]);
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();

  const token = user ? user.token : null;
  const secreteToken = user ? user.secreteToken : null;
  console.log("Token: ", token);
  console.log("Secrete Token: ", secreteToken);
  // Remove user from reqSent array
  const removeUser = (id) => {
    const newReqSent = reqSent.filter((user) => user.id !== id);
    sentReqSent(newReqSent);
  };

  React.useEffect(
    (router) => {
      // Loged in user from localStorage
      const signedInUser = localStorage.getItem("logedinUser");
      if (!signedInUser) {
        router.push("/");
      }
      if (user === null) {
        setUser(JSON.parse(signedInUser));
      }
    },
    [user]
  );

  React.useEffect(() => {
    if (token) {
      //   Requset sent requests
      userServices.friendReqSent(token).then((res) => {
        sentReqSent(res);
        setLoading(false);
      });
    }
  }, [token]);



  return (
    <Box sx={{ display: "flex", flex: 1 }}>
      {/* <CssBaseline /> */}
      <DrawerComponent  />
      <PeopleLeft />
      <Box
        sx={{
          flex: 1,
          grow: 1,
          height: "100%",
          marginLeft: "-3rem",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <IconButton
            sx={{
              height: "3rem",
              width: "3rem",
              boxShadow: 1,
            }}
            onClick={() => router.back()}
          >
            <ArrowBackIcon
              color="secondary"
              sx={{
                height: "2rem",
                width: "3rem",
              }}
            />
          </IconButton>
          <h1 style={{ color: "purple" }}>Friend Request Sents</h1>
        </div>
        {loading ? (
          <p>Loadind</p>
        ) : (
          <>
            {reqSent.length > 0 ? (
              <People reqSent={reqSent} removeUser={removeUser} token={token} />
            ) : (
              <NoFriendsRequestSent />
            )}
          </>
        )}
      </Box>
    </Box>
  );
}

const People = ({ reqSent, token, removeUser }) => {
  return (
    <Box
      sx={{
        // backgroundColor: "dodgerblue",
        // display:"flex",
        // Items to be in grid
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gridGap: "1rem",
        // gridAutoRows: "minmax(200px, auto)",
        // gridAutoFlow: "row dense",
        // gridAutoColumns: "minmax(200px, auto)",
      }}
    >
      {reqSent.map((user) => (
        <PersonRequestSent
          key={user.id}
          removeUser={removeUser}
          user={user}
          token={token}
        />
      ))}
    </Box>
  );
};

const NoFriendsRequestSent = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        textAlign: "center",
        justifyContent: "center",
        marginTop: "190px",
      }}
    >
      <Typography variant="h3">Sent friend request will appear here</Typography>
      <br />
    </Box>
  );
};
