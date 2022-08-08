import React from "react";
import { Avatar, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";

import AddIcCallRoundedIcon from "@mui/icons-material/AddIcCallRounded";
import VideoCallRoundedIcon from "@mui/icons-material/VideoCallRounded";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import InsertPhotoRoundedIcon from "@mui/icons-material/InsertPhotoRounded";
import VideoLibraryRoundedIcon from "@mui/icons-material/VideoLibraryRounded";
import InsertLinkRoundedIcon from "@mui/icons-material/InsertLinkRounded";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";

const ChatSectionRight = ({ friendUsername }) => {
  return (
    <>
      {friendUsername && (
        <Box>
          <IconButton
            sx={{
              position: "fixed",
              top: "1",
              right: "0",
            }}
          >
            <MoreHorizIcon color="secondary" />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              // Center this section
              alignItems: "center",
              // Padding
            }}
          >
            <Friend friendUsername={friendUsername} />
            <br />
          </Box>
        </Box>
      )}
    </>
  );
};

export default ChatSectionRight;

// Friend short details

const Friend = ({ friendUsername }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "25px",
      }}
    >
      {/* Avatr  Name */}
      <Avatar sx={{ width: "120px", height: "120px" }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "1.2rem",
            paddingTop: "15px",
          }}
        >
          {friendUsername}
        </Typography>
        {/* Status */}
        <Typography
          sx={{
            fontSize: "0.8rem",
            paddingTop: "5px",
            color: "lightgreen",
          }}
        >
          Online
        </Typography>
      </Box>
    </Box>
  );
};

const MediaPhotos = () => {
  return (
    <Box>
      <Typography variant="subtitle1">Photos</Typography>
    </Box>
  );
};

const MediaVideos = () => {
  return (
    <Box>
      <Typography variant="subtitle1">Videos</Typography>
    </Box>
  );
};

const MediaLinks = () => {
  return (
    <Box>
      <Typography variant="subtitle1">Links</Typography>
    </Box>
  );
};
