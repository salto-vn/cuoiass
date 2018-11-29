import * as React from "react";
import { BackButton } from '../../common/FormControls/BackButton';
import { DisplayNoPage } from '../../common/Grid/DisplayNoPage';
import { Table, ITh, IOption } from '../../common/Grid/Table';
import CONSTANT from '../../bootstrap/Constant';
import Input from '../../common/FormControls/Input';
import DatePicker from 'react-date-picker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



export class Booking extends React.Component<{ history: any }, {}> {

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
                id: "INPROGRESS",
                title: 'Đang xử lý'
            },
            {
                id: "ACCEPTED",
                title: 'Đã xác nhận'
            },
            {
                id: "PAID",
                title: 'Đã thanh toán'
            },
            {
                id: "CANCELLED",
                title: 'Đã huỷ lịch'
            },
            {
                id: "DENIED",
                title: 'Từ chối'
            },
            {
                id: "FINISHED",
                title: 'Hoàn thành'
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
        const calIcon = <FontAwesomeIcon icon="calendar-alt" />
        const clearIcon = <FontAwesomeIcon icon="times" />;
        return (
            <>
                <div className="page-title">
                    <span className="breadcrumb-header"></span>
                    <BackButton history={this.props.history} />
                </div>
                <div id="main-wrapper">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel panel-white">
                                <div className="panel-heading flex justify-content-between align-items-center ">
                                    <span className="panel-title">Tìm kiếm</span>
                                </div>
                                <div className="panel-body ">
                                    <form className="form-inline">
                                        <div className="row">
                                            <div className="form-group col-md-6 col-sm-12 h85">
                                                <Input label={'Mã lịch hẹn'} name={'booked_cd'} type={'text'} required={true} value={''} />
                                            </div>
                                            {/* <div className="form-group col-md-6">
                                            <Select
                                                name={'album_id'}
                                                options={this.state.source}
                                                value={model.role_id}
                                                placeholder={false}
                                                getValue={this.handleSelect}
                                                label='Transport'
                                                addClass='form-control' />
                                        </div> */}
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-md-6 col-sm-12 h85">
                                                <Input label={'Tên sản phẩm'} name={'booked_pro_name'} type={'text'} required={true} value={''} />
                                            </div>
                                            <div className="form-group col-md-6 col-sm-12  h85">
                                                <Input label={'Tên khách hàng'} name={'customer_name'} type={'text'} required={true} value={''} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-md-6 col-sm-12  h85">
                                                <DatePicker className="form-control react-date-picker-header"
                                                        name="booked_date"
                                                        clearIcon={clearIcon}
                                                        calendarIcon={calIcon}
                                                        onChange={this.onChangeDate}
                                                        value={this.state.date}
                                                    />
                                                <Input label={'Ngày đặt'} name={'booked_date'} required={false} type={'text'} value={''} />
                                            </div>
                                            <div className="form-group col-md-6 col-sm-12  h85">
                                                <Input label={'Ngày thử'} name={'try_date'} required={false} type={'text'} value={''} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-md-12 h85">
                                                <Input label={'Địa chỉ'} name={'address'} type={'text'} required={false} value={''} />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel panel-white">
                                <div className="panel-heading flex justify-content-between align-items-center ">
                                    <span className="panel-title">Danh sách lịch hẹn: Có {totalItem} </span>
                                    <div>
                                        <DisplayNoPage
                                            onChange={this.handleDisplayNoPage}
                                            name={'perpage'}
                                            addClass={'w60 form-control pd6'}
                                            options={[10, 20, 50, 100]}
                                            displayDefault={10}
                                            selectedValue={limit}
                                        />
                                    </div>
                                </div>
                                <div className="panel-body">
                                    <Table
                                        pageClicked={this.handlePageChange}
                                        headers={headers}
                                        activePage={activePage}
                                        totalItem={totalItem}
                                        dataSet={listdata}
                                        limit={limit}
                                        pageRange={pageRange}
                                        isLoading={isLoading} isCLickPaginate={isClickPaginate}
                                        isError={isError} errorInfo={errorInfo}
                                        desc='Feedback data' onSort={this.handleSort}
                                        canView={false}
                                        // onView={this.handleView}
                                        canEdit={false}
                                        canDelete={false}
                                        filterFlag={false}
                                    // onFilter={this.handleFilter}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
    onChangeDate = (date: any) => {
        const d = new Date(date);

        if (d.getFullYear() === 1970) {
            return;
        }

        this.setState({
            date,
        });
    }
}