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
    const [size, setSize] = React.useState(0);
    React.useEffect(() => {
      // Check the width of the window and change the value of size

      // Add a listener to the resize event
      window.addEventListener(
        "resize",
        () => {
          setSize(window.innerWidth);
        },
        // Remove the listener when the component is unmounted
        () => {
          window.removeEventListener("resize", () => {
            setSize(window.innerWidth);
          });
        }
      );
    }, [size]);
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
        size={size}
      />
      {size > 1000 ? (
        <ChatSectionRight friend={friend} />
      ) : (
        null
      )}
    </Box>
  );
};

export default ChatSection;
