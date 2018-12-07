import * as React from "react";
import { BackButton } from '../../common/FormControls/BackButton';
import { DisplayNoPage } from '../../common/Grid/DisplayNoPage';
import CONSTANT from '../../bootstrap/Constant';
import TextField from '@material-ui/core/TextField';
import { IBookingManagerState } from '../../interface/IBooking';
import { IOption } from '../../common/FormControls/CustomSelect/CustomSelect';

export class BookingScreen extends React.Component<{ history: any }, IBookingManagerState> {
    
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
        sortedIndex: 0,
        searchForm: { 
            booked_id: 0,
            try_date: "",
            activate_date: "",
            booked_date: "",
            booked_cd: "",
            booked_pro_name: '',
            status: '',
            customer_name: ''} 
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
        const { totalItem, limit, headers, activePage, dataSet, pageRange, isLoading, isClickPaginate, isError, errorInfo } = this.state;
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
                                <CardHeader color="primary">
                                    <h4 className={classes.cardTitleWhite}>{modalTitle}</h4>
                                    <p className={classes.cardCategoryWhite}>Chỉnh sửa thông tin tài khoản</p>
                                    {isLoading &&
                                    <LinearProgress classes={{
                                        colorPrimary: classes.linearColorPrimary,
                                        barColorPrimary: classes.linearBarColorPrimary,
                                    }} />
                                }
                                </CardHeader>
                                <CardBody>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <CustomSelect
                                                labelText="Quyền"
                                                id="role_id"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                value={model.role_id}
                                                onChange={this.handleChange.bind(this, true)}
                                                errorContent={showError(clientError, errorInfo, 'role_id')}
                                                error={showError(clientError, errorInfo, 'role_id') == '' ? false : true}
                                                inputProps={{
                                                    name: "role_id",

                                                }}
                                                items={roleSource}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <CustomInput
                                                labelText="Họ và Tên"
                                                id="staff_name"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                errorContent={showError(clientError, errorInfo, 'staff_name')}
                                                error={showError(clientError, errorInfo, 'staff_name') == '' ? false : true}
                                                inputProps={{
                                                    value: model.staff_name,
                                                    name: "staff_name",
                                                    onChange: this.handleChange.bind(this, true),
                                                }}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <CustomInput
                                                labelText="Email"
                                                id="email"
                                                errorContent={showError(clientError, errorInfo, 'email')}
                                                error={showError(clientError, errorInfo, 'email') == '' ? false : true}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    value: model.email,
                                                    name: "email",
                                                    onChange: this.handleChange.bind(this, true),
                                                }}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <CustomInput
                                                labelText="Điện thoại"
                                                id="phone"
                                                errorContent={showError(clientError, errorInfo, 'phone')}
                                                error={showError(clientError, errorInfo, 'phone') == '' ? false : true}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    value: model.phone ? model.phone : '',
                                                    name: "phone",
                                                    onChange: this.handleChange.bind(this, false),
                                                }}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <CustomInput
                                                labelText="Mật khẩu"
                                                id="password"
                                                errorContent={showError(clientError, errorInfo, 'password')}
                                                error={showError(clientError, errorInfo, 'password') == '' ? false : true}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    value: model.password,
                                                    name: "password",
                                                    type: 'password',
                                                    onChange: this.handleChange.bind(this, true),
                                                }}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <CustomInput
                                                labelText="Địa chỉ"
                                                id="address"
                                                errorContent={showError(clientError, errorInfo, 'address')}
                                                error={showError(clientError, errorInfo, 'address') == '' ? false : true}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    value: model.address ? model.address : '',
                                                    type: 'text',
                                                    name: 'address',
                                                    onChange: this.handleChange.bind(this, false),
                                                }}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                </CardBody>
                                <CardFooter>
                                    {isSubmitDisabled ?
                                        <Button color="primary" onClick={this.handleSubmit} disabled>
                                            {isCreate ? "Tạo" : "Lưu"}
                                        </Button>
                                        :
                                        <Button color="primary" onClick={this.handleSubmit} >
                                            {isCreate ? "Tạo" : "Lưu"}
                                        </Button>
                                    }
                                </CardFooter>
                            </Card>
                        </GridItem>
                    </GridContainer>
            </>
        );
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
     * Event handle Page change
     * Return: not need to return set to state is OK
     */
    private handlePageChange = (pageNumber: number) => {
        const { activePage } = this.state;
        if (activePage === pageNumber) {
            return;
        }
        return this.setState((prevState) => ({
            ...prevState, activePage: pageNumber
        }), () => {

            this.getBookings();
        });
    }

    private handleSort = (key: any, index: any) => {
        const bookingHeaders: ITh[] = this.state.headers;
        let sortClass = bookingHeaders[index].sortClass;
        const { sortedIndex } = this.state;

        bookingHeaders[sortedIndex].sortClass = "sort";
        switch (sortClass) {
            case "sort":
                bookingHeaders[index].sortClass = "sort-down"
                break;
            case "sort-up":
                bookingHeaders[index].sortClass = "sort-down"
                break;
            case "sort-down":
                bookingHeaders[index].sortClass = "sort-up"
                break;
            default:
                bookingHeaders[index].sortClass = "sort"
                break;
        }

        let sortby: string = "";
        if ((sortClass === "sort") || (sortClass === "sort-up")) {
            sortby = 'asc';
        } else {
            sortby = 'desc';
        }

        return this.setState((prevState) => ({
            ...prevState, sortbyc: key, sortby: sortby, headers: bookingHeaders, sortedIndex: index
        }), () => {

            this.getBookings();
        });
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
        const {searchForm} = this.state;
        searchForm.booked_date = event.target.value;
        this.setState({
            searchForm,
        });
    }
}