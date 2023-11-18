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
import StartAChatWithColleague from "./StartAChatWithColleague";
import Chat from "./Chat";
import { useSelector } from "react-redux";
import {
  ChatInterface,
  RootState,
  ThemeInterface,
  UserInterFace,
} from "../../../interfaces/myprofile";

const Chats = ({
  colleagues,
  showMoreFriends,
  showButton,
  buttonHandler,
  closeMorePeopleHandler,
}: {
  colleagues: UserInterFace[];
  showMoreFriends: boolean;
  showButton: boolean;
  buttonHandler: () => void;
  closeMorePeopleHandler: () => void;
}) => {
  let loading = true;
  const chats = useSelector((state: RootState) => {
    if (state.chats.chats) {
      loading = false;
    }
    return state.chats.chats;
  });
  const [filterChatName, setFilterChatName] = useState("");
  const [allFilteredChats, setAllFilteredChats] = useState<ChatInterface[]>([]);
  const theme: ThemeInterface = useTheme();
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
            value={filterChatName}
            label="Chats"
            onChange={(e) => {
              setFilterChatName(e.target.value);
              setAllFilteredChats(
                //  When the e.target.value is empty, this return an empty array otherwise it returns an array of filtered chats
                e.target.value.length < 1
                  ? []
                  : chats.filter((chat) =>
                      chat.colleagueUsername
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase())
                    )
              );
            }}
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
                  variant="circular"
                  width={40}
                  height={40}
                  style={{ borderRadius: "50%" }}
                />
                {/* Skeleton for user first and lastname */}
                <Box sx={{}}>
                  <Skeleton
                    variant="rectangular"
                    width={185}
                    height={20}
                    style={{ marginLeft: "10px" }}
                  />
                  <Skeleton
                    variant="rectangular"
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
            {filterChatName.length > 0 && allFilteredChats.length > 0 ? (
              <Box>
                {allFilteredChats.map((chat) => {
                  return <Chat key={chat.id} chat={chat} />;
                })}
              </Box>
            ) : (
              filterChatName.length > 0 && (
                <Box sx={{ textAlign: "center", marginTop: "10px" }}>
                  <Typography variant="h6" color="secondary">
                    No chats found
                  </Typography>
                </Box>
              )
            )}

            {chats &&
              filterChatName.length < 1 &&
              (chats.filter((chat) => chat.messages.length > 0).length > 0 ? (
                <Box>
                  {showMoreFriends && (
                    <StartAChatWithColleague
                      closeMorePeopleHandler={closeMorePeopleHandler}
                      colleagues={colleagues}
                    />
                  )}

                  {showButton && (
                    <FloatingAButton buttonHandler={buttonHandler} />
                  )}
                  {/* Chats with messages.lenth is < 1 should not be displayed */}
                  {chats
                    .filter((chat) => chat.messages.length > 0)
                    .map((chat) => {
                      return <Chat key={chat.id} chat={chat} />;
                    })}
                </Box>
              ) : (
                <Box sx={{ textAlign: "center", marginTop: "150px" }}>
                  {showMoreFriends && (
                    <StartAChatWithColleague
                      closeMorePeopleHandler={closeMorePeopleHandler}
                      colleagues={colleagues}
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
