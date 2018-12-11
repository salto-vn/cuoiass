import * as React from "react";
import CONSTANT from '../../bootstrap/Constant';
import { withStyles, createStyles, LinearProgress } from '@material-ui/core';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import Card from '../../common/Card/Card';
import CardHeader from '../../common/Card/CardHeader';
import { infoColor } from '../../../styles/material-dashboard-pro-react';
import CardBody from '../../common/Card/CardBody';

const styles = () => createStyles(
    {
        cardCategoryWhite: {
            "&,& a,& a:hover,& a:focus": {
                color: "rgba(255,255,255,.62)",
                margin: "0",
                fontSize: "14px",
                marginTop: "0",
                marginBottom: "0",
            },
            "& a,& a:hover,& a:focus": {
                color: "#FFFFFF"
            }
        },
        cardTitleWhite: {
            color: "#FFFFFF",
            marginTop: "0px",
            minHeight: "auto",
            fontWeight: 300,
            fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
            marginBottom: "3px",
            textDecoration: "none",
            "& small": {
                color: "#777",
                fontSize: "65%",
                fontWeight: 400,
                lineHeight: "1"
            }
        },
        progress: {
            color: infoColor
        },
        linearColorPrimary: {
            backgroundColor: '#FFFFFF',
        },
        linearBarColorPrimary: {
            backgroundColor: infoColor,
        },
    }
);

class DetailBookingScreen extends React.Component<{ classes: any }, {}> {

    public state = {
        isLoading: true
    }

    componentDidMount() {
        document.title = CONSTANT.PAGE_TITLE;
    }

    render() {
        const { classes } = this.props;
        const { isLoading } = this.state;
        return (
            <>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="primary">
                                <h4 className={classes.cardTitleWhite}>Đơn hàng: AAAAAA</h4>
                                <div className={classes.cardCategoryWhite}>Chi tiết thông tin đơn hàng</div>
                                <div>
                                    {isLoading &&
                                        <LinearProgress classes={{
                                            colorPrimary: classes.linearColorPrimary,
                                            barColorPrimary: classes.linearBarColorPrimary,
                                        }} />
                                    }
                                </div>
                            </CardHeader>
                            <CardBody>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>

                                    </GridItem>
                                </GridContainer>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </>
        );
    }
}

export default withStyles(styles)(DetailBookingScreen)