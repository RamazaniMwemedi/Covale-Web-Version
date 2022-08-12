import * as React from "react";
import { Box } from "@mui/system";
import { Avatar, Button, Skeleton, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import AddIcCallRoundedIcon from "@mui/icons-material/AddIcCallRounded";
import VideoCallRoundedIcon from "@mui/icons-material/VideoCallRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { useTheme } from "@mui/styles";

export default function LinearColor() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gridGap: "10px",
      }}
    >
      {Array.from({ length: 1 }, (_, i) => (
        <>
          <Person />
          <Friend />
        </>
      ))}
    </Box>
  );
}

const Friend = () => {
  const [requestSent, setRequestSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  return (
    <Box
      sx={{
        borderRadius: "10px",
        width: "155%",
        padding: "3px",
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "lightgray",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px",
        alignItems: "center",
      }}
    >
      <Skeleton
        sx={{
          display: "flex",
          marginTop: "10px",
          borderTopRightRadius: "5px",
          borderTopLeftRadius: "5px",
        }}
        height={"55px"}
        width={"100%"}
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
        <Skeleton variant="circular" height={48} width={48} />{" "}
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
            <Skeleton variant="text" height={16} width={100} />{" "}
            <Skeleton variant="text" height={16} width={100} />
          </Box>
          <Box sx={{ textAlign: "left" }}>
            <Skeleton variant="text" height={16} width={80} />
          </Box>
        </Box>
        <br />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Skeleton varaint="text" height={18} width={35} />
        <Skeleton varaint="text" height={18} width={35} />
        <Skeleton varaint="text" height={18} width={35} />
      </Box>
      <Box
        sx={{
          display: "flow",
        }}
      >
        <Skeleton variant='rect' height={30} width={"95%"} />
        
        <Skeleton variant='rect' sx={{}} height={30} width={"95%"} />

        
      </Box>
    </Box>
  );
};

const Person = ({ user, logedinUser }) => {
  const theme = useTheme();
  const [requestSent, setRequestSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  // User age
  const age = 12;
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
              <Typography variant="body1">{"user.firstname"}</Typography>
              <Typography variant="body1">{"user.lastname"}</Typography>
            </Box>
            <Box sx={{ textAlign: "left" }}>
              <Typography variant="caption">@{"user.username"}</Typography>
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
            Gender: {"user.gender"}
          </Typography>
          <Typography
            sx={{
              fontWeight: "bold",
            }}
            variant="caption"
          >
            Friends: {"user.friends.length"}
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
