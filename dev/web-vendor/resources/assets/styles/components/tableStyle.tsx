import {
  warningColor,
  primaryColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  defaultFont
} from "../material-dashboard-pro-react";
import { Theme, createStyles } from '@material-ui/core';

const tableStyle = (theme: Theme) => createStyles({
  
  header: {
    paddingTop:0,
    marginTop: 0,
    marginBottom: 0,
    paddingBottom: "5px",
    marginRight: "5px",
    borderTopStyle: "hidden",
    height: "35px",
    width: "90%"
  },
  dateTimeFilter: {
    position: "relative",
    bottom: "5px"
  },
  headerFilter: {
    width: "100%",
    marginTop: 0,
    fontSize: "12px",
    paddingBottom: 0,
  },
  headerRow: {
    height: "35px"
  },
  headerCell: {
    padding: "0px",
    margin: "0px",
  },

  
  button: {
    padding: 0,
    "&:hover": {
      color: primaryColor
    },
  },
  warningTableHeader: {
    color: warningColor
  },
  primaryTableHeader: {
    color: primaryColor
  },
  dangerTableHeader: {
    color: dangerColor
  },
  successTableHeader: {
    color: successColor
  },
  infoTableHeader: {
    color: infoColor
  },
  roseTableHeader: {
    color: roseColor
  },
  grayTableHeader: {
    color: grayColor
  },
  table: {
    marginBottom: "0",
    width: "100%",
    maxWidth: "100%",
    backgroundColor: "transparent",
    borderSpacing: "0",
    borderCollapse: "collapse"
  },
  tableHeadCell: {
    color: "inherit",
    ...defaultFont,
    fontSize: "1em" as '1em',
    fontWeight: "normal"
  },
  tableCell: {
    ...defaultFont,
    lineHeight: "1.42857143",
    padding: "12px 8px",
    verticalAlign: "middle",
    fontWeight: "normal"
  },
  tableCellAction: {
    width:"100px",
    padding:"0px !important"
  },
  tableResponsive: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  }
});

export default tableStyle;
