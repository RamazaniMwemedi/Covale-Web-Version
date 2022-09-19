import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box } from "@mui/system";
import { IconButton, Typography, useTheme } from "@mui/material";
import MicRoundedIcon from "@mui/icons-material/MicRounded";
import MicOffRoundedIcon from "@mui/icons-material/MicOffRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import CallEndRoundedIcon from "@mui/icons-material/CallEndRounded";
import PresentToAllRoundedIcon from "@mui/icons-material/PresentToAllRounded";
import ClosedCaptionOffRoundedIcon from "@mui/icons-material/ClosedCaptionOffRounded";
import ClosedCaptionDisabledRoundedIcon from "@mui/icons-material/ClosedCaptionDisabledRounded";
import Button from "@mui/material/Button";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { alpha } from "@mui/system";

const Id = () => {
  const theme = useTheme();
  const router = useRouter();
  const id = router.query.id;
  const [myCameraSrcObject, setMyCameraSrcObject] = useState(null);
  const [videoElement, setVideoElemnt] = useState(null);
  if (videoElement) {
    videoElement.srcObject = myCameraSrcObject;
  }
  // Toggle states
  const [showCamera, setShowCamera] = useState(true);
  const [showMic, setShowMic] = useState(true);
  const [shareScreen, setShareScreen] = useState(false);
  const [viewCaption, setViewCaption] = useState(false);

  async function playVideoFromCamera() {
    try {
      setVideoElemnt(document.querySelector("video#localVideo"));

      const constraints = { video: true, audio: { echoCancellation: true } };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setMyCameraSrcObject(stream);
      setShowMic(true);
      setShowCamera(true);
    } catch (error) {
      console.error("Error opening video camera.", error);
    }
  }
  useEffect(() => {
    playVideoFromCamera();
    return () => {};
  }, [videoElement]);

  // Handlers
  const toggleCamera = () => {
    const videoTrack = myCameraSrcObject
      .getTracks()
      .find((track) => track.kind === "video");
    if (videoTrack.enabled) {
      videoTrack.enabled = false;
      setShowCamera(false);
    } else {
      videoTrack.enabled = true;
      setShowCamera(true);
    }
  };
  const toggleMic = () => {
    const audioTrack = myCameraSrcObject
      .getTracks()
      .find((track) => track.kind === "audio");
    if (audioTrack.enabled) {
      audioTrack.enabled = false;
      setShowMic(false);
    } else {
      audioTrack.enabled = true;
      setShowMic(true);
    }
  };
  const shareScreenHandler = () => {
    setShareScreen(!shareScreen);
  };

  const captionHandler = () => {
    setViewCaption((p) => !p);
  };
  return (
    <Box
      sx={{
        backgroundColor: theme.colors.border,
        width: "100vw",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItem: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <video
          style={{
            objectFit: "fill",
            position: "absolute",
            height: "100vh",
            width: "90vw",
            overflow: "hidden",
          }}
          id="localVideo"
          autoPlay={true}
        />

        {/* Bottom */}
        <Bottom
          toggleCamera={toggleCamera}
          toggleMic={toggleMic}
          showCamera={showCamera}
          showMic={showMic}
          shareScreen={shareScreen}
          shareScreenHandler={shareScreenHandler}
          viewCaption={viewCaption}
          captionHandler={captionHandler}
        />
      </Box>
    </Box>
  );
};

export default Id;

const Bottom = ({
  toggleCamera,
  showCamera,
  showMic,
  toggleMic,
  shareScreen,
  shareScreenHandler,
  viewCaption,
  captionHandler,
}) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        backgroundColor: theme.colors.border,
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {/* Left */}
      <BottomLeft />
      {/* Mid */}
      <BottomMid
        toggleCamera={toggleCamera}
        showCamera={showCamera}
        showMic={showMic}
        toggleMic={toggleMic}
        shareScreen={shareScreen}
        shareScreenHandler={shareScreenHandler}
        viewCaption={viewCaption}
        captionHandler={captionHandler}
      />
      {/* Right */}
      <BottomRight />{" "}
    </Box>
  );
};
// Bottom Left
const BottomLeft = () => {
  const [timeIn, setTimeIn] = useState(0);
  const date = new Date();
  console.log(date);
  const timeHours = date.getHours();
  const timeMinutes = date.getMinutes();
  useEffect(() => {
    setTimeout(() => {
      setTimeIn((time) => time + 1);
    }, 1000);
  }, [timeIn]);

  const theme = useTheme();
  return (
    <Box sx={{}}>
      <Typography variant="caption">
        {timeHours}:{timeMinutes}
      </Typography>
      <IconButton
        sx={{
          backgroundColor: "gray",
          borderRadius: "15px",
          backgroundColor: alpha(
            theme.palette.action.active,
            theme.palette.action.hoverOpacity
          ),
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            backgroundColor: "transparent",
          },
          marginLeft: "7px",
        }}
      >
        <MoreVertRoundedIcon color="action" />
      </IconButton>
      <IconButton
        sx={{
          backgroundColor: "gray",
          borderRadius: "15px",
          backgroundColor: alpha(
            theme.palette.action.active,
            theme.palette.action.hoverOpacity
          ),
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            backgroundColor: "transparent",
          },
          marginLeft: "7px",
        }}
      >
        <InfoOutlinedIcon color="action" />
      </IconButton>
      <IconButton
        sx={{
          backgroundColor: "gray",
          borderRadius: "15px",
          backgroundColor: alpha(
            theme.palette.action.active,
            theme.palette.action.hoverOpacity
          ),
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            backgroundColor: "transparent",
          },
          marginLeft: "7px",
        }}
      >
        <SettingsOutlinedIcon color="action" />
      </IconButton>
    </Box>
  );
};

//  Bottom Mid
const BottomMid = ({
  toggleCamera,
  showCamera,
  showMic,
  toggleMic,
  shareScreen,
  shareScreenHandler,
  viewCaption,
  captionHandler,
}) => {
  return (
    <Box>
      <Button
        size="small"
        sx={{
          backgroundColor: "#d32f2f",
          borderRadius: "15px",
          marginRight: "40px",
        }}
      >
        <CallEndRoundedIcon fontSize="large" color="action" />
      </Button>

      <IconButton
        onClick={() => {
          toggleMic();
        }}
        sx={{
          backgroundColor: showMic ? "#9c27b0" : "#d32f2f",
          borderRadius: "15px",
        }}
      >
        {showMic ? (
          <MicRoundedIcon fontSize="medium" color="action" />
        ) : (
          <MicOffRoundedIcon fontSize="medium" color="action" />
        )}
      </IconButton>
      <IconButton
        onClick={() => {
          toggleCamera();
        }}
        sx={{
          backgroundColor: showCamera ? "#9c27b0" : "#d32f2f",
          borderRadius: "15px",
          marginLeft: "7px",
        }}
      >
        {showCamera ? (
          <VideocamRoundedIcon fontSize="medium" color="action" />
        ) : (
          <VideocamOffIcon fontSize="medium" color="action" />
        )}
      </IconButton>
      <IconButton
        onClick={() => {
          captionHandler();
        }}
        sx={{
          backgroundColor: viewCaption ? "#9c27b0" : "#d32f2f",
          borderRadius: "15px",
          marginLeft: "7px",
        }}
      >
        {viewCaption ? (
          <ClosedCaptionOffRoundedIcon fontSize="medium" color="action" />
        ) : (
          <ClosedCaptionDisabledRoundedIcon fontSize="medium" color="action" />
        )}
      </IconButton>
      <IconButton
        onClick={() => {
          shareScreenHandler();
        }}
        sx={{
          backgroundColor: shareScreen ? "#2e7d32" : "#9c27b0",
          borderRadius: "15px",
          marginLeft: "7px",
        }}
      >
        <PresentToAllRoundedIcon fontSize="medium" color="action" />
      </IconButton>
    </Box>
  );
};

// Bottom Right
const BottomRight = () => {
  return (
    <Box>
      <Typography variant="caption">Right</Typography>
    </Box>
  );
};
