import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ChatSectionLeft from "./ChatSectionLeft";
import ChatSectionRight from "./ChatSectionRight";

const ChatSection = ({
  id,
  user,
  chat,
  messageChangeHandler,
  message,
  sendNewMessage,
  messages,
  friendUsername,
}) => {
  

  return (
    <Box
      sx={{
        display: "flex",
        flex: "100%",
        marginLeft: "-65px",
        backgroundColor: "aliceblue",
      }}
    >
      <ChatSectionLeft
        id={id}
        user={user}
        chat={chat}
        messageChangeHandler={messageChangeHandler}
        sendNewMessage={sendNewMessage}
        message={message}
        messages={messages}
        friendUsername={friendUsername}
      />

      <ChatSectionRight friendUsername={friendUsername} />
    </Box>
  );
};

export default ChatSection;
