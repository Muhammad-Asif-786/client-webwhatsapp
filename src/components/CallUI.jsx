import React, { useEffect, useRef } from "react";

const CallUI = ({ localStream, remoteStream, endCall }) => {
  const localRef = useRef();
  const remoteRef = useRef();

  useEffect(() => {
    if (localRef.current && localStream) {
      localRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteRef.current && remoteStream) {
      remoteRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col justify-center items-center z-50">
      
      <video ref={remoteRef} autoPlay className="w-full h-full object-cover" />

      <video
        ref={localRef}
        autoPlay
        muted
        className="w-40 h-40 absolute bottom-20 right-5 border"
      />

      <button
        onClick={endCall}
        className="absolute bottom-5 bg-red-500 text-white px-6 py-2 rounded-full"
      >
        End Call
      </button>
    </div>
  );
};

export default CallUI;