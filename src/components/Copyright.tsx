import {
  Box,
  Link,
  makeStyles,
  Theme,
  Typography,
  useTheme,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(2),
  },
}));

export const Copyright: React.FC = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <Box className={classes.root}>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Made with ❤️."}
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        <Link href="https://github.com/gary-lgy/sdp-visualizer">
          Read the source code.
        </Link>{" "}
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link href="https://garyliu.dev">Gary Liu</Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
};
