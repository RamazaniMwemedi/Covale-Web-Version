import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useTheme } from "@mui/styles";
import React from "react";
import ChatSectionLeft from "./ChatSectionLeft";
import ChatSectionRight from "./ChatSectionRight";
import { useSelector } from "react-redux";

const ChatSection = ({
  chat,
  messageChangeHandler,
  message,
  sendNewMessage,
  messages,
  friendUsername,
  onEmojiClick,
}) => {
  const [showRight, setShowRight] = React.useState(false);
  const user = useSelector((state) => state.user);
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
          id={chat.id}
          user={user}
          chat={chat}
          messageChangeHandler={messageChangeHandler}
          sendNewMessage={sendNewMessage}
          message={message}
          messages={messages}
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
          <ChatSectionRight friendUsername={chat.friendUsername} />
        </Box>
      )}
    </Box>
  );
};

export default ChatSection;
