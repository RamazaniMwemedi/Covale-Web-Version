import React, { useState } from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import AddIcCallRoundedIcon from "@mui/icons-material/AddIcCallRounded";
import VideoCallRoundedIcon from "@mui/icons-material/VideoCallRounded";

import LoadingButton from "@mui/lab/LoadingButton";

import userServices from "../services/user";

const PersonRequest = ({ user, token }) => {
  
  const [accepting, setAccepeting] = useState(false);
  const [showCommunication, setShowCommunication] = useState(false)
  return (
    <Box
      sx={{
        backgroundColor: "white",
        width: "300px",
        borderRadius: "15px",
      }}
    >
      <br />
      {/* Top Box */}
      <Box
        sx={{
          display: "flex",
          alignContent: "center",
          gap: 1.5,
        }}
      >
        {/* Avatar */}
        <Avatar
          sx={{
            width: "80px",
            height: "80px",
            marginLeft: "10px",
          }}
        />
        {/* User detail e.g. Fast, last and username */}
        <Box>
          {/* Fastname and Lastname */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <Typography variant="h6">{user.firstname}</Typography>
            <Typography variant="h6">{user.lastname}</Typography>
          </Box>
          <Typography variant="caption">@{user.username}</Typography>
        </Box>
      </Box>
      <br />
      {/* Buttons Box */}
      {/* If Communication is true */}
      {showCommunication ? (
        <CommunnicationShortCut/>
      ) : (  
      <Box
        sx={{
          display: "flex",
          alignContent: "center",
          gap: 2,
          marginLeft: "20px",
        }}
      >
        {
          // If the user is accepting the request
          accepting ? (
            <LoadingButton
              variant="contained"
              color="primary"
              size="large"
              disabled={true}
              loading={true}
            />
          ) : (
            <Button
              variant="contained"
              color="success"
              sx={{
                width: "120px",
              }}
              onClick={() => {
                setAccepeting(true);
                userServices.acceptFriendRequest(user.id, token).then(
                  (res) => {
                    setShowCommunication(true)
                  }
                );
              }}
            >
              Accept
            </Button>
          )
        }
        <Button
          variant="outlined"
          color="secondary"
          sx={{
            width: "120px",
          }}
          onClick={() => {
            userServices.removeFriendRequest(user.id, token);
          }}
        >
          {" "}
          Reject
        </Button>
      </Box>
      )
      }
      <br />
    </Box>
  );
};

export default PersonRequest;

const CommunnicationShortCut=()=>{
  return(
    // {/* Communicate shortcuts */}
      <Box sx={{ display: "flex" }}>
        <FormControl sx={{ m: 1, width: "23ch" }} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-password"
            type="text"
            onChange={() => {}}
            sx={{
              height: "40px",
              borderRadius: "15px",
            }}
            color="secondary"
            endAdornment={
              <InputAdornment position="end">
                <IconButton edge="end">
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
  )
}