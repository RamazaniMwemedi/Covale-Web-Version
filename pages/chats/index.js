import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useTheme } from "@mui/material/styles";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

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
  replyToTopicId,
  updateTopicMessageId,
} from "../../Redux/slices/team";
import { removeUser } from "../../Redux/slices/user";

// Hooks
import {
  useGetTeams,
  useJoinTeamRoom,
  useRecieveNewTeamMessage,
  useTeamId,
} from "../../hooks/teams";
import {
  useGetNotification,
  useJoinNotificationRoom,
  useRecieveNewNotification,
} from "../../hooks/notification";
import { useRef, useState } from "react";
import { sendMessege } from "../../services/chats";
import {
  sendTeamMessege,
  createATopic,
  replyToTopic,
} from "../../services/teams";
import { RTC_ADDRESS } from "../../config";
import { useGetKeyPairs } from "../../hooks/secrete";
import { encryptMessage } from "../../services/encrypt";
// Socket.IO
const teamSocket = io.connect(`${RTC_ADDRESS}/team`);
const chatSocket = io.connect(`${RTC_ADDRESS}/chat`);

export default function Chat() {
  // Global States
  const dispatch = useDispatch();
  const theme = useTheme();
  const userLoading = useCheckLogedinUser();
  const userStore = useSelector((state) => state.user);
  const user = userStore ? userStore.user : null;
  const router = useRouter();
  const id = router.query.id;
  const token = userStore.user ? userStore.user.token : null;

  // key pair
  const keyPairStore = useSelector((state) => state.keyPairs.keyPairs);
  const keyPair = keyPairStore
    ? keyPairStore.find((key) => key.modelId === id)
    : null;

  // Chats States
  const [chatMessage, setChatMessage] = useState("");
  const chatFileInput = useRef(null);
  const chatFileInput2 = useRef(null);
  const [chatFiles, setChatFiles] = useState([]);

  // Teams States
  // team message state
  // Message states
  const [teamMessage, setTeamMessage] = useState("");
  // File states
  const teamFileInput = useRef(null);
  const teamFileInput2 = useRef(null);
  const [teamFiles, setTeamFiles] = useState([]);
  // Topic States
  const [startTopic, setStartTopic] = useState(false);
  const [topicTitle, setTopicTitle] = useState("");
  const [topicDescription, setTopicDescription] = useState("");
  const [topicMessage, setTopicMessage] = useState("");
  const topicFileInput = useRef(null);
  const topicFileInput2 = useRef(null);
  const [topicFiles, setTopicFiles] = useState([]);

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

  // Get Key Pair
  useGetKeyPairs();

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
  const handleChooseFileIcon = () => {
    chatFileInput.current.click();
  };
  const handleChooseFileIcon2 = () => {
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

  const handleRemoveFile = (file) => {
    setChatFiles((prev) => prev.filter((f) => f !== file));
  };

  const sendMessageHandle = async (event) => {
    event.preventDefault();
    const uuid = uuidv4();
     const encryptedMessage = await encryptMessage(
       chatMessage,
       keyPair.publicKey
     );
    const formData = new FormData();

    for (const file of chatFiles) {
      formData.append("files", file.file);
    }

    formData.append("message", encryptedMessage);
    formData.append("idFromClient", uuid);
    setChatMessage("");
    const newMessage = {
      idFromClient: uuid,
      sender: user.id,
      message: encryptedMessage,
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

  const handleChooseFileIconTeam = () => {
    teamFileInput.current.click();
  };
  const handleChooseFileIcon2Team = () => {
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

  const handleRemoveFileTeam = (file) => {
    setTeamFiles((prev) => prev.filter((f) => f !== file));
  };

  const teamMessageChangeHandler = (e) => {
    setTeamMessage(e.target.value);
  };

  const teamSendMessageHandle = async () => {
    // If the teamMessage is longer than 50000 characters
    if (teamMessage.length > 50000) {
      return;
    }
    if (!keyPair) return;
    const uuid = uuidv4();
    const formData = new FormData();
    const encryptedMessage = await encryptMessage(
      teamMessage,
      keyPair.publicKey
    );

    for (const file of teamFiles) {
      formData.append("files", file.file);
    }

    formData.append("message", encryptedMessage);
    formData.append("idFromClient", uuid);
    setTeamMessage("");
    const teamNewMessage = {
      sender: {
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        id: user.id,
      },
      message: encryptedMessage,
      idFromClient: uuid,
      file: teamFiles,
    };
    setTeamFiles([]);
    setTeamMessage("");
    dispatch(
      addNewMessageToTeamId({
        teamId: id,
        teamNewMessage,
      })
    );
    const sentMessage = await sendTeamMessege(token, id, formData);

    teamSocket.emit("send_message_to_team", {
      teamId: id,
      message: sentMessage,
    });
    dispatch(
      updateTeamMessageId({
        teamId: id,
        id: sentMessage.id,
        idFromClient: sentMessage.idFromClient,
        file: sentMessage.files,
      })
    );
  };

  // Topic state handlers
  // Topic title onChange handler
  const topicTitleChangeHandler = (e) => {
    setTopicTitle(e.target.value);
  };

  // Topic description onChange handler
  const topicDescriptionChangeHandler = (e) => {
    setTopicDescription(e.target.value);
  };

  // Topic files onChange handler
  const topicFilesChangeHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setTopicFiles((prev) => [
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

  const handleChooseFileIconTopic = () => {
    topicFileInput.current.click();
  };
  const handleChooseFileIcon2Topic = () => {
    topicFileInput2.current.click();
  };
  const handleChooseFileTopic = (e) => {
    // input change handler
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setTopicFiles((prev) => [
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

  const handleRemoveFileTopic = (file) => {
    setTopicFiles((prev) => prev.filter((f) => f !== file));
  };

  // Topic Message onChange handler
  const topicMessageChangeHandler = (e) => {
    setTopicMessage(e.target.value);
  };

  // Topic Message onEmojiClick handler
  const topicOnEmojiClick = (event, emojiObject) => {
    setTopicMessage(topicMessage + emojiObject.emoji);
  };

  // Topic Message send handler
  const topicSendMessageHandle = async (topicId) => {
    const uuid = uuidv4();
    const formData = new FormData();

    for (const file of topicFiles) {
      formData.append("files", file.file);
    }

    formData.append("message", topicMessage);
    formData.append("idFromClient", uuid);
    setTopicMessage("");
    const topicNewMessage = {
      sender: {
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        id: user.id,
      },
      message: topicMessage,
      idFromClient: uuid,
      file: topicFiles,
    };
    setTopicFiles([]);
    dispatch(
      replyToTopicId({
        topicId: topicId,
        teamId: id,
        topicNewMessage,
      })
    );
    const sendMessageToTopic = await replyToTopic(token, topicId, formData);

    teamSocket.emit("send_message_to_topic", {
      teamId: id,
      message: sendMessageToTopic,
    });
    dispatch(
      updateTopicMessageId({
        topicId: topicId,
        teamId: id,
        id: sendMessageToTopic.id,
        idFromClient: sendMessageToTopic.idFromClient,
        file: sendMessageToTopic.files,
      })
    );
  };

  //  Toggle topic handler
  const toggleTopicHandler = () => {
    setStartTopic((prev) => !prev);
  };
  // Craete topic handler
  const createTopicHandler = async () => {
    const uuid = uuidv4();

    const newTopic = {
      title: topicTitle,
      description: topicDescription,
    };
    const teamNewMessage = {
      sender: {
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        id: user.id,
      },
      message: "",
      idFromClient: uuid,
      file: [],
      topic: newTopic,
    };
    dispatch(
      addNewMessageToTeamId({
        teamId: id,
        teamNewMessage,
      })
    );
    const topicFromServer = await createATopic(token, id, newTopic);
    teamSocket.emit("send_message_to_team", {
      teamId: id,
      message: teamNewMessage,
    });
    dispatch(
      updateTeamMessageId({
        teamId: id,
        id: topicFromServer.id,
        idFromClient: topicFromServer.idFromClient,
        file: topicFromServer.file,
        topic: topicFromServer.topic,
      })
    );
    setStartTopic(false);
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
                    handleRemoveFile={handleRemoveFile}
                    chatFiles={chatFiles}
                    // Teams
                    teamMessageChangeHandler={teamMessageChangeHandler}
                    teamMessage={teamMessage}
                    teamSendMessageHandle={teamSendMessageHandle}
                    teamOnEmojiClick={teamOnEmojiClick}
                    handleChooseFileIconTeam={handleChooseFileIconTeam}
                    handleChooseFileIcon2Team={handleChooseFileIcon2Team}
                    handleChooseFileTeam={handleChooseFileTeam}
                    handleRemoveFileTeam={handleRemoveFileTeam}
                    teamFileInput={teamFileInput}
                    teamFileInput2={teamFileInput2}
                    teamFiles={teamFiles}
                    // Topic
                    topicTitle={topicTitle}
                    topicTitleChangeHandler={topicTitleChangeHandler}
                    topicDescriptionChangeHandler={
                      topicDescriptionChangeHandler
                    }
                    createTopicHandler={createTopicHandler}
                    startTopic={startTopic}
                    toggleTopicHandler={toggleTopicHandler}
                    topicMessage={topicMessage}
                    topicMessageChangeHandler={topicMessageChangeHandler}
                    topicSendMessageHandle={topicSendMessageHandle}
                    topicOnEmojiClick={topicOnEmojiClick}
                    handleChooseFileIconTopic={handleChooseFileIconTopic}
                    handleChooseFileIcon2Topic={handleChooseFileIcon2Topic}
                    handleChooseFileTopic={handleChooseFileTopic}
                    handleRemoveFileTopic={handleRemoveFileTopic}
                    topicFilesChangeHandler={topicFilesChangeHandler}
                    topicFileInput={topicFileInput}
                    topicFileInput2={topicFileInput2}
                    topicFiles={topicFiles}
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
  handleRemoveFile,
  chatFiles,
  handleChooseFileIcon2,
  chatFileInput2,
  // Teams
  handleChooseFileIconTeam,
  handleChooseFileIcon2Team,
  handleChooseFileTeam,
  handleRemoveFileTeam,
  teamFileInput,
  teamFileInput2,
  teamFiles,
  // Topic
  topicTitle,
  topicTitleChangeHandler,
  topicDescriptionChangeHandler,
  createTopicHandler,
  startTopic,
  toggleTopicHandler,
  topicMessage,
  topicMessageChangeHandler,
  topicSendMessageHandle,
  topicOnEmojiClick,
  handleChooseFileIconTopic,
  handleChooseFileIcon2Topic,
  handleChooseFileTopic,
  handleRemoveFileTopic,
  topicFilesChangeHandler,
  topicFileInput,
  topicFileInput2,
  topicFiles,
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
            handleRemoveFile={handleRemoveFile}
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
            handleRemoveFileTeam={handleRemoveFileTeam}
            teamFileInput={teamFileInput}
            teamFileInput2={teamFileInput2}
            teamFiles={teamFiles}
            // Topic
            topicTitle={topicTitle}
            topicTitleChangeHandler={topicTitleChangeHandler}
            topicDescriptionChangeHandler={topicDescriptionChangeHandler}
            createTopicHandler={createTopicHandler}
            startTopic={startTopic}
            toggleTopicHandler={toggleTopicHandler}
            topicMessage={topicMessage}
            topicMessageChangeHandler={topicMessageChangeHandler}
            topicSendMessageHandle={topicSendMessageHandle}
            topicOnEmojiClick={topicOnEmojiClick}
            handleChooseFileIconTopic={handleChooseFileIconTopic}
            handleChooseFileIcon2Topic={handleChooseFileIcon2Topic}
            handleChooseFileTopic={handleChooseFileTopic}
            handleRemoveFileTopic={handleRemoveFileTopic}
            topicFilesChangeHandler={topicFilesChangeHandler}
            topicFileInput={topicFileInput}
            topicFileInput2={topicFileInput2}
            topicFiles={topicFiles}
          />
        ) : (
          <TeamSectionSkeleton />
        )}
      </>
    );
  }
};
