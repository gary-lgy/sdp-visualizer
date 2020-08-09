import React, { useState } from "react";
import { SDPInput } from "./SDPInput";
import { SDPVisualizer } from "./SDPVisualizer";

type Mode = "input" | "visualize";

export const VisualizerContainer: React.FC = () => {
  const [mode, setMode] = useState<Mode>("input");
  const [sdp, setSDP] = useState("");

  const handleStartVisualization = () => {
    setMode("visualize");
  };

  const handleEndVisualization = () => {
    setMode("input");
  };

  if (mode === "input") {
    return (
      <SDPInput onSubmit={handleStartVisualization} sdp={sdp} setSDP={setSDP} />
    );
  } else {
    return (
      <SDPVisualizer sdp={sdp} onEndVisualization={handleEndVisualization} />
    );
  }
};
