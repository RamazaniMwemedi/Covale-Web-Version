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
import { useTheme } from "@mui/material/styles";

export default function Chat({ message }) {
  const router = useRouter();
  const id = router.query.id;
  const theme = useTheme();
  const lastMessage = message
    ? message.messages[message.messages.length - 1].message
    : null;

  return (
    <List
      sx={{
        backgroundColor: theme.colors.background,
      }}
    >
      {message ? (
        <ListItem
          button
          onClick={(e) => {
            e.preventDefault();
            router.push(
              `/chats/?c=c&id=${message.id}`,
              `/chats/c/${message.id}`,
              {
                shallow: true,
              }
            );
          }}
          sx={{
            borderRadius: "0.5rem",
            boxShadow: message.id === id ? 1 : "unset",
            backgroundColor:
              message.id == id ? theme.colors.background1 : "unset",
            "&:hover": {
              boxShadow: 3,
            },
            marginTop: "-8px",
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
              {lastMessage.length > 30
                ? lastMessage.substring(0, 30) + "..."
                : lastMessage}
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
      ) : null}
    </List>
  );
}
