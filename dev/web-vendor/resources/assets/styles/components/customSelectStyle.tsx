import {
  primaryColor,
  dangerColor,
  successColor,
  defaultFont
} from "../material-dashboard-react";
import { createStyles } from '@material-ui/core';

const customSelectStyle = createStyles({
  disabled: {
    "&:before": {
      backgroundColor: "transparent !important"
    }
  },
  underline: {
    "&:hover": {
      borderColor: "#D2D2D2 !important",
      borderWidth: "1px !important"
    },
    "&:after": {
      borderColor: primaryColor
    }
  },
  underlineError: {
    "&:after": {
      borderColor: dangerColor
    }
  },
  underlineSuccess: {
    "&:after": {
      borderColor: successColor
    }
  },
  labelRoot: {
    ...defaultFont,
    color: "#AAAAAA !important",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "1.42857"
  },
  labelRootError: {
    color: dangerColor
  },
  labelRootSuccess: {
    color: successColor
  },
  feedback: {
    position: "absolute",
    top: "18px",
    right: "0",
    zIndex: 2,
    display: "block",
    width: "24px",
    height: "24px",
    textAlign: "center",
    pointerEvents: "none"
  },
  marginTop: {
    marginTop: "16px"
  },
  formControl: {
    paddingBottom: "10px",
    margin: "27px 0 0 0",
    position: "relative"
  },

  error: {
    color:dangerColor
  }
});

export default customSelectStyle;
