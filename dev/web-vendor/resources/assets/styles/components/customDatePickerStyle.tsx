import {
  primaryColor,
  dangerColor,
  successColor,
  defaultFont
} from "../material-dashboard-pro-react";
import { createStyles, Theme } from '@material-ui/core';

const customDatePickerStyle = (theme:Theme) => createStyles({
  icon : {
    position: "absolute",
    right: 0,
    bottom: "5px",
    color: "#D2D2D1 !important",
    "&:hover" : {
      cursor: "pointer"
    }
  },
  disabled: {
    "&:before": {
      borderColor: "transparent !important"
    }
  },
  underline: {
    "&:hover:not($disabled):before,&:before": {
      borderColor: "#D2D2D2 !important",
      borderWidth: "1px !important"
    },
    "&:after": {
      borderColor: primaryColor
    },
    borderTop: "0px",
    borderLeft: "0px",
    borderRight: "0px",
    borderWidth: "1px",
    borderColor: "#D2D2D1",
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
    lineHeight: "1.42857",
    top: "10px",
    "& + $underline": {
      marginTop: "0px"
    },
  },
  labelRootError: {
    color: dangerColor + " !important"
  },
  labelRootSuccess: {
    color: successColor + " !important"
  },
  formControl: {
    margin: "0 0 17px 0",
    paddingTop: "27px",
    position: "relative",
    verticalAlign: "unset",
    "& svg,& .fab,& .far,& .fal,& .fas,& .material-icons": {
      color: "#495057"
    },
  },
  whiteUnderline: {
    "&:hover:not($disabled):before,&:before": {
      backgroundColor: "#FFFFFF"
    },
    "&:after": {
      backgroundColor: "#FFFFFF"
    }
  },
  input: {
    color: "#495057",
    "&,&::placeholder": {
      fontSize: "14px",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      lineHeight: "1.42857",
      opacity: 1
    },
    "&:placeholder": {
      color: "#AAAAAA",
      fontSize: "20px"
    },
  },
  whiteInput: {
    "&,&::placeholder": {
      color: "#FFFFFF",
      opacity: 1
    }
  },

  error: {
    color: dangerColor
  }
});

export default customDatePickerStyle;
