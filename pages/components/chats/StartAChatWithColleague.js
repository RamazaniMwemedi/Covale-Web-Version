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
import dynamic from "next/dynamic";
import ChatSectionLeft from "./ChatSectionLeft";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const StartAChatWithColleague = ({
  friends: colleagues,
  sendNewMessage,
  friendClicked,
  clickFriendHandler,
  closeMorePeopleHandler,
}) => {
  const theme = useTheme();
  const user = useSelector((state) => state.user);

  return (
    <>
      {colleagues && (
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
                pl: "3px",
              }}
            >
              <Typography variant="h6">Colleagues</Typography>
              <IconButton
                sx={{
                  marginTop: "6px",
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

          {/* Friends */}
          <Box
            sx={{
              overflow: "scroll",
              height: "400px",
              padding: "3px",
            }}
          >
            {colleagues.length > 0 ? (
              <ColleaguesList
                colleagues={colleagues}
                closeMorePeopleHandler={closeMorePeopleHandler}
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

export default StartAChatWithColleague;

const ColleaguesList = ({ colleagues, closeMorePeopleHandler }) => {
  const theme = useTheme();
  const router = useRouter();
  return (
    <>
      {colleagues.map((friend, i) => {
        return (
          <Box
            key={i}
            sx={{
              padding: "3px",
              mt: 1,
            }}
          >
            <ListItem
              button
              onClick={(e) => {
                e.preventDefault();
                router.push(
                  `/chats/?c=c&id=${friend.chatId}`,
                  `/chats/c/${friend.chatId}`,
                  {
                    shallow: true,
                  }
                );
                closeMorePeopleHandler();
              }}
              // onClick={() => {
              //   clickFriendHandler(friend);
              // }}
              sx={{
                borderRadius: "0.5rem",
                backgroundColor: theme.colors.textBackground,
                boxShadow: 1,
                "&:hover": {
                  // backgroundColor: ,
                },
                // border style
                borderStyle: " solid ",
                // border color
                borderColor: theme.colors.background1,
                // border width
                borderWidth: "1px",
                marginTop: "-8px",
                alignItems: "center",
              }}
            >
              <Avatar
                alt={friend.username[0]}
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
                <Typography variant="subtitle2">
                  {friend.firstname} {friend.lastname}
                </Typography>
              </Box>
            </ListItem>
          </Box>
        );
      })}
    </>
  );
};
