const createOffer = async (peerConnection, localStream, remoteStream) => {
  var offer;
  if (localStream && remoteStream && peerConnection) {
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
        "LocalStream is not provided. Please provide the localSteam object first  and the remoteStream"
      );
    }
  } else {
    console.error(
      "peerConnection: ",
      peerConnection,
      "localStream :",
      localStream,
      "remoteStream :",
      remoteStream
    );
  }
};
const createAnswer = async (
  peerConnection,
  localStream,
  remoteStream,
  offer
) => {
  var answer;

  // Add LocalStream to peerConnection
  if (!localStream) {
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
      offer = peerConnection.localDescription;
    }
  };

  if (!offer) return alert("Retrieve offer from peer first...");

  await peerConnection.setRemoteDescription(offer);

  answer = await peerConnection.createAnswer();
  if (answer) {
    await peerConnection.setLocalDescription(answer);
    document.getElementById("answer-sdp").value = JSON.stringify(answer);

    return answer;
  }
};
module.exports = { createOffer, createAnswer };
