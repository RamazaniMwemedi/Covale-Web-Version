import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { Avatar, IconButton, Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import {
  Bottom,
  ColleagueMessage,
  UserMessage,
} from "../../teams/TeamSectionLeft";
import { useDispatch, useSelector } from "react-redux";
import {
  useJoinTeamRoom,
  useRecieveNewTeamMessage,
} from "../../../../hooks/teams";
import {
  useGetNotification,
  useJoinNotificationRoom,
  useRecieveNewNotification,
} from "../../../../hooks/notification";
import {
  sendTeamMessege,
  createATopic,
  replyToTopic,
} from "../../../../services/teams";
import {
  addNewMessageToTeamId,
  updateTeamMessageId,
  replyToTopicId,
  updateTopicMessageId,
} from "../../../../Redux/slices/team";
import FileDisplayComponent from "../../mediaFiles/FileDisplayComponent";

import config from "../../../../config";
import { io } from "socket.io-client";
import { TheaterComedy } from "@mui/icons-material";
import { useTheme } from "@mui/styles";
import { useRouter } from "next/router";
// Socket.IO
const teamSocket = io.connect(`${config.RTC_ADDRESS}/team`);

const TeamChats = ({ selectedTeam }) => {
  const userStore = useSelector((state) => state.user);
  const user = userStore ? userStore.user : null;
  const token = userStore.user ? userStore.user.token : null;
  const dispatch = useDispatch();
  const router = useRouter();
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
  const theme = useTheme();
  const userId = user ? user.id : null;
  useJoinTeamRoom(selectedTeam && selectedTeam.id);
  useGetNotification(token);
  useJoinNotificationRoom(userId);

  // Recieve new message for team
  useRecieveNewTeamMessage(user, userId);
  // Recieve new notification
  useRecieveNewNotification(user);

  //Teams handlers
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
      file: teamFiles,
    };
    setTeamFiles([]);
    dispatch(
      addNewMessageToTeamId({
        teamId: selectedTeam.id,
        teamNewMessage,
      })
    );
    const sentMessage = await sendTeamMessege(token, selectedTeam.id, formData);

    teamSocket.emit("send_message_to_team", {
      teamId: selectedTeam.id,
      message: sentMessage,
    });
    dispatch(
      updateTeamMessageId({
        teamId: selectedTeam.id,
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
        teamId: selectedTeam.id,
        topicNewMessage,
      })
    );
    const sendMessageToTopic = await replyToTopic(token, topicId, formData);

    teamSocket.emit("send_message_to_topic", {
      teamId: selectedTeam.id,
      message: sendMessageToTopic,
    });
    dispatch(
      updateTopicMessageId({
        topicId: topicId,
        teamId: selectedTeam.id,
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
        teamId: selectedTeam.id,
        teamNewMessage,
      })
    );
    const topicFromServer = await createATopic(token, id, newTopic);
    teamSocket.emit("send_message_to_team", {
      teamId: selectedTeam.id,
      message: teamNewMessage,
    });
    dispatch(
      updateTeamMessageId({
        teamId: selectedTeam.id,
        id: topicFromServer.id,
        idFromClient: topicFromServer.idFromClient,
        file: topicFromServer.file,
        topic: topicFromServer.topic,
      })
    );
    setStartTopic(false);
  };

  const [file, setFile] = useState(null);

  const [showFile, setShowFile] = useState(false);
  const handleShowTeamFile = (file) => {
    // If file.fileUrl includes https:// then setFile to file and setShowVideoPlayer to true
    if (file.fileUrl.includes("https://")) {
      setFile(file);
      setShowFile(true);
    }
  };
  const handleCloseShowFile = () => {
    setShowFile(false);
  };

  if (!selectedTeam) return null;
  return (
    <>
      {selectedTeam && (
        <Box>
          {showFile && (
            <FileDisplayComponent
              handleCloseShowVideoPlayer={handleCloseShowFile}
              file={file}
            />
          )}
          <Box
            sx={{
              fontWeight: "bold",
              display: "flex",
              p: 1,
              height: "85vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              // paddingBottom: "45px",
              borderRadius: "8px",
              mb: 5,
            }}
          >
            <Box
              sx={{
                height: "4rem",
                // centered
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                textAlign: "center",
                paddingLeft: "5px",
                // z-index
                zIndex: "1",
                // border
                borderRight: `1px solid ${theme.colors.background1}`,
                webkitBackdropFilter: "blur(10px)",
                position: "sticky",
                top: "0px",
                borderBottom: `1px solid ${theme.colors.background1}`,
                backgroundColor: theme.colors.background1,
              }}
            >
              {/* Left */}
              <Box
                sx={{
                  display: "flex",
                  // centerd
                  justifyContent: "space-between",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Avatar sx={{ width: 30, height: 30 }}>
                  {selectedTeam.teamName[0]}
                </Avatar>
                {selectedTeam.teamName && (
                  <Typography
                    variant="h6"
                    sx={{
                      paddingLeft: "10px",
                    }}
                  >
                    {selectedTeam.teamName}
                  </Typography>
                )}
              </Box>
              {/* Right */}
              <Box
                sx={{
                  display: "flex",
                  // centerd
                  justifyContent: "space-between",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <IconButton
                  onClick={() => {
                    router.push(`/chats/t/${selectedTeam.id}`);
                  }}
                >
                  {" "}
                  <ChatBubbleOutlineRoundedIcon />
                </IconButton>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",

                // scrollable
                overflowY: "scroll",
                height: "100%",
              }}
            >
              {selectedTeam.messages.map((message) => {
                return message.sender.id === user.id ? (
                  <UserMessage
                    message={message}
                    user={user}
                    handleShowTeamFile={handleShowTeamFile}
                    // handleClickedTopic={handleClickedTopic}
                    // goToTopic={goToTopic}
                    noShowTopicThings={true}
                  />
                ) : (
                  <ColleagueMessage
                    message={message}
                    handleShowTeamFile={handleShowTeamFile}
                    noShowTopicThings={true}

                    // handleClickedTopic={handleClickedTopic}
                    // goToTopic={goToTopic}
                  />
                );
              })}
            </Box>
            <Bottom
              teamMessageChangeHandler={teamMessageChangeHandler}
              teamSendMessageHandle={teamSendMessageHandle}
              teamMessage={teamMessage}
              teamOnEmojiClick={teamOnEmojiClick}
              // Files
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
              noShowTopicThings={true}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

TeamChats.propTypes = {};

export default TeamChats;
