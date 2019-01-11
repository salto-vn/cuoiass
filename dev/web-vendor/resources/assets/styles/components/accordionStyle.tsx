import { primaryColor } from "../material-dashboard-pro-react";
import { createStyles,Theme } from '@material-ui/core';

const accordionStyle = (theme:Theme) => createStyles({
  root: {
    flexGrow: 1,
    marginBottom: "20px"
  },
  expansionPanel: {
    boxShadow: "none",
    "&:before": {
      display: "none !important"
    }
  },
  expansionPanelExpanded: {
    margin: "0"
  },
  expansionPanelSummary: {
    minHeight: "auto !important",
    backgroundColor: "transparent",
    borderBottom: "1px solid #ddd",
    padding: "5px 10px 5px 0px",
    borderTopLeftRadius: "3px",
    borderTopRightRadius: "3px",
    color: "#3C4858",
    "&:hover": {
      color: primaryColor
    }
  },
  expansionPanelSummaryExpaned: {
    color: primaryColor,
    "& $expansionPanelSummaryExpandIcon": {
      [theme.breakpoints.up("md")]: {
        top: "auto !important"
      },
      transform: "rotate(180deg)",
      [theme.breakpoints.down("sm")]: {
        top: "10px !important"
      }
    }
  },
  expansionPanelSummaryContent: {
    margin: "0 !important"
  },
  expansionPanelSummaryExpandIcon: {
    [theme.breakpoints.up("md")]: {
      top: "auto !important"
    },
    transform: "rotate(0deg)",
    color: "inherit",
    [theme.breakpoints.down("sm")]: {
      top: "10px !important"
    }
  },
  expansionPanelSummaryExpandIconExpanded: {},
  title: {
    fontSize: "15px",
    fontWeight: "bolder",
    marginTop: "0",
    marginBottom: "0",
    color: "inherit",
    width:"100%"
  },
  expansionPanelDetails: {
    padding: "15px 0px 5px",
    display: "inherit",
    fontWeight: 400,
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    textDecoration: "none"
  }
});

export default accordionStyle;
