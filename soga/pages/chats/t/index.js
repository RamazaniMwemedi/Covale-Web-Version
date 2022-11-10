import { useRouter } from "next/router";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect, useState, useReducer } from "react";
import { useTheme } from "@mui/material/styles";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

// Logo
import Logo from "../../../assets/Logo";

// My components
import DrawerComponent from "../../components/others/DrawerComponent";
import TeamLeft from "../../components/teams/TeamLeft";
import TeamSection from "../../components/teams/TeamSection";

import { getChatById } from "../../../services/chats";

// Hooks
import {
  useCheckLogedinUser,
  useGetChatById,
  useAudio,
  useGetTeamById,
} from "../../../hooks/hooks";
import LoadingLogo from "../../components/others/LoadingLogo";

// Redux Hooks
import { useSelector, useDispatch } from "react-redux";
import { addNewMessageToTeam } from "../../../Redux/slices/team";
import { useMemo } from "react";

// Socket.IO
// https://rtcommunication.herokuapp.com/
// http://localhost:5005/
const socket = io.connect(`https://rtcommunication.herokuapp.com/`);

export default function TeamPage() {
  const theme = useTheme();
  const userLoading = useCheckLogedinUser();
  const userStore = useSelector((state) => state.user);
  const router = useRouter();
  const id = router.query.id;
  const token = userStore.user ? userStore.user.token : null;
  const dispatch = useDispatch();
  const team = useSelector((state) => state.team.team);
  let messages;
  // const messages = team ? team.messages : [];

  // Saving Team into a redux state

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // Bools
  const [boolForSent, setBoolForSent] = useState(false);
  const [boolForReceive, setBoolForReceive] = useState(true);
  //Audio
  const [playing, setPlaying] = useState(false);
  const [sentAudioPlay, setSentAudioPlay] = useState(false);
  const [receiveAudioPlay, setReceiveAudioPlay] = useState(false);

  // Getting Team by it's ID
  useGetTeamById(token, id);

  useEffect(() => {
    messages = team ? team.messages : [];

    return () => {
      messages = [];
    };
  }, [team && team.messages]);

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
    socket.on("receive_message_to_team", (data) => {
      if (boolForReceive) {
        if (data) {
          if (data.sender != userStore.id) {
            setReceiveAudioPlay(true);
            setBoolForReceive(false);
          }
          setReceiveAudioPlay(false);
        }
      }
    });
  }, [socket]);

  const messageChangeHandler = (e) => {
    setMessage(e.target.value);
  };

  const signoutHandler = () => {
    localStorage.removeItem("logedinUser");
    userStore = null;
    router.push("/login");
  };

  const sendMessageHandle = () => {
    const userId = userStore.user ? userStore.user.id : null;

    if (message.length > 0) {
      const newMessage = {
        message: message,
        idFromClient: uuidv4(),
      };
      socket.emit("send_message_to_team", { newMessage, id, userId });
      setMessage("");
      setBoolForSent(true);
      if (boolForSent) {
        socket.on("messege_sent_to_team", (data) => {
          setSentAudioPlay(true);
          setPlaying(true);
          dispatch(addNewMessageToTeam(data));
          setBoolForSent(false);
        });
      }
    }
  };

  const onEmojiClick = (event, emojiObject) => {
    setMessage(message + emojiObject.emoji);
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
          {userStore.user ? (
            <>
              <DrawerComponent
                signoutHandler={signoutHandler}
                user={userStore.user}
              />
              <TeamLeft user={userStore.user} />
              {id ? (
                <TeamSection
                  user={userStore.user}
                  messageChangeHandler={messageChangeHandler}
                  sendNewMessage={sendMessageHandle}
                  message={message}
                  messages={messages}
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
      )}
    </>
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
