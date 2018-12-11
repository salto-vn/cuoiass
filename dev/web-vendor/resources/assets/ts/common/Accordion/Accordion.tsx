import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

// @material-ui/icons
import ExpandMore from "@material-ui/icons/ExpandMore";

import accordionStyle from "../../../styles/components/accordionStyle";

class Accordion extends React.Component<{ active?: any, classes: any, collapses: any }, {}> {
  public state = {
    active: this.props.active
  };

  handleChange = (expanded:any,panel: any , event: any) => {
    this.setState({
      active: expanded ? panel : -1
    });
  };

  render() {
    const { classes, collapses } = this.props;
    return (
      <div className={classes.root}>
        {collapses.map((prop:any, key:any) => {
          return (
            <ExpansionPanel
              expanded={this.state.active === key}
              onChange={this.handleChange.bind(this,this.state.active !== key, key)}
              key={key}
              classes={{
                root: classes.expansionPanel,
                expanded: classes.expansionPanelExpanded
              }}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMore />}
                classes={{
                  root: classes.expansionPanelSummary,
                  expanded: classes.expansionPanelSummaryExpaned,
                  content: classes.expansionPanelSummaryContent,
                  expandIcon: classes.expansionPanelSummaryExpandIcon
                }}
              >
                <h4 className={classes.title}>{prop.title}</h4>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                {prop.content}
              </ExpansionPanelDetails>
            </ExpansionPanel>
          );
        })}
      </div>
    );
  }
}


export default withStyles(accordionStyle)(Accordion);
