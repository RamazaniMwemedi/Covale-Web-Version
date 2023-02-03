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
  handleChooseFileIconTeam,
  handleChooseFileIcon2Team,
  handleChooseFileTeam,
  handleRemoveFileTeam,
  teamFileInput,
  teamFileInput2,
  teamFiles,
  // Topic
  topicTitle,
  topicTitleChangeHandler,
  topicDescriptionChangeHandler,
  createTopicHandler,
  startTopic,
  toggleTopicHandler,
  topicMessage,
  topicMessageChangeHandler,
  topicSendMessageHandle,
  topicOnEmojiClick,
  handleChooseFileIconTopic,
  handleChooseFileIcon2Topic,
  handleChooseFileTopic,
  handleRemoveFileTopic,
  topicFilesChangeHandler,
  topicFileInput,topicFileInput2,
  topicFiles,
}) => {
  const [option, setOption] = useState("");
  const [showRight, setShowRight] = React.useState(false);
  const [clickedTopicId, setClickedTopicId] = useState(null);

  const showTopics = () => {
    if (showRight) {
      setOption("TOPIC");
    } else {
      setShowRight(!showRight);
      setOption("TOPIC");
    }
    if (option === "TOPIC") {
      setShowRight(!showRight);
    } else {
      setShowRight(!showRight);
    }
  };

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

  // handle clicked topic
  const handleClickedTopic = (topicId) => {
    setClickedTopicId(topicId);
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
              showTopics={showTopics}
              showMenu={showMenu}
              showParticipant={showParticipant}
              //
              handleChooseFileIconTeam={handleChooseFileIconTeam}
              handleChooseFileIcon2Team={handleChooseFileIcon2Team}
              handleChooseFileTeam={handleChooseFileTeam}
              handleRemoveFileTeam={handleRemoveFileTeam}
              teamFileInput={teamFileInput}
              teamFileInput2={teamFileInput2}
              teamFiles={teamFiles}
              topicTitle={topicTitle}
              topicTitleChangeHandler={topicTitleChangeHandler}
              topicDescriptionChangeHandler={topicDescriptionChangeHandler}
              createTopicHandler={createTopicHandler}
              startTopic={startTopic}
              toggleTopicHandler={toggleTopicHandler}
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
                setShowRight={setShowRight}
                handleClickedTopic={handleClickedTopic}
                clickedTopicId={clickedTopicId}
                // Topic
                topicMessage={topicMessage}
                topicMessageChangeHandler={topicMessageChangeHandler}
                topicSendMessageHandle={topicSendMessageHandle}
                topicOnEmojiClick={topicOnEmojiClick}
                handleChooseFileIconTopic={handleChooseFileIconTopic}
                handleChooseFileIcon2Topic={handleChooseFileIcon2Topic}
                handleChooseFileTopic={handleChooseFileTopic}
                handleRemoveFileTopic={handleRemoveFileTopic}
                topicFilesChangeHandler={topicFilesChangeHandler}
                topicFileInput={topicFileInput}
                topicFileInput2={topicFileInput2}
                topicFiles={topicFiles}
              />
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default TeamSection;
