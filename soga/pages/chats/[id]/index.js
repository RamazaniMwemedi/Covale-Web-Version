import { useRouter } from "next/router";
import { Box, LinearProgress, Typography } from "@mui/material";
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

// Hooks
import { useCheckLogedinUser, useGetChatById } from "../../../hooks/hooks";
import ChatSectionSkeleton from "../../components/ChatSectionSkeleton";
import LoadingLogo from "../../components/LoadingLogo";

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

export default function Chat() {
  const [messages, dispatch] = useReducer(chatReducer, initialState);
  const theme = useTheme();
  var user = useCheckLogedinUser();
  const router = useRouter();
  const id = router.query.id;
  const token = user ? user.token : null;
  const chat = useGetChatById(token, id);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // Bools
  const [boolForSent, setBoolForSent] = useState(false);
  const [boolForReceive, setBoolForReceive] = useState(false);
  //Audio
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

  useEffect(() => {
    setBoolForReceive(true);
    socket.on("receive_message", (data) => {
      if (boolForReceive) {
        if (data) {
          console.log(data);
          if (data.sender != user.id) {
            setAudioUrl("https://ramazanimwemedi.github.io/sounds/recieve.mp3");
            setPlaying(true);
            setBoolForReceive(false);
            dispatch({
              type: "RECIEVE_MESSAGE",
              payload: data,
            });
          }
        }
      }
    });
  }, [socket]);

  useEffect(() => {
    if ((token, id)) {
      setLoading(true);
      dispatch({
        type: "CLEAR",
      });
      getChatById(token, id).then((res) => {
        dispatch({
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
      setBoolForSent(true);
      if (boolForSent) {
        socket.on("messege_sent", (data) => {
          setBoolForSent(false);
          dispatch({
            type: "SENT_MESSAGE",
            payload: data,
          });
          setMessage("");
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
