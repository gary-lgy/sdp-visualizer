import { Box, Button, makeStyles, Theme, useTheme } from "@material-ui/core";
import React from "react";
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

export const SDPVisualizer: React.FC<Props> = (props) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const sessionDescription = new SessionDescriptions(
    props.sdp.trim().split(/(\n|\r\n|\r)+/)
  );

  return (
    <Box className={classes.root}>
      <SDPSectionDisplay section={sessionDescription} />
      <Button
        className={classes.button}
        color="primary"
        variant="contained"
        onClick={props.onEndVisualization}
      >
        Back
      </Button>
    </Box>
  );
};
