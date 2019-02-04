// ##############################
// // // Normal form with Label and input control view styles
// #############################

import {
  primaryColor
  ,grayColor
} from "../material-dashboard-pro-react";
import { Theme, createStyles } from "@material-ui/core";
import customCheckboxRadioSwitch from "./customCheckboxRadioSwitch";
import buttonGroupStyle from "./buttonGroupStyle";

const normalFormStyle = (theme: Theme) => (
  {
    ...customCheckboxRadioSwitch,
    ...buttonGroupStyle,
    cardCategoryWhite: {
      "&,& a,& a:hover,& a:focus": {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0",
      },
      "& a,& a:hover,& a:focus": {
        color: "#FFFFFF"
      }
    },
    cardTitleWhite: {
      color: "#FFFFFF",
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: 300,
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none",
      "& small": {
        color: "#777",
        fontSize: "65%",
        fontWeight: 400,
        lineHeight: "1"
      }
    },
    labelHorizontal: {
      // color: "rgba(0, 0, 0, 0.26)",
      fontSize: "14px",
      lineHeight: "1.428571429",
      fontWeight: 400,
      marginRight: "0",
      "@media (min-width: 992px)": {
        float: "right",
        top: "30%",
        position: "relative",
        paddingTop: "5px"

      }
    },

    uppercase: {
      textTransform: "uppercase"
    },

    valueHorizontal: {
      fontSize: "14px",
      lineHeight: "1.428571429",
      fontWeight: 400,
      marginRight: "0",
      "@media (min-width: 992px)": {
        float: "left",
        top: "30%",
        position: "relative",
        paddingTop: "5px"
      }
    },

    formControl: {
      paddingTop: "5px !important",
      margin: "0px !important"
    },
    npt: {
      paddingTop: "0px !important",
    },

    footerRight: {
      textAlign: "right",
      width: "100%"
    },
    right: {
      textAlign: "right"
    },
    center: {
      textAlign: "center"
    },
    modal: {
      position: 'absolute',
      width: theme.spacing.unit * 100,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 1,
      top: "50%",
      left: "50%",
      transform: `translate(-50%, -50%)`,
    },
    total: {
      fontSize: "14px",
    },
    icon: {
      color:grayColor,
      "&:hover,&:focus": {
        color: primaryColor
      },
    },
    

    money: {
      color: primaryColor,
      fontWeight: 300
    }


  }
);

export default normalFormStyle;
