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
}) => {
  const friend = chat ? chat.friend : {};
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
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
      />
      <ChatSectionRight friend={friend} />
    </Box>
  );
};

export default ChatSection;
