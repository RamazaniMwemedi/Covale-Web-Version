import React from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";

import userServices from "../../services/user";

const PersonRequest = ({ user, token, removeUser }) => {
  return (
    <>
      {user && (
        <Box
          sx={{
            width: "300px",
            borderRadius: "15px",
            boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
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
          <Box
            sx={{
              display: "flex",
              alignContent: "center",
              gap: 2,
              marginLeft: "20px",
            }}
          >
            <Button
              variant="contained"
              color="error"
              sx={{
                width: "95%",
              }}
              onClick={() => {
                userServices.cancelFriendRequest(user.id, token).then((res) => {
                  removeUser(user.id);
                });
              }}
            >
              Cancel Request
            </Button>
          </Box>
          <br />
        </Box>
      )}
    </>
  );
};

export default PersonRequest;
