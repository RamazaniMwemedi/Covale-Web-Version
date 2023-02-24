import React, { useState, useRef, useEffect } from "react";
import { Box, Stack } from "@mui/system";
import {
  Avatar,
  Typography,
  IconButton,
  Button,
  List,
  ListItem,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  ListItemIcon,
  Popper,
  TextField,
  Link,
  Tooltip,
} from "@mui/material";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import GifRoundedIcon from "@mui/icons-material/GifRounded";
import OutlinedInput from "@mui/material/OutlinedInput";
import TopicRoundedIcon from "@mui/icons-material/TopicRounded";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import EmojiEmotionsRoundedIcon from "@mui/icons-material/EmojiEmotionsRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import BallotRoundedIcon from "@mui/icons-material/BallotRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import AddIcon from "@mui/icons-material/Add";
import LeaderboardRoundedIcon from "@mui/icons-material/LeaderboardRounded";

import { useTheme } from "@mui/material";
import { purple } from "@mui/material/colors";

// Redux Hooks
import { useSelector } from "react-redux";

import dynamic from "next/dynamic";
import FileIcone from "../mediaFiles/FileIcon";
import FileComponent from "../mediaFiles/FileComponent";
import FileDisplayComponent from "../mediaFiles/FileDisplayComponent";
import { timeAgo } from "../../../tools/tools";

const Picker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false }
);

const TeamSectionLeft = ({
  team,
  showRightHandler,
  teamMessage,
  showRight,
  teamMessageChangeHandler,
  teamSendMessageHandle,
  teamOnEmojiClick,
  showTopics,
  // Projects
  showProjects,
  showParticipant,
  showMenu,
  // Files
  handleChooseFileIconTeam,
  handleChooseFileIcon2Team,
  handleChooseFileTeam,
  handleRemoveFileTeam,
  teamFileInput,
  teamFileInput2,
  teamFiles,
  topicTitle,
  topicTitleChangeHandler,
  topicDescriptionChangeHandler,
  createTopicHandler,
  startTopic,
  toggleTopicHandler,
  // Topic
  handleClickedTopic,
  goToTopic,
}) => {
  const userStore = useSelector((state) => state.user);
  const user = userStore.user;
  const teamName = team ? team.teamName : "";
  const messages = team ? team.messages : [];
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
  return (
    <>
      {showFile && (
        <FileDisplayComponent
          handleCloseShowVideoPlayer={handleCloseShowFile}
          file={file}
        />
      )}
      {team && (
        <Box
          sx={{
            flex: "65%",
            display: "flex",
            justifyContent: "flex-end",
            flexDirection: "column",
          }}
        >
          <TopBar
            teamName={teamName}
            showRightHandler={showRightHandler}
            showRight={showRight}
            showTopics={showTopics}
            // Projects
            showProjects={showProjects}
            showMenu={showMenu}
            showParticipant={showParticipant}
          />
          <Box
            sx={{
              flex: "55%",
              display: "flex",
              justifyContent: "flex-end",
              flexDirection: "column",
              paddingBottom: "2px",
            }}
          >
            {messages && (
              <Mid
                user={user}
                messages={messages}
                handleShowTeamFile={handleShowTeamFile}
                handleClickedTopic={handleClickedTopic}
                goToTopic={goToTopic}
              />
            )}
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
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default TeamSectionLeft;

const TopBar = ({
  showRightHandler,
  showRight,
  teamName,
  showTopics,
  // Projects
  showProjects,
  showParticipant,
  showMenu,
}) => {
  const theme = useTheme();
  return (
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
        borderTopRightRadius: showRight ? "unset" : "8px",
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
        <Avatar sx={{ width: 45, height: 45 }} />
        {teamName && (
          <Typography
            variant="h6"
            sx={{
              paddingLeft: "10px",
            }}
          >
            {teamName}
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
            showTopics();
          }}
        >
          <TopicRoundedIcon color={showRight ? "secondary" : "action"} />
        </IconButton>
        {/* <IconButton
          onClick={() => {
            showProjects();
          }}
        >
          <LeaderboardRoundedIcon
            fontSize="medium"
            color={showRight ? "secondary" : "action"}
          />
        </IconButton> */}
        <IconButton
          onClick={() => {
            showParticipant();
          }}
        >
          <GroupsRoundedIcon color={showRight ? "secondary" : "action"} />
        </IconButton>
        <IconButton
          onClick={() => {
            showMenu();
          }}
        >
          <MenuRoundedIcon color={showRight ? "secondary" : "action"} />
        </IconButton>
      </Box>
    </Box>
  );
};

const Mid = ({
  user,
  messages,
  handleShowTeamFile,
  handleClickedTopic,
  goToTopic,
}) => {
  const toBottomWhenNewMessage = useRef(null);
  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    toBottomWhenNewMessage.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box
      sx={{
        marginLeft: "5px",
        marginRight: "5px",
      }}
    >
      <List
        sx={{
          maxHeight: "82.6vh",
          overflowY: "scroll",
          overflowX: "hidden",
          padding: "0px",
          margin: "0px",
        }}
      >
        {messages.map((message) => {
          return message.sender.id === user.id ? (
            <UserMessage
              message={message}
              user={user}
              handleShowTeamFile={handleShowTeamFile}
              handleClickedTopic={handleClickedTopic}
              goToTopic={goToTopic}
            />
          ) : (
            <ColleagueMessage
              message={message}
              handleShowTeamFile={handleShowTeamFile}
              handleClickedTopic={handleClickedTopic}
              goToTopic={goToTopic}
            />
          );
        })}
        <ListItem ref={toBottomWhenNewMessage} />
      </List>
    </Box>
  );
};

const TopicMessage = ({
  message,
  user,
  handleShowTeamFile,
  handleClickedTopic,
  goToTopic,
  color,
  textColor,
  noShowTopicThings,
}) => {
  const idProvided = message.id ? true : false;
  const theme = useTheme();
  // last message in  a topic
  const lastMessage = message.topic.messages
    ? message.topic.messages[message.topic.messages.length - 1]
    : null;

  return (
    <Box
      sx={{
        // centered
        backgroundColor: color,
        display: "flex",
        paddingLeft: "5px",
        paddingRight: "5px",
        paddingTop: "5px",
        paddingBottom: "5px",
        borderRadius: "12px",
        width: "50%",
        height: "auto",
        marginBottom: "10px",
        borderBottomRightRadius: "0px",
        // max width 80%
        maxWidth: "80%",
        marginRight: "6px",
      }}
    >
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Tooltip title={"Topic Title"} placement="left-start">
            <Typography
              variant="subtitle1"
              sx={{
                color: theme.colors.text1,
                fontWeight: "bold",
                color: textColor ? textColor : "white",
              }}
            >
              {message.topic.title}
            </Typography>
          </Tooltip>{" "}
          {/* If createdAt */}
          {message.topic.createdAt && (
            <Typography variant="subtitle2">
              {timeAgo(message.topic.createdAt)}
            </Typography>
          )}
        </Box>
        <Tooltip title={"Topic Description"} placement="left-start">
          <Typography
            variant="subtitle2"
            sx={{
              color: theme.colors.text1,
              color: textColor ? textColor : "white",
            }}
          >
            {message.topic.description}
          </Typography>
        </Tooltip>
        {message.topic.messages ? (
          message.topic.messages.length > 0 && (
            <>
              <Box
                sx={{
                  marginLeft: "40px",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: theme.colors.text1,
                    color: textColor ? textColor : "white",
                    fontWeight: "bold",
                  }}
                >
                  Recent Message
                </Typography>
                {lastMessage && (
                  <MessageComponentForTopic
                    message={lastMessage}
                    user={user}
                    handleShowTeamFile={handleShowTeamFile}
                    textColor="black"
                  />
                )}
                {/* Link To other messages */}
                {/* <Typography variant="subtitle2" sx={{ color: theme.colors.text1 }}>
              {message.topic.messages.length} messages
            </Typography> */}
              </Box>
            </>
          )
        ) : (
          <Typography
            variant="subtitle2"
            sx={{ color: textColor ? textColor : theme.colors.text1 }}
          >
            No messages
          </Typography>
        )}
        {!noShowTopicThings && (
          <Link
            color="primary"
            underline="hover"
            sx={{
              cursor: "pointer",
            }}
            onClick={() => {
              goToTopic();
              handleClickedTopic(message.topic.id);
            }}
          >
            <Typography
              variant="subtitle2"
              color="primary"
              sx={{
                fontWeight: "bold",
              }}
            >
              Go to topic
            </Typography>
          </Link>
        )}
      </Box>
    </Box>
  );
};

const MessageComponentForTopic = ({
  message,
  user,
  handleShowTeamFile,
  textColor,
}) => {
  const idProvided = message.id ? true : false;
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: theme.colors.textBackground2,
        p: 0.7,
        borderRadius: "8px",
        flex: 1,
      }}
    >
      {/*  */}
      {/* Message */}
      {message.topic ? (
        <TopicMessage
          message={message}
          user={user}
          handleShowTeamFile={handleShowTeamFile}
        />
      ) : (
        <>
          <Avatar
            sx={{
              width: 25,
              height: 25,
              marginRight: "6px",
            }}
          />
          <Box
            sx={
              idProvided
                ? {
                    // centered
                    display: "flex",
                    paddingLeft: "5px",
                    paddingRight: "5px",
                    paddingBottom: "5px",
                    borderRadius: "12px",
                    width: "100%",
                    height: "auto",
                    borderBottomRightRadius: "0px",
                    // max width 80%
                    maxWidth: "80%",
                    marginRight: "6px",
                  }
                : {
                    display: "flex",
                    paddingLeft: "5px",
                    paddingRight: "5px",
                    paddingBottom: "5px",
                    borderRadius: "12px",
                    width: "80%",
                    height: "auto",
                    borderBottomRightRadius: "0px",
                    // max width 80%
                    maxWidth: "80%",
                    marginRight: "6px",
                  }
            }
          >
            <Box sx={{ width: "100%" }}>
              {/* User name */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: textColor ? textColor : "white",
                    fontWeight: "bold",
                  }}
                >
                  {`${message.sender.firstname} ${message.sender.lastname}`}
                </Typography>
                {/* Time ago */}
                <Typography
                  variant="caption"
                  sx={{
                    color: textColor ? textColor : theme.colors.text1,
                    color: textColor ? textColor : "white",
                  }}
                >
                  {timeAgo(message.sentAt)} ago
                </Typography>
              </Box>
              <Box
                sx={{
                  // If there are 3 or more files, display in grid
                  display: "flex",
                  flexDirection: "column",
                  gridGap: "5px",
                  // centerd
                  // alignItems: "center",
                  // textAlign: "center",
                }}
              >
                {message.file.map((file) => {
                  return (
                    <Box
                      sx={{
                        cursor: "pointer",
                        backgroundColor: theme.colors.textBackground,
                        display: "flex",
                        m: 1,
                        // To be at the right of the message
                        width: "100%",
                        borderRadius: "5px",
                      }}
                      onClick={() => handleShowTeamFile(file)}
                    >
                      <FileComponent file={file} />
                    </Box>
                  );
                })}
              </Box>
              <Typography
                variant="subtitle2"
                sx={{ color: textColor ? textColor : "white" }}
              >
                {message.message}
              </Typography>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

const UserMessage = ({
  message,
  user,
  handleShowTeamFile,
  handleClickedTopic,
  goToTopic,
  noShowTopicThings,
}) => {
  const purple1 = purple[700];
  const purple2 = purple[400];
  const idProvided = message.id ? true : false;
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      {/* Message */}

      {message.topic ? (
        <>
          <TopicMessage
            message={message}
            handleShowTeamFile={handleShowTeamFile}
            handleClickedTopic={handleClickedTopic}
            goToTopic={goToTopic}
            color={purple[800]}
            noShowTopicThings={noShowTopicThings}
          />
        </>
      ) : (
        <>
          <Box
            sx={
              idProvided
                ? {
                    backgroundColor: purple1,
                    // centered
                    display: "flex",
                    paddingLeft: "5px",
                    paddingRight: "5px",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                    borderRadius: "12px",
                    width: "auto",
                    height: "auto",
                    marginBottom: "10px",
                    borderBottomRightRadius: "0px",
                    // max width 80%
                    maxWidth: "80%",
                    marginRight: "6px",
                  }
                : {
                    backgroundColor: purple2,
                    display: "flex",
                    paddingLeft: "5px",
                    paddingRight: "5px",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                    borderRadius: "12px",
                    width: "auto",
                    height: "auto",
                    marginBottom: "10px",
                    borderBottomRightRadius: "0px",
                    // max width 80%
                    maxWidth: "80%",
                    marginRight: "6px",
                  }
            }
          >
            <Box>
              {/* User name */}
              <Typography
                variant="subtitle2"
                sx={{
                  color: "white",
                  // paddingRight: "5px",
                  // paddingTop: "5px",
                  // paddingBottom: "5px",
                  // to be bold
                  fontWeight: "bold",
                }}
              >
                {`${user.firstname} ${user.lastname}`}
              </Typography>
              <Box
                sx={{
                  // If there are 3 or more files, display in grid
                  display: "flex",
                  flexDirection: "column",
                  gridGap: "5px",
                  // centerd
                  // alignItems: "center",
                  // textAlign: "center",
                }}
              >
                {message.file &&
                  message.file.map((file) => {
                    return (
                      <Box
                        sx={{
                          cursor: "pointer",
                          backgroundColor: theme.colors.textBackground,
                          display: "flex",
                          m: 1,
                          // To be at the right of the message
                          width: "200px",
                          borderRadius: "5px",
                        }}
                        onClick={() => handleShowTeamFile(file)}
                      >
                        <FileComponent file={file} />
                      </Box>
                    );
                  })}
              </Box>
              <Typography variant="subtitle2" sx={{ color: "white" }}>
                {message.message}
              </Typography>
            </Box>
          </Box>
          <Avatar
            sx={{
              width: 25,
              height: 25,
              marginRight: "6px",
            }}
          />
        </>
      )}
    </Box>
  );
};

const ColleagueMessage = ({
  message,
  handleShowTeamFile,
  handleClickedTopic,
  goToTopic,
}) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        // centerd
        // textAlign: "center",
        // FLoat right
        justifyContent: "flex-start",
      }}
    >
      {message.topic ? (
        <>
          <TopicMessage
            message={message}
            handleShowTeamFile={handleShowTeamFile}
            color={theme.colors.textBackground}
            textColor="black"
            handleClickedTopic={handleClickedTopic}
            goToTopic={goToTopic}
          />
        </>
      ) : (
        <>
          {/* Avatar */}
          <Avatar
            sx={{
              width: 25,
              height: 25,
              marginRight: "6px",
            }}
          />
          {/* Message */}
          <Box
            sx={{
              backgroundColor: theme.colors.textBackground,
              paddingLeft: "5px",
              paddingRight: "5px",
              paddingTop: "5px",
              paddingBottom: "5px",
              borderRadius: "7px",
              width: "auto",
              height: "auto",
              marginBottom: "10px",
              borderBottomLeftRadius: "0px",
              // max width 80%
              maxWidth: "80%",
            }}
          >
            <Box
              sx={{
                backgroundColor: theme.palette.grey,
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                }}
                variant="subtitle2"
              >{`${message.sender.firstname} ${message.sender.lastname}`}</Typography>
              <Box
                sx={{
                  // If there are 3 or more files, display in grid
                  display: "flex",
                  flexDirection: "column",
                  gridGap: "5px",
                }}
              >
                {message.file &&
                  message.file.map((file) => {
                    return (
                      <Box
                        sx={{
                          cursor: "pointer",
                          backgroundColor: theme.colors.textBackground,
                          display: "flex",
                          m: 1,
                          // To be at the right of the message
                          width: "200px",
                          borderRadius: "5px",
                        }}
                        onClick={() => handleShowTeamFile(file)}
                      >
                        <FileComponent file={file} />
                      </Box>
                    );
                  })}
              </Box>
            </Box>

            <Box
              sx={{
                // centered
                display: "flex",
              }}
            >
              <Typography variant="subtitle2">{message.message}</Typography>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

const Bottom = ({
  teamMessageChangeHandler,
  teamSendMessageHandle,
  teamMessage,
  teamOnEmojiClick,
  // Files
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
  topicDescription,
  topicDescriptionChangeHandler,
  createTopicHandler,
  startTopic,
  toggleTopicHandler,
  topicId,
  noShowTopicThings,
}) => {
  const [showEmojiPeaker, setShowEmojiPeaker] = useState(false);
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: "3rem",
        display: "flex",
        marginBottom: "4px",
        // Be at the bottom of the page
        verticalAlign: "bottom",
        backgroundColor: theme.colors.background1,
        borderBottomRightRadius: "5px",
        borderBottomLeftRadius: "5px",
        marginLeft: "10px",
        marginRight: "15px",
        borderRadius: "5px",
        gap: 5,
        justifyContent: "space-between",
      }}
    >
      {" "}
      {/* Selected files will be displayed here  */}
      {/* Top dialogs */}
      <Box
        sx={{
          display: "flex",
          position: "fixed",
          bottom: "60px",
          marginBottom: "4px",
          borderBottomRightRadius: "5px",
          borderBottomLeftRadius: "5px",
          width: "50%",
          marginLeft: "30px",
          marginRight: "15px",
          borderRadius: "5px",
        }}
      >
        <Box>
          {teamFiles.length > 0 && (
            <Box
              sx={{
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(0,0,0,0.6)"
                    : "rgba(255,255,255,0.4)",
                borderBottomRightRadius: "5px",
                borderBottomLeftRadius: "5px",
                width: "80%",
                borderRadius: "5px",
                height: "180px",
                textAlign: "center",
                // Blur background
                backdropFilter: "blur(5px)",
              }}
            >
              {/* Display only the first element */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "50% 50%",
                }}
              >
                {teamFiles.map((file, i) => (
                  <Box
                    key={i}
                    sx={{
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? theme.colors.background1
                          : theme.colors.background1,
                      p: 1,
                      mt: 0.3,
                      ml: 0.3,
                      borderRadius: 2,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <FileIcone fileType={file.fileType} />
                    {/* File name should fit inside the typography other wise add ... at the end */}
                    <Typography
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        width: "100px",
                      }}
                      variant="subtitle2"
                    >
                      {file.fileName}
                    </Typography>

                    <IconButton onClick={() => handleRemoveFileTeam(file)}>
                      <CloseRoundedIcon />
                    </IconButton>
                  </Box>
                ))}
              </Box>
              <Box
                sx={{
                  m: 1,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={(e) => {
                    handleChooseFileIcon2Team(e);
                    console.log(teamFileInput);
                  }}
                >
                  <AddIcon />
                  <input
                    type="file"
                    hidden
                    ref={teamFileInput2}
                    onChange={(e) => {
                      handleChooseFileTeam(e);
                    }}
                  />
                </Button>
              </Box>
            </Box>
          )}
        </Box>
        {!noShowTopicThings && startTopic === true && (
          <Box
            sx={{
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(0,0,0,0.6)"
                  : "rgba(255,255,255,0.4)",
              borderBottomRightRadius: "5px",
              borderBottomLeftRadius: "5px",
              width: "50%",
              borderRadius: "5px",
              height: "180px",
              alignItems: "center",
              p: 1,
              // Blur background
              backdropFilter: "blur(5px)",
            }}
          >
            {/* Topic */}

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6">Start a topic</Typography>
              <IconButton onClick={toggleTopicHandler}>
                <CloseRoundedIcon />
              </IconButton>
            </Box>
            <Box
              sx={
                {
                  // justifyContent: "center",
                  // alignItems: "center",
                  // textAlign: "center",
                }
              }
            >
              <TextField
                sx={{
                  width: "90%",
                  backgroundColor: theme.colors.textBackground,
                  borderStyle: "none",
                }}
                label="Title"
                variant="outlined"
                size="small"
                color="secondary"
                value={topicTitle}
                onChange={(e) => topicTitleChangeHandler(e)}
              />
              <TextField
                sx={{
                  width: "90%",
                  backgroundColor: theme.colors.textBackground,
                  borderStyle: "none",
                  marginTop: 1,
                }}
                label="Description"
                variant="outlined"
                size="small"
                color="secondary"
                value={topicDescription}
                onChange={(e) => topicDescriptionChangeHandler(e)}
              />
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={createTopicHandler}
                sx={{
                  marginTop: 1,
                }}
              >
                Start
              </Button>
            </Box>
          </Box>
        )}
      </Box>
      {showEmojiPeaker === true && (
        <Box
          sx={{
            position: "absolute",
            bottom: "53px",
            // marginLeft: "10px",
            backgroundColor: theme.colors.textBackground,
            borderRadius: "15px",

            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <IconButton
            sx={{
              marginLeft: "250px",
            }}
            onClick={() => {
              setShowEmojiPeaker(!showEmojiPeaker);
            }}
          >
            <CloseRoundedIcon color="secondary" fontSize="small" />
          </IconButton>
          <Picker
            native={true}
            preload={true}
            searchPlaceholder={"Search emojie"}
            onEmojiClick={teamOnEmojiClick}
            pickerStyle={{
              backgroundColor: theme.colors.textBackground,
              boxShadow: "none",
              border: `1px solid ${theme.colors.textBackground}`,
            }}
          />
        </Box>
      )}
      {/* Communication */}
      <Box
        sx={{
          display: "flex",
          width: "100%",
        }}
      >
        <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
          <OutlinedInput
            startAdornment={
              <InputAdornment
                sx={{
                  marginLeft: "-19px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                position="start"
              >
                <MenuListComposition
                  handleChooseFileIconTeam={handleChooseFileIconTeam}
                  teamFileInput={teamFileInput}
                  handleChooseFileTeam={handleChooseFileTeam}
                  toggleTopicHandler={toggleTopicHandler}
                  noShowTopicThings={noShowTopicThings}
                />
                <IconButton>
                  <EmojiEmotionsRoundedIcon
                    color="secondary"
                    onClick={() => {
                      setShowEmojiPeaker(true);
                    }}
                  />
                </IconButton>{" "}
              </InputAdornment>
            }
            id="outlined-adornment-password"
            type="text"
            multiline={false}
            value={teamMessage}
            onChange={(e) => {
              teamMessageChangeHandler(e);
            }}
            sx={{
              height: "35px",
              borderRadius: "15px",
            }}
            color="secondary"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => teamSendMessageHandle(topicId)}
                  edge="end"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="purple"
                    // class="bi bi-send-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                  </svg>
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Box>
    </Box>
  );
};

function MenuListComposition({
  handleChooseFileIconTeam,
  teamFileInput,
  handleChooseFileTeam,
  toggleTopicHandler,
  noShowTopicThings,
}) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = (e) => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Stack direction="row" spacing={2}>
      <Box>
        <IconButton
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <ControlPointRoundedIcon color="secondary" />
        </IconButton>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={(e) => handleClose(e)}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem
                      onClick={(e) => {
                        handleChooseFileIconTeam(e);
                      }}
                    >
                      <ListItemIcon>
                        <FileUploadRoundedIcon
                          fontSize="small"
                          color="secondary"
                        />
                      </ListItemIcon>
                      <input
                        type={"file"}
                        ref={teamFileInput}
                        style={{
                          display: "none",
                        }}
                        onChange={(e) => {
                          handleClose(e);
                          handleChooseFileTeam(e);
                        }}
                      />
                      Upload file
                    </MenuItem>
                    {!noShowTopicThings && (
                      <MenuItem
                        onClick={(e) => {
                          handleClose(e);
                          toggleTopicHandler();
                        }}
                      >
                        <ListItemIcon>
                          <TopicRoundedIcon
                            fontSize="medium"
                            color="secondary"
                          />
                        </ListItemIcon>
                        Topic
                      </MenuItem>
                    )}
                    {/* <MenuItem>
                      <ListItemIcon>
                        <BallotRoundedIcon
                          fontSize="medium"
                          color="secondary"
                        />
                      </ListItemIcon>
                      Poll
                    </MenuItem> */}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Box>
    </Stack>
  );
}

// export userMessage component and friendMessage component
export { UserMessage, ColleagueMessage, Bottom };
