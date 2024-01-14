import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useTheme } from "@mui/styles";
import React from "react";
import ChatSectionLeft from "./ChatSectionLeft";
import ChatSectionRight from "./ChatSectionRight";
import { useSelector } from "react-redux";
import {
  ChatInterface,
  FileInterface,
  MessageInterface,
  RootState,
  ThemeInterface,
} from "../../../interfaces/myprofile";

const ChatSection = ({
  chat,
  messageChangeHandler,
  message,
  sendNewMessage,
  messages,
  onEmojiClick,
  chatFileInput,
  handleChooseFileIcon,
  handleRemoveFile,
  handleChooseFile,
  chatFiles,
  handleChooseFileIcon2,
  chatFileInput2,
}: {
  chat: ChatInterface;
  messageChangeHandler: (e: React.ChangeEvent) => void;
  message: string;
  sendNewMessage: (e: React.FormEvent) => void;
  messages: MessageInterface[];
  onEmojiClick: (_: any, emojiObject: any) => void;
  chatFileInput: any;
  handleChooseFileIcon: () => void;
  handleRemoveFile: (file: FileInterface) => void;
  handleChooseFile: () => void;
  chatFiles: FileInterface[];
  handleChooseFileIcon2: () => void;
  chatFileInput2: any;
}) => {
  const [showRight, setShowRight] = React.useState(false);
  const userStore = useSelector((state: RootState) => state.user);
  const user = userStore.user;
  const showRightHandler = () => {
    setShowRight(!showRight);
  };
  const theme: ThemeInterface = useTheme();
  return (
    <>
      {chat ? (
        <Box
          sx={{
            display: "flex",
            flex: 1,
            marginLeft: "-65px",
            overflowY: "hidden",
          }}
        >
          <Box
            sx={{
              flex: "65%",
              display: "flex",
              justifyContent: "flex-end",
              flexDirection: "column",

              borderBottom: `1px solid ${theme.colors.background1}`,
            }}
          >
            {/* ChatSectionLeft */}
            <ChatSectionLeft
              id={chat.id}
              user={user}
              chat={chat}
              messageChangeHandler={messageChangeHandler}
              sendNewMessage={sendNewMessage}
              message={message}
              messages={messages}
              showRightHandler={showRightHandler}
              showRight={showRight}
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
          {/* ChatSectionRight */}
          {showRight && chat ? (
            <Box
              sx={{
                borderLeft: `2px solid ${theme.colors.background1}`,
                width: "410px",
                backgroundColor: theme.colors.background1,
              }}
            >
              <ChatSectionRight
                files={chat.files}
                colleagueUsername={chat.colleagueUsername}
                colleagueProfilePic={
                  chat.colleagueProfilePic && chat.colleagueProfilePic.fileUrl
                }
                colleagueFirstName={chat.colleagueFirstName}
                colleagueLastName={chat.colleagueLastName}
              />
            </Box>
          ) : null}
        </Box>
      ) : null}
    </>
  );
};

export default ChatSection;
