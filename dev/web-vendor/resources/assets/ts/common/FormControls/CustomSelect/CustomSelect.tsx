import React from "react";
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
// @material-ui/icons
// core components
import customSelectStyle from "../../../../styles/components/customSelectStyle";
import { FormHelperText, Select, MenuItem } from '@material-ui/core';
import { isEmpty } from '../../Utils';

export interface ICustomSelect {
  classes?: any,
  labelText?: string,
  labelProps?: Object,
  id?: string,
  inputProps?: any,
  formControlProps?: any,
  error?: boolean,
  success?: boolean,
  helpText?: string,
  items: IOption[],
  onChange?: any,
  value?: string,
}

export interface IOption {
  key: string;
  value: string;
}

class CustomSelect extends React.Component<ICustomSelect, {}> {

  public state = {
    selectedValue: this.props.value
  }

  public handleChange = (evt: any) => {

    this.setState({ selectedValue: evt.target.value })
    if (this.props.onChange === undefined) return;
    this.props.onChange(evt);
  }

  render() {
    const { items, inputProps, labelProps, id, formControlProps, classes, success, error, helpText, labelText } = this.props;
    const labelClasses = classNames({
      [" " + classes.labelRootError]: error,
      [" " + classes.labelRootSuccess]: success && !error
    });
    var helpTextClasses = classNames({
      [classes.labelRootError]: error,
      [classes.labelRootSuccess]: success && !error
    });

    return (

      <>
        <FormControl
          {...formControlProps}
          className={formControlProps.className + " " + classes.selectFormControl}
        >
          {labelText !== undefined ? (
            <InputLabel
              className={classes.labelRoot + labelClasses}
              htmlFor={id}
              {...labelProps}
            >
              {labelText}
            </InputLabel>
          ) : null}
          <Select
            onChange={this.handleChange}
            value={this.state.selectedValue === undefined ? '' : this.state.selectedValue}
            MenuProps={{
              className: classes.selectMenu
            }}
            id={id}
            {...inputProps}
            classes={{
              select: classes.select,
            }}
          >
            <MenuItem value=""
              classes={{
                root: classes.selectMenuItem,
                selected: classes.selectMenuItemSelected,
              }}>
              <em key={0}>Chọn</em>
            </MenuItem>
            {items.map((option: IOption, i: any) => (
              <MenuItem key={i} value={option.key == undefined ? i : option.key}
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}>
                {option.value}
              </MenuItem>
            ))}
          </Select>
          {!isEmpty(helpText) ? (
            <FormHelperText id={id + "-select"} className={helpTextClasses + " " + classes.error}>
              {helpText}
            </FormHelperText>
          ) : null}
        </FormControl>

      </>

    );
  }

}


export default withStyles(customSelectStyle)(CustomSelect);
