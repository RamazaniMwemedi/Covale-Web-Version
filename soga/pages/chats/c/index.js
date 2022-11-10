import { useRouter } from "next/router";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect, useState, useRef, useReducer } from "react";
import { useTheme } from "@mui/material/styles";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

// My components
import DrawerComponent from "../../components/others/DrawerComponent";
import ChatLeft from "../../components/chats/ChatLeft";
import ChatSection from "../../components/chats/ChatSection";

import ChatSectionSkeleton from "../../components/chats/ChatSectionSkeleton";

// Hooks
import {
  useCheckLogedinUser,
  useGetChatById,
  useGetTeamById,
} from "../../../hooks/hooks";
import LoadingLogo from "../../components/others/LoadingLogo";
import { useSelector, useDispatch } from "react-redux";
import { addNewMessage } from "../../../Redux/slices/chat";

// Socket.IO
// https://rtcommunication.herokuapp.com/
// http://localhost:5005/
const socket = io.connect("https://rtcommunication.herokuapp.com/");

export default function Chat() {
  const userLoading = useCheckLogedinUser();
  const dispatch = useDispatch();
  const theme = useTheme();
  const userStore = useSelector((state) => state.user);
  const router = useRouter();
  const id = router.query.id;
  const token = userStore.user ? userStore.user.token : null;
  let loading = true;
  const chat = useSelector((state) => {
    if (state.chat.chat) {
      let loading = false;
      return state.chat.chat;
    } else {
      return null;
    }
  });

  const messages = chat ? chat.chat.messege : null;
  const [message, setMessage] = useState("");

  // Bools
  const [boolForSent, setBoolForSent] = useState(false);
  const [boolForReceive, setBoolForReceive] = useState(false);
  //Audio
  const [playing, setPlaying] = useState(false);
  const [sentAudioPlay, setSentAudioPlay] = useState(false);
  const [receiveAudioPlay, setReceiveAudioPlay] = useState(false);

  const [audioUrl, setAudioUrl] = useState(null);

  // Getting Chchatat by it's ID
  useGetChatById(token, id);

 

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
          if (data.sender != userStore.id) {
            setReceiveAudioPlay(true);
            setBoolForReceive(false);
            dispatch(addNewMessage(data));
          }
          setReceiveAudioPlay(false);
        }
      }
    });
  }, [socket]);

  const friendUsername = chat
    ? chat.friend.id !== userStore.id
      ? `${chat.friend.firstname}  ${chat.friend.lastname}`
      : ""
    : "";

  const messageChangeHandler = (e) => {
    setMessage(e.target.value);
  };

  const signoutHandler = () => {
    localStorage.removeItem("logedinUser");
    userStore = null;
    router.push("/login");
  };

  const onEmojiClick = (event, emojiObject) => {
    setMessage(message + emojiObject.emoji);
  };

  const sendMessageHandle = () => {
    const userId = userStore ? userStore.user.id : null;
    if (message.length > 0) {
      const newMessage = {
        sender: userId,
        message: message,
        idFromClient: uuidv4(),
      };

      socket.emit("send_message", { newMessage, id, userId });
      setMessage("");
      setBoolForSent(true);
      if (boolForSent) {
        socket.on("messege_sent", (data) => {
          setSentAudioPlay(true);
          setPlaying(true);
          dispatch(addNewMessage(data));

          setBoolForSent(false);
        });
      }
    }
  };

  return (
    <>
      {userLoading ? (
        <LoadingLogo />
      ) : (
        <Box
          sx={{
            display: "flex",
            height: "100vh",
            backgroundColor: theme.colors.background,
          }}
        >
          <CssBaseline />
          {userStore ? (
            <>
              <DrawerComponent
                signoutHandler={signoutHandler}
                user={userStore.user}
              />
              <ChatLeft user={userStore.user} chat={chat} />
              {id ? (
                !loading ? (
                  <ChatSectionSkeleton />
                ) : (
                  <ChatSection
                    id={id}
                    user={userStore.user}
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
      )}
    </>
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
