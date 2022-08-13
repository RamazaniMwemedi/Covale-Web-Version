import Box from "@mui/material/Box";
import * as React from "react";
import { useRouter } from "next/router";
import { Avatar, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
import LoadingButton from "@mui/lab/LoadingButton";

// My Modules
import userServices from "../../../services/user";
import DrawerComponent from "../../components/DrawerComponent";
import PeopleLeft from "../../components/PeopleLeft";
import DiscoverPeopleSkeleton from "../../components/DiscoverPeopleSkeleton";

export default function Explore() {
  const [users, setUsers] = React.useState([]);
  const [logedinUser, setLogedinUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();

  const token = logedinUser ? logedinUser.token : null;

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
    setUser(null);
    localStorage.removeItem("logedinUser");
    router.push("/");
  };

  return (
    <Box sx={{ display: "flex", flex: 1 }}>
      {/* <CssBaseline /> */}
      <DrawerComponent user={logedinUser} signoutHandler={signoutHandler} />
      <PeopleLeft />
      <Box
        sx={{
          flex: 1,
          grow: 1,
          height: "100%",
          width: "100pc",
          marginLeft: "-4rem",
        }}
      >
        <People users={users} loading={loading} logedinUser={logedinUser} />
      </Box>
    </Box>
  );
}

const People = ({ users, loading, logedinUser }) => {
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
      </Box>
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
          <DiscoverPeopleSkeleton />
        ) : users.length < 1 ? (
          <NoDiscToShow />
        ) : (
          users.map((user) => (
            <Box key={user.id}>
              <Person user={user} logedinUser={logedinUser} />
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
  // User age
  const age = new Date().getFullYear() - user.birthday.split("-")[0];
  return (
    <>
      <Box
        sx={{
          borderRadius: "10px",
          width: "115%",
          padding: "3px",
          borderStyle: "solid",
          borderWidth: "1px",
          borderColor: "lightgray",
          "&:hover": {
            boxShadow: 4,
          },
          backgroundColor: theme.colors.background1,
        }}
      >
        <Box
          sx={{
            backgroundImage: `linear-gradient(to right, purple, green)`,
            width: "100%",
            height: "55px",
            display: "flex",
            marginTop: "10px",
            borderTopRightRadius: "5px",
            borderTopLeftRadius: "5px",
          }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            gap: 2,
            marginTop: "-10px",
            padding: "-10px",
          }}
        >
          <Avatar sx={{ width: 48, height: 48 }} />
          <Box
            sx={{
              marginTop: "7px",
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
            </Box>
          </Box>
        </Box>
        <br />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
            }}
            variant="caption"
          >
            Age: {age}
          </Typography>
          <Typography
            sx={{
              fontWeight: "bold",
            }}
            variant="caption"
          >
            Gender: {user.gender}
          </Typography>
          <Typography
            sx={{
              fontWeight: "bold",
            }}
            variant="caption"
          >
            Friends: {user.friends.length}
          </Typography>
        </Box>
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
                    width: "95%",
                    margin: "5px",
                    height: "35px",
                    alignSelf: "center",
                  }}
                />
              ) : (
                <Button
                  variant="contained"
                  sx={{
                    width: "95%",
                    margin: "5px",
                    alignSelf: "center",
                  }}
                  color="success"
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
                  Add
                </Button>
              )}
              <br />
              <Button
                sx={{
                  width: "95%",
                  margin: "5px",
                }}
                variant="outlined"
              >
                Remove
              </Button>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};
