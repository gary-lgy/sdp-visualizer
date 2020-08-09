import React from "react";
import {
  Typography,
  Box,
  Button,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    textAlign: "center",
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

  return (
    <Box className={classes.root}>
      <Typography variant="body1">{props.sdp}</Typography>
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
