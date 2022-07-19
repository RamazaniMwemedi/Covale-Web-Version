import Box from "@mui/material/Box";
import * as React from "react";
import { useRouter } from "next/router";
import { Typography } from "@mui/material";

// My Modules
import userServices from "../../../services/user";
import DrawerComponent from "../../components/DrawerComponent";
import PeopleLeft from "../../components/PeopleLeft";
import Person from "../../components/Person";
import Loader from "../../components/Loader";

export default function Explore() {
  const [users, setUsers] = React.useState([]);
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();

  const token = user ? user.token : null;

  React.useEffect((router) => {
    // Loged in user from localStorage
    const signedInUser = localStorage.getItem("logedinUser");
    if (!signedInUser) {
      router.push("/");
    }
    if (user === null) {
      setUser(JSON.parse(signedInUser));
    }
  }, [user]);

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
    setUser(null);
    localStorage.removeItem("logedinUser");
    router.push("/");
  };

  return (
    <Box sx={{ display: "flex", flex: 1 }}>
      {/* <CssBaseline /> */}
      <DrawerComponent user={user} signoutHandler={signoutHandler} />
      <PeopleLeft />
      <Box
        sx={{
          backgroundColor: "aliceblue",
          flex: 1,
          grow: 1,
          height: "100%",
          width: "100pc",
          marginLeft: "-4rem",
        }}
      >
        <People users={users} loading={loading} />
      </Box>
    </Box>
  );
}

const People = ({ users, loading }) => {
  const router = useRouter();
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "purple" }}>Discover new Friends</h1>
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
      <Box
        sx={{
          // Display Grid
          display: "grid",
          gridTemplateColumns: "200px 200px 200px 200px ",
          gridGap: "40px",
          marginLeft: "20px",
          marginTop: "30px",
        }}
      >
        {loading ? (
          <Loader />
        ) : users.length < 1 ? (
          <NoDiscToShow />
        ) : (
          users.map((user) => (
            <Box key={user.id}>
              <Person user={user} />
            </Box>
          ))
        )}
      </Box>
    </>
  );
};

const NoDiscToShow = () => {
   return (
    <Box
      sx={{
        display:"flex",
        textAlign:"center",
        alignItems:"center",
        position:"absolute",
        marginLeft:"8%",
        marginTop:"13%",
      }}
    >
      <Typography variant="h2" >
        No Discovery at the moment
      </Typography>
    </Box>
   )
};
