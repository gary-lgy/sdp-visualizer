import React from "react";
import {
  TextField,
  Button,
  makeStyles,
  Theme,
  useTheme,
  Box,
} from "@material-ui/core";

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
    margin: theme.spacing(2),
    "& > *": {
      margin: theme.spacing(2),
    },
  },
}));

export const SDPInput: React.FC<Props> = (props) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const handleTextValueChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    props.setSDP(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    props.onSubmit();
  };

  return (
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
        rows="4"
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
  );
};
