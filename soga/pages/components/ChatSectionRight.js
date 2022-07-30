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
            <ComunicationShortCut />
          </Box>
          <br />
          <Box sx={{
            // alignItems: "center",
            // justifyContent: "center",
            // textAlign: "center",

          }}>
          <Media />
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
        alignItems: "center",
        gap: "8px",
        paddingTop: "25px",
      }}
    >
      {/* Avatr  Name */}
      <Avatar sx={{ width: "90px", height: "90px" }} />
      <Box>
        <Typography
          sx={{
            fontSize: "1.4rem",
          }}
        >
          {friendUsername}
        </Typography>
        <Typography variant="body2">Mutual Team </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr  1fr 1fr",
            gridGap: "5px",
            alignItems: "center",
            justifyContent: "center",

            maxHeight: "100px",
            overflowY: "scroll",
          }}
        >
          {Array.from(["Veloci", "Covalent", "SIR"], (team, index) => {
            return (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "2px",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "whitesmoke",
                    boxShadow: 1,
                  },
                  borderRadius: "5px",
                  padding: "2px",
                }}
              >
                <Avatar sx={{ width: "30px", height: "30px" }}>
                  {team[0]}
                </Avatar>
                <Typography
                  sx={{
                    // Max width of the text
                    maxWidth: "100px",
                    // Text overflow
                  }}
                  color="secondary"
                  variant="caption"
                >
                  {/* Max text 3 characters else add ...*/}
                  {team.length > 3 ? team.substring(0, 3) + "..." : team}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

const ComunicationShortCut = () => {
  return (
    <Box
      sx={{
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

function Media() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <TabList
        value={value}
        onChange={handleChange}
        aria-label="icon label tabs example"
        textColor="secondary"
        indicatorColor="secondary"
        sx={{
          height: "20px",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Tab
          iconPosition="start"
          icon={<InsertPhotoRoundedIcon />}
          label="Photos"
          sx={{
            textTransform: "none",
            fontSize: "16px",
          }}
        />
        <Tab
          iconPosition="start"
          icon={<VideoLibraryRoundedIcon />}
          label="Videos"
          sx={{
            textTransform: "none",
            fontSize: "16px",
          }}
        />
        <Tab
          iconPosition="start"
          icon={<InsertLinkRoundedIcon />}
          label="Links"
          sx={{
            textTransform: "none",
            fontSize: "16px",
          }}
        />
      </TabList>
      <TabPanel value={0}>
        <MediaPhotos />
      </TabPanel>
      <TabPanel value={1}>
        <MediaVideos />
      </TabPanel>
      <TabPanel value={2}>
        <MediaLinks />
      </TabPanel>
    </TabContext>
  );
}
