import React, { useState } from "react";
import FloatingAButton from "../components/FloatingAButton";
import {
  Avatar,
  List,
  ListItem,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useTheme } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";

// My components
import AddMoreFriends from "./AddMoreFriends";
import Chat from "./Chat";

const Chats = ({ messages, loading }) => {
  const [showMoreFriends, setShowMoreFriends] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const theme = useTheme();

  const buttonHandler = () => {
    setShowMoreFriends(true);
    setShowButton(false);
  };
  const closeMorePeopleHandler = () => {
    setShowMoreFriends(false);
    setShowButton(true);
  };

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
            label="Search"
            onChange={() => {}}
            sx={{
              height: "35px",
              borderRadius: "15px",
            }}
            color="secondary"
          />
        </FormControl>
      </Box>
      {loading ? (
        <Stack spacing={1}>
          {[...Array(80)].map((_, i) => (
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
          {messages &&
            (messages.length > 0 ? (
              <Box>
                {messages.map((message) => {
                  return (
                    <>
                      <Chat message={message} />
                    </>
                  );
                })}
              </Box>
            ) : (
              <Box sx={{ textAlign: "center", marginTop: "150px" }}>
                <Typography variant="h5" color="secondary">
                  No chats yet
                </Typography>
                <Typography variant="subtitle2" color="secondary">
                  Click the{" "}
                  {
                    <Fab color="secondary" size="small" aria-label="add">
                      <AddIcon
                        sx={{
                          width: "15px",
                          height: "15px",
                        }}
                      />
                    </Fab>
                  }{" "}
                  to add a friends
                </Typography>
              </Box>
            ))}
        </>
      )}
      {showMoreFriends && (
        <AddMoreFriends closeMorePeopleHandler={closeMorePeopleHandler} />
      )}

      {showButton && <FloatingAButton buttonHandler={buttonHandler} />}
    </>
  );
};

export default Chats;
