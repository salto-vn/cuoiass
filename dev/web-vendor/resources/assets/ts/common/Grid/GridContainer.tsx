import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

const style = {
  grid: {
    margin: "0 -15px !important",
    width: "unset"
  }
};

export interface IGridContainer {
  classes: any,
  children?: any,
}

class GridContainer extends React.Component<IGridContainer, {}> {
  render() {
    const { classes, children, ...rest } = this.props;
    return (
      <Grid container {...rest} className={classes.grid}>
        {children}
      </Grid>
    );
  }

}

export default withStyles(style)(GridContainer);
