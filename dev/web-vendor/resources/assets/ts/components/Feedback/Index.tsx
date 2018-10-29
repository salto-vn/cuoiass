import * as React from 'react';
import { IFeedbackState, IFeedback } from '../../interface/IFeedback';
import { FeedbackModel } from '../../model/FeedbackModel';
import CONSTANT from '../../bootstrap/Constant';
import { Table } from '../../common/Grid/Table';

const subjectPage = 'Phản hồi của người dùng'; //Header Content page

/**
 * Feedback Screen Component
 * Display Feedback list data, include paging 
 * Properties: N/A
 * State: Required IFeedbackState , Optional another variale 
 */
export class Feedback extends React.Component<{}, IFeedbackState> {

    // inital state varialble using in this Component, 
    public state = {
        isLoading: false,
        itemRepeat: CONSTANT.ITEM_REPEAT,
        limit: CONSTANT.LIMIT,
        offset: CONSTANT.OFFSET,
        feedbackGrid: [],
        model: new FeedbackModel(),
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
        for (let i: number = 0; i < feedbackGrid.length; i++) {
            let item: IFeedback = feedbackGrid[i];
            let data: string[] = [String(i + 1), item.productId, item.productName, item.name, item.date, item.content, String(item.rate)];
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
                                    <button type="button" className="btn btn-success m-b-sm" >Add new row</button>
                                    <Table pageClicked={this.handlePageChange} headers={feedbacHeader} activePage={activePage} totalItem={totalItem} dataSet={listdata} limit={limit} isError={isError} isLoading={isLoading} errorInfo={errorInfo} desc='Feedback data' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    /**
     * Get Feedback data
     * Return: not need to return set to state is OK
     */
    private getListFeedback = async () => {

        this.setState({ isLoading: true });

        //TODO
        const sortIcon: string = 'fa fa-sort';
        // const sortIconDown: string = 'fas fa-sort-down';
        // const sortIconUp: string = 'fas fa-sort-up';
        const header = [
            { title: '#', className: ''},
            { title: 'MSP', className: sortIcon },
            { title: 'Tên sản phẩm', className: sortIcon },
            { title: 'Tên người dùng', className: sortIcon },
            { title: 'Ngày', className: sortIcon ,dataType:'date'},
            { title: 'Nội dung', className: sortIcon },
            { title: 'Tỷ lệ', className: sortIcon },
            { title: 'Actions', className: '' ,dataType:'none'}
        ];


        //TODO set request api offset, limit
        // const { offset, limit } = this.state;
        // Call api get Feedback 
        const responses = [

            {
                name: 'Ngo Tuan Anh2',
                email: 'ngoanh@mulodo.com',
                date: '2018-12-12',
                content: 'Review content, Good Job!,',
                images: ['', ''],
                rate: 4.5,
                productId: '00001',
                productName: 'Product Name A',
                customerId: '00002'
            },

            {
                name: 'Ngo Tuan Anh',
                email: 'ngoanh@mulodo.com',
                date: '2018-12-12',
                content: 'Review content, Good Job!,',
                images: ['', ''],
                rate: 4.5,
                productId: '00001',
                productName: 'Product Name A',
                customerId: '00002'
            },
            {
                name: 'Ngo Tuan Anh2',
                email: 'ngoanh@mulodo.com',
                date: '2018-12-12',
                content: 'Review content, Good Job!,',
                images: ['', ''],
                rate: 4.5,
                productId: '00001',
                productName: 'Product Name A',
                customerId: '00002'
            },
            {
                name: 'Ngo Tuan Anh3',
                email: 'ngoanh@mulodo.com',
                date: '2018-12-12',
                content: 'Review content, Good Job!,',
                images: ['', ''],
                rate: 4.5,
                productId: '00001',
                productName: 'Product Name A',
                customerId: '00002'
            },
            {
                name: 'Ngo Tuan Anh3',
                email: 'ngoanh@mulodo.com',
                date: '2018-12-12',
                content: 'Review content, Good Job!,',
                images: ['', ''],
                rate: 4.5,
                productId: '00001',
                productName: 'Product Name A',
                customerId: '00002'
            },
            {
                name: 'Ngo Tuan Anh3',
                email: 'ngoanh@mulodo.com',
                date: '2018-12-12',
                content: 'Review content, Good Job!,',
                images: ['', ''],
                rate: 4.5,
                productId: '00001',
                productName: 'Product Name A',
                customerId: '00002'
            },
            {
                name: 'Ngo Tuan Anh3',
                email: 'ngoanh@mulodo.com',
                date: '2018-12-12',
                content: 'Review content, Good Job!,',
                images: ['', ''],
                rate: 4.5,
                productId: '00001',
                productName: 'Product Name A',
                customerId: '00002'
            },
            {
                name: 'Ngo Tuan Anh3',
                email: 'ngoanh@mulodo.com',
                date: '2018-12-12',
                content: 'Review content, Good Job!,',
                images: ['', ''],
                rate: 4.5,
                productId: '00001',
                productName: 'Product Name A',
                customerId: '00002'
            },
            {
                name: 'Ngo Tuan Anh3',
                email: 'ngoanh@mulodo.com',
                date: '2018-12-12',
                content: 'Review content, Good Job!,',
                images: ['', ''],
                rate: 4.5,
                productId: '00001',
                productName: 'Product Name A',
                customerId: '00002'
            },
            {
                name: 'Ngo Tuan Anh3',
                email: 'ngoanh@mulodo.com',
                date: '2018-12-12',
                content: 'Review content, Good Job!,',
                images: ['', ''],
                rate: 4.5,
                productId: '00001',
                productName: 'Product Name A',
                customerId: '00002'
            }
        ];

        this.setState({
            feedbackGrid: responses,
            totalItem: 30,
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
            if (pageNumber === 1) {
                this.getListFeedback();
            } else if (pageNumber === 2) {
                const responses = [
                    {
                        name: 'Ngo Tuan Anh',
                        email: 'ngoanh@mulodo.com',
                        date: '2018-12-12',
                        content: 'Review content, Good Job!,',
                        images: ['', ''],
                        rate: 4.5,
                        productId: '00001',
                        productName: 'Product Name A',
                        customerId: '00002'
                    },
                    {
                        name: 'Ngo Tuan Anh2',
                        email: 'ngoanh@mulodo.com',
                        date: '2018-12-12',
                        content: 'Review content, Good Job!,',
                        images: ['', ''],
                        rate: 4.5,
                        productId: '00001',
                        productName: 'Product Name A',
                        customerId: '00002'
                    },
                ];
                this.setState({
                    feedbackGrid: responses,
                    totalItem: 30,
                    isLoading: false,
                });
            } else {
                this.setState({
                    feedbackGrid: [],
                    totalItem: 30,
                    isLoading: true,
                });
            }
        });
    }


}