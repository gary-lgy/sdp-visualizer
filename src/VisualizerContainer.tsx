import React, { useState } from "react";
import { SDPInput } from "./SDPInput";

type Mode = "input" | "visualize";

export const VisualizerContainer: React.FC = () => {
  const [mode, setMode] = useState<Mode>("input");
  const [sdp, setSDP] = useState("");

  const handleStartToVisualize = () => {
    setMode("visualize");
  };

  if (mode === "input") {
    return (
      <SDPInput onSubmit={handleStartToVisualize} sdp={sdp} setSDP={setSDP} />
    );
  } else {
    return <b>{sdp}</b>;
  }
};
