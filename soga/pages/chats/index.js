import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useTheme } from "@mui/material/styles";

// My components
import DrawerComponent from "../components/DrawerComponent";
import ChatLeft from "../components/ChatLeft";
import ChatSection from "../components/ChatSection";

import { getChatById } from "../../services/chats";
import { sendMessageChatRoom } from "../../services/messages";

// Hooks
import { useCheckLogedinUser, useGetChatById } from "../../hooks/hooks";
import ChatSectionSkeleton from "../components/ChatSectionSkeleton";

export default function Chat() {
  const theme = useTheme();
  var user = useCheckLogedinUser();
  const router = useRouter();
  const id = router.query.t;
  const token = user ? user.token : null;
  const chat = useGetChatById(token, id);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const socket = io.connect("http://localhost:3001");

  useEffect(() => {
    if ((token, id)) {
      setLoading(true);
      setMessages([]);
      getChatById(token, id).then((res) => {
        setMessages(res.chat.messege);
        setLoading(false);
      });
    }
  }, [token, id]);

  useEffect(() => {
    socket.emit("chat message", "Hello");
  }, []);

  const friendUsername = chat.chat
    ? chat.chat.friend.id !== user.id
      ? `${chat.chat.friend.firstname}  ${chat.chat.friend.lastname}`
      : ""
    : "";

  const messageChangeHandler = (e) => {
    setMessage(e.target.value);
  };

  const signoutHandler = () => {
    router.push("/");
    localStorage.removeItem("logedinUser");
    user = null;
  };

  const sendMessageHandle = () => {
    if (message.length > 0) {
      const newMessage = {
        message: message,
      };

      sendMessageChatRoom(id, token, newMessage).then((res) => {
        setMessages([...messages, res]);
        setMessage("");
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        backgroundColor: theme.colors.background,
      }}
    >
      <CssBaseline />
      <DrawerComponent signoutHandler={signoutHandler} user={user} />
      <ChatLeft user={user} chat={chat} />
      {id ? (
        loading ? (
          <ChatSectionSkeleton />
        ) : (
          <ChatSection
            id={id}
            user={user}
            chat={chat.chat}
            messageChangeHandler={messageChangeHandler}
            message={message}
            messages={messages}
            sendNewMessage={sendMessageHandle}
            friendUsername={friendUsername}
          />
        )
      ) : (
        <ClickaChat />
      )}
    </Box>
  );
}

const ClickaChat = () => {
  return (
    <Box
      sx={{
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
        margin:"200px"
      }}
    >
      <Typography variant="h1">Click a chat</Typography>
    </Box>
  );
};
