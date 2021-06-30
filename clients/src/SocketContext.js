import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();

const socket = io("http://localhost:5000");
const ContextProvider = ({ children }) => {
  const [stream, setstream] = useState(null);
  const [me, setme] = useState("");
  const [call, setcall] = useState(null);
  const [callAccepted, setcallAccepted] = useState(false);
  const [callEnded, setcallEnded] = useState(false);
  const [name, setname] = useState("");
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((currentStream) => {
        setstream(currentStream);
        myVideo.current.srcObject = currentStream;
      });
    socket.on("me", (id) => setme(id));
    socket.on("calluser", ({ from, name: callerName, signal }) => {
      setcall({ isReceivedCall: true, from, name: callerName, signal });
    });
  }, []);
  const answerCall = () => {
    setcallAccepted(true);
    const peer = new Peer({ initiator: false, trickle: false, stream });
    peer.on("signal", (data) => {
      socket.emit("answercall", { signal: data, to: call.from });
    });
    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });
    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });
    peer.on("signal", (data) => {
      socket.emit("calluser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });
    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });
    socket.on("callaccepeted", (signal) => {
      setcallAccepted(true);
      peer.signal("signal");
    });
    connectionRef.current = true;
  };

  const leaveCall = () => {
    setcallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        callEnded,
        myVideo,
        userVideo,
        stream,
        name,
        setname,
        me,
        setme,
        leaveCall,
        answerCall,
        callUser,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
