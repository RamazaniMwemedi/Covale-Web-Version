import React, { useState } from "react";
import FloatingAButton from "./FloatingAButton";
import {
  Avatar,
  List,
  ListItem,
  Box,
  Typography,
  IconButton,
  Icon,
  InputLabel,
} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useTheme } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";

// My components
import AddMoreFriends from "./AddMoreFriends";
import Chat from "./Chat";
import { useSelector } from "react-redux";

const Chats = ({
  friends,
  showMoreFriends,
  showButton,
  friendClicked,
  buttonHandler,
  closeMorePeopleHandler,
  sendMessage,
  clickFriendHandler,
  clearFriendHandler,
  messageChangeHandler,
}) => {
  let loading = true;
  const chats = useSelector((state) => {
    if (state.chats.chats) {
      loading = false;
    }
    return state.chats.chats;
  });
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          width: "100%",
          backgroundColor: theme.colors.background1,
          borderRadius: "5px",
          marginBottom: "10px",
          alignItems: "center",
          textAlign: "center",
          justiContent: "center",
        }}
      >
        <FormControl sx={{ m: 1, width: "95%" }} variant="outlined">
          <InputLabel color="secondary">Chats</InputLabel>

          <OutlinedInput
            startAdornment={
              <InputAdornment
                sx={{
                  marginLeft: "-15px",
                }}
                position="start"
              >
                <IconButton>
                  <SearchRoundedIcon />
                </IconButton>
              </InputAdornment>
            }
            id="outlined-adornment-password"
            type="text"
            value=""
            label="Chats"
            onChange={() => {}}
            sx={{
              height: "35px",
              borderRadius: "15px",
            }}
            color="secondary"
          />
        </FormControl>
      </Box>
      <Box
        sx={{
          // it should be scrowable
          height: "79vh",
          overflowY: "scroll",
          overflowX: "hidden",
          borderRadius: "5px",
          marginBottom: "10px",
          alignItems: "center",
          textAlign: "center",
          justiContent: "center",
        }}
      >
        {loading ? (
          <Stack spacing={1}>
            {[...Array(70)].map((_, i) => (
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
        ) : (
          <>
            {chats &&
              (chats.length > 0 ? (
                <Box>
                  {showMoreFriends && (
                    <AddMoreFriends
                      closeMorePeopleHandler={closeMorePeopleHandler}
                      messageChangeHandler={messageChangeHandler}
                      sendMessage={sendMessage}
                      clearFriendHandler={clearFriendHandler}
                      friendClicked={friendClicked}
                      clickFriendHandler={clickFriendHandler}
                      friends={friends}
                    />
                  )}

                  {showButton && (
                    <FloatingAButton buttonHandler={buttonHandler} />
                  )}
                  {chats.map((chat) => {
                    return <Chat key={chat.chatId} chat={chat} />;
                  })}
                </Box>
              ) : (
                <Box sx={{ textAlign: "center", marginTop: "150px" }}>
                  {showMoreFriends && (
                    <AddMoreFriends
                      closeMorePeopleHandler={closeMorePeopleHandler}
                      messageChangeHandler={messageChangeHandler}
                      sendMessage={sendMessage}
                      // message={message}
                      clearFriendHandler={clearFriendHandler}
                      friendClicked={friendClicked}
                      clickFriendHandler={clickFriendHandler}
                      friends={friends}
                    />
                  )}

                  {showButton && (
                    <FloatingAButton buttonHandler={buttonHandler} />
                  )}
                  <Typography variant="h5" color="secondary">
                    No chats yet
                  </Typography>
                  <Typography variant="subtitle2" color="secondary">
                    Click the{" "}
                    {
                      <Icon>
                        <AddIcon
                          sx={{
                            width: "15px",
                            height: "15px",
                          }}
                        />
                      </Icon>
                    }{" "}
                    to add a friends
                  </Typography>
                </Box>
              ))}
          </>
        )}
      </Box>
    </>
  );
};

export default Chats;
