const { useState, useEffect } = require("react");
const { createOffer } = require("../services/webrtc");

const useGetUserMedia = () => {
  const [localStream, setLocalStream] = useState(null);
  const constraints = { video: true, audio: true };

  useEffect(() => {
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      setLocalStream(stream);
    });

    return () => {
      setLocalStream(null);
    };
  }, []);

  if (localStream) return localStream;
};

const useCreateOffer = (peerConnection, localStream, remoteStream) => {
  const [offer, setOffer] = useState(null);
  useEffect(() => {
    if (localStream && remoteStream && peerConnection) {
      createOffer(peerConnection, localStream, remoteStream).then(
        (newOffer) => {
          setOffer(newOffer);
        }
      );
    }
    return () => {
      setOffer(null);
    };
  }, [localStream, remoteStream]);

  if (offer) return offer;
};

module.exports = { useGetUserMedia, useCreateOffer };
