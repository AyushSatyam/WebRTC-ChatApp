import React, { useContext } from "react";
import { SocketContext } from "../SocketContext";
// import { Grid, Paper, Typography } from "@material-ui/core";
const VideoPlayer = () => {
  const { name, callAccepted, callEnded, myVideo, userVideo, stream, call } =
    useContext(SocketContext);
  return (
    <div>
      {stream && <video playsInline muted ref={myVideo} autoPlay />}
      {callAccepted && !callEnded && (
        <video playsInline muted ref={userVideo} autoPlay />
      )}
    </div>
  );
};

export default VideoPlayer;
