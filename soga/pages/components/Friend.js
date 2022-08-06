import React, { useState } from "react";
import { Box, Typography, Avatar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import AddIcCallRoundedIcon from "@mui/icons-material/AddIcCallRounded";
import VideoCallRoundedIcon from "@mui/icons-material/VideoCallRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

// My modules
import chatServices from "../../services/chats";

const Friend = ({ friend, token }) => {
  const [messege, setMessege] = useState("");

  // onSubmit messege
  const submitMessegeHandler = (e) => {
    e.preventDefault();
    if (messege.length > 0) {
      chatServices.sendMessege(friend.id, token, messege).then(() => {
        //  Alart message sent successfully
        window.alert("Messege sent successfully");
      }).catch(() => {
        //  Alart message sent failed
        window.alert("Messege sent failed");
      }
      );
    } else {
      window.alert("You can't send an empty message");
    }
  };

  // Friend Component
  return (
    <>
      {friend && (
        <Box
          sx={{
            borderRadius: "10px",
            width: "155%",
            padding: "3px",
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "lightgray",
            "&:hover": {
              boxShadow: 4,
            },
          }}
        >
          {/* <Box
            sx={{
              backgroundImage: `linear-gradient(to right, purple, green)`,
              width: "100%",
              height: "80px",
              display: "flex",
              marginTop: "10px",
              borderTopRightRadius: "5px",
              borderTopLeftRadius: "5px",
            }}
          />{" "} */}
          <Box
            sx={{
              marginTop: "25px",
              display: "flex",
            }}
          >
            <Avatar
              alt="Remy Sharp"
              sx={{
                width: "70px",
                height: "70px",
                margin: "10px",
              }}
            />
            {/* Friend Details */}
            <Box
              sx={{
                marginTop: "35px",
                // marginLeft: "-10px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  marginTop: "-15px",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 1,
                }}
              >
                <Typography variant="h6">{friend.firstname}</Typography>
                <Typography variant="h6">{friend.lastname}</Typography>
              </Box>
              <Box sx={{ textAlign: "left" }}>
                <Typography variant="caption">@{friend.username}</Typography>
              </Box>
            </Box>
          </Box>
          {/* Communicate shortcuts */}
          <Box
            sx={{
              display: "flex",
            }}
          >
            <FormControl
              sx={{ m: 1, width: "23ch" }}
              variant="outlined"
              onSubmit={(e) => {
                submitMessegeHandler(e);
              }}
            >
              <OutlinedInput
                startAdornment={
                  <InputAdornment
                    sx={{
                      marginLeft: "-15px",
                    }}
                    position="start"
                  >
                    <IconButton>
                      <AddCircleRoundedIcon color="secondary" />
                    </IconButton>
                  </InputAdornment>
                }
                id="outlined-adornment-password"
                type="text"
                value={messege}
                onChange={(e) => {
                  setMessege(e.target.value);
                }}
                sx={{
                  height: "35px",
                  borderRadius: "15px",
                }}
                color="secondary"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={(e) => {
                        submitMessegeHandler(e);
                      }}
                      edge="end"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="purple"
                        // class="bi bi-send-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                      </svg>
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box
              sx={{
                display: "flex",
              }}
            >
              <IconButton>
                <AddIcCallRoundedIcon color="secondary" />
              </IconButton>
              <IconButton>
                <VideoCallRoundedIcon color="secondary" />
              </IconButton>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Friend;
