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

export default function Team({ team }) {
  const router = useRouter();
  const id = router.query.id;
  const theme = useTheme();
  return (
    <List
      sx={{
        backgroundColor: theme.colors.background,
      }}
    >
      {team && (
        <ListItem
          button
          onClick={(e) => {
            e.preventDefault();
            router.push(`/chats/?t=t&id=${team.id}`, `/chats/t/${team.id}`, {
              shallow: true,
            });
          }}
          sx={{
            borderRadius: "0.5rem",
            boxShadow: team.id === id ? 1 : "unset",
            backgroundColor:
              team.id === id ? theme.colors.background1 : "unset",
            "&:hover": {
              // backgroundColor: ,
              // boxShadow: 1,
            },
            // border style
            borderStyle: " solid ",
            // border color
            borderColor: theme.colors.background1,
            // border width
            borderWidth: "1px",
            marginTop: "-8px",
          }}
        >
          <Avatar
          >
            T
          </Avatar>
          <Box
            sx={{
              marginLeft: "5px",
            }}
          >
            <Typography variant="subtitle1">{team.teamName} </Typography>
            {/* Show the first 25 characters only else add ... */}
            <Typography variant="body2">
              Last message
              {/* {message.lastMessege.length > 30
                ? message.lastMessege.substring(0, 30) + "..."
                : message.lastMessege} */}
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
