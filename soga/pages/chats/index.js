import { useRouter } from "next/router";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect, useState, useRef, useReducer } from "react";
import { useTheme } from "@mui/material/styles";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
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
  useGetTeamById,
} from "../../hooks/hooks";
import LoadingLogo from "../components/LoadingLogo";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { addNewMessage } from "../../Redux/slices/chat";
import { removeUser } from "../../Redux/slices/user";

// Socket.IO
const socket = io.connect("https://rtcommunication.herokuapp.com/");

export default function Chat() {
  useCheckLogedinUser();
  const router = useRouter();
  const id = router.query.id;
  // Join Room
  useEffect(() => {
    if (id) {
      socket.emit("join_room", id);
    }
  }, [id]);

  const dispatch = useDispatch();
  const theme = useTheme();
  const user = useSelector((state) => state.user);
  const token = user ? user.token : null;
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
  const [unsentMessages, setUnsentMessages] = useState([]);
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
          if (data.sender != user.id) {
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
    ? chat.friend.id !== user.id
      ? `${chat.friend.firstname}  ${chat.friend.lastname}`
      : ""
    : "";

  const messageChangeHandler = (e) => {
    setMessage(e.target.value);
  };

  const signoutHandler = () => {
    localStorage.removeItem("logedinUser");
    dispatch(removeUser());
    router.push("/login");
  };

  const onEmojiClick = (event, emojiObject) => {
    setMessage(message + emojiObject.emoji);
  };

  const sendMessageHandle = () => {
    const userId = user ? user.id : null;
    if (message.length > 0) {
      const newMessage = {
        sender: userId,
        message: message,
        idFromClient: uuidv4(),
      };

      dispatch(addNewMessage(newMessage));
      socket.emit("send_message", { newMessage, id, userId });
      setUnsentMessages((prev) => prev.push(newMessage));
      setMessage("");
      setBoolForSent(true);
      if (boolForSent) {
        socket.on("messege_sent", (data) => {
          setSentAudioPlay(true);
          setPlaying(true);
          setUnsentMessages((prev) =>
            prev.filter((message) => message.idFromClient != data.idFromClient)
          );
          dispatch(addNewMessage(data));

          setBoolForSent(false);
        });
      }
    }
  };

  return (
    <>
      {user.username ? (
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
                !loading ? (
                  <ChatSectionSkeleton />
                ) : (
                  <ChatSection
                    id={id}
                    user={user}
                    chat={chat}
                    messageChangeHandler={messageChangeHandler}
                    message={message}
                    messages={messages}
                    unsentMessages={unsentMessages}
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
      ) : (
        <LoadingLogo />
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
