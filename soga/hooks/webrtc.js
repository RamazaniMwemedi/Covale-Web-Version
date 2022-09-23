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

const useCreateOffer = (localStream) => {
  const [offer, setOffer] = useState(null);
  useEffect(() => {
    createOffer(localStream).then((newOffer) => {
      setOffer(newOffer);
    });
    return () => {
      setOffer(null);
    };
  }, [localStream]);

  if (offer) return offer;
};

module.exports = { useGetUserMedia, useCreateOffer };
