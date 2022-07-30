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
  const [windowSize, setWindowSize] = React.useState(window.innerWidth);
  React.useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize(window.innerWidth);
    });
  }, [windowSize]);
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
          borderRight: "1px solid #e0e0e0",
          borderBottom: "1px solid #e0e0e0",
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
        />
      </Box>
      {/* ChatSectionRight */}
      <Box
        sx={{
          flex: windowSize < 1100 ? "0" : "35%",
        }}
      >
        {windowSize > 1100 ? (
          <ChatSectionRight friendUsername={friendUsername} />
        ) : null}
      </Box>
    </Box>
  );
};

export default ChatSection;
