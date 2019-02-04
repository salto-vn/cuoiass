import React from 'react';
import Icon from '@material-ui/core/Icon';
import { Theme, createStyles, withStyles } from '@material-ui/core';
import { warningColor } from '../../../styles/material-dashboard-pro-react';


const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    icon: {
        color: warningColor
    },
    iconHoverSelect: {
        '&:hover': {
            color: warningColor,
            cursor: "pointer"
        },
        color: warningColor,
    },
    iconHover: {
        '&:hover': {
            color: warningColor,
            cursor: "pointer"
        },
    },
});


export interface StartRateState {
    value: number
}

class StarRate extends React.Component<{ disabled: boolean, value: number, classes?: any, size?: any }, StartRateState>{

    public state = {
        value: this.props.value
    }


    private handleClick = (e: any) => {
        const star = e.target.getAttribute('data-index');
        debugger;
        this.setState({
            value: star
        })
    }


    render() {
        const stars = [];
        const value = this.state.value;
        const { disabled, classes, size } = this.props;
        for (let index = 1; index <= 5; index++) {
            if (value >= index) {
                if (disabled) {
                    const element = <Icon key={index} fontSize={size !== undefined ? size : "default"} className={classes.icon}>star_rate</Icon>;
                    stars.push(element);
                } else {
                    const element = <Icon key={index} fontSize={size !== undefined ? size : "default"} data-index={index} className={classes.iconHoverSelect} onClick={this.handleClick}>star_rate</Icon>;
                    stars.push(element);
                }

            } else {
                if (disabled) {
                    const element = <Icon key={index} fontSize={size !== undefined ? size : "default"} color="disabled">star_rate</Icon>;
                    stars.push(element);
                } else {
                    const element = <Icon key={index} fontSize={size !== undefined ? size : "default"} data-index={index} className={classes.iconHover} color="disabled" onClick={this.handleClick}>star_rate</Icon>;
                    stars.push(element);
                }
            }
        }
        return <>{stars}</>;

    }

}

export default withStyles(styles)(StarRate)