import React, { useState } from "react";
import { Avatar, Box, Button, Link, Typography } from "@mui/material";

import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";

import { acceptFriendRequest } from "../../../services/user";
import { useDispatch } from "react-redux";
import { grey, purple } from "@mui/material/colors";
import { useRouter } from "next/router";
import { useGetSecreteToken } from "../../../hooks/secrete";
import { useCheckLogedinUserToken } from "../../../hooks/hooks";
import { generateNewKeyPair } from "../../../services/encrypt";

const PersonRequest = ({ user }) => {
  const theme = useTheme();
  const [accepting, setAccepeting] = useState(false);
  const [declining, setDeclining] = useState(false);
  const [showCommunication, setShowCommunication] = useState(false);
  const [chatID, setChatID] = useState(null);

  const secreteToken = useGetSecreteToken();
  const token = useCheckLogedinUserToken();

  const dispatch = useDispatch();
  const router = useRouter();
  const acceptingConnectionHandler = async () => {
    setAccepeting((prev) => !prev);
    if (user.id && token) {
      const response = await acceptFriendRequest(user.id, token);
      if (response.chatId) {
        // chatId;
        const keys = await generateNewKeyPair(
          "Chat",
          response.chatId,
          secreteToken
        );
        if (keys && response.chatId) {
          setChatID(response.chatId);
          setShowCommunication((p) => !p);
        }
      }
    }
  };
  const decliningConnectionHandler = () => {
    setDeclining((prev) => !prev);
  };

  return (
    <>
      {user && (
        <Box
          sx={{
            width: "200px",
            borderRadius: "8px",
            boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
            backgroundColor: theme.colors.textBackground,
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <IconButton
            sx={{
              display: "flex",
              alignSelf: "flex-end",
              bgcolor: theme.colors.textBackground2,
            }}
            size="small"
            onClick={() => {}}
          >
            <HighlightOffRoundedIcon fontSize="medium" />
          </IconButton>
          <Box
            sx={{
              p: 1,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Avatar sx={{ width: 80, height: 80, textTransform: "uppercase" }}>
              {user.firstname[0]}
              {user.lastname[0]}
            </Avatar>
            <Box
              sx={{
                pt: "10px",
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
                <Typography variant="body1">{user.firstname}</Typography>
                <Typography variant="body1">{user.lastname}</Typography>
              </Box>
              <Box sx={{ textAlign: "left" }}>
                <Typography variant="caption">@{user.username}</Typography>
                <br />
              </Box>
            </Box>
          </Box>
          <br />

          {showCommunication ? (
            <Box>
              <Typography variant="caption">
                {user.firstname} {user.lastname} is now a connection
                <span
                  style={{
                    marginLeft: "20px",
                    color: "dodgerblue",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    router.push(`/chats/c/${chatID}`);
                  }}
                >
                  Message
                </span>
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
              }}
            >
              {!declining ? (
                !accepting ? (
                  <Button
                    variant="contained"
                    sx={{
                      width: "80px",
                      height: "30px",
                      margin: "5px",
                      textTransform: "unset",
                      display: "flex",
                      gap: "20%",
                      bgcolor: purple[500],
                    }}
                    color="action"
                    onClick={acceptingConnectionHandler}
                  >
                    Accept
                  </Button>
                ) : (
                  <LoadingButton
                    loading
                    variant="contained"
                    color="secondary"
                    sx={{
                      margin: "5px",
                      height: "35px",
                      alignSelf: "center",
                    }}
                  />
                )
              ) : null}
              {!accepting ? (
                !declining ? (
                  <Button
                    variant="contained"
                    sx={{
                      width: "80px",
                      height: "30px",
                      margin: "5px",
                      textTransform: "unset",
                      display: "flex",
                      gap: "20%",
                      bgcolor: grey[500],
                    }}
                    color="action"
                    onClick={decliningConnectionHandler}
                  >
                    Decline
                  </Button>
                ) : (
                  <LoadingButton
                    loading
                    variant="contained"
                    color="secondary"
                    sx={{
                      margin: "5px",
                      height: "35px",
                      alignSelf: "center",
                    }}
                  />
                )
              ) : null}
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default PersonRequest;
