import {
  Avatar,
  Badge,
  IconButton,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import Image from "next/image";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { purple } from "@mui/material/colors";

import { AddCircleOutlineRounded } from "@mui/icons-material";
import InviteMembers from "./InviteMembers";
import { styled } from "@mui/styles";
import FileDisplayComponent from "../mediaFiles/FileDisplayComponent";
import FileComponent from "../mediaFiles/FileComponent";
import TeamMenuOption from "./TeamMenuOption";
import { timeAgo } from "../../../tools/tools";
import { Bottom, ColleagueMessage, UserMessage } from "./TeamSectionLeft";

const TeamSectionRight = ({
  option,
  team,
  handleClickedTopic,
  clickedTopicId,
  // Topic
  topicMessage,
  topicMessageChangeHandler,
  topicSendMessageHandle,
  topicOnEmojiClick,
  handleChooseFileIconTopic,
  handleChooseFileIcon2Topic,
  handleChooseFileTopic,
  handleRemoveFileTopic,
  topicFilesChangeHandler,
  topicFileInput,
  topicFiles,
  topicFileInput2,
}) => {
  switch (option) {
    case "PARTICIPANT":
      return <Participant team={team} />;
    case "MENU":
      return <Menu team={team} />;
    case "TOPIC":
      return (
        <TopicsParent
          topics={team.topics}
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
          topicFiles={topicFiles}
          topicFileInput2={topicFileInput2}
        />
      );
    default:
      break;
  }
};

export default TeamSectionRight;

const Participant = ({ team }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        padding: "5px",
        backgroundColor: theme.colors.background1,
        height: "100vh",
        borderTopRightRadius: "8px",
      }}
    >
      {" "}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "2px",
        }}
      >
        <Typography variant="h5">Participant</Typography>
      </Box>
      <br />
      <Directors directors={team.directors} />
      <AllMembers members={team.members} />
      <InvitedMembers members={team.members} teamId={team.id} />
    </Box>
  );
};
const Menu = ({ team }) => {
  const theme = useTheme();
  const [showFile, setShowFile] = useState(false);
  const [file, setFile] = useState(null);
  const handleShowFile = (file) => {
    if (file.fileUrl.includes("https://")) {
      setFile(file);
      setShowFile(true);
    }
  };
  const handleCloseShowFile = () => {
    setShowFile(false);
  };
  return (
    <Box
      sx={{
        padding: "5px",
        backgroundColor: theme.colors.background1,
        height: "100vh",
        borderTopRightRadius: "8px",
      }}
    >
      {showFile && (
        <FileDisplayComponent
          handleCloseShowVideoPlayer={handleCloseShowFile}
          file={file}
        />
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "2px",
        }}
      >
        <Typography variant="h5">Menu</Typography>
        <TeamMenuOption teamId={team.id} />
      </Box>
      <Box>
        <br />
      </Box>
      <Media handleShowFile={handleShowFile} team={team} files={team.files} />
    </Box>
  );
};

const TopicsParent = ({
  topics,
  handleClickedTopic,
  clickedTopicId,
  // Topic
  topicMessage,
  topicMessageChangeHandler,
  topicSendMessageHandle,
  topicOnEmojiClick,
  handleChooseFileIconTopic,
  handleChooseFileIcon2Topic,
  handleChooseFileTopic,
  handleRemoveFileTopic,
  topicFilesChangeHandler,
  topicFileInput,
  topicFileInput2,
  topicFiles,
}) => {
  console.log("clickedTopicId", clickedTopicId);
  if (clickedTopicId) {
    const clickedTopic = topics.find((topic) => topic.id === clickedTopicId);
    return (
      <TopicSection
        topic={clickedTopic}
        handleClickedTopic={handleClickedTopic}
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
    );
  } else {
    return <Topics topics={topics} handleClickedTopic={handleClickedTopic} />;
  }
};

const Topics = ({ topics, handleClickedTopic }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.colors.background1,
        padding: "10px",
        height: "100vh",
        // Scrollable
        overflowY: "scroll",
      }}
    >
      <Typography variant="subtitle1">Topics</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: theme.colors.background1,
          padding: "10px",
        }}
      >
        {topics.map((topic) => (
          <Topic topic={topic} handleClickedTopic={handleClickedTopic} />
        ))}
      </Box>
    </Box>
  );
};

const Topic = ({ topic, handleClickedTopic }) => {
  const theme = useTheme();
  // last message
  const lastMessage = topic.messages
    ? topic.messages[topic.messages.length - 1]
    : null;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        p: "6px",
        mt: "5px",
        backgroundColor: theme.colors.textBackground2,
        borderRadius: "8px",
        cursor: "pointer",
        // Box shadow
        boxShadow: "0px 5px 5px 0px rgba(0,0,0,0.1)",
        "&:hover": {
          backgroundColor: theme.colors.textBackground,
        },
      }}
      onClick={() => handleClickedTopic(topic.id)}
    >
      {/* Topic Title */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="subtitle1">
          {topic.title.length > 20
            ? topic.title.substring(0, 20) + "..."
            : topic.title}
        </Typography>
        {/* If createdAt */}
        {topic.createdAt && (
          <Typography variant="subtitle2">
            {timeAgo(topic.createdAt)}
          </Typography>
        )}
      </Box>
      {/* Topic Description */}
      <Typography variant="body2">
        {topic.description.length > 20
          ? topic.description.substring(0, 20) + "..."
          : topic.description}
      </Typography>
      {/* Last Message  */}
      {lastMessage && (
        <MessageComponentForTopic message={lastMessage} user={null} />
      )}
    </Box>
  );
};

const TopicSection = ({
  topic,
  handleClickedTopic,
  // Topic
  topicMessage,
  topicMessageChangeHandler,
  topicSendMessageHandle,
  topicOnEmojiClick,
  handleChooseFileIconTopic,
  handleChooseFileIcon2Topic,
  handleChooseFileTopic,
  handleRemoveFileTopic,
  topicFilesChangeHandler,
  topicFileInput,
  topicFileInput2,
  topicFiles,
}) => {
  const theme = useTheme();
  const userStore = useSelector((state) => state.user);
  const user = userStore.user ? userStore.user : null;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.colors.background1,

        // Scrollable
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton
            aria-label="delete"
            onClick={() => handleClickedTopic(null)}
          >
            <ArrowBackRoundedIcon />
          </IconButton>
          <Typography variant="h6">Topic</Typography>{" "}
        </Box>
        <IconButton aria-label="delete">
          <MoreHorizRoundedIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          backgroundColor: theme.colors.textBackground,
          padding: "8px",
          height: "100vh",
          m: "8px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // scrollable
            overflowY: "scroll",
            height: "100%",
          }}
        >
          {/* Display the first 37 letters of the title and display all letter on mouse onver the Typography */}
          <Typography variant="subtitle2" title={topic.title}>
            Title :{" "}
            {topic.title.length > 37
              ? topic.title.substring(0, 37) + "..."
              : topic.title}
          </Typography>
          <br />
          <Typography variant="subtitle2" title={topic.description}>
            Description :{" "}
            {topic.description.length > 240
              ? topic.description.substring(0, 240) + "..."
              : topic.description}
          </Typography>
          <br />
          <Typography variant="subtitle2">
            Created At : {timeAgo(topic.createdAt)}
          </Typography>
          <br />
          <Typography variant="subtitle2">
            Messages : {topic.messages.length}
          </Typography>
          <br />
          {/* Map through the messages */}
          <Box
            sx={{
              backgroundColor: theme.colors.background,
              p: 1,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              paddingBottom: "45px",
              borderRadius: "8px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",

                // scrollable
                overflowY: "scroll",
                height: "100%",
              }}
            >
              {topic.messages.map((message) => {
                return message.sender.id === user.id ? (
                  <UserMessage message={message} user={user} />
                ) : (
                  <ColleagueMessage message={message} user={user} />
                );
              })}
            </Box>
            <Bottom
              handleChooseFileIconTeam={handleChooseFileIconTopic}
              handleChooseFileIcon2Team={handleChooseFileIcon2Topic}
              handleChooseFileTeam={handleChooseFileTopic}
              handleRemoveFileTeam={handleRemoveFileTopic}
              teamFileInput={topicFileInput}
              teamFileInput2={topicFileInput2}
              teamFiles={topicFiles}
              teamFilesChangeHandler={topicFilesChangeHandler}
              teamMessage={topicMessage}
              teamMessageChangeHandler={topicMessageChangeHandler}
              teamOnEmojiClick={topicOnEmojiClick}
              teamSendMessageHandle={topicSendMessageHandle}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const MessageComponentForTopic = ({ message }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: theme.colors.textBackground,
        p: "10px",
        borderRadius: "8px",
      }}
    >
      <Avatar
        sx={{ bgcolor: purple[500], width: 15, height: 15, marginRight: "6px" }}
        aria-label="recipe"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="caption">
          {message.sender.firstname} {message.sender.lastname}
        </Typography>
        {/* Message Content  */}
        <Typography variant="caption">
          {message.message
            ? message.message.substring(0, 40) + "..."
            : message.message}
        </Typography>
      </Box>
      {/* Message sender  */}
    </Box>
  );
};

const Media = ({ team, files, handleShowFile }) => {
  const theme = useTheme();
  const imageFiles = files.filter((file) => file.fileType.includes("image"));
  const videoFiles = files.filter((file) => file.fileType.includes("video"));
  const documentFiles = files.filter((file) =>
    file.fileType.includes(
      "vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        "application/msword"
    )
  );
  const xlsFiles = files.filter((file) =>
    file.fileType.includes(
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        "application/vnd.ms-powerpoint"
    )
  );

  const pdfFiles = files.filter((file) =>
    file.fileType.includes("application/pdf")
  );
  const pptFile = files.filter((file) =>
    file.fileType.includes(
      "application/vnd.ms-powerpoint" ||
        "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    )
  );

  return (
    <>
      <Box
        sx={{
          display: "flex",
          backgroundColor: theme.colors.background1,
          padding: "10px",
        }}
      >
        <Typography variant="subtitle1">Media</Typography>
      </Box>
      <Box>
        {/* Photos */}
        {imageFiles.length > 0 && (
          <Photos photosFiles={imageFiles} handleShowFile={handleShowFile} />
        )}

        {/* Videos */}
        {videoFiles.length > 0 && (
          <Videos videoFiles={videoFiles} handleShowFile={handleShowFile} />
        )}
        {/* Documents */}
        {documentFiles.length > 0 && (
          <Documents
            documentFiles={documentFiles}
            handleShowFile={handleShowFile}
          />
        )}
        {/* Xls */}
        {xlsFiles.length > 0 && (
          <MediaXls xlsFiles={xlsFiles} handleShowFile={handleShowFile} />
        )}
        {/* Pdf */}
        {pdfFiles.length > 0 && (
          <MediaPdf pdfFiles={pdfFiles} handleShowFile={handleShowFile} />
        )}
        {/* Ppt */}
        {pptFile.length > 0 && (
          <MediaPpt pptFiles={pptFile} handleShowFile={handleShowFile} />
        )}
      </Box>
    </>
  );
};

// Sub Components

// Media components
const Photos = ({ photosFiles, handleShowFile }) => {
  const theme = useTheme();
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow((prev) => !prev);
  };
  return (
    <Box
      sx={{
        padding: "10px",
      }}
    >
      {photosFiles.length > 0 && (
        <Box>
          <MediaName
            name={"Photos"}
            length={photosFiles ? photosFiles.length : 0}
            toggleShow={toggleShow}
            show={show}
          />{" "}
          {/* Images */}
          {show && (
            <ImageList
              sx={{
                maxHeight: "200px",
                backgroundColor: theme.colors.background1,
                padding: "5px",
                borderRadius: "5px",
                maxWidth: "400px",
              }}
              cols={3}
              rowHeight={80}
            >
              {photosFiles.map((photosFile) => (
                <ImageListItem key={photosFile.img}>
                  <Image
                    onClick={() => handleShowFile(photosFile)}
                    src={`${photosFile.fileUrl}?w=110&h=80&fit=crop&auto=format`}
                    srcSet={`${photosFile.fileUrl}?w=110&h=80&fit=crop&auto=format&dpr=2 2x`}
                    alt="Picture of the author"
                    width={110}
                    height={80}
                    quality={100}
                    style={{
                      borderRadius: "3px",
                    }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          )}
        </Box>
      )}
    </Box>
  );
};
const Videos = ({ videoFiles, handleShowFile }) => {
  const theme = useTheme();
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow((prev) => !prev);
  };
  return (
    <Box
      sx={{
        padding: "10px",
      }}
    >
      <MediaName
        name={"Videos"}
        toggleShow={toggleShow}
        show={show}
        length={videoFiles ? videoFiles.length : 0}
      />
      {show && (
        <ImageList
          sx={{
            maxHeight: "200px",
            backgroundColor: theme.colors.background1,
            padding: "5px",
            borderRadius: "5px",
            // width:""
          }}
          cols={1}
          // rowHeight={80}
        >
          {videoFiles.map((videoFile, i) => (
            <ImageListItem
              sx={{
                backgroundColor: theme.colors.textBackground,
              }}
              key={i}
              onClick={() => handleShowFile(videoFile)}
            >
              <FileComponent file={videoFile} />
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </Box>
  );
};
const Documents = ({ documentFiles, handleShowFile }) => {
  const theme = useTheme();
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow((prev) => !prev);
  };
  return (
    <Box
      sx={{
        padding: "10px",
      }}
    >
      <MediaName
        name={"Documents"}
        length={documentFiles ? documentFiles.length : 0}
        toggleShow={toggleShow}
        show={show}
      />{" "}
      {show && (
        <ImageList
          sx={{
            maxHeight: "200px",
            backgroundColor: theme.colors.textBackground,
            padding: "5px",
            borderRadius: "5px",
          }}
          cols={1}
        >
          {documentFiles.map((documentFile, i) => (
            <ImageListItem
              sx={{
                backgroundColor: theme.colors.textBackground,
              }}
              onClick={() => handleShowFile(documentFile)}
              key={i}
            >
              <FileComponent file={documentFile} />
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </Box>
  );
};

const MediaXls = ({ xlsFiles, handleShowFile }) => {
  const theme = useTheme();
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow((prev) => !prev);
  };
  return (
    <Box
      sx={{
        padding: "10px",
      }}
    >
      <MediaName
        name="Xls Sheet"
        show={show}
        length={xlsFiles ? xlsFiles.length : 0}
        toggleShow={toggleShow}
      />
      {/* Links */}
      {show && (
        <ImageList
          sx={{
            maxHeight: "200px",
            backgroundColor: theme.colors.textBackground,
            padding: "5px",
            borderRadius: "5px",
          }}
          cols={1}
        >
          {xlsFiles.map((xlsFile, i) => (
            <ImageListItem
              sx={{
                backgroundColor: theme.colors.textBackground,
              }}
              onClick={() => handleShowFile(xlsFile)}
              key={i}
            >
              <FileComponent file={xlsFile} />
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </Box>
  );
};

const MediaPdf = ({ pdfFiles, handleShowFile }) => {
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow((prev) => !prev);
  };
  const theme = useTheme();
  return (
    <Box
      sx={{
        padding: "10px",
      }}
    >
      <MediaName
        name="Pdf"
        show={show}
        length={pdfFiles ? pdfFiles.length : 0}
        toggleShow={toggleShow}
      />
      {/* Links */}
      {show && (
        <ImageList
          sx={{
            maxHeight: "200px",
            backgroundColor: theme.colors.textBackground,
            padding: "5px",
            borderRadius: "5px",
          }}
          cols={1}
        >
          {pdfFiles.map((pdfFile, i) => (
            <ImageListItem
              sx={{
                backgroundColor: theme.colors.textBackground,
              }}
              onClick={() => handleShowFile(pdfFile)}
              key={i}
            >
              <FileComponent file={pdfFile} />
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </Box>
  );
};
const MediaPpt = ({ pptFiles, handleShowFile }) => {
  const theme = useTheme();
  const [show, setShow] = useState(false);
  const toggleShow = () => {
    setShow((prev) => !prev);
  };
  return (
    <Box
      sx={{
        padding: "10px",
      }}
    >
      <MediaName
        name="Pressentation"
        show={show}
        length={pptFiles ? pptFiles.length : 0}
        toggleShow={toggleShow}
      />
      {/* Links */}
      {show && (
        <ImageList
          sx={{
            maxHeight: "200px",
            backgroundColor: theme.colors.textBackground,
            padding: "5px",
            borderRadius: "5px",
          }}
          cols={1}
        >
          {pptFiles.map((pptFile, i) => (
            <ImageListItem
              sx={{
                backgroundColor: theme.colors.textBackground,
              }}
              onClick={() => handleShowFile(pptFile)}
              key={i}
            >
              <FileComponent file={pptFile} />
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </Box>
  );
};

// Directors
const Directors = ({ directors }) => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItem: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="subtitle1">Directors</Typography>
        <Typography variant="subtitle2">{directors.length}</Typography>
      </Box>

      <List>
        {directors.map((director) => (
          <ListItem key={director.id}>
            {" "}
            <ParticipantItem participant={director} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

const AllMembers = ({ members }) => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItem: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="subtitle1">Members</Typography>
        <Typography variant="subtitle2">{members.length}</Typography>
      </Box>
      <List>
        {members.map((member) => (
          <ListItem key={member.id}>
            {" "}
            <ParticipantItem participant={member} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

// Participant Comonents
const ParticipantItem = ({ participant }) => {
  const theme = useTheme();
  return (
    <ListItemButton
      sx={{
        display: "flex",
        width: "100%",
        gap: "10px",
        borderRadius: "8px",
        backgroundColor: (theme.vars || theme).palette.action.hover,
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: "transparent",
        },
      }}
    >
      <Avatar
        sx={{
          height: "24px",
          width: "24px",
        }}
      >{`${participant.firstname[0]}`}</Avatar>
      <Box sx={{ display: "flex", gap: "10px" }}>
        <Typography variant="body2">{participant.firstname}</Typography>
        <Typography variant="body2">{participant.lastname}</Typography>
      </Box>
    </ListItemButton>
  );
};

const InvitedMembers = ({ teamId, members }) => {
  // Show InviteMembers State
  const [showInviteMembers, setShowInviteMembers] = useState(false);
  // showInviteMembers handler
  const showInviteMembersHandler = () => {
    setShowInviteMembers(!showInviteMembers);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItem: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="subtitle1">Invited Members</Typography>
        {/* Icon for inviting new member */}
        <IconButton onClick={showInviteMembersHandler}>
          <AddCircleOutlineRounded />
        </IconButton>
      </Box>
      <List>
        {
          // Show InviteMenbers Component
          showInviteMembers && (
            <InviteMembers
              members={members}
              teamId={teamId}
              showInviteMembersHandler={showInviteMembersHandler}
            />
          )
        }
        <ListItem>
          <Typography variant="body2">No Invited Members</Typography>
        </ListItem>
      </List>
    </Box>
  );
};

const MediaName = ({ name, show, toggleShow, length }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Box>
        <Typography color="secondary" variant="body1">
          {name}
        </Typography>
      </Box>
      <UnReadNotificationsBadge badgeContent={length || 0} color="secondary">
        <IconButton onClick={toggleShow} color="default" size="small">
          {show ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </UnReadNotificationsBadge>
    </Box>
  );
};

const UnReadNotificationsBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: purple[500],
    color: "white",
    fontWeight: "bold",
    fontSize: "10px",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    right: -3,
    p: "0 4px",
    border: `2px solid ${theme.palette.background.paper}`,
  },
}));
