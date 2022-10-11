import { useRouter } from "next/router";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect, useState, useRef, useReducer } from "react";
import { useTheme } from "@mui/material/styles";
import io from "socket.io-client";

// Logo
import Logo from "../../../assets/Logo";

// My components
import DrawerComponent from "../../components/DrawerComponent";
import ChatLeft from "../../components/ChatLeft";
import ChatSection from "../../components/ChatSection";

import { getChatById } from "../../../services/chats";
import ChatSectionSkeleton from "../../components/ChatSectionSkeleton";

// Hooks
import {
  useCheckLogedinUser,
  useGetChatById,
  useAudio,
} from "../../../hooks/hooks";
import LoadingLogo from "../../components/LoadingLogo";
import { useSelector } from "react-redux";

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
  const chat = useSelector((state) => {
    if (state.chat.chat) {
      return state.chat.chat;
    } else {
      return null;
    }
  });
  const messages = chat ? chat.messages : [];
  const [message, setMessage] = useState("");

  // Bools
  const [boolForSent, setBoolForSent] = useState(false);
  const [boolForReceive, setBoolForReceive] = useState(false);
  //Audio
  const [playing, setPlaying] = useState(false);
  const [sentAudioPlay, setSentAudioPlay] = useState(false);
  const [receiveAudioPlay, setReceiveAudioPlay] = useState(false);

  const [audioUrl, setAudioUrl] = useState(null);

  // Getting Chat by it's ID
  router.pathname.includes("chats/c") && useGetChatById(token, id);

  // Getting Team by it's ID
  router.pathname.includes("chats/t") && useGetTeamById(token, id);

  useEffect(() => {
    const audio = new Audio(
      "https://ramazanimwemedi.github.io/sounds/recieve.mp3"
    );
    receiveAudioPlay ? audio.play() : audio.pause();

    audio.addEventListener("ended", () => setReceiveAudioPlay(false));
    return () => {
      audio.addEventListener("ended", () => setReceiveAudioPlay(false));
    };
  }, [receiveAudioPlay]);

  useEffect(() => {
    const audio = new Audio(
      "https://ramazanimwemedi.github.io/sounds/sent.mp3"
    );

    sentAudioPlay ? audio.play() : audio.pause();
    audio.addEventListener("ended", () => setSentAudioPlay(true));
    return () => {
      audio.addEventListener("ended", () => setSentAudioPlay(true));
    };
  }, [sentAudioPlay]);

  useEffect(() => {
    setBoolForReceive(true);
    socket.on("receive_message", (data) => {
      if (boolForReceive) {
        if (data) {
          if (data.sender != user.id) {
            setReceiveAudioPlay(true);
            setBoolForReceive(false);
            dispatch({
              type: "RECIEVE_MESSAGE",
              payload: data,
            });
          }
          setReceiveAudioPlay(false);
        }
      }
    });
  }, [socket]);

  const friendUsername = chat
    ? chat.friend.id !== user.id
      ? `${chat.friend.firstname}  ${chat.friend.lastname}`
      : ""
    : "";

  const messageChangeHandler = (e) => {
    setMessage(e.target.value);
  };

  const signoutHandler = () => {
    localStorage.removeItem("logedinUser");
    user = null;
    router.push("/login");
  };

  const onEmojiClick = (event, emojiObject) => {
    setMessage(message + emojiObject.emoji);
  };

  const sendMessageHandle = () => {
    const userId = user ? user.id : null;
    if (message.length > 0) {
      const newMessage = {
        message: message,
      };
      socket.emit("send_message", { newMessage, id, userId });
      setMessage("");
      setBoolForSent(true);
      if (boolForSent) {
        socket.on("messege_sent", (data) => {
          setSentAudioPlay(true);
          setPlaying(true);
          dispatch({
            type: "SENT_MESSAGE",
            payload: data,
          });
          setBoolForSent(false);
        });
      }
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
            !messages ? (
              <ChatSectionSkeleton />
            ) : (
              <ChatSection
                id={id}
                user={user}
                chat={chat}
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
        <LoadingLogo />
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
