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
import { useRef, useState } from "react";
import axios from "axios";
import { sendMessege } from "../../services/chats";
import { sendTeamMessege } from "../../services/teams";
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
  const [chatMessage, setChatMessage] = useState("");
  const chatFileInput = useRef(null);
  const chatFileInput2 = useRef(null);
  const [chatFiles, setChatFiles] = useState([]);

  // Teams States
  // team message state
  const [teamMessage, setTeamMessage] = useState("");
  const teamFileInput = useRef(null);
  const teamFileInput2 = useRef(null);
  const [teamFiles, setTeamFiles] = useState([]);
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
    setChatMessage(e.target.value);
  };

  const signoutHandler = () => {
    localStorage.removeItem("logedinUser");
    dispatch(removeUser);
    router.push("/login");
  };

  const onEmojiClick = (event, emojiObject) => {
    setChatMessage(chatMessage + emojiObject.emoji);
  };
  const handleChooseFileIcon = (e) => {
    chatFileInput.current.click();
  };
  const handleChooseFileIcon2 = (e) => {
    chatFileInput2.current.click();
  };

  const handleChooseFile = (e) => {
    // input change handler
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setChatFiles((prev) => [
        ...prev,
        {
          file: file,
          fileName: file.name,
          fileUrl: reader.result,
          fileUri: reader.result,
          fileType: file.type,
          fileSize: file.size,
        },
      ]);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const sendMessageHandle = async (event) => {
    event.preventDefault();
    const uuid = uuidv4();
    const formData = new FormData();

    for (const file of chatFiles) {
      formData.append("files", file.file);
    }

    formData.append("message", chatMessage);
    formData.append("idFromClient", uuid);
    setChatMessage("");
    const newMessage = {
      idFromClient: uuid,
      sender: user.id,
      message: chatMessage,
      files: chatFiles,
      chatRoom: id,
    };
    setChatFiles([]);

    dispatch(
      addNewMessageToChatId({
        chatId: id,
        newMessage,
      })
    );
    const sentMessage = await sendMessege(token, id, formData);

    chatSocket.emit("send_message", sentMessage);
    dispatch(
      updateMessageId({
        chatId: id,
        id: sentMessage.id,
        idFromClient: sentMessage.idFromClient,
        files: sentMessage.files,
      })
    );
  };

  // Teams handlers
  const teamOnEmojiClick = (event, emojiObject) => {
    setTeamMessage(teamMessage + emojiObject.emoji);
  };

  const handleChooseFileIconTeam = (e) => {
    teamFileInput.current.click();
  };
  const handleChooseFileIcon2Team = (e) => {
    teamFileInput2.current.click();
  };

  const handleChooseFileTeam = (e) => {
    // input change handler
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setTeamFiles((prev) => [
        ...prev,
        {
          file: file,
          fileName: file.name,
          fileUrl: reader.result,
          fileUri: reader.result,
          fileType: file.type,
          fileSize: file.size,
        },
      ]);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const teamMessageChangeHandler = (e) => {
    setTeamMessage(e.target.value);
  };

  const teamSendMessageHandle = async () => {
    const uuid = uuidv4();
    const formData = new FormData();

    for (const file of teamFiles) {
      formData.append("files", file.file);
    }

    formData.append("message", teamMessage);
    formData.append("idFromClient", uuid);
    setTeamMessage("");
    const teamNewMessage = {
      sender: {
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        id: user.id,
      },
      message: teamMessage,
      idFromClient: uuid,
      files: teamFiles,
    };
    setTeamFiles([]);

    dispatch(
      addNewMessageToTeamId({
        teamId: id,
        teamNewMessage,
      })
    );
    const sentMessage = await sendTeamMessege(token, id, formData);
    console.log("Sent message: ", sentMessage);

    teamSocket.emit("send_message_to_team", {
      teamId: id,
      message: sentMessage,
    });
    dispatch(
      updateTeamMessageId({
        teamId: id,
        id: sentMessage.id,
        idFromClient: sentMessage.idFromClient,
        files: sentMessage.files,
      })
    );
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
                    chatFileInput={chatFileInput}
                    handleChooseFileIcon={handleChooseFileIcon}
                    chatFileInput2={chatFileInput2}
                    handleChooseFileIcon2={handleChooseFileIcon2}
                    handleChooseFile={handleChooseFile}
                    chatFiles={chatFiles}
                    // Teams
                    teamMessageChangeHandler={teamMessageChangeHandler}
                    teamMessage={teamMessage}
                    teamSendMessageHandle={teamSendMessageHandle}
                    teamOnEmojiClick={teamOnEmojiClick}
                    handleChooseFileIconTeam={handleChooseFileIconTeam}
                    handleChooseFileIcon2Team={handleChooseFileIcon2Team}
                    handleChooseFileTeam={handleChooseFileTeam}
                    teamFileInput={teamFileInput}
                    teamFileInput2={teamFileInput2}
                    teamFiles={teamFiles}
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
  chatFileInput,
  handleChooseFileIcon,
  handleChooseFile,
  chatFiles,
  handleChooseFileIcon2,
  chatFileInput2,
  // Teams
  handleChooseFileIconTeam,
  handleChooseFileIcon2Team,
  handleChooseFileTeam,
  teamFileInput,
  teamFileInput2,
  teamFiles,
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
            handleChooseFileIcon={handleChooseFileIcon}
            chatFileInput={chatFileInput}
            handleChooseFile={handleChooseFile}
            chatFiles={chatFiles}
            chatFileInput2={chatFileInput2}
            handleChooseFileIcon2={handleChooseFileIcon2}
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
            handleChooseFileIconTeam={handleChooseFileIconTeam}
            handleChooseFileIcon2Team={handleChooseFileIcon2Team}
            handleChooseFileTeam={handleChooseFileTeam}
            teamFileInput={teamFileInput}
            teamFileInput2={teamFileInput2}
            teamFiles={teamFiles}
          />
        ) : (
          <TeamSectionSkeleton />
        )}
      </>
    );
  }
};
