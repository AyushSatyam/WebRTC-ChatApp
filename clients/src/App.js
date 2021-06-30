// import logo from './logo.svg';
import React from "react";
// import { Typography, AppBar } from "@material-ui/core";
// import './App.css';
import VideoPlayer from "./components/VideoPlayer";
import Options from "./components/Options";
import Notification from "./components/Notification";

const App = () => {
  // const { classes } = useStyles();
  return (
    <div className="App">
      <VideoPlayer />
      <Options>
        <Notification />
      </Options>
    </div>
  );
};

// export default App

// function App() {
//   // const [classes] = useStyles();
//   return (

//   );
// }

export default App;
