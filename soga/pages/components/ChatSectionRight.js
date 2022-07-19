import React from "react";
import { Avatar, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";

import AddIcCallRoundedIcon from "@mui/icons-material/AddIcCallRounded";
import VideoCallRoundedIcon from "@mui/icons-material/VideoCallRounded";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const ChatSectionRight = ({ friend }) => {
  return (
    <>
      {friend &&
      <Box
        sx={{
          flex: 0.35,
          width: "100%",
          backgroundColor: "white",
        }}
      >
        <IconButton
          sx={{
            position: "fixed",
            top: "1",
            right: "0",
          }}
        >
          <MoreHorizIcon color="secondary" />
        </IconButton>
        <Friend friend={friend} />
        <ComunicationShortCut />
        <Media />
      </Box>
      }
    </>
  );
};

export default ChatSectionRight;

// Friend short details

const Friend = ({ friend }) => {
  return (
    <Box>
      <Box>
        {/* Avatr */}
        <Box sx={{ paddingTop: "30px", paddingLeft: "110px" }}>
          <Avatar sx={{ width: "130px", height: "130px" }} />
        </Box>
        {/* Name */}
        <Box
          sx={{
            paddingLeft: "98px",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.4rem",
            }}
          >
            {friend.username}
          </Typography>
        </Box>
        {/* Icons */}
      </Box>
    </Box>
  );
};

const ComunicationShortCut = () => {
  return (
    <Box
      sx={{
        paddingTop: "20px",
        paddingLeft: "90px",
        display: "flex",
        gap: "8px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <IconButton>
          <AddIcCallRoundedIcon
            sx={{
              fontSize: "40px",
            }}
            color="secondary"
          />
        </IconButton>
        <Typography variant="caption" color="secondary">
          Audio
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <IconButton>
          <VideoCallRoundedIcon
            sx={{
              fontSize: "40px",
            }}
            color="secondary"
          />
        </IconButton>
        <Typography variant="caption" color="secondary">
          Video
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <IconButton>
          <SearchIcon
            sx={{
              fontSize: "40px",
            }}
            color="secondary"
          />
        </IconButton>
        <Typography variant="caption" color="secondary">
          Search
        </Typography>
      </Box>
    </Box>
  );
};

const Media = () => {
  return (
    <Box
      sx={{
        paddingLeft: "20px",
      }}
    >
      <Typography variant="h5">Media</Typography>
      <MediaPhotos />
      <MediaVideos />
    </Box>
  );
};

const MediaPhotos = () => {
  return (
    <Box>
      <Typography variant="subtitle1" >Photos</Typography>
    </Box>
  );
};

const MediaVideos = () => {
  return (
    <Box>
      <Typography variant="subtitle1" >Videos</Typography>
    </Box>
  );
};

const MediaLinks=()=>{
  return (
    <Box>
      <Typography variant="subtitle1">Links</Typography>
    </Box>
  );
}