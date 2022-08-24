import React, { useState, useRef, useEffect } from "react";
import { Box } from "@mui/system";
import {
  Avatar,
  Typography,
  IconButton,
  Button,
  List,
  ListItem,
} from "@mui/material";
import AddIcCallRoundedIcon from "@mui/icons-material/AddIcCallRounded";
import VideoCallRoundedIcon from "@mui/icons-material/VideoCallRounded";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import EmojiEmotionsRoundedIcon from "@mui/icons-material/EmojiEmotionsRounded";
import PhotoSizeSelectActualRoundedIcon from "@mui/icons-material/PhotoSizeSelectActualRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PersonIcon from "@mui/icons-material/Person";
import { useTheme } from "@mui/material";

// import Picker from "emoji-picker-react";

const ChatSectionLeft = ({
  id,
  user,
  messageChangeHandler,
  sendNewMessage,
  message,
  messages,
  friendUsername,
  showRightHandler,
  showRight,
}) => {
  return (
    <Box
      sx={{
        flex: "65%",
        display: "flex",
        justifyContent: "flex-end",
        flexDirection: "column",
      }}
    >
      <TopBar
        friendUsername={friendUsername}
        showRightHandler={showRightHandler}
        showRight={showRight}
      />
      <Box
        sx={
          {
            flex: "55%",
            display: "flex",
            justifyContent: "flex-end",
            flexDirection: "column",
            paddingBottom: "2px",
          }
        }
      >
        {messages && <Mid user={user} messages={messages} />}
        <Bottom
          messageChangeHandler={messageChangeHandler}
          sendNewMessage={sendNewMessage}
          message={message}
        />
      </Box>
    </Box>
  );
};

export default ChatSectionLeft;

const TopBar = ({ friendUsername, showRightHandler, showRight }) => {
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
        <Avatar alt={friendUsername} sx={{ width: 45, height: 45 }} />
        <Typography
          variant="h6"
          sx={{
            paddingLeft: "10px",
          }}
        >
          {friendUsername}
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
        <IconButton>
          <AddIcCallRoundedIcon
            color="secondary"
            sx={{
              fontSize: 25,
            }}
            onClick={() => {
              // Open a new window with a adio call
              window.open(
                //  adio call api gmeet.net/join/{roomId}
                "https://meet.google.com/join/",
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
                "https://meet.google.com/join/",
                "_blank",
                "toolbar=no,scrollbars=yes,resizable=yes,top=100,left=300,width=1000,height=500"
              );
            }}
          />
        </IconButton>
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

const Mid = ({ user, messages }) => {
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
          return message.sender === user.id ? (
            <UserMessage message={message} />
          ) : (
            <FriendMessage message={message} />
          );
        })}
        <ListItem ref={toBottomWhenNewMessage} />
      </List>
    </Box>
  );
};



const UserMessage = ({ message }) => {
  return (
    <Box
      sx={{
        display: "flex",
        // centerd
        alignItems: "center",
        textAlign: "center",
        // FLoat right
        justifyContent: "flex-end",
      }}
    >
      {/* Message */}
      <Box
        sx={{
          backgroundColor: "purple",
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
        }}
      >
        <Typography variant="subtitle2" sx={{ color: "white" }}>
          {message.message}
        </Typography>
      </Box>
    </Box>
  );
};

const FriendMessage = ({ message }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        // centerd
        textAlign: "center",
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
          display: "flex",
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
        <Typography variant="subtitle2">{message.message}</Typography>
      </Box>
    </Box>
  );
};

const Bottom = ({ messageChangeHandler, sendNewMessage, message }) => {
  const [showEmojiPeaker, setShowEmojiPeaker] = useState(false);

  return (
    <Box
      sx={{
        height: "3rem",
        display: "flex",
        marginBottom: "4px",
        // Be at the bottom of the page
        verticalAlign: "bottom",
      }}
    >
      {showEmojiPeaker === true && (
        <Box
          sx={{
            position: "absolute",
            bottom: "53px",
            marginLeft: "30px",
            backgroundColor: "white",
            borderRadius: "15px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
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
          <Typography variant="h6">Emoji</Typography>
        </Box>
      )}

      <IconButton>
        <VideoFileIcon color="secondary" />
      </IconButton>
      <IconButton>
        <PhotoSizeSelectActualRoundedIcon color="secondary" />
      </IconButton>
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
                <IconButton onClick={() => sendNewMessage()} edge="end">
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
