import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box } from "@mui/system";
import { IconButton, Tooltip, Typography, useTheme } from "@mui/material";
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
import PeopleAltTwoToneIcon from "@mui/icons-material/PeopleAltTwoTone";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import GroupWorkOutlinedIcon from "@mui/icons-material/GroupWorkOutlined";
import { alpha } from "@mui/system";

// My Hooks
import { useCreateOffer, useGetUserMedia } from "../../../../hooks/webrtc";

import { createAnswer } from "../../../../services/webrtc";

const Id = () => {
  const theme = useTheme();
  const router = useRouter();
  const id = router.query.id;

  // WebRTC

  // Streams
  const localStream = useGetUserMedia();
  const [remoteStream, setRemoteStream] = useState(null);

  const [peerConnection, setPeerConnection] = useState(null);
  let myLocalOffer = useCreateOffer(peerConnection, localStream, remoteStream);
  // const answer = useCreateAnswer(localStream,);
  const [offer, setOffer] = useState(null);
  const [answer, setAnswer] = useState(null);

  // Video Elements
  const [localVideoElement, setLocalVideoElemnt] = useState(null);
  const [remoteVideoElement, setRemoteVideoElement] = useState(null);

  if (localVideoElement && localStream) {
    localVideoElement.srcObject = localStream;
  }
  if (remoteVideoElement) {
    console.log(remoteStream);
    remoteVideoElement.srcObject = remoteStream;
  }
  // Toggle states
  const [showCamera, setShowCamera] = useState(true);
  const [showMic, setShowMic] = useState(true);
  const [shareScreen, setShareScreen] = useState(false);
  const [viewCaption, setViewCaption] = useState(false);

  // Meet states
  const [meetRightOn, setMeetRightOn] = useState(false);
  const [schowParticipants, setSchowParticipants] = useState(false);
  const [showChats, setShowChats] = useState(false);
  const [showActivities, setShowActivities] = useState(false);

  // Bottom Left States
  const [expand, setExpand] = useState(true);
  const generateAnswer = async () => {
    let responseAnswer;
    if (localStream && remoteStream && offer) {
      responseAnswer = await createAnswer(
        peerConnection,
        localStream,
        remoteStream,
        JSON.parse(offer)
      );
      if (responseAnswer) {
        setAnswer(responseAnswer);
      }
    } else {
      console.error(
        "LocalStream , remoteStream and myLocalOffer ...",
        "LocalStream :",
        localStream,
        "remoteStream :",
        remoteStream,
        "offer :",
        offer
      );
    }
  };

  let addAnswer = async () => {
    console.log("Answer :", answer);
    if (!answer) return alert("Retrieve answer from peer first...");

    if (!peerConnection.currentRemoteDescription) {
      peerConnection.setRemoteDescription(answer);
    }
  };

  async function getVideoELements() {
    // RTCPeerConections
    const configuration = {
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    };
    setPeerConnection(new RTCPeerConnection(configuration));
    setRemoteStream(new MediaStream());

    setLocalVideoElemnt(document.querySelector("video#localVideo"));
    setRemoteVideoElement(document.querySelector("video#remoteVideo"));

    setShowMic(true);
    setShowCamera(true);
  }
  useEffect(() => {
    getVideoELements();
  }, []);

  useEffect(() => {
    setOffer(JSON.stringify(myLocalOffer));

    return () => {
      setOffer(null);
    };
  }, [myLocalOffer]);

  console.log("remoteStream :", remoteStream, "localStream :", localStream);

  // Meet Handlers
  const toggleMeetLeftHandler = () => {
    setMeetRightOn((prev) => !prev);
  };

  const getingOfferHandler = (event) => {
    setOffer(event.target.value);
    console.log("Offer changed", event.target.value);
  };
  const getingAnswerHandler = (event) => {
    setAnswer(JSON.parse(event.target.value));
  };

  //Bottom Mid Handlers
  const toggleCamera = () => {
    const videoTrack = localStream
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
    const audioTrack = localStream
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

  // Bottom Left Handdler
  const expandHandler = () => {
    setExpand((prev) => !prev);
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.colors.meetBackground,
        width: "100vw",
        height: "100vh",
      }}
    >
      <Box>
        <Button
          onClick={() => {
            generateAnswer();
          }}
        >
          Generate Answer
        </Button>
        <Button
          onClick={() => {
            addAnswer();
          }}
        >
          Add Answer
        </Button>
        <br />
        <label>SDP Answer</label>
        <textarea
          onChange={(e) => {
            getingAnswerHandler(e);
          }}
          id="answer-sdp"
        ></textarea>
        <br />
        <label>SDP Offer</label>
        <textarea
          onChange={(e) => {
            getingOfferHandler(e);
          }}
          value={offer}
          id="offer-sdp"
        ></textarea>
      </Box>
      <Box
        sx={
          meetRightOn && {
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
          }
        }
      >
        <MeetLeft />
        {meetRightOn && (
          <MeetRight
            schowParticipants={schowParticipants}
            showChats={showChats}
            showActivities={showActivities}
            expand={expand}
          />
        )}
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
          expandHandler={expandHandler}
          expand={expand}
          toggleMeetLeftHandler={toggleMeetLeftHandler}
          //
          setSchowParticipants={setSchowParticipants}
          setShowChats={setShowChats}
          setShowActivities={setShowActivities}
          meetRightOn={meetRightOn}
          //
          schowParticipants={schowParticipants}
          showChats={showChats}
          showActivities={showActivities}
        />
      </Box>
    </Box>
  );
};

export default Id;

const MeetLeft = () => {
  return (
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
          // width: "70vw",
          height: "98vh",
          overflow: "hidden",
          paddingTop: "15px",
          transform: "rotateY(180deg)",
          webkitTransform: "rotateY(180deg)",
          mozTransform: "rotateY(180deg)",
          marginLeft: "15px",
        }}
        id="localVideo"
        autoPlay={true}
        muted
      />
      <video
        style={{
          width: "70vw",
          height: "98vh",
          overflow: "hidden",
          paddingTop: "15px",
          transform: "rotateY(180deg)",
          webkitTransform: "rotateY(180deg)",
          mozTransform: "rotateY(180deg)",
          marginLeft: "15px",
        }}
        id="remoteVideo1"
        autoPlay={true}
        // muted
      />
    </Box>
  );
};
const MeetRight = ({
  schowParticipants,
  showChats,
  showActivities,
  expand,
}) => {
  if (schowParticipants && expand) {
    return (
      <Box
        sx={{
          height: expand ? "90vh" : "97vh",
          width: "40vw",
          backgroundColor: "red",
          marginRight: "10px",
          marginTop: "10px",
          borderRadius: "5px",
        }}
      >
        <Participant />
      </Box>
    );
  } else if (showChats && expand) {
    return (
      <Box
        sx={{
          height: expand ? "90vh" : "97vh",
          width: "40vw",
          backgroundColor: "red",
          marginRight: "10px",
          marginTop: "10px",
          borderRadius: "5px",
        }}
      >
        <MeetChats />
      </Box>
    );
  } else if (showActivities && expand) {
    return (
      <Box
        sx={{
          height: expand ? "90vh" : "97vh",
          width: "40vw",
          backgroundColor: "red",
          marginRight: "10px",
          marginTop: "10px",
          borderRadius: "5px",
        }}
      >
        <Activities />
      </Box>
    );
  }
};

const Bottom = ({
  toggleCamera,
  showCamera,
  showMic,
  toggleMic,
  shareScreen,
  shareScreenHandler,
  viewCaption,
  captionHandler,
  expandHandler,
  expand,
  toggleMeetLeftHandler,
  setSchowParticipants,
  setShowChats,
  setShowActivities,
  meetRightOn,
  schowParticipants,
  showChats,
  showActivities,
}) => {
  const theme = useTheme();
  return (
    <>
      {expand ? (
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            backgroundColor: theme.colors.meetBackground,
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            padding: "5px",
          }}
        >
          {/* Left */}
          <BottomLeft expandHandler={expandHandler} expand={expand} />
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
          <BottomRight
            toggleMeetLeftHandler={toggleMeetLeftHandler}
            setSchowParticipants={setSchowParticipants}
            setShowChats={setShowChats}
            setShowActivities={setShowActivities}
            meetRightOn={meetRightOn}
            //
            schowParticipants={schowParticipants}
            showChats={showChats}
            showActivities={showActivities}
            expand={expand}
          />{" "}
        </Box>
      ) : (
        <Tooltip title="Shrink" placement="top">
          <IconButton
            onClick={() => {
              expandHandler();
            }}
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              backgroundColor: theme.colors.meetBackground,
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
            <KeyboardArrowUpIcon color="action" />
          </IconButton>
        </Tooltip>
      )}
    </>
  );
};
// Bottom Left
const BottomLeft = ({ expandHandler }) => {
  const [timeIn, setTimeIn] = useState(0);
  const date = new Date();
  const timeHours = date.getHours();
  const timeMinutes = date.getMinutes();
  useEffect(() => {
    setTimeout(() => {
      setTimeIn((time) => time + 1);
    }, 1000);
  }, [timeIn]);

  const theme = useTheme();
  return (
    <Box sx={{ display: "flex" }}>
      <Typography variant="subtitle2" sx={{ paddingTop: "10px" }}>
        {timeHours}:{timeMinutes < 10 ? `0${timeMinutes}` : timeMinutes}
      </Typography>
      <Tooltip title="More options" placement="top">
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
      </Tooltip>
      <Tooltip title="Meeting Info" placement="top">
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
      </Tooltip>
      <Tooltip title="Host Control" placement="top">
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
      </Tooltip>
      <Tooltip title="Shrink" placement="top">
        <IconButton
          onClick={() => {
            expandHandler();
          }}
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
          <KeyboardArrowDownIcon color="action" />
        </IconButton>
      </Tooltip>
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
      <Tooltip title="Leave Meeting" placement="top">
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
      </Tooltip>
      <Tooltip
        title={showMic ? "Turn off  microphone" : "Turn on microphone"}
        placement="top"
      >
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
      </Tooltip>
      <Tooltip
        title={showCamera ? "Turn off  camera" : "Turn on camera"}
        placement="top"
      >
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
      </Tooltip>
      <Tooltip
        title={viewCaption ? "Turn off  caption" : "Turn on caption"}
        placement="top"
      >
        <IconButton
          onClick={() => {
            captionHandler();
          }}
          sx={{
            backgroundColor: viewCaption ? "#9c27b0" : "#1565c0",
            borderRadius: "15px",
            marginLeft: "7px",
          }}
        >
          {viewCaption ? (
            <ClosedCaptionOffRoundedIcon fontSize="medium" color="action" />
          ) : (
            <ClosedCaptionDisabledRoundedIcon
              fontSize="medium"
              color="action"
            />
          )}
        </IconButton>
      </Tooltip>
      <Tooltip
        title={!shareScreen ? "Present Now" : "Stop Present Now"}
        placement="top"
      >
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
      </Tooltip>
    </Box>
  );
};

// Bottom Right
const BottomRight = ({
  toggleMeetLeftHandler,
  setSchowParticipants,
  setShowChats,
  setShowActivities,
  meetRightOn,
  schowParticipants,
  showChats,
  showActivities,
  expand,
}) => {
  const theme = useTheme();
  return (
    <Box>
      <Tooltip title="Participants" placement="top">
        <IconButton
          onClick={() => {
            if (meetRightOn === false) {
              toggleMeetLeftHandler();
            } else {
              toggleMeetLeftHandler();
            }
            if (meetRightOn) {
              setSchowParticipants(true);
              setShowChats(false);
              setShowActivities(false);
            }
          }}
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
          <PeopleAltTwoToneIcon fontSize="medium" color="action" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Chats" placement="top">
        <IconButton
          onClick={() => {
            if (meetRightOn === false) {
              toggleMeetLeftHandler();
            } else {
              toggleMeetLeftHandler();
            }
            if (meetRightOn) {
              setShowChats(true);
              setSchowParticipants(false);
              setShowActivities(false);
            }
          }}
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="23"
            fill="whitesmoke"
            // class="bi bi-chat-dots"
            viewBox="0 0 16 16"
          >
            <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
            <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z" />
          </svg>
        </IconButton>
      </Tooltip>
      <Tooltip title="Activities" placement="top">
        <IconButton
          onClick={() => {
            if (meetRightOn === false) {
              toggleMeetLeftHandler();
            } else {
              toggleMeetLeftHandler();
            }
            if (meetRightOn) {
              setShowActivities(true);
              setShowChats(false);
              setSchowParticipants(false);
            }
          }}
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
          <GroupWorkOutlinedIcon fontSize="medium" color="action" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

// Participant
const Participant = () => {
  return (
    <Box>
      <Typography variant="body1">Participant</Typography>
    </Box>
  );
};

// MeetChats
const MeetChats = () => {
  return (
    <Box>
      <Typography variant="body1">MeetChats</Typography>
    </Box>
  );
};
// Activities
const Activities = () => {
  return (
    <Box>
      <Typography variant="body1">Activities</Typography>
    </Box>
  );
};
