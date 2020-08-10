import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import { SDPSection } from "./sdp/types";

type Props = {
  section: SDPSection;
};

const useStyles = makeStyles((theme: Theme) => ({
  accordionSummaryTypography: {
    fontWeight: theme.typography.fontWeightBold,
  },
  accordionDetails: {
    display: "block",
    textAlign: "left",
  },
}));

export const SDPSectionDisplay: React.FC<Props> = ({ section }) => {
  const classes = useStyles();

  return (
    <Accordion TransitionProps={{ unmountOnExit: true }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.accordionSummaryTypography}>
          {section.overview}
        </Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        {/*Use indices as key because the array should not be mutated*/}
        {section.ownLines.map((line, index) => (
          <Typography key={index} variant="body1">
            {line}
          </Typography>
        ))}
        {section.subSections.map((section, index) => (
          <SDPSectionDisplay key={index} section={section} />
        ))}
      </AccordionDetails>
    </Accordion>
  );
};
