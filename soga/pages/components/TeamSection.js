import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useTheme } from "@mui/styles";
import React from "react";
// Redux Hooks
import { useSelector } from "react-redux";

import TeamSectionLeft from "./TeamSectionLeft";

const TeamSection = ({
  sendNewMessage,
  message,
  onEmojiClick,
  messageChangeHandler,
}) => {
  const team = useSelector((state) => {
    if (state.team) {
      return state.team.team;
    } else {
      return null;
    }
  });
  const [showRight, setShowRight] = React.useState(true);
  const showRightHandler = () => {
    setShowRight(!showRight);
  };
  const theme = useTheme();
  return (
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
        {/* Team Section Left */}
        <TeamSectionLeft
          team={team}
          showRight={showRight}
          showRightHandler={showRightHandler}
          messageChangeHandler={messageChangeHandler}
          sendNewMessage={sendNewMessage}
          message={message}
          onEmojiClick={onEmojiClick}
        />
      </Box>
      {/* Team Section Right */}
      {showRight && (
        <Box
          sx={{
            flex: "35%",
            borderLeft: `2px solid ${theme.colors.background1}`,
          }}
        >
          <Typography>Team Right</Typography>
        </Box>
      )}
    </Box>
  );
};

export default TeamSection;
