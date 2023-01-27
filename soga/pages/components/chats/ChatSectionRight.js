import React, { useState } from "react";
import { Avatar, Button, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useTheme } from "@mui/styles";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Image from "next/image";
import VedeoOpen from "./VideoOpen";
import FileDisplayComponent from "../mediaFiles/FileDisplayComponent";
import FileComponent from "../mediaFiles/FileComponent";
import { purple } from "@mui/material/colors";
import {
  DocxIcon,
  ImageIcon,
  PdfIcon,
  PptIcon,
  VideoIcon,
  XlsIcon,
} from "../../../assets/Icons";

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
    <Box
      sx={{
        padding: "5px",
      }}
    >
      <Typography variant="h5" color="secondary">
        {" "}
        Media
      </Typography>
      <Box
        sx={{
          display: imageFiles.length < 1 ? "flex" : "",
          justifyContent: imageFiles.length < 1 ? "center" : "initial",
        }}
      >
        {imageFiles.length > 0 ? (
          <ImageMedia handleShowFile={handleShowFile} imageFiles={imageFiles} />
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: theme.colors.textBackground,
              padding: "10px",
              width: "280px",
              borderRadius: "10px",
            }}
          >
            <ImageIcon height={50} width={50} />
            <Typography variant="body2" color="inherit">
              No Images shared yet
            </Typography>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          display: videoFiles.length < 1 ? "flex" : "",
          justifyContent: videoFiles.length < 1 ? "center" : "",
          marginTop: "10px",
        }}
      >
        {videoFiles.length > 0 ? (
          <MediaVideos
            handleShowFile={handleShowFile}
            videoFiles={videoFiles}
          />
        ) : (
          <Box
            sx={{
              width: "280px",
              display: "flex",
              alignItems: "center",
              backgroundColor: theme.colors.textBackground,
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <VideoIcon height={50} width={50} />
            <Typography variant="body2" color="inherit">
              No Videos shared yet
            </Typography>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          display: documentFiles.length < 1 ? "flex" : "inline-block",
          justifyContent: documentFiles.length < 1 ? "center" : "",
          marginTop: "10px",
          width: "100%",
        }}
      >
        {documentFiles.length > 0 ? (
          <MediaDocuments
            handleShowFile={handleShowFile}
            documentFiles={documentFiles}
          />
        ) : (
          <Box
            sx={{
              width: "280px",
              display: "flex",
              alignItems: "center",
              backgroundColor: theme.colors.textBackground,
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <DocxIcon height={50} width={50} />
            <Typography variant="body2" color="inherit">
              No Documents shared yet
            </Typography>
          </Box>
        )}
      </Box>
      <Box
        style={{
          display: xlsFiles.length < 1 ? "flex" : "block",
          justifyContent: xlsFiles.length < 1 ? "center" : "",
          marginTop: "10px",
        }}
      >
        {xlsFiles.length > 0 ? (
          <MediaXls handleShowFile={handleShowFile} xlsFiles={xlsFiles} />
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: theme.colors.textBackground,
              width: "280px",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <XlsIcon height={50} width={50} />
            <Typography variant="body2" color="inherit">
              No Xls shared yet
            </Typography>
          </Box>
        )}
      </Box>

      <Box
        sx={{
          display: pdfFiles.length < 1 ? "flex" : "block",
          justifyContent: pdfFiles.length < 1 ? "center" : "inherit",
          marginTop: "10px",
        }}
      >
        {pdfFiles.length > 0 ? (
          <MediaPdf handleShowFile={handleShowFile} pdfFiles={pdfFiles} />
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: theme.colors.textBackground,
              width: "280px",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <PdfIcon height={50} width={50} />
            <Typography variant="body2" color="inherit">
              No Pdf shared yet
            </Typography>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: pptFile.length < 1 ? "center" : "",
          marginTop: "10px",
        }}
      >
        {pptFile.length > 0 ? (
          <MediaPpt handleShowFile={handleShowFile} pptFiles={pptFile} />
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: theme.colors.textBackground,
              width: "280px",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <PptIcon height={50} width={50} />
            <Typography variant="body2" color="inherit">
              No Pressentation shared yet
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

const ImageMedia = ({ imageFiles, handleShowFile }) => {
  const theme = useTheme();
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow((prev) => !prev);
  };
  return (
    <Box>
      <MediaName name="Images" show={show} toggleShow={toggleShow} />
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
      )}
    </Box>
  );
};

const MediaVideos = ({ videoFiles, handleShowFile }) => {
  const theme = useTheme();
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow((prev) => !prev);
  };
  return (
    <Box>
      <MediaName name="Videos" show={show} toggleShow={toggleShow} />
      {/* Videos */}
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

const MediaDocuments = ({ documentFiles, handleShowFile }) => {
  const theme = useTheme();
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow((prev) => !prev);
  };
  return (
    <Box>
      <MediaName name="Documents" show={show} toggleShow={toggleShow} />
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
    <Box>
      <MediaName name="Xls Sheet" show={show} toggleShow={toggleShow} />
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
    <Box>
      <MediaName name="Pdf" show={show} toggleShow={toggleShow} />
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
    <Box>
      <MediaName name="Pressentation" show={show} toggleShow={toggleShow} />
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

const MediaName = ({ name, show, toggleShow }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="body1">{name}</Typography>
      <IconButton onClick={toggleShow} color="secondary" size="small">
        {show ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </IconButton>
    </Box>
  );
};
