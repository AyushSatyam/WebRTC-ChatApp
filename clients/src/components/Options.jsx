import React, { useContext, useState } from "react";
import { SocketContext } from "../SocketContext";
import { CopyToClipboard } from "react-copy-to-clipboard";
const Options = ({children}) => {
  const { name, me, callAccepted, callEnded, setName, leaveCall, callUser } =
    useContext(SocketContext);
  const [idToCall, setidToCall] = useState("");

  return (
    <div>
      <form noValidate autoComplete="off">
        <textarea
          label="Name"
          value={name}
          onChange={(e) => setidToCall(e.target.value)}
          fullWidth
        />
        <CopyToClipboard text={me}>
          <button color="primary">Copy your ID</button>
        </CopyToClipboard>
        <textarea
          label="ID to call"
          value={idToCall}
          onChange={(e) => setidToCall(e.target.value)}
        />
        {callAccepted && !callEnded ? (
          <button color="primary" onClick={leaveCall}>
            Hang Up
          </button>
        ) : (
          <button color="primary" onClick={() => callUser(idToCall)}>
            call
          </button>
        )}
      </form>
      {children}
    </div>
  );
};

export default Options;
