import Box from "@mui/material/Box";
import * as React from "react";
import { useRouter } from "next/router";
import { Typography } from "@mui/material";

// My Modules
import DrawerComponent from "../../components/others/DrawerComponent";
import PeopleLeft from "../../components/colleagues/PeopleLeft";
import PersonRequest from "../../components/colleagues/PersonRequest";
import userServices from "../../../services/user";

export default function Explore() {
  const [users, setUsers] = React.useState([]);
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();

  const token = user ? user.token : null;

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
    <Box sx={{ display: "flex", flex: 1 }}>
      {/* <CssBaseline /> */}
      <DrawerComponent signoutHandler={signoutHandler} user={user} />
      <PeopleLeft />
      <Box
        sx={{
          flex: 1,
          grow: 1,
          height: "100%",
          marginLeft: "-3rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <h1 style={{ color: "purple" }}>Colleague Requests</h1>
          <div
            className="redirectToSentReq"
            onClick={() => {
              router.push("/colleagues/friendrequests/requestsent");
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
              Colleague Request Sent
            </Typography>
          </div>
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
      <Typography variant="h2">
        You Have No Friend Request At The Momemt
      </Typography>
      <br />
      <div className="redirect">
        <Typography
          variant="h5"
          color="secondary"
          onClick={() => router.push("/colleagues/explore")}
        >
          Explore New People{" "}
        </Typography>
      </div>
    </Box>
  );
};
