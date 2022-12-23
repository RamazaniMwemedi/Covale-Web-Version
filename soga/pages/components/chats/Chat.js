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

export default function Chat({ chat }) {
  const router = useRouter();
  const id = router.query.id;
  const theme = useTheme();
  // messages
  const messages = chat ? chat.messages : null;
  // last message
  const lastMessage =messages? messages[messages.length - 1].message : "";

  return (
    <List
      sx={{
        backgroundColor: theme.colors.background,
      }}
    >
      {chat ? (
        <ListItem
          onClick={(e) => {
            e.preventDefault();
            router.push(`/chats/?c=c&id=${chat.id}`, `/chats/c/${chat.id}`, {
              shallow: true,
            });
          }}
          sx={{
            // border style
            borderStyle: " solid ",
            // border color
            borderColor: theme.colors.background1,
            // border width
            borderWidth: "1px",
            borderRadius: "0.5rem",
            boxShadow: chat.id === id ? 1 : "unset",
            backgroundColor: chat.id == id ? theme.colors.background1 : "unset",
            "&:hover": {
              boxShadow: 3,
            },
            marginTop: "-8px",
          }}
        >
          <Avatar
            alt={chat.friendUsername[0]}
            src="https://material-ui.com/static/images/avatar/1.jpg"
          >
            {chat.friendUsername[0]}
          </Avatar>
          <Box
            sx={{
              marginLeft: "5px",
            }}
          >
            <Typography variant="subtitle1">{chat.friendUsername}</Typography>
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
