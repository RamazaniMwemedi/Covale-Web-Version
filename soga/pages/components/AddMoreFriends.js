import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useTheme } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";

import AddIcCallRoundedIcon from "@mui/icons-material/AddIcCallRounded";
// import VideoCallRoundedIcon from "@mui/icons-material/VideoCallRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import EmojiEmotionsRoundedIcon from "@mui/icons-material/EmojiEmotionsRounded";
import { useState } from "react";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import PhotoSizeSelectActualRoundedIcon from "@mui/icons-material/PhotoSizeSelectActualRounded";

const AddMoreFriends = ({
  closeMorePeopleHandler,
  messageChangeHandler,
  message,
  sendMessage,
  friendClicked,
  clickFriendHandler,
  clearFriendHandler,
  friends,
}) => {
  const theme = useTheme();
  return (
    <>
      {friends && (
        <Box
          sx={{
            height: "400px",
            width: "271px",
            position: "fixed",
            bottom: "0px",
            borderTopRightRadius: "10px",
            borderTopLeftRadius: "10px",
            blur: "5px",
            backgroundColor: theme.colors.background1,
            position: "fixed",
            zIndex: "1",
          }}
        >
          {!friendClicked && (
            <Box
              sx={{
                padding: "3px",
                position: "sticky",
                top: "0px",
                zIndex: "1",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6">Friends</Typography>
                <IconButton
                  sx={{
                    marginTop: "6px",
                    backgroundColor: theme.colors.itemBackground,
                    "&:hover": {
                      backgroundColor: theme.colors.background2,
                    },
                  }}
                  onClick={() => {
                    closeMorePeopleHandler();
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
              <Divider />
            </Box>
          )}

          {/* Friends */}
          <Box
            sx={{
              overflow: "scroll",
              height: "400px",
              padding: "3px",
            }}
          >
            {friendClicked ? (
              <FriendChat
                friend={friendClicked}
                clearFriendHandler={clearFriendHandler}
                messageChangeHandler={messageChangeHandler}
                message={message}
                sendMessage={sendMessage}
              />
            ) : !friends ? (
              <Loading />
            ) : friends.length > 0 ? (
              <FriendList
                friends={friends}
                clickFriendHandler={clickFriendHandler}
              />
            ) : (
              <Typography variant="h6">No friends</Typography>
            )}
          </Box>
          {/* End of friends */}
        </Box>
      )}
    </>
  );
};

export default AddMoreFriends;

const Loading = () => {
  return (
    <Stack spacing={1}>
      {[...Array(5)].map((_, i) => (
        <ListItem
          key={i}
          sx={{
            display: "flex",
            // border style
            borderStyle: " solid ",
            // border color
            borderColor: "lightgrey",
            // border width
            borderWidth: "2px",
            borderRadius: "0.5rem",
          }}
        >
          {/* Avatar skeleton */}
          <Skeleton
            variant="circle"
            width={40}
            height={40}
            style={{ borderRadius: "50%" }}
          />
          {/* Skeleton for user first and lastname */}
          <Box sx={{}}>
            <Skeleton
              variant="rect"
              width={185}
              height={20}
              style={{ marginLeft: "10px" }}
            />
            <Skeleton
              variant="rect"
              width={185}
              height={8}
              style={{ marginLeft: "10px", marginTop: "8px" }}
            />
          </Box>
        </ListItem>
      ))}
      {/* A skeleton of ListItem skeleton for chat */}
    </Stack>
  );
};

const FriendList = ({ friends, clickFriendHandler }) => {
  return (
    <>
      {friends.map((friend, i) => {
        return (
          <Box
            key={i}
            sx={{
              padding: "3px",
            }}
          >
            <ListItem
              button
              onClick={() => {
                clickFriendHandler(friend);
              }}
              sx={{
                borderRadius: "0.5rem",

                "&:hover": {
                  // backgroundColor: ,
                  // boxShadow: 1,
                },
                // border style
                borderStyle: " solid ",
                // border color
                borderColor: "whitesmoke",
                // border width
                borderWidth: "1px",
                marginTop: "-8px",
              }}
            >
              <Avatar
                alt={friend.username[0]}
                src="https://material-ui.com/static/images/avatar/1.jpg"
              >
                {friend.username[0]}
              </Avatar>
              <Box
                sx={{
                  marginLeft: "5px",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Typography variant="subtitle1">
                  {friend.firstname} {friend.lastname}
                </Typography>
                <Typography variant="caption">@{friend.username}</Typography>
              </Box>
            </ListItem>
          </Box>
        );
      })}
    </>
  );
};

const FriendChat = ({
  friend,
  clearFriendHandler,
  messageChangeHandler,
  message,
  sendMessage,
}) => {
  const theme = useTheme();
  return (
    <Box>
      <TopBar friend={friend} clearFriendHandler={clearFriendHandler} />
      <BottomBar
        messageChangeHandler={messageChangeHandler}
        message={message}
        sendMessage={sendMessage}
      />
    </Box>
  );
};

const TopBar = ({ clearFriendHandler, friend }) => {
  const theme = useTheme();
  return (
    <>
      {/* Top Bar */}
      <Box
        sx={{
          display: "flex",
          padding: "3px",
          justifyContent: "space-between",
          backgroundColor: theme.colors.background1,
        }}
      >
        {/* Left */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <IconButton
            onClick={() => {
              clearFriendHandler();
            }}
            size="small"
            sx={{
              backgroundColor: theme.colors.itemBackground,
              "&:hover": {
                backgroundColor: theme.colors.background2,
              },
            }}
          >
            <ArrowBackRoundedIcon fontSize="small" />
          </IconButton>
          <Avatar
            sx={{
              height: "35px",
              width: "35px",
            }}
            alt={friend.username[0]}
            src="https://material-ui.com/static/images/avatar/1.jpg"
          >
            {friend.username[0]}
          </Avatar>
          <Box sx={{ alignItems: "center", marginLeft: "5px" }}>
            <Typography>
              {friend.firstname} {friend.lastname}
            </Typography>
          </Box>
        </Box>
        {/* Right */}
        <Box>
          <IconButton>
            <AddIcCallRoundedIcon fontSize="small" color="secondary" />
          </IconButton>
          <IconButton>
            <VideoCallRoundedIcon fontSize="small" color="secondary" />
          </IconButton>
        </Box>
      </Box>
      <Divider />
    </>
  );
};

const BottomBar = ({ messageChangeHandler, message, sendMessage }) => {
  const [showEmojiPeaker, setShowEmojiPeaker] = useState(false);
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: "0",
        backgroundColor: theme.colors.background1,
      }}
    >
      <Box
        sx={{
          display: "flex",
        }}
      >
        {showEmojiPeaker === true && (
          <Box
            sx={{
              position: "absolute",
              bottom: "53px",
              backgroundColor: "white",
              borderRadius: "15px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <IconButton
              size="small"
              onClick={() => {
                setShowEmojiPeaker(!showEmojiPeaker);
              }}
            >
              <CloseRoundedIcon color="secondary" fontSize="small" />
            </IconButton>
            <Typography variant="caption">Emoji</Typography>
          </Box>
        )}

        <IconButton size="small">
          <VideoFileIcon color="secondary" fontSize="small" />
        </IconButton>
        <IconButton>
          <PhotoSizeSelectActualRoundedIcon
            color="secondary"
            fontSize="small"
          />
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
                  <IconButton size="small">
                    <EmojiEmotionsRoundedIcon
                      fontSize="small"
                      color="secondary"
                      onClick={() => {
                        setShowEmojiPeaker(!showEmojiPeaker);
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
                  <IconButton
                    size="small"
                    onClick={() => sendMessage()}
                    edge="end"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
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
