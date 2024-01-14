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
import {
  FileInterface,
  RootState,
  TeamInterface,
  ThemeInterface,
  UserInterFace,
} from "../../../../interfaces/myprofile";
// Socket.IO
const socketIO: any = io;
const teamSocket = socketIO.connect(`${config.RTC_ADDRESS}/team`);

const TeamChats = ({ selectedTeam }: { selectedTeam: TeamInterface }) => {
  const userStore = useSelector((state: RootState) => state.user);
  const user = userStore ? userStore.user : null;
  const token = userStore.user ? userStore.user.token : "";
  const dispatch = useDispatch();
  const router = useRouter();
  // Teams States
  // team message state
  // Message states
  const [teamMessage, setTeamMessage] = useState("");
  // File states
  const teamFileInput = useRef<HTMLInputElement | null>(null);
  const teamFileInput2 = useRef<HTMLInputElement | null>(null);
  const [teamFiles, setTeamFiles] = useState<
    {
      file: File;
      fileName: string;
      fileUrl: string;
      fileUri: string;
      fileType: string;
      fileSize: number;
    }[]
  >([]);

  // Topic States
  const [startTopic, setStartTopic] = useState(false);
  const [topicTitle, setTopicTitle] = useState("");
  const [topicDescription, setTopicDescription] = useState("");
  const [topicMessage, setTopicMessage] = useState("");
  const topicFileInput = useRef<HTMLInputElement | null>(null);
  const topicFileInput2 = useRef<HTMLInputElement | null>(null);
  const [topicFiles, setTopicFiles] = useState<
    {
      file: File;
      fileName: string;
      fileUrl: string;
      fileUri: string;
      fileType: string;
      fileSize: number;
    }[]
  >([]);
  const theme: ThemeInterface = useTheme();
  const userId = user ? user.id : "";
  useJoinTeamRoom(selectedTeam && selectedTeam.id);
  useGetNotification(token);
  useJoinNotificationRoom(userId);

  // Recieve new message for team
  useRecieveNewTeamMessage(userId);
  // Recieve new notification
  useRecieveNewNotification(userId);

  //Teams handlers
  const teamOnEmojiClick = (_: any, emojiObject: any) => {
    setTeamMessage(teamMessage + emojiObject.emoji);
  };

  const handleChooseFileIconTeam = () => {
    if (!teamFileInput) return;
    teamFileInput.current?.click();
  };
  const handleChooseFileIcon2Team = () => {
    if (!teamFileInput2) return;
    teamFileInput2.current?.click();
  };

  const handleChooseFileTeam = (e: any) => {
    // input change handler
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setTeamFiles((prev) => [
        ...prev,
        {
          file: file,
          fileName: file.name,
          fileUrl: reader.result as string,
          fileUri: reader.result as string,
          fileType: file.type || "", // Provide a default value if file.type is undefined
          fileSize: file.size || 0, // Provide a default value if file.size is undefined
        },
      ]);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleRemoveFileTeam = (file: {
    file: File;
    fileName: string;
    fileUrl: string;
    fileUri: string;
    fileType: string;
    fileSize: number;
  }) => {
    setTeamFiles((prev) => prev.filter((f) => f !== file));
  };

  const teamMessageChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTeamMessage(e.target.value);
  };

  const teamSendMessageHandle = async () => {
    if (!keyPair) return;
    if (teamMessage.trim().length > 0 || teamFiles.length > 0) {
      const uuid = uuidv4();
      const formData = new FormData();
      const encryptedMessage = await encryptMessage(
        teamMessage.length > 0 ? teamMessage : " ",
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
    }
  };

  // Topic state handlers
  // Topic title onChange handler
  const topicTitleChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTopicTitle(e.target.value);
  };

  // Topic description onChange handler
  const topicDescriptionChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTopicDescription(e.target.value);
  };

  // Topic files onChange handler
  const topicFilesChangeHandler = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setTopicFiles((prev) => [
        ...prev,
        {
          file: file,
          fileName: file.name,
          fileUrl: reader.result as string,
          fileUri: reader.result as string,
          fileType: file.type || "", // Provide a default value if file.type is undefined
          fileSize: file.size || 0, // Provide a default value if file.size is undefined
        },
      ]);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleChooseFileIconTopic = () => {
    topicFileInput.current?.click();
  };
  const handleChooseFileIcon2Topic = () => {
    topicFileInput2.current?.click();
  };
  const handleChooseFileTopic = (e: any) => {
    // input change handler
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setTopicFiles((prev) => [
        ...prev,
        {
          file: file,
          fileName: file.name,
          fileUrl: reader.result as string,
          fileUri: reader.result as string,
          fileType: file.type || "", // Provide a default value if file.type is undefined
          fileSize: file.size || 0, // Provide a default value if file.size is undefined
        },
      ]);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleRemoveFileTopic = (file: {
    file: File;
    fileName: string;
    fileUrl: string;
    fileUri: string;
    fileType: string;
    fileSize: number;
  }) => {
    setTopicFiles((prev) => prev.filter((f) => f !== file));
  };

  // Topic Message onChange handler
  const topicMessageChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTopicMessage(e.target.value);
  };

  // Topic Message onEmojiClick handler
  const topicOnEmojiClick = (_: any, emojiObject: any) => {
    setTopicMessage(topicMessage + emojiObject.emoji);
  };

  // Topic Message send handler
  const topicSendMessageHandle = async (topicId: string) => {
    if (!user) return null;
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
    if (!user) return null;
    const uuid = uuidv4();

    const newTopic: {
      title: string;
      description: string;
    } = {
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
    const topicFromServer = await createATopic(
      token,
      selectedTeam.id,
      newTopic
    );
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

  const [file, setFile] = useState<FileInterface | null>(null);

  const [showFile, setShowFile] = useState(false);
  const handleShowTeamFile = (file: FileInterface) => {
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
          {showFile && file && (
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
                const sender = message.sender as UserInterFace;
                return user && sender.id === user.id ? (
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
