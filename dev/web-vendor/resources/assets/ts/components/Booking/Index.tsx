import * as React from "react";
import CONSTANT from '../../bootstrap/Constant';
import { IBookingManagerState } from '../../interface/IBooking';
import { IOption } from '../../common/FormControls/CustomSelect/CustomSelect';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import Card from '../../common/Card/Card';
import CardHeader from '../../common/Card/CardHeader';
import { LinearProgress, createStyles, Theme, withStyles } from '@material-ui/core';
import CardBody from '../../common/Card/CardBody';
import { infoColor } from '../../../styles/material-dashboard-pro-react';
import CustomInput from '../../common/FormControls/CustomInput/CustomInput';
import CardFooter from '../../common/Card/CardFooter';
import DateTime = require('react-datetime');
import Button from '../../common/FormControls/CustomButtons/Button';
import CustomDatePicker from '../../common/FormControls/CustomDatePicker/CustomDatePicker';


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
});

class BookingSearchScreen extends React.Component<{ history: any, classes: any }, IBookingManagerState> {

    public state = {
        isError: false,
        isLoading: false,
        isClickPaginate: false,
        totalItem: CONSTANT.TOTAL_COUNT,
        limit: CONSTANT.LIMIT,
        activePage: CONSTANT.CURRENT_PAGE,
        pageRange: CONSTANT.PAGE_RANGE_DISPLAY,
        headers: [],
        dataSet: [],
        errorInfo: '',
        searchForm: {
            booked_id: 0,
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
        //TODO
        const sortIcon: string = 'sort';
        const statusList: IOption[] = [
            {
                key: "INPROGRESS",
                value: 'Đang xử lý'
            },
            {
                key: "ACCEPTED",
                value: 'Đã xác nhận'
            },
            {
                key: "PAID",
                value: 'Đã thanh toán'
            },
            {
                key: "CANCELLED",
                value: 'Đã huỷ lịch'
            },
            {
                key: "DENIED",
                value: 'Từ chối'
            },
            {
                key: "FINISHED",
                value: 'Hoàn thành'
            }

        ];

        var headers = [
            { id: 'id', title: '#', className: 'w30', dataType: 'none', sortClass: sortIcon, allowSort: false },
            { id: 'mbk', title: 'Mã lịch hẹn', className: 'w150', dataType: 'text', sortClass: sortIcon, allowSort: true },
            { id: 'tsp', title: 'Tên sản phẩm', className: 'w150', dataType: 'text', sortClass: sortIcon, allowSort: true },
            { id: 'ten_kh', title: 'Tên khách hàng', dataType: 'text', className: 'w150', sortClass: sortIcon, allowSort: true },
            { id: 'ngay_bk', title: 'Ngày đặt', className: 'w100', dataType: 'date', sortClass: sortIcon, allowSort: true },
            { id: 'ngay_thu', title: 'Ngày thử', className: 'w100', dataType: 'date', sortClass: sortIcon, allowSort: true },
            { id: 'ngay_lay', title: 'Ngày lấy', className: 'w100', dataType: 'date', sortClass: sortIcon, allowSort: true },
            { id: 'trang_thai', title: 'Trạng thái', className: 'w150', dataType: 'list', source: statusList, sortClass: sortIcon, allowSort: true },
            { id: '', title: 'Actions', className: 'w100', dataType: 'none', sortClass: sortIcon, allowSort: false }
        ];
        this.setState({ headers })
        this.getBookings();
    }


    public render() {
        const { totalItem, limit, headers, activePage, dataSet, searchForm, isLoading, isError, errorInfo } = this.state;
        const { classes } = this.props;
        const listdata: Array<string[]> = new Array();

        //Convert Datajson to Array with last index id PK key.
        for (let i: number = 0; i < dataSet.length; i++) {
            // let item: IFeedbackList = dataSet[i];
            // //last index is PK KEY, assign to Action on row
            // let reviewContent = item.review_content.substring(0, 60) + '...';
            // let data: string[] = [String(item.review_id), item.prd_cd, item.booked_pro_name, item.first_name + " " + item.last_name, item.review_date, reviewContent, String(item.review_rate), String(item.review_id)];
            // listdata.push(data);
        }
        return (
            <>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={8}>
                        <Card>
                            <CardHeader color="rose">
                                <h4 className={classes.cardTitleWhite}>Tìm kiếm</h4>
                                {isLoading &&
                                    <LinearProgress classes={{
                                        colorPrimary: classes.linearColorPrimary,
                                        barColorPrimary: classes.linearBarColorPrimary,
                                    }} />
                                }
                            </CardHeader>
                            <CardBody>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            labelText="Mã đơn, lịch"
                                            id="booked_cd"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                value: searchForm.booked_cd,
                                                name: "booked_cd",
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={10}>
                                        <CustomInput
                                            labelText="Tên sản phẩm"
                                            id="booked_pro_name"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                value: searchForm.booked_pro_name,
                                                name: "booked_pro_name",
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomDatePicker
                                            labelText="Ngày mua"
                                            prop={
                                                {
                                                    closeOnSelect: true,
                                                    timeFormat: false,
                                                }
                                            }
                                            inputProps={
                                                {
                                                    name: "booked_date",
                                                }
                                            }

                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <DateTime closeOnSelect
                                            timeFormat={false}
                                            inputProps={
                                                {
                                                    label: "Ngày xem",
                                                    name: "try_date",
                                                }
                                            }

                                        />
                                    </GridItem>
                                </GridContainer>
                            </CardBody>
                            <CardFooter>
                                <Button color="primary" onClick={this.handleSubmit} >
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

    }

    /**
     * Set state for limit
     * 
     * @event handleDisplayNoPage
     */
    private handleDisplayNoPage = (limit: number) => {
        this.setState({ limit }, () => this.getBookings());
    }

    private getBookings = () => {

    }

    /**
     * Set state for current date and callback filters
     * 
     * @param name: string of datepicker
     * @param date: any, selected date of datepicker
     * @callback onFilter
     * @return filters
     */
    onChangeDate = (event: any) => {
        const { searchForm } = this.state;
        searchForm.booked_date = event.target.value;
        this.setState({
            searchForm,
        });
    }
}

export default withStyles(styles)(BookingSearchScreen)