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

import { useTheme } from "@mui/material";
import { purple } from "@mui/material/colors";

// Redux Hooks
import { useSelector } from "react-redux";

import dynamic from "next/dynamic";
import FileIcone from "../mediaFiles/FileIcon";
import FileComponent from "../mediaFiles/FileComponent";
import FileDisplayComponent from "../mediaFiles/FileDisplayComponent";

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
  showParticipant,
  showMenu,
  // Files
  handleChooseFileIconTeam,
  handleChooseFileIcon2Team,
  handleChooseFileTeam,
  teamFileInput,
  teamFileInput2,
  teamFiles,
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
              teamFileInput={teamFileInput}
              teamFileInput2={teamFileInput2}
              teamFiles={teamFiles}
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
        <Avatar alt={"Team Name"} sx={{ width: 45, height: 45 }} />
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

const Mid = ({ user, messages, handleShowTeamFile }) => {
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
            />
          ) : (
            <FriendMessage
              message={message}
              handleShowTeamFile={handleShowTeamFile}
            />
          );
        })}
        <ListItem ref={toBottomWhenNewMessage} />
      </List>
    </Box>
  );
};

const UserMessage = ({ message, user, handleShowTeamFile }) => {
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
            {message.files.map((file) => {
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
    </Box>
  );
};

const FriendMessage = ({ message, handleShowTeamFile }) => {
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
            {message.files.map((file) => {
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
  teamFileInput,
  teamFileInput2,
  teamFiles,
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
      }}
    >
      {" "}
      {/* Selected files will be displayed here  */}
      {teamFiles.length > 0 && (
        <Box
          sx={{
            position: "fixed",
            bottom: "60px",
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(0,0,0,0.6)"
                : "rgba(255,255,255,0.4)",
            marginBottom: "4px",
            borderBottomRightRadius: "5px",
            borderBottomLeftRadius: "5px",
            width: "37vw",
            marginLeft: "30px",
            marginRight: "15px",
            borderRadius: "5px",
          }}
        >
          {/* Display only the first element */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "auto auto",
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
                <Typography variant="body1">
                  {file.fileName.length > 15
                    ? file.fileName.substring(0, 15) + "..."
                    : file.fileName}
                </Typography>
                <IconButton
                  sx={{
                    "&:hover": {
                      color: "red",
                    },
                  }}
                >
                  <CancelRoundedIcon />
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
              onClick={(e) => handleChooseFileIcon2Team(e)}
            >
              <AddIcon />
              <input
                type="file"
                hidden
                ref={teamFileInput2}
                onChange={(e) => handleChooseFileTeam(e)}
              />
            </Button>
          </Box>
        </Box>
      )}
      {showEmojiPeaker === true && (
        <Box
          sx={{
            position: "absolute",
            bottom: "53px",
            marginLeft: "30px",
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
      <MenuListComposition
        handleChooseFileIconTeam={handleChooseFileIconTeam}
        teamFileInput={teamFileInput}
        handleChooseFileTeam={handleChooseFileTeam}
      />
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
                  marginLeft: "-15px",
                }}
                position="start"
              >
                <IconButton>
                  <EmojiEmotionsRoundedIcon
                    color="secondary"
                    onClick={() => {
                      setShowEmojiPeaker(true);
                    }}
                  />
                </IconButton>
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
                <IconButton onClick={() => teamSendMessageHandle()} edge="end">
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
                    {/* <MenuItem onClick={(e) => handleClose(e)}>
                      <ListItemIcon>
                        <TopicRoundedIcon fontSize="medium" color="secondary" />
                      </ListItemIcon>
                      Topic
                    </MenuItem> */}
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
