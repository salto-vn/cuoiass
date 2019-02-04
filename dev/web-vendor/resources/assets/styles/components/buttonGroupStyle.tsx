// ##############################
// // // Button Group styles
// #############################
import { createStyles } from '@material-ui/core';

const buttonGroupStyle = createStyles({
  buttonGroup: {
    position: "relative",
    margin: "3px 1px",
    display: "inline-block",
    verticalAlign: "middle"
  },
  firstButton: {
    borderTopRightRadius: "0",
    borderBottomRightRadius: "0",
    margin: "0",
    position: "relative",
    padding: "5px",
    float: "left",
    "&:hover": {
      zIndex: 2
    }
  },
  middleButton: {
    borderRadius: "0",
    margin: "0",
    position: "relative",
    padding: "6px",
    float: "left",
    "&:hover": {
      zIndex: 2
    }
  },
  lastButton: {
    borderTopLeftRadius: "0",
    borderBottomLeftRadius: "0",
    padding: "5px",
    margin: "0",
    "&:hover": {
      zIndex: 2
    }
  }
});

export default buttonGroupStyle;
