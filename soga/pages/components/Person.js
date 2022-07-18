import * as React from "react";
import Box from "@mui/material/Box";
import { Avatar, Divider, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import LoadingButton from "@mui/lab/LoadingButton";

import userServices from "../../services/user";

const useStyle = makeStyles({
  typographyDetails: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    backgroundColor: "white",
  },
  username: {
    marginLeft: "90px",
  },
});

export default function Person({ user }) {
  const [logedinUser, setLogedinUser] = React.useState({});
  const [requestSent, setRequestSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  // User from localStorage
  React.useEffect(() => {
    const signedInUser = window.localStorage.getItem("logedinUser");
    const signedInUserObject = JSON.parse(signedInUser);

    setLogedinUser(signedInUserObject);
  }, [logedinUser]);
  const classes = useStyle();
  // User age
  const age = new Date().getFullYear() - user.birthday.split("-")[0];
  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "10px",
          width: "115%",
          padding: "3px",
          borderStyle: "solid",
          borderWidth: "1px",
          borderColor: "lightgray",
          "&:hover": {
            boxShadow: 4,
          },
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
}
