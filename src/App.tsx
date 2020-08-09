import React from "react";
import { Box, CssBaseline, Typography } from "@material-ui/core";
import { VisualizerContainer } from "./VisualizerContainer";

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
