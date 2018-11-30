import React from "react";
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
// @material-ui/icons
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
// core components
import customInputStyle from "../../../../styles/components/customInputStyle";
import { Popover, Typography, FormHelperText } from '@material-ui/core';

export interface ICustomInput {
  classes?: any,
  labelText?: string,
  labelProps?: Object,
  id: string,
  inputProps?: any,
  formControlProps?: any,
  error?: boolean,
  success?: boolean,
  errorContent?: string,
}

class CustomInput extends React.Component<ICustomInput, {}> {

  render() {
    const { inputProps, labelProps, id, formControlProps, classes, success, error, errorContent, labelText } = this.props;
    const labelClasses = classNames({
      [" " + classes.labelRootError]: error,
      [" " + classes.labelRootSuccess]: success && !error
    });
    const underlineClasses = classNames({
      [classes.underlineError]: error,
      [classes.underlineSuccess]: success && !error,
      [classes.underline]: true
    });
    const marginTop = classNames({
      [classes.marginTop]: labelText === undefined
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
          <Input
            classes={{
              root: marginTop,
              disabled: classes.disabled,
              underline: underlineClasses
            }}
            id={id}
            {...inputProps}

          />
          {error ? (
            <Clear ref="errorIcon"  className={classes.feedback + " " + classes.labelRootError} />
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


export default withStyles(customInputStyle)(CustomInput);
