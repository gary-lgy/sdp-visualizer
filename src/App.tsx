import { Box, CssBaseline, Typography } from "@material-ui/core";
import React from "react";
import { VisualizerContainer } from "./components/VisualizerContainer";

function App() {
  return (
    <Box>
      <CssBaseline />
      <Typography variant="h3">SDP Visualizer</Typography>
      <VisualizerContainer />
    </Box>
  );
}

export default App;
