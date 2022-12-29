import { useRouter } from "next/router";
import { Box, Button, Link, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useTheme } from "@mui/material/styles";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";

// My components
import DrawerComponent from "../components/others/DrawerComponent";
import ChatLeft from "../components/chats/ChatLeft";
import ChatSection from "../components/chats/ChatSection";
import TeamSectionSkeleton from "../components/teams/TeamSectionSkeleton";
import TeamSection from "../components/teams/TeamSection";
import ChatSectionSkeleton from "../components/chats/ChatSectionSkeleton";
import LoadingLogo from "../components/others/LoadingLogo";

// Hooks
import { useCheckLogedinUser, useGetChats } from "../../hooks/hooks";
import {
  useChatId,
  useJoinChatRoom,
  useRecieveNewChatMessage,
} from "../../hooks/chats";

// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  addNewMessageToChatId,
  updateMessageId,
} from "../../Redux/slices/chat";
import {
  addNewMessageToTeamId,
  updateTeamMessageId,
} from "../../Redux/slices/team";
import { removeUser } from "../../Redux/slices/user";

// Hooks
import {
  useGetTeams,
  useJoinTeamRoom,
  useRecieveNewTeamMessage,
  useTeamId,
} from "../../hooks/teams";
import { RTC_ADDRESS } from "../../config";
import {
  useGetNotification,
  useJoinNotificationRoom,
  useRecieveNewNotification,
} from "../../hooks/notification";
import { useState } from "react";
import Image from "next/image";
// Socket.IO
const chatSocket = io.connect(`${RTC_ADDRESS}/chat`);
const teamSocket = io.connect(`${RTC_ADDRESS}/team`);

export default function Chat() {
  // Global States
  const dispatch = useDispatch();
  const theme = useTheme();
  const userStore = useSelector((state) => state.user);
  const userLoading = useCheckLogedinUser();
  const user = userStore ? userStore.user : null;
  const router = useRouter();
  const id = router.query.id;
  const token = userStore.user ? userStore.user.token : null;

  // Chats States
  const [chatMessage, setMessage] = useState("");
  //      Bools
  const [boolForSent, setBoolForSent] = useState(true);

  // Teams States
  // team message state
  const [teamMessage, setTeamMessage] = useState("");
  //      Bools
  const [teamBoolForSent, setTeamBoolForSent] = useState(true);
  const userId = user ? user.id : null;

  // HOOKS WILL BE HERE
  useGetChats(token);
  useGetTeams(token);
  useGetNotification(token);
  // Join chat room
  useJoinChatRoom(id);
  // Join team room
  useJoinTeamRoom(id);
  // Join notification room
  useJoinNotificationRoom(userId);

  // Recieve new message for chat
  useRecieveNewChatMessage(user, userId);

  // Recieve new message for team
  useRecieveNewTeamMessage(user, userId);

  // Recieve new notification
  useRecieveNewNotification(user);

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
        //  it should be at the center of the screen and it should be responsive

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            marginBottom: "20px",
          }}
        >
          Click a chat to start messaging
        </Typography>
        <ChatBubbleRoundedIcon
          color="secondary"
          sx={{
            width: "30vw",
            height: "30vh",
            fontSize: "10px",
          }}
        />
      </Box>
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
