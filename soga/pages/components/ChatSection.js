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
  const [showRight, setShowRight] = React.useState(true)
  const showRightHandler = () => { 
    setShowRight(!showRight)
   }
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        marginLeft: "-65px",
      }}
    >
      <Box
        sx={{
          flex: "65%",
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "column",
          borderRight: "1px solid #ffff",
          borderBottom: "1px solid #ffff",
        }}
      >
        {/* ChatSectionLeft */}
        <ChatSectionLeft
          id={id}
          user={user}
          chat={chat}
          messageChangeHandler={messageChangeHandler}
          sendNewMessage={sendNewMessage}
          message={message}
          messages={messages}
          friendUsername={friendUsername}
          showRightHandler={showRightHandler}
          showRight={showRight}
        />
      </Box>
      {/* ChatSectionRight */}
      {showRight && (
        <Box
          sx={{
            flex: "35%",
          }}
        >
          <ChatSectionRight friendUsername={friendUsername} />
        </Box>
      )}
    </Box>
  );
};

export default ChatSection;
