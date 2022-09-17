import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box } from "@mui/system";
import { IconButton } from "@mui/material";
import MicRoundedIcon from "@mui/icons-material/MicRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import CallEndRoundedIcon from "@mui/icons-material/CallEndRounded";
import PresentToAllRoundedIcon from "@mui/icons-material/PresentToAllRounded";
const Id = () => {
  const router = useRouter();
  const id = router.query.id;
  const [myCameraSrcObject, setMyCameraSrcObject] = useState(null);

  async function playVideoFromCamera() {
    try {
      const constraints = { video: true, audio: { echoCancellation: true } };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const videoElement = document.querySelector("video#localVideo");
      videoElement.srcObject = stream;
    } catch (error) {
      console.error("Error opening video camera.", error);
    }
  }
  useEffect(() => {
    playVideoFromCamera();
    return () => {};
  }, []);

  return (
    <Box>
      <Box>
        <video
          style={{
            objectFit: "fill",
            position: "absolute",
            height: "100%",
            width: "90%",
            overflow: "hidden",
          }}
          id="localVideo"
          autoplay="true"
        />{" "}
      </Box>
      {/* Bottom */}
      <Bottom />
    </Box>
  );
};

export default Id;

const Bottom = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        backgroundColor: "black",
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {/* Left */}
      <Box></Box>
      {/* Mid */}
      <Box>
        <IconButton size="large">
          <CallEndRoundedIcon fontSize="large" color="error" />
        </IconButton>
        <IconButton>
          <MicRoundedIcon ontSize="medium" />
        </IconButton>
        <IconButton>
          <VideocamRoundedIcon ontSize="medium" />
        </IconButton>
        <IconButton>
          <PresentToAllRoundedIcon ontSize="medium" />
        </IconButton>
      </Box>
      {/* Right */}
      <Box></Box>
    </Box>
  );
};
