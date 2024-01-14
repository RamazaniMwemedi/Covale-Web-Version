import React, { useEffect, useState } from "react";
import { Avatar, List, ListItem, Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useTheme } from "@mui/material/styles";
import { decryptMessage } from "../../../services/encrypt";
import { useSelector } from "react-redux";
import {
  RootState,
  TeamInterface,
  ThemeInterface,
} from "../../../interfaces/myprofile";

export default function Team({ team }: { team: TeamInterface }) {
  const router = useRouter();
  const id = router.query.id;
  const theme: ThemeInterface = useTheme();
  // messages
  const messages = team ? team.messages : null;
  // last message in messages array if there is a message else return an empty string using higher order function
  const lastMessageObject = messages ? messages[messages.length - 1] : null;
  const lastMessage = lastMessageObject ? lastMessageObject.message : "";

  const [decryptedMessage, setDecryptedMessage] = useState("");
  // key pair
  const keyPairStore = useSelector(
    (state: RootState) => state.keyPairs.keyPairs
  );
  const keyPair = keyPairStore
    ? keyPairStore.find((key) => key.modelId === team.id)
    : null;
  const decreptMessageHandler = async () => {
    const messageToDecrypt = lastMessage;

    setDecryptedMessage(
      await decryptMessage(messageToDecrypt, keyPair ? keyPair.privateKey : "")
    );
  };

  useEffect(() => {
    if (keyPair) {
      decreptMessageHandler();
    }
  }, [keyPair, lastMessage]);

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
          <Avatar>{team.teamName[0]}</Avatar>
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
              <Typography variant="subtitle1">{team.teamName}</Typography>
              {/* sentAt */}
              {/* <Typography variant="caption">{lastMessageSentAt}</Typography> */}
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
      )}
    </List>
  );
}
