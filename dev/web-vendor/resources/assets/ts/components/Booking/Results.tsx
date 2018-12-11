import * as React from "react";
import CONSTANT from '../../bootstrap/Constant';
import { IBooking, IBookingResultState } from '../../interface/IBooking';
import * as HandleRequest from '../../api/HandleRequest';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import Card from '../../common/Card/Card';
import CardHeader from '../../common/Card/CardHeader';
import { LinearProgress, createStyles, Theme, withStyles, FormLabel, TablePagination } from '@material-ui/core';
import CardBody from '../../common/Card/CardBody';
import { infoColor } from '../../../styles/material-dashboard-pro-react';
import { getStatus, searchQueryStringToArray, isEmpty, } from '../../common/Utils';

import Accordion from '../../common/Accordion/Accordion';
import Table from '../../common/Table/Table';
import API_URL from '../../bootstrap/Url';


const styles = (theme: Theme) => createStyles({
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
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
    labelHorizontal: {
        color: "rgba(0, 0, 0, 0.26)",
        fontSize: "14px",
        lineHeight: "1.428571429",
        fontWeight: 400,
        marginRight: "0",
        "@media (min-width: 992px)": {
            float: "right"
        }
    },

    valueHorizontal: {
        fontSize: "14px",
        lineHeight: "1.428571429",
        fontWeight: 400,
        marginRight: "0",
        "@media (min-width: 992px)": {
            float: "left"
        }
    },

    backLink :{
        color: infoColor
    },

    status: {
        textTransform: "uppercase"
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

class BookingSearchResultScreen extends React.Component<{ history: any, classes: any, match: any }, IBookingResultState> {

    abortControler = new AbortController();

    public state = {
        isLoading: false,
        limit: CONSTANT.LIMIT,
        datas: [],
        isShowModal: false,
        totalItem: CONSTANT.TOTAL_COUNT,
        errorInfo: '',
        isErrorList: false,
        headers: [],
        activePage: CONSTANT.CURRENT_PAGE,
        filters: CONSTANT.UNDEFINED,
        orderBy: 'booked_cd',
        order: 'desc',
        searchForm: {
            booked_id: "",
            try_date: "",
            activate_date: "",
            booked_date: "",
            booked_cd: "",
            booked_pro_name: '',
            status: '',
            customer_name: ''
        }
    }

    /**
     * Event usualy mount data to State variale
     */
    public async componentDidMount() {
        document.title = CONSTANT.PAGE_TITLE;
        const headers = [
            { id: 'id', numeric: false, disablePadding: true, label: '#' },
            { id: 'booked_cd', numeric: false, disablePadding: true, label: 'Mã đơn hàng' },
            { id: 'booked_pro_name', numeric: false, disablePadding: true, label: 'Tên sản phẩm' },
            { id: 'customer_name', numeric: false, disablePadding: true, label: 'Tên khách hàng' },
            { id: 'booked_date', numeric: false, disablePadding: true, label: 'Ngày mua' },
            { id: 'activate_date', numeric: false, disablePadding: true, label: 'Ngày nhận' },
            { id: 'status', numeric: false, disablePadding: true, label: 'Trạng thái' },
            { id: 'action', numeric: false, disablePadding: true, label: '' },
        ];
        this.setState({ headers });

        //get Request param
        var searchs = this.props.match.params.search;
        this.setState({
            filters: searchs ? searchs : undefined,
        }, () => {
            this.getBookings();
        })

    }

    public componentWillUnmount() {
        this.abortControler.abort();
    }



    public render() {

        const { datas, totalItem, limit, orderBy, order, activePage, isLoading, headers } = this.state;

        const { classes } = this.props;
        const listdata: Array<string[]> = new Array();
        //Convert Datajson to Array with last index id PK key.
        for (let i: number = 0; i < datas.length; i++) {
            let item: IBooking = datas[i];
            //last index is PK KEY, assign to Action on row
            var status: any = getStatus(item.status);
            let data: string[] = [String(i + 1), item.booked_cd, item.booked_pro_name, item.first_name + " " + item.last_name, item.booked_date, item.activate_date, status, String(item.booked_cd)];
            listdata.push(data);
        }
        var searchs = this.props.match.params.search;
        var searchParams: IBooking = searchQueryStringToArray(searchs);
        const contentFilter = <>
            {!isEmpty(searchParams.booked_cd) &&
                <GridContainer>
                    <GridItem xs={12} sm={4} md={2}>
                        <FormLabel className={classes.labelHorizontal}>
                            Mã đơn hàng
                </FormLabel>
                    </GridItem>
                    <GridItem xs={12} sm={8} md={10}>
                        <FormLabel className={classes.valueHorizontal}>
                            {searchParams.booked_cd}
                        </FormLabel>
                    </GridItem>
                </GridContainer>
            }
            {!isEmpty(searchParams.booked_pro_name) &&
                <GridContainer>
                    <GridItem xs={12} sm={4} md={2}>
                        <FormLabel className={classes.labelHorizontal}>
                            Tên sản phẩm
                </FormLabel>
                    </GridItem>
                    <GridItem xs={12} sm={8} md={10}>
                        <FormLabel className={classes.valueHorizontal}>
                            {searchParams.booked_pro_name}
                        </FormLabel>
                    </GridItem>
                </GridContainer>
            }
            {!isEmpty(searchParams.customer_name) &&
                <GridContainer>
                    <GridItem xs={12} sm={4} md={2}>
                        <FormLabel className={classes.labelHorizontal}>
                            Tên khách hàng
                        </FormLabel>
                    </GridItem>
                    <GridItem xs={12} sm={8} md={10}>
                        <FormLabel className={classes.valueHorizontal}>
                            {searchParams.customer_name}
                        </FormLabel>
                    </GridItem>
                </GridContainer>}
            <GridContainer>
                {!isEmpty(searchParams.booked_date) && <>
                    <GridItem xs={12} sm={4} md={2}>
                        <FormLabel className={classes.labelHorizontal}>
                            Ngày mua
                        </FormLabel>
                    </GridItem>
                    <GridItem xs={12} sm={8} md={2}>
                        <FormLabel className={classes.valueHorizontal}>
                            {searchParams.booked_date}
                        </FormLabel>
                    </GridItem></>
                }
                {!isEmpty(searchParams.try_date) && <>
                    <GridItem xs={12} sm={4} md={2}>
                        <FormLabel className={classes.labelHorizontal}>
                            Ngày xem
                        </FormLabel>
                    </GridItem>
                    <GridItem xs={12} sm={8} md={2}>
                        <FormLabel className={classes.valueHorizontal}>
                            {searchParams.try_date}
                        </FormLabel>
                    </GridItem>
                </>}
                {!isEmpty(searchParams.activate_date) && <>
                    <GridItem xs={12} sm={4} md={2}>
                        <FormLabel className={classes.labelHorizontal}>
                            Ngày nhận
                        </FormLabel>
                    </GridItem>
                    <GridItem xs={12} sm={8} md={2}>
                        <FormLabel className={classes.valueHorizontal}>
                            {searchParams.activate_date}
                        </FormLabel>
                    </GridItem></>}
            </GridContainer>
            {!isEmpty(searchParams.status) &&
                <GridContainer>
                    <GridItem xs={12} sm={4} md={2}>
                        <FormLabel className={classes.labelHorizontal}>
                            Trạng thái
                        </FormLabel>
                    </GridItem>
                    <GridItem xs={12} sm={8} md={10}>
                        <FormLabel className={classes.valueHorizontal + " " + classes.status}>
                            {getStatus(searchParams.status)}
                        </FormLabel>
                    </GridItem>
                </GridContainer>}
            <GridContainer>
                <GridItem xs={false} sm={10} md={10}>
                    <FormLabel className={classes.labelHorizontal}>
                    </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={2} md={2}>
                    <FormLabel className={classes.valueHorizontal }>
                        <a href="#back" className={classes.backLink} onClick={() => {
                            var params = this.props.history.location.pathname.split("/");
                            var param = params[params.length - 1];
                            this.props.history.push("/" + params[params.length - 3] + "/" + param)
                        }}>Sửa điều kiện</a>
                    </FormLabel>
                </GridItem>
            </GridContainer>
        </>;

        return (
            <>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="primary">
                                <h4 className={classes.cardTitleWhite}>Tìm kiếm đơn hàng</h4>
                                {isLoading &&
                                    <LinearProgress classes={{
                                        colorPrimary: classes.linearColorPrimary,
                                        barColorPrimary: classes.linearBarColorPrimary,
                                    }} />
                                }
                            </CardHeader>
                            <CardBody>
                                <Accordion
                                    active={0}
                                    collapses={[
                                        {
                                            title: "Điều kiện",
                                            content: contentFilter
                                        },
                                    ]}
                                />

                                <Table hover={true}
                                    tableHeaderColor="primary"
                                    tableHead={headers}
                                    tableData={listdata}
                                    onSort={this.handleSort}
                                    order={order}
                                    orderBy={orderBy}
                                    onView={this.handleView}
                                    isLoading={isLoading}
                                />
                                <TablePagination
                                    rowsPerPageOptions={CONSTANT.PAGE_PULLDOWN}
                                    component="div"
                                    count={totalItem}
                                    rowsPerPage={limit}
                                    page={activePage}
                                    backIconButtonProps={{
                                        'aria-label': 'Previous Page',
                                    }}
                                    nextIconButtonProps={{
                                        'aria-label': 'Next Page',
                                    }}
                                    onChangePage={this.handlePageChange}
                                    onChangeRowsPerPage={this.handleDisplayNoPage}
                                />
                            </CardBody>
                        </Card>
                    </GridItem>

                </GridContainer>
            </>
        );
    }



    /**
     * Set state for limit
     * @param event  
     * @event handleDisplayNoPage
     */
    private handleDisplayNoPage = (event: any) => {
        this.setState({ limit: event.target.value }, () => this.getBookings());
    }


    /**
    * Event handle Page change
    * @param event 
    * @param pageNumber
    * @event handlePageChange
    * @return not need to return set to state is OK
    */
    public handlePageChange = (event: any, pageNumber: number) => {
        const { activePage } = this.state;
        if (activePage === pageNumber) {
            return;
        }
        return this.setState((prevState) => ({
            ...prevState, activePage: pageNumber, isCLickPaginate: true
        }), () => {

            this.getBookings();
        });
    }

    /**
     * Event open detail a Booking
     * @param id:number booking code
     */
    private handleView = (id: number) => {
        this.props.history.push("/booking/detail/" + id);
    }


    /**
     * Sort list
     * @param id:string sort column name
     */
    private handleSort = (id: string) => {
        const orderBy = id;
        let order = 'desc';
        if (this.state.orderBy === id && this.state.order === 'desc') {
            order = 'asc';
        }


        return this.setState((prevState) => ({
            ...prevState, orderBy: orderBy, order: order
        }), () => {

            this.getBookings();
        });
    }

    private getBookings = async () => {
        this.setState({ isLoading: true });

        const { activePage, limit, orderBy, order, filters } = this.state;
        const signal = this.abortControler.signal;
        //TODO set request api page, limit
        // Call api get bookings
        const response = await HandleRequest.GetList(API_URL.BOOKING, activePage + 1, limit, orderBy, order, filters, signal);
        if (response.isError) {
            return this.setState({ isErrorList: response.isError, errorInfo: response.message });
        }

        this.setState({
            datas: response.result.data,
            totalItem: response.result.total,
            isLoading: false,
        });

    }



}

export default withStyles(styles)(BookingSearchResultScreen)