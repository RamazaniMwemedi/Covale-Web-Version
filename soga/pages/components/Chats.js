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
import MoreVertIcon from "@mui/icons-material/MoreVert";

// My components
import AddMoreFriends from "./AddMoreFriends";
import Chat from "./Chat";

const Chats = ({ messages }) => {
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
      {messages && (
        <Box>
          {messages.map((message) => {
            return (
              <>
                <Chat message={message} />
              </>
            );
          })}

          {showMoreFriends && (
            <AddMoreFriends closeMorePeopleHandler={closeMorePeopleHandler} />
          )}

          {showButton && <FloatingAButton buttonHandler={buttonHandler} />}
        </Box>
      )}
    </>
  );
};

export default Chats;
