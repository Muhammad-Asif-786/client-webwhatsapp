import React, { useState, useRef, useEffect, useCallback } from "react";
import socket from "../common/socket.js";
import CallUI from "./CallUI";
import {
  createPeerConnection,
  getLocalStream,
  addTracks,
  createOffer,
  createAnswer,
  addAnswer,
  addIceCandidate,
} from "../common/webrtc.js";

const CallContainer = ({ user, selectedUser }) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [calling, setCalling] = useState(false);
  const pcRef = useRef(null);

  // ================= END CALL =================
  const endCall = useCallback(() => {
    pcRef.current?.close();
    setCalling(false);
    socket.emit("end-call", { to: selectedUser._id });
  }, [selectedUser._id]);

  // ================= START CALL =================
  const startCall = async () => {
    const stream = await getLocalStream();
    setLocalStream(stream);

    const pc = createPeerConnection(socket, selectedUser._id, setRemoteStream);
    pcRef.current = pc;

    addTracks(pc, stream);

    const offer = await createOffer(pc);

    socket.emit("call-user", {
      to: selectedUser._id,
      from: user._id,
      offer,
    });

    setCalling(true);
  };

  // ================= RECEIVE CALL =================
  useEffect(() => {
    socket.on("incoming-call", async ({ from, offer }) => {
      const stream = await getLocalStream();
      setLocalStream(stream);

      const pc = createPeerConnection(socket, from, setRemoteStream);
      pcRef.current = pc;

      addTracks(pc, stream);

      const answer = await createAnswer(pc, offer);

      socket.emit("answer-call", { to: from, answer });

      setCalling(true);
    });

    socket.on("call-answered", async ({ answer }) => {
      await addAnswer(pcRef.current, answer);
    });

    socket.on("ice-candidate", async ({ candidate }) => {
      await addIceCandidate(pcRef.current, candidate);
    });

    socket.on("call-ended", () => {
      endCall();
    });

    return () => {
      socket.off("incoming-call");
      socket.off("call-answered");
      socket.off("ice-candidate");
      socket.off("call-ended");
    };
  }, [endCall]); // ✅ endCall dependency added

  return (
    <>
      <button onClick={startCall}>📞 Call</button>

      {calling && (
        <CallUI
          localStream={localStream}
          remoteStream={remoteStream}
          endCall={endCall}
        />
      )}
    </>
  );
};

export default CallContainer;