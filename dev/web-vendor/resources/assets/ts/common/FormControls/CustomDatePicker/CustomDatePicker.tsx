import React from "react";
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
// @material-ui/icons
// core components
import customDatePickerStyle from "../../../../styles/components/customDatePickerStyle";
import { FormHelperText } from '@material-ui/core';
import DateTime = require('react-datetime');
import { isEmpty } from '../../Utils';

export interface ICustomDatePicker {
  classes?: any,
  labelText?: string,
  labelProps?: Object,
  id?: string,
  inputProps?: any,
  formControlProps?: any,
  error?: boolean,
  success?: boolean,
  errorContent?: string,
  white?: boolean,
  inputRootCustomClasses?: any,
  helpText?: string,
  prop?: any,
  shrink?: boolean
}


class CustomDatePicker extends React.Component<ICustomDatePicker, { shrink: boolean, open:boolean }>{

  public state = {
    shrink: this.props.shrink || false,
    open: false,
  }

  handleFocusLabel = (e: any) => {
    this.setState({open: true, shrink: true })
  }

  handleBlurLabel = (e: any) => {
    if (e === "") {
      this.setState({open: false, shrink: false })
    }
    this.setState({open: false})

  }


  render() {
    const {
      classes,
      formControlProps,
      labelText,
      id,
      labelProps,
      inputProps,
      error,
      white,
      inputRootCustomClasses,
      success,
      helpText,
      prop
    } = this.props;

    const labelClasses = classNames({
      [" " + classes.labelRootError]: error,
      [" " + classes.labelRootSuccess]: success && !error
    });
    const underlineClasses = classNames({
      [classes.underlineError]: error,
      [classes.underlineSuccess]: success && !error,
      [classes.underline]: true,
      [classes.whiteUnderline]: white
    });
    const marginTop = classNames({
      [inputRootCustomClasses]: inputRootCustomClasses !== undefined
    });
    const inputClasses = classNames({
      [classes.input]: true,
      [classes.whiteInput]: white
    });
    var helpTextClasses = classNames({
      [classes.labelRootError]: error,
      [classes.labelRootSuccess]: success && !error
    });

    var formControlClasses;
    if (formControlProps !== undefined) {
      formControlClasses = classNames(
        formControlProps.className,
        classes.formControl
      );
    } else {
      formControlClasses = classes.formControl;
    }
    var helpTextClasses = classNames({
      [classes.labelRootError]: error,
      [classes.labelRootSuccess]: success && !error
    });
    return (
      <FormControl {...formControlProps} className={formControlClasses}>
        {labelText !== undefined ? (
          <InputLabel
            className={classes.labelRoot + " " + labelClasses}
            htmlFor={id}
            {...labelProps}
            shrink={!isEmpty(prop.value) ? true : this.state.shrink}
          >
            {labelText}
          </InputLabel>
        ) : null}
        <DateTime
          className={underlineClasses + " " + marginTop + " " + inputClasses}
          id={id}
          {...prop}
          onFocus={this.handleFocusLabel}
          onBlur={this.handleBlurLabel}
          
          inputProps={{
            ...inputProps,
          }}
        />
        {helpText !== undefined ? (
          <FormHelperText id={id + "-picker"} className={helpTextClasses + " " + classes.error}>
            {helpText}
          </FormHelperText>
        ) : null}
      </FormControl>
    );
  }

}

// CustomDatePicker.propTypes = {
//   classes: PropTypes.object.isRequired,
//   labelText: PropTypes.node,
//   labelProps: PropTypes.object,
//   id: PropTypes.string,
//   inputProps: PropTypes.object,
//   formControlProps: PropTypes.object,
//   inputRootCustomClasses: PropTypes.string,
//   error: PropTypes.bool,
//   success: PropTypes.bool,
//   white: PropTypes.bool,
//   helpText: PropTypes.node
// };

export default withStyles(customDatePickerStyle)(CustomDatePicker);
