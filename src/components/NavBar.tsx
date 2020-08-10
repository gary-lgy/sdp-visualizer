import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React from "react";

type Props = {
  title: string;
};

export const NavBar: React.FC<Props> = ({ title }) => {
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h6">{title}</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};
