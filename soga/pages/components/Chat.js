import React, { useState, useEffect } from "react";
import {
  Avatar,
  List,
  ListItem,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useRouter } from "next/router";

export default function Chat({ message }) {
  const router = useRouter();
  const  id  = router.query.t;

  return (
    <List>
      {message && (
        <ListItem
          button
          onClick={(e) => {
            e.preventDefault();
            router.push(`/chats/?t=${message.chatId}`, undefined, {
              shallow: true,
            });
          }}
          sx={{
            borderRadius: "0.5rem",
            backgroundColor: message.chatId === id ? "whitesmoke" : "unset",
            "&:hover": {
              backgroundColor: "ghostwhite",
              boxShadow: 1,
            },
            // border style
            borderStyle: " solid ",
            // border color
            borderColor: "lightgrey",
            // border width
            borderWidth: "1px",
            marginTop:"-8px"
          }}
        >
          <Avatar
            alt={message.friendUsername[0]}
            src="https://material-ui.com/static/images/avatar/1.jpg"
          >
            {message.friendUsername[0]}
          </Avatar>
          <Box
            sx={{
              marginLeft: "5px",
            }}
          >
            <Typography variant="subtitle1">
              {message.friendUsername}
            </Typography>
            {/* Show the first 25 characters only else add ... */}
            <Typography variant="body2">
              {message.lastMessege.length > 30
                ? message.lastMessege.substring(0, 30) + "..."
                : message.lastMessege}
            </Typography>
          </Box>

          {/* <IconButton
          sx={{
            marginRight: "5px",
            right: "0",
            position: "absolute",
            
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "&:hover": {
              backgroundColor: "white",
            },
            // Rounded
            borderRadius: "50%",

          }}
        >
          <MoreVertIcon />{" "}
        </IconButton> */}
        </ListItem>
      )}
    </List>
  );
}
