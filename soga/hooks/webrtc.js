const { useState, useEffect } = require("react");
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

module.exports = { useGetUserMedia };
