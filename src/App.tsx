import { Box, CssBaseline } from "@material-ui/core";
import React from "react";
import { NavBar } from "./components/NavBar";
import { VisualizerContainer } from "./components/VisualizerContainer";

function App() {
  return (
    <Box>
      <CssBaseline />
      <NavBar title="SDP Visualizer" />
      <VisualizerContainer />
    </Box>
  );
}

export default App;
