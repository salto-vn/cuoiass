import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";

// material-ui icons
import Menu from "@material-ui/icons/Menu";
import MoreVert from "@material-ui/icons/MoreVert";
import ViewList from "@material-ui/icons/ViewList";

// core components
import HeaderLinks from "./HeaderLinks";

import headerStyle from "../../../styles/components/headerStyle";
import Button from '../FormControls/CustomButtons/Button';

function Header({ ...props }) {
  function makeBrand() {
    var name = "";
    props.routes.map((prop: any, key: any) => {
      if (prop.collapse) {
        prop.views.map((prop: any, key: any) => {
          if (prop.path === props.location.pathname) {
            name = prop.name;
          }
          return name;
        });
      }
      if (prop.path === props.location.pathname) {
        name = prop.name;
      }
      return name;
    });
    if (name) {
      return name;
    } else {
      return "";
    }
  }
  const { classes, color, rtlActive } = props;
  const appBarClasses = cx({
    [" " + classes[color]]: color
  });
  const sidebarMinimize =
    classes.sidebarMinimize +
    " " +
    cx({
      [classes.sidebarMinimizeRTL]: rtlActive
    });
  const brand = makeBrand();


  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <Hidden smDown implementation="css">
          <div className={sidebarMinimize}>
            {props.miniActive ? (
              <Button
                justIcon
                round
                color="white"
                onClick={props.sidebarMinimize}
              >
                <ViewList className={classes.sidebarMiniIcon} />
              </Button>
            ) : (
                <Button
                  justIcon
                  round
                  color="white"
                  onClick={props.sidebarMinimize}
                >
                  <MoreVert className={classes.sidebarMiniIcon} />
                </Button>
              )}
          </div>
        </Hidden>
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          <Button href="#"
            className={classes.title} color="transparent">
            {brand}
          </Button>
        </div>
        <Hidden smDown implementation="css">
          <HeaderLinks />
        </Hidden>
        <Hidden mdUp implementation="css">
          <Button
            className={classes.appResponsive}
            color="transparent"
            justIcon
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </Button>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool
};

export default withStyles(headerStyle)(Header);
