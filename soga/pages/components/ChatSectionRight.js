import React from "react";
import { Avatar, Button, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useTheme } from "@mui/styles";

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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Image from "next/image";
import VedeoOpen from "./VideoOpen";

// import video from "../../assets/bien_inauma_official_audio_h264_32910.mp4";

const ChatSectionRight = ({ friendUsername }) => {
  return (
    <>
      {friendUsername && (
        <Box
          sx={{
            maxHeight: "10vh",
            maxHeight: "100vh",
            overflowY: "scroll",
            overflowX: "hidden",
            padding: "0px",
            margin: "0px",
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              // Center this section
              alignItems: "center",
              // Padding
            }}
          >
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

// Media
const Media = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "5px",
      }}
    >
      <Typography variant="h5" color="secondary">
        {" "}
        Media
      </Typography>
      <MediaPhotos />
      <MediaVideos />
      <MediaDocuments />
      <MediaLinks />
    </Box>
  );
};

const MediaPhotos = () => {
  const theme = useTheme();
  return (
    <Box>
      <MediaName name="Photos" />
      {/* Images */}

      <ImageList
        sx={{
          maxHeight: "200px",
          backgroundColor: theme.colors.background1,
          padding: "5px",
          borderRadius: "5px",
        }}
        cols={3}
        rowHeight={80}
      >
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <Image
              src={`${item.img}?w=110&h=80&fit=crop&auto=format`}
              srcSet={`${item.img}?w=110&h=80&fit=crop&auto=format&dpr=2 2x`}
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
    </Box>
  );
};

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
];

const MediaVideos = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    alert("clicked");
    // setOpen(true);
  };
  const handleClose = () => {
    setOpen((prev) => !prev);
  };

  const theme = useTheme();
  const videos = ["", "", ""];
  return (
    <Box>
      <div
        style={{
          height: "30px",
          backgroundColor: "red",
          width: "80px",
        }}
      ></div>
      {open && (
        <VedeoOpen
          open={open}
          handleClose={handleClose}
          handleClickOpen={handleClickOpen}
        />
      )}
      <MediaName name="Videos" />
      {/* Videos */}
      <ImageList
        sx={{
          maxHeight: "200px",
          backgroundColor: theme.colors.background1,
          padding: "5px",
          borderRadius: "5px",
        }}
        cols={2}
        rowHeight={80}
      >
        {videos.map((item, i) => (
          <Box key={i}>
            <ImageListItem
              sx={{
                display: "flex",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  cursor: "pointer",
                  margin: "-2px",
                  transform: "scale(1)",
                },
              }}
            >
              <video
                // controls
                onClick={() => {
                  handleClose();
                }}
                style={{
                  backgroundColor: "purple",
                  width: "auto",
                  height: "80px",
                  borderRadius: "3px",
                }}
                width="250"
              >
                <source src="https://d234.d2mefast.net/tb/d/52/bien_inauma_official_audio_h264_51054.mp4?play" />
                Sorry, your browser doesn't support embedded videos.
              </video>
            </ImageListItem>
          </Box>
        ))}
      </ImageList>
    </Box>
  );
};

const MediaLinks = () => {
  const theme = useTheme();

  return (
    <Box>
      <MediaName name="Links" />
      {/* Links */}
      <ImageList
        sx={{
          maxHeight: "200px",
          backgroundColor: theme.colors.background1,
          padding: "5px",
          borderRadius: "5px",
        }}
        cols={3}
        rowHeight={80}
      >
        <ImageListItem></ImageListItem>
      </ImageList>
    </Box>
  );
};
const MediaDocuments = () => {
  const theme = useTheme();

  return (
    <Box>
      <MediaName name="Documents" />
      {/* Links */}
      <ImageList
        sx={{
          maxHeight: "200px",
          backgroundColor: theme.colors.background1,
          padding: "5px",
          borderRadius: "5px",
        }}
        cols={3}
        rowHeight={80}
      >
        <ImageListItem></ImageListItem>
      </ImageList>
    </Box>
  );
};

const MediaName = ({ name }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h6">{name}</Typography>
      <Button color="secondary" size="small">
        <KeyboardArrowDownIcon />
      </Button>
    </Box>
  );
};
