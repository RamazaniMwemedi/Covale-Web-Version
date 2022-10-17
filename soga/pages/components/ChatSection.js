import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useTheme } from "@mui/styles";
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
  unsentMessages,
  friendUsername,
  onEmojiClick,
}) => {
  const [showRight, setShowRight] = React.useState(false);
  const showRightHandler = () => {
    setShowRight(!showRight);
  };
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        marginLeft: "-65px",
        overflowY: "hidden",
      }}
    >
      <Box
        sx={{
          flex: "65%",
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "column",

          borderBottom: `1px solid ${theme.colors.background1}`,
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
          unsentMessages={unsentMessages}
          friendUsername={friendUsername}
          showRightHandler={showRightHandler}
          showRight={showRight}
          onEmojiClick={onEmojiClick}
        />
      </Box>
      {/* ChatSectionRight */}
      {showRight && (
        <Box
          sx={{
            flex: "35%",
            borderLeft: `2px solid ${theme.colors.background1}`,
          }}
        >
          <ChatSectionRight friendUsername={friendUsername} />
        </Box>
      )}
    </Box>
  );
};

export default ChatSection;
