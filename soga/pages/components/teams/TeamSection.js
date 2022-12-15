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
  team,
  teamMessageChangeHandler,
  teamSendMessageHandle,
  teamMessage,
  teamOnEmojiClick,
}) => {
  const [option, setOption] = useState("");

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
              team={team}
              showRight={showRight}
              teamMessageChangeHandler={teamMessageChangeHandler}
              teamSendMessageHandle={teamSendMessageHandle}
              teamMessage={teamMessage}
              teamOnEmojiClick={teamOnEmojiClick}
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
              <TeamSectionRight
                option={option}
                team={team}
                showRight={showRight}
              />
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default TeamSection;
