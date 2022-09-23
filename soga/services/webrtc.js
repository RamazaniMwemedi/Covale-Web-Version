const createOffer = async (localStream) => {
  var offer;
  if (localStream) {
    // RTCPeerConections
    const configuration = {
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    };
    const peerConnection = new RTCPeerConnection(configuration);

    // Add LocalStream to peerConnection
    if (localStream) {
      localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
      });
    }

    // Get remote tracks to peerConnetion
    peerConnection.ontrack = async (event) => {
      console.log("Event :", event);
      event.streams[0].getTracks().forEach((track) => {
        console.log("Remote Track :", track);
        remoteStream.addTrack(track);
      });
    };

    //getting new offer with an ICE canditade from peerConnection
    peerConnection.onicecandidate = async (event) => {
      if (event.candidate) {
        console.log("event.candidate :", event.candidate);
        offer = peerConnection.localDescription;
      }
    };

    // Create an offer
    offer = await peerConnection.createOffer();
    if (offer) {
      document.getElementById("offer-sdp").value = JSON.stringify(offer);
      await peerConnection.setLocalDescription(offer);
      return offer;
    } else {
      console.error(
        "LocalStream is not provided. Please provide the localSteam object first"
      );
    }
  }
};
const createAnswer = async (localStream, remoteStream) => {
  var offer;
  var answer;
  // RTCPeerConections
  const configuration = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };
  const peerConnection = new RTCPeerConnection(configuration);

  // Add LocalStream to peerConnection
  if (localStream) {
    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });
  }

  // Get remote tracks to peerConnetion
  peerConnection.ontrack = async (event) => {
    event.streams[0].getTracks().forEach((track) => {
      remoteStream.addTrack(track);
    });
  };

  //getting new offer with an ICE canditade from peerConnection
  peerConnection.onicecandidate = async (event) => {
    if (event.candidate) {
      offer =peerConnection.localDescription;
    }
  };

  if (!offer) return alert("Retrieve offer from peer first...");

  await peerConnection.setRemoteDescription(offer);

  answer =await peerConnection.createAnswer();
  if (answer) {
    document.getElementById("answer-sdp").value = JSON.stringify(answer);
    await peerConnection.setLocalDescription(answer);
  }
};
module.exports = { createOffer, createAnswer };
