import React, { useState } from "react";
import FloatingAButton from "../components/FloatingAButton";
import {
  Avatar,
  List,
  ListItem,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

// My components
import AddMoreFriends from "./AddMoreFriends";
import Chat from "./Chat";

const Chats = ({ messages, loading }) => {
  const [showMoreFriends, setShowMoreFriends] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const buttonHandler = () => {
    setShowMoreFriends(true);
    setShowButton(false);
  };
  const closeMorePeopleHandler = () => {
    setShowMoreFriends(false);
    setShowButton(true);
  };

  return (
    <>
      {loading ? (
        <Stack spacing={1}>
          {[...Array(8)].map((_, i) => (
          <ListItem
          key={i}
            sx={{
              display: "flex",
              // border style
              borderStyle: " solid ",
              // border color
              borderColor: "lightgrey",
              // border width
              borderWidth: "2px",
              borderRadius: "0.5rem",
            }}
          >
            {/* Avatar skeleton */}
            <Skeleton
              variant="circle"
              width={40}
              height={40}
              style={{ borderRadius: "50%" }}
            />
            {/* Skeleton for user first and lastname */}
            <Box sx={{}}>
              <Skeleton
                variant="rect"
                width={185}
                height={20}
                style={{ marginLeft: "10px" }}
              />
              <Skeleton
                variant="rect"
                width={185}
                height={8}
                style={{ marginLeft: "10px", marginTop: "8px" }}
              />
            </Box>
          </ListItem>
          ))}
          {/* A skeleton of ListItem skeleton for chat */}
        </Stack>
      ) : (
        <>
          {messages && (
            <Box>
              {messages.map((message) => {
                return (
                  <>
                    <Chat message={message} />
                  </>
                );
              })}
            </Box>
          )}
        </>
      )}
      {showMoreFriends && (
        <AddMoreFriends closeMorePeopleHandler={closeMorePeopleHandler} />
      )}

      {showButton && <FloatingAButton buttonHandler={buttonHandler} />}
    </>
  );
};

export default Chats;
