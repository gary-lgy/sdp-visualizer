import {
  Box,
  Button,
  CircularProgress,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { SessionDescriptions } from "./sdp/session_description";
import { SDPSectionDisplay } from "./SDPSectionDisplay";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    textAlign: "center",
    margin: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

type Props = {
  sdp: string;
  onEndVisualization: () => void;
};

export const SDPVisualizer: React.FC<Props> = ({ sdp, onEndVisualization }) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [
    sessionDescription,
    setSessionDescription,
  ] = useState<SessionDescriptions | null>(null);

  // In case it is expensive to construct a SessionDescription instance, do it asynchronously.
  useEffect(() => {
    new Promise<SessionDescriptions>((resolve) => {
      resolve(new SessionDescriptions(sdp.trim().split(/(\n|\r\n|\r)+/)));
    }).then((desc: SessionDescriptions) => setSessionDescription(desc));
  }, [sdp]);

  if (sessionDescription === null) {
    return <CircularProgress />;
  }
  return (
    <Box className={classes.root}>
      <SDPSectionDisplay section={sessionDescription} />
      <Button
        className={classes.button}
        color="primary"
        variant="contained"
        onClick={onEndVisualization}
      >
        Back
      </Button>
    </Box>
  );
};
