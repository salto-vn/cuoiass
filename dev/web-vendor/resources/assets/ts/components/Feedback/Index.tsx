import * as React from 'react';
import { IFeedbackState, IFeedbackList } from '../../interface/IFeedback';
import CONSTANT from '../../bootstrap/Constant';
import { Table, ITh } from '../../common/Grid/Table';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSortUp } from '@fortawesome/free-solid-svg-icons'
import * as HandleRequest from '../../api/HandleRequest';
import API_URL from '../../bootstrap/Url';
import { DisplayNoPage } from '../../common/Grid/DisplayNoPage';
import { objectToQueryString } from '../../common/Utils';
// import { objectToQueryString } from '../../common/Utils';

library.add(faSortUp)

const subjectPage = 'Phản hồi của người dùng'; //Header Content page

/**
 * Feedback Screen Component
 * Display Feedback list data, include paging 
 * Properties: N/A
 * State: Required IFeedbackState , Optional another variale 
 */
export class Feedback extends React.Component<{ history: any }, IFeedbackState> {

    // inital state varialble using in this Component, 
    public state = {
        isLoading: false,
        isCLickPaginate: false,
        limit: CONSTANT.LIMIT,
        feedbackGrid: [],
        isShowModal: false,
        totalItem: CONSTANT.TOTAL_COUNT,
        isError: false,
        errorInfo: '',
        feedbacHeader: [],
        activePage: CONSTANT.CURRENT_PAGE,
        sortbyc: 'review_id',
        sortby: 'asc',
        search: CONSTANT.UNDEFINED,
        sortedIndex: 0,
        pageRange: CONSTANT.PAGE_RANGE_DISPLAY
    };


    /**
     * Event usualy mount data to State variale
     */
    public async componentDidMount() {
        document.title = CONSTANT.PAGE_TITLE;
        //TODO
        const sortIcon: string = 'sort';
        var feedbacHeader = [
            { id: 'id', title: '#', className: '', dataType: 'none', sortClass: sortIcon },
            { id: 'msp', title: 'MSP', className: 'w100', dataType: 'text', sortClass: sortIcon },
            { id: 'tsp', title: 'Tên sản phẩm', className: 'w150', dataType: 'text', sortClass: sortIcon },
            { id: 'tnd', title: 'Tên người dùng', dataType: 'text', className: 'w150', sortClass: sortIcon },
            { id: 'ngay', title: 'Ngày', className: 'w100', dataType: 'date', sortClass: sortIcon },
            { id: 'nd', title: 'Nội dung', className: '', dataType: 'text', sortClass: sortIcon },
            { id: 'tl', title: 'Tỷ lệ', className: 'w100', dataType: 'text', sortClass: sortIcon },
            { id: '', title: 'Actions', className: 'w100', dataType: 'none', sortClass: sortIcon }
        ];
        this.setState({ feedbacHeader })
        this.getListFeedback();
    }


    /**
     * Render event will be run first time, 
     * on initial this Component 
     * Render view
     */
    public render() {
        const { feedbackGrid, isError, totalItem, limit, pageRange, activePage, isLoading, isCLickPaginate, errorInfo, feedbacHeader } = this.state;
        const listdata: Array<string[]> = new Array();

        //Convert Datajson to Array with last index id PK key.
        for (let i: number = 0; i < feedbackGrid.length; i++) {
            let item: IFeedbackList = feedbackGrid[i];
            //last index is PK KEY, assign to Action on row
            let reviewContent = item.review_content.substring(0, 60) + '...';
            let data: string[] = [String(item.review_id), item.prd_cd, item.booked_pro_name, item.first_name + " " + item.last_name, item.review_date, reviewContent, String(item.review_rate), String(item.review_id)];
            listdata.push(data);
        }
        return (
            <>
                <div className="page-title">
                    <h3 className="breadcrumb-header">{subjectPage}</h3>
                </div>
                <div id="main-wrapper">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel panel-white">
                                <div className="panel-heading flex justify-content-between align-items-center ">
                                    <span className="panel-title">Danh sách phản hồi: Có {totalItem} PH</span>
                                    <div>
                                        <DisplayNoPage
                                            onChange={this.handleDisplayNoPage}
                                            name={'perpage'}
                                            addClass={'w60 form-control'}
                                            options={[10, 20, 50, 100]}
                                            displayDefault={10}
                                            selectedValue={limit}
                                        />
                                    </div>
                                </div>
                                <div className="panel-body">
                                    <Table
                                        pageClicked={this.handlePageChange}
                                        headers={feedbacHeader}
                                        activePage={activePage}
                                        totalItem={totalItem}
                                        dataSet={listdata}
                                        limit={limit}
                                        pageRange={pageRange}
                                        isLoading={isLoading} isCLickPaginate={isCLickPaginate}
                                        isError={isError} errorInfo={errorInfo}
                                        desc='Feedback data' onSort={this.handleSort}
                                        canView={true}
                                        onView={this.handleView}
                                        filterFlag={true}
                                        onFilter={this.handleFilter}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    private handleSort = (key: any, index: any) => {
        const feedbacHeader: ITh[] = this.state.feedbacHeader;
        var sortClass = feedbacHeader[index].sortClass;
        const { sortedIndex } = this.state;
        feedbacHeader[sortedIndex].sortClass = "sort";
        switch (sortClass) {
            case "sort":
                feedbacHeader[index].sortClass = "sort-down"
                break;
            case "sort-up":
                feedbacHeader[index].sortClass = "sort-down"
                break;
            case "sort-down":
                feedbacHeader[index].sortClass = "sort-up"
                break;
            default:
                feedbacHeader[index].sortClass = "sort"
                break;
        }

        let sortbyc: string = "";
        let sortby: string = "";
        if ((sortClass == "sort") || (sortClass == "sort-up")) {
            sortby = 'asc';
        } else {
            sortby = 'desc';
        }

        // sortbyc = this.convertCol(key);

        return this.setState((prevState) => ({
            ...prevState, sortbyc: sortbyc, sortby: sortby, feedbacHeader: feedbacHeader, sortedIndex: index
        }), () => {

            this.getListFeedback();
        });
    }

    private handleView = (feedbackId: number) => {
        this.props.history.push("/feedback/" + feedbackId);
    }

    /**
    * Set state for array filters and isCLickPaginate to make it paginate
    * @param filtes
    * 
    * @return Get list staff
    */
    private handleFilter = (filtes: any) => {
        console.log(filtes);
        const search = objectToQueryString(filtes);
        console.log(search);
        this.setState({
            search, isCLickPaginate: false
        }, () => {
            this.getListFeedback();
        })
    }

    // private handleFilter = async (value: string, id: string) => {
    //     //search=email:abc@Gmai.com;ten:duy
    //     const search: string[] = this.state.search;
    //     const col: string = this.convertCol(id);
    //     var exitsFlag = true;
    //     search.forEach((item, index) => {
    //         if (item.indexOf(col) >= 0) {
    //             if (value === '') {
    //                 exitsFlag = false;
    //             }
    //             search.splice(index, 1);

    //         }
    //     });

    //     if (exitsFlag) {
    //         search.push(col + ":" + value);
    //     }

    //     return this.setState((prevState) => ({
    //         ...prevState, search: search
    //     }), () => {

    //         this.getListFeedback();
    //     });
    // }

    /**
     * Set state for limit
     * 
     * @event handleDisplayNoPage
     */
    private handleDisplayNoPage = (limit: number) => {
        this.setState({ limit }, () => this.getListFeedback());
    }

    /**
     * Get Feedback data
     * Return: not need to return set to state is OK
     */
    private getListFeedback = async () => {

        this.setState({ isLoading: true });

        const { activePage, limit, sortbyc, sortby, search } = this.state;


        //TODO set request api page, limit
        // Call api get Feedback

        const response = await HandleRequest.GetList(API_URL.REVIEW, activePage, limit, sortbyc, sortby, search);

        if (response.isError) {
            return this.setState({ isError: response.isError, errorInfo: response.message });
        }

        this.setState({
            feedbackGrid: response.result.data,
            totalItem: response.result.total,
            isLoading: false,
        });
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

            this.getListFeedback();
        });
    }

    // private convertCol = (id: string) => {
    //     var sortbyc;
    //     switch (id) {
    //         case "msp":
    //             sortbyc = "products.prd_cd";
    //             break;
    //         case "tsp":
    //             sortbyc = "bookings.booked_pro_name";
    //             break;
    //         case "tnd":
    //             sortbyc = "customers.first_name";
    //             break;
    //         case "ngay":
    //             sortbyc = "review_date";
    //             break;
    //         case "nd":
    //             sortbyc = "review_content";
    //             break;
    //         case "tl":
    //             sortbyc = "review_rate";
    //             break;
    //         default:
    //             sortbyc = "review_id";
    //             break;
    //     }

    //     return sortbyc;
    // }

}