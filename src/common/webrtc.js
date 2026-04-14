export const createPeerConnection = (socket, to, setRemoteStream) => {
  const pc = new RTCPeerConnection({
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
    ],
  });

  pc.ontrack = (event) => {
    setRemoteStream(event.streams[0]);
  };

  pc.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit("ice-candidate", {
        to,
        candidate: event.candidate,
      });
    }
  };

  return pc;
};

export const getLocalStream = async () => {
  return await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
};

export const addTracks = (pc, stream) => {
  stream.getTracks().forEach((track) => {
    pc.addTrack(track, stream);
  });
};

export const createOffer = async (pc) => {
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  return offer;
};

export const createAnswer = async (pc, offer) => {
  await pc.setRemoteDescription(new RTCSessionDescription(offer));
  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);
  return answer;
};

export const addAnswer = async (pc, answer) => {
  await pc.setRemoteDescription(new RTCSessionDescription(answer));
};

export const addIceCandidate = async (pc, candidate) => {
  if (candidate) {
    await pc.addIceCandidate(new RTCIceCandidate(candidate));
  }
};