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
import { timeAgo } from "../../../tools/tools";
import { decryptMessage } from "../../../services/encrypt";
import { useSelector } from "react-redux";

export default function Chat({ chat }) {
  const router = useRouter();
  const id = router.query.id;
  const theme = useTheme();
  // messages
  const messages = chat ? chat.messages : null;
  // last message in messages array if there is a message else return an empty string using higher order function
  const lastMessageObject = messages ? messages[messages.length - 1] : null;
  const lastMessage = lastMessageObject ? lastMessageObject.message : "";
  const [lastMessageSentAt, setLastMessageSentAt] = useState("");

  const [decryptedMessage, setDecryptedMessage] = useState("");
  // key pair
  const keyPairStore = useSelector((state) => state.keyPairs.keyPairs);
  const keyPair = keyPairStore
    ? keyPairStore.find((key) => key.modelId === chat.id)
    : null;
  const decreptMessageHandler = async () => {
    const messageToDecrypt = lastMessage;

    setDecryptedMessage(
      await decryptMessage(messageToDecrypt, keyPair.privateKey)
    );
  };

  useEffect(() => {
    if (keyPair) {
      decreptMessageHandler();
    }
  }, [keyPair, lastMessage]);
  useEffect(() => {
    if (lastMessageObject) {
      const date = new Date(lastMessageObject.sentAt);
      // Time ago function
      const time = timeAgo(date);
      setLastMessageSentAt(time);
    }
  }, [lastMessageObject]);

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
          button
          sx={{
            borderRadius: "0.5rem",
            boxShadow: chat.id === id ? 1 : "unset",
            backgroundColor:
              chat.id === id ? theme.colors.background1 : "unset",
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
            alt={chat.colleagueUsername[0]}
            src={chat.colleagueProfilePic && chat.colleagueProfilePic.fileUrl}
          >
            {chat.colleagueUsername[0]}
          </Avatar>
          <Box
            sx={{
              marginLeft: "5px",
            }}
          >
            <Box
              sx={{
                // Separate the last message and the time
                display: "flex",
                justifyContent: "space-between",
                gap: "50%",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle1">
                {chat.colleagueUsername}
              </Typography>
              {/* sentAt */}
              <Typography variant="caption">{lastMessageSentAt}</Typography>
            </Box>
            {/* Show the first 25 characters only else add ... */}
            <Typography variant="body2">
              {decryptedMessage.length > 30
                ? decryptedMessage.substring(0, 30) + "..."
                : decryptedMessage}
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
