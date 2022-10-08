import { useRouter } from "next/router";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect, useState, useReducer } from "react";
import { useTheme } from "@mui/material/styles";
import io from "socket.io-client";

// Logo
import Logo from "../../../assets/Logo";

// My components
import DrawerComponent from "../../components/DrawerComponent";
import TeamLeft from "../../components/TeamLeft";
import TeamSection from "../../components/TeamSection";

import { getChatById } from "../../../services/chats";

// Hooks
import {
  useCheckLogedinUser,
  useGetChatById,
  useAudio,
  useGetTeamById,
} from "../../../hooks/hooks";
import LoadingLogo from "../../components/LoadingLogo";

// Redux Hooks
import { useSelector, useDispatch } from "react-redux";

// Socket.IO
const socket = io.connect(`https://rtcommunication.herokuapp.com/`);

export default function Chat() {
  const theme = useTheme();
  var user = useCheckLogedinUser();
  const router = useRouter();
  const id = router.query.id;
  const token = user ? user.token : null;

  // Getting Chat by it's ID
  router.pathname.includes("chats/c") && useGetChatById(token, id);

  // Getting Team by it's ID
  router.pathname.includes("chats/t") && useGetTeamById(token, id);

  // Saving Team into a redux state

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // Bools
  const [boolForSent, setBoolForSent] = useState(false);
  const [boolForReceive, setBoolForReceive] = useState(false);
  //Audio
  const [playing, setPlaying] = useState(false);
  const [sentAudioPlay, setSentAudioPlay] = useState(false);
  const [receiveAudioPlay, setReceiveAudioPlay] = useState(false);

  const [audioUrl, setAudioUrl] = useState(null);

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

  // useEffect(() => {
  //   if ((token, id)) {
  //     setLoading(true);
  //     dispatch({
  //       type: "CLEAR",
  //     });
  //     console.log()
  //     if (router.pathname.includes("chats/c")) {
  //       // getChatById(token, id).then((res) => {
  //       //   dispatch({
  //       //     type: "ADD_ALL_MESSAGES",
  //       //     payload: res.chat.messege,
  //       //   });
  //       //   setLoading(false);
  //       // });
  //       // socket.emit("join_room", id);
  //     } else if(router.pathname.includes("chats/t")){

  //     }
  //   }
  // }, [token, id]);

  // const friendUsername = chat
  //   ? chat.chat.friend.id !== user.id
  //     ? `${chat.chat.friend.firstname}  ${chat.chat.friend.lastname}`
  //     : ""
  //   : "";

  const messageChangeHandler = (e) => {
    setMessage(e.target.value);
  };

  const signoutHandler = () => {
    localStorage.removeItem("logedinUser");
    user = null;
    router.push("/login");
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

   const onEmojiClick = (event, emojiObject) => {
     setMessage(message + emojiObject.emoji);
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
          <TeamLeft user={user} />
          {id ? (
            <TeamSection
              messageChangeHandler={messageChangeHandler}
              sendNewMessage={sendMessageHandle}
              message={message}
              onEmojiClick={onEmojiClick}
            />
          ) : (
            // loading ? (
            //   //Team Sketelton
            //   <Typography>Team Sketelton</Typography>
            // ) : (
            //   // Team Section
            //   <Typography>Team Section</Typography>
            // )
            <ClickTeam />
          )}
        </>
      ) : (
        <LoadingLogo />
      )}
    </Box>
  );
}

const ClickTeam = () => {
  return (
    <Box
      sx={{
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
        margin: "200px",
      }}
    >
      <Typography variant="h1">Click Team</Typography>
    </Box>
  );
};
