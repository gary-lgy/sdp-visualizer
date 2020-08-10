import {
  Box,
  Button,
  Fab,
  makeStyles,
  TextField,
  Theme,
  useScrollTrigger,
  useTheme,
  Zoom,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import React, { useRef } from "react";

interface Props {
  onSubmit: () => void;
  sdp: string;
  setSDP: (sdi: string) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    textAlign: "center",
    margin: theme.spacing(2),
  },
  buttonGroup: {
    "& > *": {
      margin: theme.spacing(2),
    },
  },
  fab: {
    position: "fixed",
    zIndex: theme.zIndex.modal,
    right: theme.spacing(2),
    bottom: theme.spacing(2),
    "& > *": {
      marginLeft: theme.spacing(1),
    },
  },
}));

export const SDPInput: React.FC<Props> = (props) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const topRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const shouldDisplayScrollFab = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10,
  });

  const handleTextValueChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    props.setSDP(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    props.onSubmit();
  };

  const handleScroll = (
    ref: React.MutableRefObject<HTMLDivElement | null>
  ) => () => {
    ref.current?.scrollIntoView();
  };

  return (
    <Box>
      <div ref={topRef}></div>

      <Box className={classes.fab}>
        <Zoom in={shouldDisplayScrollFab}>
          <Fab color="primary" onClick={handleScroll(topRef)}>
            <KeyboardArrowUpIcon />
          </Fab>
        </Zoom>
        <Zoom in={shouldDisplayScrollFab}>
          <Fab color="primary" onClick={handleScroll(bottomRef)}>
            <KeyboardArrowDownIcon />
          </Fab>
        </Zoom>
      </Box>

      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        className={classes.root}
      >
        <TextField
          value={props.sdp}
          onChange={handleTextValueChange}
          variant="outlined"
          multiline
          autoFocus
          fullWidth
          placeholder="Paste the SDP here"
        />
        <Box className={classes.buttonGroup}>
          <Button
            color="secondary"
            variant="contained"
            disabled={props.sdp.length === 0}
            onClick={() => props.setSDP("")}
          >
            Clear
          </Button>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={props.sdp.length === 0}
          >
            Visualize
          </Button>
        </Box>
      </form>

      <div ref={bottomRef}></div>
    </Box>
  );
};
