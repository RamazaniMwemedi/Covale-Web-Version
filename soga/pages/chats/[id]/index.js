import { useRouter } from "next/router";
import { Box, LinearProgress, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect, useState, useRef } from "react";
import { useTheme } from "@mui/material/styles";
import io from "socket.io-client";

// Logo
import Logo from "../../../assets/Logo";

// My components
import DrawerComponent from "../../components/DrawerComponent";
import ChatLeft from "../../components/ChatLeft";
import ChatSection from "../../components/ChatSection";

import { getChatById } from "../../../services/chats";

// Hooks
import { useCheckLogedinUser, useGetChatById } from "../../../hooks/hooks";
import ChatSectionSkeleton from "../../components/ChatSectionSkeleton";

// Redux
const { createStore } = require("redux");

// Socket.IO
const socket = io.connect(`https://rtcommunication.herokuapp.com/`);

// Chat Reducer

const chatReducer = (state = [], { type, payload }) => {
  switch (type) {
    case "ADD_ALL_MESSAGES":
      return [state, payload];
    case "RECIEVE_MESSAGE":
    //   return [...state, payload];
    case "SENT_MESSAGE":
      return [...state, payload];
    case "CLEAR":
      return (state = []);
    case "LOG":

    default:
      return state;
  }
};

const chatsStore = createStore(chatReducer);

export default function Chat() {
  const theme = useTheme();
  var user = useCheckLogedinUser();
  const router = useRouter();
  const id = router.query.id;
  const token = user ? user.token : null;
  const chat = useGetChatById(token, id);
  const messages = chatsStore.getState();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const socketEffect = useRef(false);

  useEffect(() => {
    socketEffect.current = true;

    if (socketEffect.current === true) {
      console.log("Rendered ");
      //   socket.on("receive_message", (data) => {
      //     if (data) {
      //       chatsStore.dispatch({
      //         type: "RECIEVE_MESSAGE",
      //         payload: data,
      //       });
      //     }
      //   });
    }
    return () => {
      console.log("Unmounted");
      socketEffect.current = false;
    };
  }, [socket]);

  useEffect(() => {
    if ((token, id)) {
      setLoading(true);
      chatsStore.dispatch({
        type: "CLEAR",
      });
      getChatById(token, id).then((res) => {
        chatsStore.dispatch({
          type: "ADD_ALL_MESSAGES",
          payload: res.chat.messege,
        });
        setLoading(false);
      });
      socket.emit("join_room", id);
    }
  }, [token, id]);

  const friendUsername = chat.chat
    ? chat.chat.friend.id !== user.id
      ? `${chat.chat.friend.firstname}  ${chat.chat.friend.lastname}`
      : ""
    : "";

  const messageChangeHandler = (e) => {
    setMessage(e.target.value);
  };

  const signoutHandler = () => {
    localStorage.removeItem("logedinUser");
    user = null;
    router.push("/");
  };

  const sendMessageHandle = () => {
    const userId = user ? user.id : null;
    if (message.length > 0) {
      const newMessage = {
        message: message,
      };
      socket.emit("send_message", { newMessage, id, userId });
      socket.on("messege_sent", (data) => {
        chatsStore.dispatch({
          type: "SENT_MESSAGE",
          payload: data,
        });
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
      <Box>
        {user ? (
          <>
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
          </>
        ) : (
          <Loading/>
        )}
      </Box>
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
        margin: "200px",
      }}
    >
      <Typography variant="h1">Click a chat</Typography>
    </Box>
  );
};

const Loading = () => { 
  return (
    <Box
      sx={{
        position: "absolute",
        left: "39%",
        top: "20%",
      }}
    >
      <Logo width={300} height={300} />
      <LinearProgress color="secondary" />
    </Box>
  );
 }