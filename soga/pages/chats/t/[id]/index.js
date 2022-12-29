import { useRouter } from "next/router";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect, useState, useRef, useReducer } from "react";
import { useTheme } from "@mui/material/styles";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

// My components
import DrawerComponent from "../../../components/others/DrawerComponent";
import ChatLeft from "../../../components/chats/ChatLeft";
import ChatSection from "../../../components/chats/ChatSection";
import TeamSectionSkeleton from "../../../components/teams/TeamSectionSkeleton";
import TeamSection from "../../../components/teams/TeamSection";
import ChatSectionSkeleton from "../../../components/chats/ChatSectionSkeleton";
import LoadingLogo from "../../../components/others/LoadingLogo";

// Hooks
import {
  useCheckLogedinUser,
  useGetChatById,
  useGetChats,
  useGetTeamById,
  useUserId,
} from "../../../../hooks/hooks";
import { useChatId } from "../../../../hooks/chats";

// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  addNewMessageToChatId,
  updateMessageId,
  addNewMessageToChatIdFromSender,
} from "../../../../Redux/slices/chat";
import {
  addNewMessageToTeamId,
  updateTeamMessageId,
  addNewMessageToTeamIdFromSender,
} from "../../../../Redux/slices/team";
import { removeUser } from "../../../../Redux/slices/user";
import {
  addNewNotification,
  allNotifications,
} from "../../../../Redux/slices/notifications";

// Hooks
import { useGetTeams, useTeamId } from "../../../../hooks/teams";
import { RTC_ADDRESS } from "../../../../config";
import { useGetNotification } from "../../../../hooks/notification";
// Socket.IO
// https://rtcommunication.herokuapp.com/
// http://localhost:5005/
const chatSocket = io.connect(`${RTC_ADDRESS}/chat`);
const teamSocket = io.connect(`${RTC_ADDRESS}/team`);
const notificationSocket = io.connect(`${RTC_ADDRESS}/notification`);

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
  // team message state
  const [teamMessage, setTeamMessage] = useState("");
  //      Bools
  const [teamBoolForSent, setTeamBoolForSent] = useState(true);
  const [teamBoolForReceive, setTeamBoolForReceive] = useState(true);
  //      Audio
  const [teamPlaying, setTeamPlaying] = useState(false);
  const [teamSentAudioPlay, setTeamSentAudioPlay] = useState(false);
  const [teamReceiveAudioPlay, setTeamReceiveAudioPlay] = useState(false);
  const userId = user ? user.id : null;

  // HOOKS WILL BE HERE
  useGetChats(token);
  useGetTeams(token);
  useGetNotification(token);

  useEffect(() => {
    if (id) {
      chatSocket.emit("join_room", id);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      teamSocket.emit("join_team_room", id);
    }
  }, [id]);

  useEffect(() => {
    if (userId) {
      notificationSocket.emit("join_notification_room", userId);
    }
  }, [userId]);

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
    chatSocket.on("receive_message", (data) => {
      if (data && data.sender != userId) {
        setReceiveAudioPlay(true);
        dispatch(
          addNewMessageToChatIdFromSender({
            chatId: data.chatRoom,
            data: [data],
          })
        );
        setReceiveAudioPlay(false);
      }
    });
  }, [chatSocket, user]);

  useEffect(() => {
    teamSocket.on("receive_message_to_team", (data) => {
      if (data && data.sender != userId) {
        setTeamReceiveAudioPlay(true);
        dispatch(
          addNewMessageToTeamIdFromSender({
            teamId: data.teamRoom,
            data: data,
          })
        );
        setTeamReceiveAudioPlay(false);
      }
    });
  }, [teamSocket, user]);

  useEffect(() => {
    notificationSocket.on("new_notification", (data) => {
      dispatch(addNewNotification(data));
    });
  }, [notificationSocket, user]);

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

        chatSocket.emit("send_message", { newMessage, id, userId });
        setMessage("");
        setBoolForSent(true);
        if (boolForSent && id) {
          chatSocket.on("messege_sent", (data) => {
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

  // Teams handlers
  const teamOnEmojiClick = (event, emojiObject) => {
    setTeamMessage(teamMessage + emojiObject.emoji);
  };

  const teamMessageChangeHandler = (e) => {
    setTeamMessage(e.target.value);
  };

  const teamSendMessageHandle = () => {
    const userId = userStore ? userStore.user.id : null;
    try {
      if (teamMessage.length > 0) {
        const teamNewMessage = {
          sender: {
            username: userStore.user.username,
            firstname: userStore.user.firstname,
            lastname: userStore.user.lastname,
            id: userStore.user.id,
          },
          message: teamMessage,
          idFromClient: uuidv4(),
        };
        dispatch(
          addNewMessageToTeamId({
            teamId: id,
            teamNewMessage,
          })
        );
        teamSocket.emit("send_message_to_team", { teamNewMessage, id, userId });
        setTeamMessage("");
        setTeamBoolForSent(true);
        if (teamBoolForSent) {
          teamSocket.on("messege_sent_to_team", (data) => {
            dispatch(
              updateTeamMessageId({
                teamId: id,
                id: data.id,
                idFromClient: data.idFromClient,
              })
            );
            setTeamSentAudioPlay(true);
            setTeamPlaying(true);
            setTeamBoolForSent(false);
          });
        }
      }
    } catch (error) {
      console.error("Error is :", error);
    }
  };

  useEffect(() => {
    const audio = new Audio(
      "https://ramazanimwemedi.github.io/sounds/recieve.mp3"
    );
    teamReceiveAudioPlay ? audio.play() : audio.pause();

    audio.addEventListener("ended", () => setTeamReceiveAudioPlay(false));
    return () => {
      audio.addEventListener("ended", () => setTeamReceiveAudioPlay(false));
    };
  }, [teamReceiveAudioPlay]);

  useEffect(() => {
    const audio = new Audio(
      "https://ramazanimwemedi.github.io/sounds/sent.mp3"
    );

    teamSentAudioPlay ? audio.play() : audio.pause();
    audio.addEventListener("ended", () => setTeamSentAudioPlay(true));
    return () => {
      audio.addEventListener("ended", () => setTeamSentAudioPlay(true));
    };
  }, [teamSentAudioPlay]);

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
              <ChatLeft user={userStore.user} chat={{}} />
              {/* If there is an Id */}
              {id ? (
                <>
                  <SectionToDisplay
                    messageChangeHandler={messageChangeHandler}
                    message={chatMessage}
                    sendMessageHandle={sendMessageHandle}
                    onEmojiClick={onEmojiClick}
                    // Teams
                    teamMessageChangeHandler={teamMessageChangeHandler}
                    teamMessage={teamMessage}
                    teamSendMessageHandle={teamSendMessageHandle}
                    teamOnEmojiClick={teamOnEmojiClick}
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
  onEmojiClick,
  teamMessageChangeHandler,
  teamMessage,
  teamSendMessageHandle,
  teamOnEmojiClick,
}) => {
  const router = useRouter();
  const id = router.query.id;
  const chat = useChatId(id);
  const team = useTeamId(id);
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
            onEmojiClick={onEmojiClick}
          />
        ) : (
          <ChatSectionSkeleton />
        )}
      </>
    );
  } else if (router.asPath.includes("/chats/t")) {
    return (
      <>
        {team ? (
          <TeamSection
            team={team}
            teamMessageChangeHandler={teamMessageChangeHandler}
            teamMessage={teamMessage}
            teamSendMessageHandle={teamSendMessageHandle}
            teamOnEmojiClick={teamOnEmojiClick}
          />
        ) : (
          <TeamSectionSkeleton />
        )}
      </>
    );
  }
};
