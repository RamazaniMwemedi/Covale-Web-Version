import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import io from "socket.io-client";

// My components
import DrawerComponent from "../components/DrawerComponent";
import ChatLeft from "../components/ChatLeft";
import ChatSection from "../components/ChatSection";

import { getChatById } from "../../services/chats";

// Hooks
import { useGetChatById, useCheckLogedinUser } from "../../hooks/hooks";

import ChatSectionSkeleton from "../components/ChatSectionSkeleton";

// Redux
const { createStore } = require("redux");

// Redux Store
import userStore from "../../Redux/user";

// Socket.IO
const socket = io.connect(`https://rtcommunication.herokuapp.com/`);

// Chat Reducer
const initialState = [];

const chatReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ADD_ALL_MESSAGES":
      return [...state, ...payload];
    case "RECIEVE_MESSAGE":
      return [...state, payload];
    case "SENT_MESSAGE":
      return [...state, payload];
    case "CLEAR":
      return [];
    default:
      return state;
  }
  // console.log(store);
};

const chatsStore = createStore(chatReducer);

export default function Chat() {
  const theme = useTheme();
  const [userState, setUserState] = useState(null);
  const user = userState ? userState.user : null;
  const router = useRouter();
  const id = router.query.t;
  const token = userState ? userState.token : null;
  const chat = useGetChatById(token, id);
  const messages = chatsStore.getState();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  console.log(userState);
  useEffect(() => {
    setTimeout(() => {
      setUserState(userStore.getState());
    }, 4000);

    return () => {
      setUserState({});
    };
  }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      chatsStore.dispatch({
        type: "RECIEVE_MESSAGE",
        payload: data,
      });
      console.log(data);
    });
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
        <h1>Loading</h1>
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
        margin: "200px",
      }}
    >
      <Typography variant="h1">Click a chat</Typography>
    </Box>
  );
};
