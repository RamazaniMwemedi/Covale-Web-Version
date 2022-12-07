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
  useGetChats,
  useGetTeamById,
  useUserId,
} from "../../../hooks/hooks";
import { useChatId } from "../../../hooks/chats";
import LoadingLogo from "../../components/others/LoadingLogo";
import { useSelector, useDispatch } from "react-redux";
import {
  addNewMessageToChatId,
  updateMessageId,
  addNewMessageToChatIdFromSender,
} from "../../../Redux/slices/chat";
import { removeUser } from "../../../Redux/slices/user";
import { useGetTeams, useTeamId } from "../../../hooks/teams";
import TeamSectionSkeleton from "../../components/teams/TeamSectionSkeleton";
import TeamSection from "../../components/teams/TeamSection";
import TeamLeft from "../../components/teams/TeamLeft";
// Socket.IO
// https://rtcommunication.herokuapp.com/
// http://localhost:5005/
const socket = io.connect("https://rtcommunication.herokuapp.com/chat");

export default function Chat() {
  // Global States
  const dispatch = useDispatch();
  const theme = useTheme();
  const userStore = useSelector((state) => state.user);
  const userLoading = useCheckLogedinUser();
  const user = userStore ? userStore.user : null;
  const currentUserId = useUserId();
  const router = useRouter();
  const id = router.query.id;
  const token = userStore.user ? userStore.user.token : null;
  useGetChats(token);
  useGetTeams(token);

  // Chats States
  const [chatMessage, setMessage] = useState("");
  //      Bools
  const [boolForSent, setBoolForSent] = useState(true);
  const [boolForReceive, setBoolForReceive] = useState(true);
  //      Audio
  const [playing, setPlaying] = useState(false);
  const [sentAudioPlay, setSentAudioPlay] = useState(false);
  const [receiveAudioPlay, setReceiveAudioPlay] = useState(false);

  const [audioUrl, setAudioUrl] = useState(null);
  // Teams States

  useEffect(() => {
    console.log("Joining");
    if (id) {
      socket.emit("join_room", id);
    }
  }, [id]);

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
        if (data && currentUserId) {
          if (data.sender != currentUserId) {
            if (boolForReceive) {
              setReceiveAudioPlay(true);
              setBoolForReceive(false);
              dispatch(
                addNewMessageToChatIdFromSender({
                  chatId: id,
                  data,
                  boolForReceive,
                })
              );
            }
          }
          setReceiveAudioPlay(false);
        }
      }
    });
  }, [socket, user]);

  const friendUsername = "Friend Name";

  const messageChangeHandler = (e) => {
    setMessage(e.target.value);
  };

  const signoutHandler = () => {
    localStorage.removeItem("logedinUser");
    dispatch(removeUser);
    router.push("/login");
  };

  const onEmojiClick = (event, emojiObject) => {
    setMessage(chatMessage + emojiObject.emoji);
  };

  const sendMessageHandle = () => {
    const userId = userStore ? userStore.user.id : null;
    try {
      if (chatMessage.length > 0) {
        const newMessage = {
          sender: userId,
          message: chatMessage,
          idFromClient: uuidv4(),
        };
        dispatch(
          addNewMessageToChatId({
            chatId: id,
            newMessage,
          })
        );

        socket.emit("send_message", { newMessage, id, userId });
        setMessage("");
        setBoolForSent(true);
        if (boolForSent) {
          socket.on("messege_sent", (data) => {
            dispatch(
              updateMessageId({
                chatId: id,
                id: data.id,
                idFromClient: data.idFromClient,
              })
            );
            setSentAudioPlay(true);
            setPlaying(true);
            setBoolForSent(false);
          });
        }
      }
    } catch (error) {
      console.error("Error is :", error);
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
              <TeamLeft user={userStore.user} chat={{}} />
              {/* If there is an Id */}
              {id ? (
                <>
                  <SectionToDisplay
                    messageChangeHandler={messageChangeHandler}
                    message={chatMessage}
                    sendNewMessage={sendMessageHandle}
                    friendUsername={friendUsername}
                    onEmojiClick={onEmojiClick}
                  />
                </>
              ) : (
                // There is no ID
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

const SectionToDisplay = ({
  messageChangeHandler,
  message,
  sendMessageHandle,
  friendUsername,
  onEmojiClick,
}) => {
  const router = useRouter();
  const id = router.query.id;
  const chat = useChatId(id);
  const team = useTeamId(id);
  console.log("Team :", team);
  if (router.asPath.includes("/chats/c")) {
    return (
      <>
        {chat ? (
          <ChatSection
            chat={chat}
            messageChangeHandler={messageChangeHandler}
            message={message}
            messages={chat.messages}
            sendNewMessage={sendMessageHandle}
            friendUsername={friendUsername}
            onEmojiClick={onEmojiClick}
          />
        ) : (
          <ChatSectionSkeleton />
        )}
      </>
    );
  } else if (router.asPath.includes("/chats/t")) {
    return <>{team ? <TeamSection team={team} /> : <TeamSectionSkeleton />}</>;
  }
};
