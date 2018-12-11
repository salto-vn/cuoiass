import * as React from "react";
import CONSTANT from '../../bootstrap/Constant';
import { IBookingSearchState, IBooking } from '../../interface/IBooking';
import CustomSelect from '../../common/FormControls/CustomSelect/CustomSelect';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import Card from '../../common/Card/Card';
import CardHeader from '../../common/Card/CardHeader';
import { createStyles, Theme, withStyles, Icon } from '@material-ui/core';
import CardBody from '../../common/Card/CardBody';
import { infoColor } from '../../../styles/material-dashboard-pro-react';
import CustomInput from '../../common/FormControls/CustomInput/CustomInput';
import CardFooter from '../../common/Card/CardFooter';
import Button from '../../common/FormControls/CustomButtons/Button';
import CustomDatePicker from '../../common/FormControls/CustomDatePicker/CustomDatePicker';
import { objectToQueryString, bookingStatusList, searchQueryStringToArray, isDateCorrectFormat } from '../../common/Utils';


const styles = (theme: Theme) => createStyles({
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: 300,
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    },
    cardSearchFooter: {
        alignSelf: "center"
    },
    description: {
        textAlign: "left"
    },
    modal: {
        width: "800px"
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
    icons: {
        marginLeft: theme.spacing.unit,
    },
});

class BookingSearchScreen extends React.Component<{ match: any, history: any, classes: any }, IBookingSearchState> {

    search = this.props.match.params.search;
    searchParams: IBooking = searchQueryStringToArray(this.search);
    
    searchForm = Object.assign({
        try_date: "",
        activate_date: "",
        booked_date: "",
        booked_cd: "",
        booked_pro_name: "",
        status: "",
        customer_name: ""
    }, this.searchParams);

    public state = {
        searchForm: this.searchForm
    }

    /**
     * Event usualy mount data to State variale
     */
    componentDidMount() {
        document.title = CONSTANT.PAGE_TITLE;
    }


    public render() {
        const { classes } = this.props;
        const { searchForm } = this.state;
        return (
            <>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="rose">
                                <h4 className={classes.cardTitleWhite}>Tìm kiếm Đơn hàng</h4>
                            </CardHeader>
                            <CardBody>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            labelText="Mã đơn hàng, lịch"
                                            id="booked_cd"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                name: "booked_cd",
                                                value: searchForm.booked_cd,
                                                onChange: this.onChange.bind(this, "booked_cd")
                                            }}

                                        />
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={8}>
                                        <CustomInput
                                            labelText="Tên sản phẩm"
                                            id="booked_pro_name"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                name: "booked_pro_name",
                                                value: searchForm.booked_pro_name,
                                                onChange: this.onChange.bind(this, "booked_pro_name")
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={8}>
                                        <CustomInput
                                            labelText="Tên khách hàng"
                                            id="customer_name"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                name: "customer_name",
                                                value: searchForm.customer_name,
                                                onChange: this.onChange.bind(this, "customer_name")
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <CustomDatePicker
                                            labelText="Ngày mua"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            prop={
                                                {
                                                    timeFormat: false,
                                                    onChange: this.onChange.bind(this, "booked_date"),
                                                    value: searchForm.booked_date
                                                }
                                            }
                                            inputProps={
                                                {
                                                    name: "booked_date",
                                                }
                                            }
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <CustomDatePicker
                                            labelText="Ngày xem"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            prop={
                                                {
                                                    timeFormat: false,
                                                    onChange: this.onChange.bind(this, "try_date"),
                                                    value: searchForm.try_date
                                                }
                                            }
                                            inputProps={
                                                {
                                                    name: "try_date",
                                                }
                                            }
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <CustomDatePicker
                                            labelText="Ngày nhận"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            prop={
                                                {
                                                    timeFormat: false,
                                                    onChange: this.onChange.bind(this, "activate_date"),
                                                    value: searchForm.activate_date,
                                                    dateFormat: "DD-MM-YYYY"
                                                }
                                            }
                                            inputProps={
                                                {
                                                    name: "activate_date",
                                                }
                                            }
                                        />
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomSelect
                                            labelText="Trạng thái"
                                            id="status"
                                            value={searchForm.status}
                                            onChange={this.onChange.bind(this, "status")}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                name: "status",

                                            }}
                                            items={bookingStatusList}
                                        />
                                    </GridItem>
                                </GridContainer>
                            </CardBody>
                            <CardFooter className={classes.cardSearchFooter}>
                                <Button color="rose" onClick={this.handleSubmit} >
                                    Tìm kiếm
                                    <Icon className={classes.icons}>search</Icon>
                                </Button>
                            </CardFooter>
                        </Card>
                    </GridItem>
                </GridContainer>
            </>
        );
    }

    /**
     * Search
     */
    private handleSubmit = (evt: any) => {
        const { searchForm } = this.state;
        const filters = objectToQueryString(searchForm);
        if (filters === "") {
            this.props.history.push("/booking/search/all");
            return;
        }
        this.props.history.push("/booking/search/" + filters);
        return;
    }

    /**
     * Set state for current date and callback filters
     * 
     * @param name: string of datepicker
     * @param date: any, selected date of datepicker
     * @callback onFilter
     * @return filters
     */
    onChange = (name: string, event: any) => {
        const { searchForm } = this.state;
        if (name == "try_date" || name == "booked_date" || name == "activate_date") {
            if (event._isValid !== undefined) { 
                searchForm[name] = event.format('DD-MM-YYYY');
            } else if (isDateCorrectFormat(event.trim(),'DD-MM-YYYY')) {
                searchForm[name] = event.trim();
            } else {
                searchForm[name] = "";
            }

        } else {
            searchForm[name] = event.target.value;
        }

        this.setState({
            searchForm,
        });
    }
}

export default withStyles(styles)(BookingSearchScreen)