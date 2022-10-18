import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useTheme } from "@mui/styles";
import React from "react";
// Redux Hooks
import { useSelector } from "react-redux";

import TeamSectionLeft from "./TeamSectionLeft";
import TeamSectionRight from "./TeamSectionRight";
import { useState } from "react";

const TeamSection = ({
  sendNewMessage,
  message,
  onEmojiClick,
  messageChangeHandler,
  user,
}) => {

  const [option, setOption] = useState("");
  const team = useSelector((state) => {
    if (state.team) {
      return state.team.team;
    } else {
      return null;
    }
  });

  const [showRight, setShowRight] = React.useState(false);

  const showMenu = () => {
    if (showRight) {
      setOption("MENU");
    } else {
      setShowRight(!showRight);
      setOption("MENU");
    }
    if (option === "MENU") {
      setShowRight(!showRight);
    }
  };
  const showParticipant = () => {
    if (showRight) {
      setOption("PARTICIPANT");
    } else {
      setShowRight(!showRight);
      setOption("PARTICIPANT");
    }
    if (option === "PARTICIPANT") {
      setShowRight(!showRight);
    }
  };

  const theme = useTheme();
  return (
    <>
      {team && (
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
              user={user}
              team={team}
              showRight={showRight}
              messageChangeHandler={messageChangeHandler}
              sendNewMessage={sendNewMessage}
              message={message}
              onEmojiClick={onEmojiClick}
              showMenu={showMenu}
              showParticipant={showParticipant}
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
              <TeamSectionRight option={option} showRight={showRight} />
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default TeamSection;
