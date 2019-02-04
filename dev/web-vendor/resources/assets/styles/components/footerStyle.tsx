import {
  defaultFont,
  container,
  primaryColor,
  containerFluid
} from "../material-dashboard-pro-react";
import { createStyles } from '@material-ui/core';

const footerStyle = createStyles({
  block: {},
  left: {
    float: "left",
    display: "block"
  },
  right: {
    margin: "0",
    fontSize: "14px",
    float: "right",
    padding: "15px"
  },
  footer: {
    bottom: "0",
    borderTop: "1px solid #e7e7e7",
    padding: "15px 0",
    ...defaultFont,
    zIndex: 4
  },
  container: {
    zIndex: 3,
    ...container,
    position: "relative" as "relative"
  },
  containerFluid: {
    zIndex: 3,
    ...containerFluid,
    position: "relative"
  },
  a: {
    color: primaryColor,
    textDecoration: "none",
    backgroundColor: "transparent"
  },
  list: {
    marginBottom: "0",
    padding: "0",
    marginTop: "0"
  },
  inlineBlock: {
    display: "inline-block",
    padding: "0",
    width: "auto"
  },
  whiteColor: {
    "&,&:hover,&:focus": {
      color: "#FFFFFF"
    }
  }
});
export default footerStyle;
