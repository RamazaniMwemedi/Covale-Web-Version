import React, { useState } from "react";
import { Avatar, Button, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useTheme } from "@mui/styles";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Image from "next/image";
import VedeoOpen from "./VideoOpen";
import FileDisplayComponent from "../mediaFiles/FileDisplayComponent";
import FileComponent from "../mediaFiles/FileComponent";

const ChatSectionRight = ({ friendUsername, files }) => {
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
    <>
      {showFile && (
        <FileDisplayComponent
          handleCloseShowVideoPlayer={handleCloseShowFile}
          file={file}
        />
      )}
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
            <Media handleShowFile={handleShowFile} files={files} />
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
      </Box>
    </Box>
  );
};

// Media
const Media = ({ files, handleShowFile }) => {
  const imageFiles = files.filter((file) => file.fileType.includes("image"));
  const videoFiles = files.filter((file) => file.fileType.includes("video"));
  const documentFiles = files.filter((file) =>
    file.fileType.includes(
      "vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        "application/msword"
    )
  );
  console.log("Hello World");
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
      <ImageMedia handleShowFile={handleShowFile} imageFiles={imageFiles} />
      <MediaVideos handleShowFile={handleShowFile} videoFiles={videoFiles} />
      <MediaDocuments
        handleShowFile={handleShowFile}
        documentFiles={documentFiles}
      />
      <MediaLinks />
    </Box>
  );
};

const ImageMedia = ({ imageFiles, handleShowFile }) => {
  const theme = useTheme();
  return (
    <Box>
      <MediaName name="Images" />
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
        {imageFiles.map((imageFile) => (
          <ImageListItem key={imageFile.img}>
            <Image
              onClick={() => handleShowFile(imageFile)}
              src={`${imageFile.fileUrl}?w=110&h=80&fit=crop&auto=format`}
              srcSet={`${imageFile.fileUrl}?w=110&h=80&fit=crop&auto=format&dpr=2 2x`}
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

const MediaVideos = ({ videoFiles, handleShowFile }) => {
  const theme = useTheme();

  return (
    <Box>
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
        {videoFiles.map((videoFile, i) => (
          <ImageListItem key={i} onClick={() => handleShowFile(videoFile)}>
            <video
              // controls
              style={{
                backgroundColor: "black",
                width: "auto",
                height: "80px",
                borderRadius: "3px",
              }}
              width="250"
            >
              <source src={videoFile.fileUrl} />
              Sorry, your browser doesn't support embedded videos.
            </video>
          </ImageListItem>
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
const MediaDocuments = ({ documentFiles, handleShowFile }) => {
  const theme = useTheme();
  console.log("Document Files  :", documentFiles);
  return (
    <Box>
      <MediaName name="Documents" />
      {/* Links */}
      <ImageList
        sx={{
          maxHeight: "200px",
          backgroundColor: theme.colors.textBackground,
          padding: "5px",
          borderRadius: "5px",
        }}
        cols={3}
        rowHeight={80}
      >
        {documentFiles.map((documentFile, i) => (
          <Box onClick={() => handleShowFile(documentFile)} key={i}>
            <FileComponent file={documentFile} />
          </Box>
        ))}
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
