import React from "react";
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
// @material-ui/icons
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
// core components
import customSelectStyle from "../../../../styles/components/customSelectStyle";
import { FormHelperText, Select, MenuItem } from '@material-ui/core';

export interface ICustomSelect {
  classes?: any,
  labelText?: string,
  labelProps?: Object,
  id?: string,
  inputProps?: any,
  formControlProps?: any,
  error?: boolean,
  success?: boolean,
  errorContent?: string,
  items: IOption[],
  onChange: any,
  value: string
}

export interface IOption {
  key: number;
  value: string;
}

class CustomSelect extends React.Component<ICustomSelect, {}> {

  public state = {
    selectedValue: this.props.value
  }

  public handleChange = (evt: any) => {
    this.setState({ selectedValue: evt.target.value })

    this.props.onChange(evt);
  }

  render() {
    const { items, inputProps, labelProps, id, formControlProps, classes, success, error, errorContent, labelText } = this.props;
    const labelClasses = classNames({
      [" " + classes.labelRootError]: error,
      [" " + classes.labelRootSuccess]: success && !error
    });
    const underlineClasses = classNames({
      [classes.underlineError]: error,
      [classes.underlineSuccess]: success && !error,
      [classes.underline]: true
    });
    return (
      
      <>
        <FormControl
          {...formControlProps}
          className={formControlProps.className + " " + classes.formControl}
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
            value={this.state.selectedValue}
            id={id}
            {...inputProps}
          >
            <MenuItem value="">
              <em key={0}>Chọn</em>
            </MenuItem>
            {items.map((option: IOption, i: any) => (
              <MenuItem key={option.key} value={option.key}>
                {option.value}
              </MenuItem>
            ))}
          </Select>
          {error ? (
            <Clear ref="errorIcon" className={classes.feedback + " " + classes.labelRootError} />
          ) : success ? (
            <Check className={classes.feedback + " " + classes.labelRootSuccess} />
          ) : null}
          {labelText !== undefined ? (
            <FormHelperText className={classes.error} id="component-error-text">{errorContent}</FormHelperText>
          ) : null}
        </FormControl>

      </>

    );
  }

}


export default withStyles(customSelectStyle)(CustomSelect);
