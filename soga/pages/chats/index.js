import { useRouter } from "next/router";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect, useState, useRef } from "react";
import { useTheme } from "@mui/material/styles";
import io from "socket.io-client";

// Logo
import Logo from "../../assets/Logo";

// My components
import DrawerComponent from "../components/DrawerComponent";
import ChatLeft from "../components/ChatLeft";
import ChatSection from "../components/ChatSection";

import { getChatById } from "../../services/chats";
import ChatSectionSkeleton from "../components/ChatSectionSkeleton";

// Hooks
import {
  useCheckLogedinUser,
  useGetChatById,
  useAudio,
} from "../../hooks/hooks";

// Redux
const { createStore } = require("redux");

// Socket.IO
const socket = io.connect(`https://rtcommunication.herokuapp.com/`);

// Chat Reducer
const initialState = [];

const chatReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ADD_ALL_MESSAGES":
      return (state = payload);
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
  var user = useCheckLogedinUser();
  const router = useRouter();
  const id = router.query.id;
  const token = user ? user.token : null;
  const chat = useGetChatById(token, id);
  const messages = chatsStore.getState();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  //Audio test
  const [playing, setPlaying] = useState(false);

  const [audioUrl, setAudioUrl] = useState(null);
  useEffect(() => {
    const audio = audioUrl ? new Audio(audioUrl) : null;
    audio && (playing ? audio.play() : audio.pause());

    audio && audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio && audio.addEventListener("ended", () => setPlaying(false));
    };
  }, [playing, audioUrl]);

  const onEmojiClick = (event, emojiObject) => {
    setMessage(message + emojiObject.emoji);
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      if (data) {
        setAudioUrl("https://ramazanimwemedi.github.io/sounds/recieve.mp3");
        setPlaying(true);

        chatsStore.dispatch({
          type: "RECIEVE_MESSAGE",
          payload: data,
        });
      }
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
        setAudioUrl("https://ramazanimwemedi.github.io/sounds/sent.mp3");
        setPlaying(true);
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
                onEmojiClick={onEmojiClick}
              />
            )
          ) : (
            <ClickaChat />
          )}
        </>
      ) : (
        <Loading />
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
};
