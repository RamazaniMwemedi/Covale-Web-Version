import React, { useState, useRef, useEffect, FC } from "react";
import { Box } from "@mui/system";
import {
  Avatar,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  Button,
  Menu,
  LinearProgress,
} from "@mui/material";
import AddIcCallRoundedIcon from "@mui/icons-material/AddIcCallRounded";
import VideoCallRoundedIcon from "@mui/icons-material/VideoCallRounded";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import EmojiEmotionsRoundedIcon from "@mui/icons-material/EmojiEmotionsRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PersonIcon from "@mui/icons-material/Person";
import { purple } from "@mui/material/colors";
import { useTheme } from "@mui/material";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import GifRoundedIcon from "@mui/icons-material/GifRounded";
import AddIcon from "@mui/icons-material/Add";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";

import dynamic from "next/dynamic";

import FileComponent from "../mediaFiles/FileComponent";
import FileDisplayComponent from "../mediaFiles/FileDisplayComponent";
import FileIcone from "../mediaFiles/FileIcon";
import { useSelector } from "react-redux";
import { decryptMessage } from "../../../services/encrypt";
import { useRouter } from "next/router";
import {
  ChatInterface,
  FileInterface,
  MessageInterface,
  RootState,
  ThemeInterface,
  UserInterFace,
} from "../../../interfaces/myprofile";

const Picker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false }
);

const ChatSectionLeft = ({
  id,
  user,
  chat,
  messageChangeHandler,
  sendNewMessage,
  message,
  messages,
  showRightHandler,
  showRight,
  onEmojiClick,
  chatFileInput,
  handleChooseFileIcon,
  handleChooseFile,
  handleRemoveFile,
  chatFiles,
  handleChooseFileIcon2,
  chatFileInput2,
}: {
  id: string;
  user: UserInterFace;
  chat: ChatInterface;
  messageChangeHandler: (e: React.ChangeEvent) => void;
  sendNewMessage: (e: React.FormEvent) => void;
  message: string;
  messages: MessageInterface[];
  showRightHandler: () => void;
  showRight: boolean;
  onEmojiClick: (_: any, emojiObject: any) => void;
  chatFileInput: any;
  handleChooseFileIcon: () => void;
  handleChooseFile: () => void;
  handleRemoveFile: (file: FileInterface) => void;
  chatFiles: FileInterface[];
  handleChooseFileIcon2: () => void;
  chatFileInput2: any;
}) => {
  const [showFile, setShowFile] = useState(false);
  const [file, setFile] = useState<FileInterface | null>(null);
  const handleShowFile = (file: FileInterface) => {
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
      {chat ? (
        <Box
          sx={{
            flex: "65%",
            display: "flex",
            justifyContent: "flex-end",
            flexDirection: "column",
          }}
        >
          <TopBar
            colleagueUsername={chat.colleagueUsername}
            showRightHandler={showRightHandler}
            showRight={showRight}
            colleagueProfilePic={
              chat.colleagueProfilePic && chat.colleagueProfilePic.fileUrl
            }
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
                handleShowFile={handleShowFile}
              />
            )}
            <Bottom
              messageChangeHandler={messageChangeHandler}
              sendNewMessage={sendNewMessage}
              message={message}
              onEmojiClick={onEmojiClick}
              handleChooseFileIcon={handleChooseFileIcon}
              chatFileInput={chatFileInput}
              handleChooseFile={handleChooseFile}
              handleRemoveFile={handleRemoveFile}
              chatFiles={chatFiles}
              chatFileInput2={chatFileInput2}
              handleChooseFileIcon2={handleChooseFileIcon2}
            />
          </Box>
        </Box>
      ) : null}
    </>
  );
};

export default ChatSectionLeft;

const TopBar = ({
  colleagueUsername,
  showRightHandler,
  showRight,
  colleagueProfilePic,
}: {
  colleagueUsername: string;
  showRightHandler: () => void;
  showRight: boolean;
  colleagueProfilePic: string;
}) => {
  const theme: ThemeInterface = useTheme();
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
        borderTopRightRadius: "8px",
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
        <Avatar
          alt={colleagueUsername}
          src={colleagueProfilePic}
          sx={{ width: 45, height: 45 }}
        >
          {colleagueUsername[0]}
        </Avatar>
        <Typography
          variant="h6"
          sx={{
            paddingLeft: "10px",
          }}
        >
          {colleagueUsername}
        </Typography>
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
        {/* <IconButton>
          <AddIcCallRoundedIcon
            color="secondary"
            sx={{
              fontSize: 25,
            }}
            onClick={() => {
              // Open a new window with a adio call
              window.open(
                `http://localhost:3000/meet/room/${id}`,
                "_blank",
                "toolbar=no,scrollbars=yes,resizable=yes,top=100,left=300,width=1000,height=500"
              );
            }}
          />
        </IconButton>
        <IconButton>
          <VideoCallRoundedIcon
            color="secondary"
            sx={{
              fontSize: 25,
            }}
            onClick={() => {
              // Open a new window with a video call
              window.open(
                `http://localhost:3000/meet/room/${id}`,
                "_blank",
                "toolbar=no,scrollbars=yes,resizable=yes,top=100,left=300,width=1000,height=500"
              );
            }}
          />
        </IconButton> */}
        <IconButton
          onClick={() => {
            showRightHandler();
          }}
        >
          <PersonIcon color={showRight ? "secondary" : "action"} />
        </IconButton>
      </Box>
    </Box>
  );
};

const Mid = ({
  user,
  messages,
  handleShowFile,
}: {
  user: UserInterFace;
  messages: MessageInterface[];
  handleShowFile: (file: FileInterface) => void;
}) => {
  const toBottomWhenNewMessage = useRef<HTMLLIElement>(null);
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
          return message.sender === user.id ? (
            <UserMessage message={message} handleShowFile={handleShowFile} />
          ) : (
            <ColleagueMessage
              message={message}
              handleShowFile={handleShowFile}
            />
          );
        })}

        <ListItem ref={toBottomWhenNewMessage} />
      </List>
    </Box>
  );
};

const UserMessage: FC<{
  message: MessageInterface;
  handleShowFile: (file: {
    fileName: string;
    fileUrl: string;
    fileUri: string;
    fileType: string;
  }) => void;
}> = ({ message, handleShowFile }) => {
  const purple1 = purple[700];
  const purple2 = purple[400];
  const theme: ThemeInterface = useTheme();
  let idProvided = message.id ? true : false;
  const router = useRouter();
  const id = router.query.id;
  const [decryptedMessage, setDecryptedMessage] = useState("");
  // key pair
  const keyPairStore = useSelector(
    (state: RootState) => state.keyPairs.keyPairs
  );
  const keyPair = keyPairStore
    ? keyPairStore.find((key) => key.modelId === id)
    : null;
  const decreptMessageHandler = async () => {
    const messageToDecrypt = message.message;
    if (keyPair)
      setDecryptedMessage(
        await decryptMessage(messageToDecrypt, keyPair.privateKey)
      );
  };

  const messageToDisplay = decryptedMessage
    ? decryptedMessage.split(`\n`).map((item, key) => {
        return (
          <span key={key}>
            {item}
            <br />
          </span>
        );
      })
    : "Getting message...";

  useEffect(() => {
    if (keyPair) {
      decreptMessageHandler();
    }
  }, [keyPair, message]);

  return (
    <Box
      sx={{
        display: "flex",
        // centerd
        alignItems: "center",
        // textAlign: "center",
        // FLoat right
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
                fontStyle: "italic",
                backgroundColor: purple2,
                // centered
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
                borderStyle: "solid purple",
              }
        }
      >
        {/* File  */}
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
                onClick={() => handleShowFile(file)}
              >
                <FileComponent file={file} />
              </Box>
            );
          })}
        </Box>
        {message.message.length > 0 ? (
          <Typography variant="subtitle2" sx={{ color: "white" }}>
            {messageToDisplay}
          </Typography>
        ) : null}
        {/* If idProvided is false show the loadind component */}
        {!idProvided ? <LinearProgress color="inherit" /> : null}
      </Box>
    </Box>
  );
};

const ColleagueMessage: FC<{
  message: MessageInterface;
  handleShowFile: (file: {
    fileName: string;
    fileUrl: string;
    fileUri: string;
    fileType: string;
  }) => void;
}> = ({ message, handleShowFile }) => {
  const theme: ThemeInterface = useTheme();
  const router = useRouter();
  const id = router.query.id;
  const [decryptedMessage, setDecryptedMessage] = useState("");
  // key pair
  const keyPairStore = useSelector(
    (state: RootState) => state.keyPairs.keyPairs
  );
  const keyPair = keyPairStore
    ? keyPairStore.find((key) => key.modelId === id)
    : null;
  const decreptMessageHandler = async () => {
    const messageToDecrypt = message.message;
    if (keyPair)
      setDecryptedMessage(
        await decryptMessage(messageToDecrypt, keyPair.privateKey)
      );
  };

  const messageToDisplay = decryptedMessage
    ? decryptedMessage.split(`\n`).map((item, key) => {
        return (
          <span key={key}>
            {item}
            <br />
          </span>
        );
      })
    : "Getting message...";

  useEffect(() => {
    if (keyPair) {
      decreptMessageHandler();
    }
  }, [keyPair, message]);
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
          // centered
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
                onClick={() => handleShowFile(file)}
              >
                <FileComponent
                  displayFile
                  height={200}
                  width={200}
                  key={"FileComponent"}
                  file={file}
                />
              </Box>
            );
          })}
        </Box>
        {message.message.length > 0 ? (
          <Typography variant="subtitle2">{messageToDisplay}</Typography>
        ) : null}
      </Box>
    </Box>
  );
};

const Bottom: FC<{
  messageChangeHandler: (e: React.ChangeEvent) => void;
  sendNewMessage: (e: React.FormEvent) => void;
  message: string;
  onEmojiClick: (_: any, emojiObject: any) => void;
  handleChooseFileIcon: () => void;
  chatFileInput: any;
  handleChooseFile: () => void;
  handleRemoveFile: (file: {
    fileName: string;
    fileUrl: string;
    fileUri: string;
    fileType: string;
  }) => void;
  chatFiles: FileInterface[];
  handleChooseFileIcon2: () => void;
  chatFileInput2: any;
}> = ({
  messageChangeHandler,
  sendNewMessage,
  message,
  onEmojiClick,
  handleChooseFileIcon,
  chatFileInput,
  handleChooseFile,
  handleRemoveFile,
  chatFiles,
  handleChooseFileIcon2,
  chatFileInput2,
}) => {
  const [showEmojiPeaker, setShowEmojiPeaker] = useState(false);
  const theme: ThemeInterface = useTheme();

  return (
    <Box
      sx={{
        maxHeight: "9rem",
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
        // Put the content at the bottom of the box
        alignItems: "flex-end",
      }}
    >
      {/* Selected files will be displayed here  */}
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
          {chatFiles.length > 0 && (
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
                {chatFiles.map((file, i) => (
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
                    <FileIcone
                      height={25}
                      width={25}
                      fileType={file.fileType}
                    />
                    <Typography variant="body1">
                      {file.fileName.length > 15
                        ? file.fileName.substring(0, 15) + "..."
                        : file.fileName}
                    </Typography>
                    <IconButton onClick={() => handleRemoveFile(file)}>
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
                  onClick={handleChooseFileIcon2}
                >
                  <AddIcon />
                  <input
                    type="file"
                    hidden
                    ref={chatFileInput2}
                    onChange={handleChooseFile}
                  />
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>

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
            onEmojiClick={onEmojiClick}
            pickerStyle={{
              backgroundColor: theme.colors.textBackground,
              boxShadow: "none",
              border: `1px solid ${theme.colors.textBackground}`,
            }}
          />
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          width: "100%",
        }}
      >
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
                  <MenuListComposition
                    handleChooseFileIcon={handleChooseFileIcon}
                    chatFileInput={chatFileInput}
                    handleChooseFile={handleChooseFile}
                  />
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
              multiline
              maxRows={4}
              value={message}
              onChange={(e) => {
                messageChangeHandler(e);
              }}
              sx={{
                height: "35px",
                borderRadius: "15px",
              }}
              color="secondary"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={(e) => sendNewMessage(e)} edge="end">
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
    </Box>
  );
};
const MenuListComposition: FC<{
  handleChooseFileIcon: () => void;
  chatFileInput: any;
  handleChooseFile: () => void;
}> = ({ handleChooseFileIcon, chatFileInput, handleChooseFile }) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef: any = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (e: any) => {
    e.stopPropagation();
    if (anchorRef.current && anchorRef.current.contains(e.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: any) {
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
                    <MenuItem onClick={handleChooseFileIcon}>
                      <ListItemIcon>
                        <FileUploadRoundedIcon
                          fontSize="small"
                          color="secondary"
                        />
                      </ListItemIcon>
                      <input
                        type={"file"}
                        ref={chatFileInput}
                        style={{
                          display: "none",
                        }}
                        onChange={(e) => {
                          handleClose(e);
                          handleChooseFile();
                        }}
                      />
                      Upload file
                    </MenuItem>
                    <MenuItem onClick={(e) => handleClose(e)}>
                      <ListItemIcon>
                        <GifRoundedIcon fontSize="medium" color="secondary" />
                      </ListItemIcon>
                      Gif
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Box>
    </Stack>
  );
};
