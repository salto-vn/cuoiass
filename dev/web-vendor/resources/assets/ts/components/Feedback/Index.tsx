import * as React from 'react';
import { IFeedbackState, IFeedbackList } from '../../interface/IFeedback';
import CONSTANT from '../../bootstrap/Constant';
import { Table } from '../../common/Grid/Table';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSortUp } from '@fortawesome/free-solid-svg-icons'
import * as FeedbackApi  from '../../api/FeedbackApi';

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
        itemRepeat: CONSTANT.ITEM_REPEAT,
        limit: CONSTANT.LIMIT,
        offset: CONSTANT.OFFSET,
        feedbackGrid: [],
        isShowModal: false,
        totalItem: CONSTANT.TOTAL_COUNT,
        isError: false,
        errorInfo: '',
        feedbacHeader: [],
        activePage: CONSTANT.CURRENT_PAGE,
    };


    /**
     * Event usualy mount data to State variale
     */
    public async componentDidMount() {
        document.title = CONSTANT.PAGE_TITLE;
        this.getListFeedback();
    }


    /**
     * Render event will be run first time, 
     * on initial this Component 
     * Render view
     */
    public render() {
        const { feedbackGrid, isError, totalItem, limit, activePage, isLoading, errorInfo, feedbacHeader } = this.state;
        const listdata: Array<string[]> = new Array();

        //Convert Datajson to Array with last index id PK key.
        for (let i: number = 0; i < feedbackGrid.length; i++) {
            let item: IFeedbackList = feedbackGrid[i];
            //last index is PK KEY, assign to Action on row
            let data: string[] = [String(i + 1), item.prd_cd, item.booked_pro_name, item.first_name + item.last_name, item.review_date, item.review_content, String(item.review_rate), String(item.rreview_id)];
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
                                <div className="panel-heading flex justify-content-between align-items-center">
                                    <h4 className="panel-title">Danh sách phản hồi</h4>
                                </div>
                                <div className="panel-body">
                                    <Table
                                        pageClicked={this.handlePageChange}
                                        headers={feedbacHeader}
                                        activePage={activePage}
                                        totalItem={totalItem}
                                        dataSet={listdata}
                                        limit={limit} isError={isError}
                                        isLoading={isLoading} errorInfo={errorInfo}
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

    private handleSort = () => {
        console.log('Call API Sort');
    }

    private handleView = (feedbackId: number) => {
        this.props.history.push("/feedback/" + feedbackId);
    }

    private handleFilter = async (value: string) => {
        const sleep = (msec: number) => new Promise(resolve => setTimeout(resolve, msec));
        await sleep(3000)
        console.log('filter ' + value);
    }

    /**
     * Get Feedback data
     * Return: not need to return set to state is OK
     */
    private getListFeedback = async () => {

        this.setState({ isLoading: true });

        //TODO
        const sortIcon: string = 'sort';
        const header = [
            { id: 'id', title: '#', className: '', dataType: 'none', sortClass: sortIcon },
            { id: 'msp', title: 'MSP', className: 'col-sm-1', dataType: 'text', sortClass: sortIcon },
            { id: 'tsp', title: 'Tên sản phẩm', className: 'col-sm-2', dataType: 'text', sortClass: sortIcon },
            { id: 'tnd', title: 'Tên người dùng', dataType: 'text', className: 'col-sm-2', sortClass: sortIcon },
            { id: 'ngay', title: 'Ngày', className: 'col-sm-1', dataType: 'date', sortClass: sortIcon },
            { id: 'nd', title: 'Nội dung', className: 'col-md-auto', dataType: 'text', sortClass: sortIcon },
            { id: 'tl', title: 'Tỷ lệ', className: 'col-sm-1', dataType: 'text', sortClass: sortIcon },
            { id: '', title: 'Actions', className: 'col-md-auto', dataType: 'none', sortClass: sortIcon }
        ];


        const { offset, limit } = this.state;
        const response = await FeedbackApi.GetList('api/reviews', offset, limit);

        if (response.isError) {
            return this.setState({ isError: response.isError, errorInfo: response.message });
        }

        //TODO set request api offset, limit
        // const { offset, limit } = this.state;
        // Call api get Feedback 

        this.setState({
            feedbackGrid: response.data,
            totalItem: response.data.length,
            isLoading: false,
            feedbacHeader: header
        });

    }

    /**
     * Event handle Page change
     * Return: not need to return set to state is OK
     */
    private handlePageChange = (pageNumber: number) => {
        const { limit, activePage } = this.state;
        if (activePage === pageNumber) {
            return;
        }

        return this.setState((prevState) => ({
            ...prevState, activePage: pageNumber, offset: (pageNumber - 1) * limit
        }), () => {

            //TODO: Hard data waiting for api with request limit, offset, reponse
            this.getListFeedback();
        });
    }


}