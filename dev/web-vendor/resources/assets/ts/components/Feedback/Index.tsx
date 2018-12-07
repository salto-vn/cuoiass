import * as React from 'react';
import { IFeedbackState, IFeedbackList } from '../../interface/IFeedback';
import CONSTANT from '../../bootstrap/Constant';
import * as HandleRequest from '../../api/HandleRequest';
import API_URL from '../../bootstrap/Url';
import { objectToQueryString } from '../../common/Utils';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import Card from '../../common/Card/Card';
import CardHeader from '../../common/Card/CardHeader';
import { infoColor } from '../../../styles/material-dashboard-pro-react';
import { Theme, createStyles, LinearProgress, withStyles, TablePagination } from '@material-ui/core';
import CardBody from '../../common/Card/CardBody';
import Table from '../../common/Table/Table';
import { IOption } from '../../common/FormControls/CustomSelect/CustomSelect';


const styles = (theme: Theme) => createStyles({
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
    headerButton: {
        position: "absolute",
        right: "10px",
        bottom: "20px"
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

/**
 * Feedback Screen Component
 * Display Feedback list data, include paging 
 * Properties: N/A
 * State: Required IFeedbackState , Optional another variale 
 */
class FeedbackScreen extends React.Component<{ history: any, classes: any }, IFeedbackState> {

    // inital state varialble using in this Component, 
    public state = {
        isLoading: false,
        limit: CONSTANT.LIMIT,
        feedbackGrid: [],
        isShowModal: false,
        totalItem: CONSTANT.TOTAL_COUNT,
        errorInfo: '',
        isErrorList: false,
        feedbacHeader: [],
        activePage: CONSTANT.CURRENT_PAGE,
        filters: CONSTANT.UNDEFINED,
        orderBy: 'review_id',
        order: 'desc',
    };

    /**
     * Event usualy mount data to State variale
     */
    public async componentDidMount() {
        document.title = CONSTANT.PAGE_TITLE;
        var reviewRateSource: IOption[] = [];
        //Convert Datajson to Array with last index id PK key.
        for (let i: number = 1; i <= 5; i++) {
            var option = {
                key: i.toString(),
                value: i.toString()
            };
            reviewRateSource.push(option);
        }
        
        //TODO
        const feedbacHeader = [
            { id: 'id', numeric: false, disablePadding: true, label: '#', type: 'none' },
            { id: 'filter_prd_cd', numeric: false, disablePadding: true, label: 'MSP', type: 'text' },
            { id: 'filter_booked_pro_name', numeric: false, disablePadding: true, label: 'Tên sản phẩm', type: 'text'},
            { id: 'filter_customer_name', numeric: false, disablePadding: true, label: 'Tên khách hàng', type: 'text' },
            { id: 'filter_review_date', numeric: false, disablePadding: true, label: 'Ngày', type: 'date' },
            { id: 'filter_review_content', numeric: false, disablePadding: true, label: 'Nội dung', type: 'text' },
            { id: 'filter_review_rate', numeric: false, disablePadding: true, label: 'Tỷ lệ', type: 'select', sources:reviewRateSource },
            { id: 'action', numeric: false, disablePadding: true, label: '' },
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
        const { feedbackGrid, totalItem, limit, orderBy, order, activePage, isLoading, feedbacHeader } = this.state;
        const { classes } = this.props;
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
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="primary">
                                <div className={classes.cardTitle}>
                                    <h4 className={classes.cardTitleWhite}>Danh sách đánh giá</h4>
                                    <span className={classes.cardCategoryWhite}>
                                        Đánh giá của khách hàng sau khi sử dụng dịch vụ
                                    </span>
                                    <div>
                                        {isLoading &&
                                            <LinearProgress classes={{
                                                colorPrimary: classes.linearColorPrimary,
                                                barColorPrimary: classes.linearBarColorPrimary,
                                            }} />
                                        }
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <Table hover={true}
                                    tableHeaderColor="primary"
                                    tableHead={feedbacHeader}
                                    tableData={listdata}
                                    onSort={this.handleSort}
                                    order={order}
                                    orderBy={orderBy}
                                    onFilter={this.handleFilter}
                                    onView={this.handleView}
                                    isLoading={isLoading}
                                />
                                <TablePagination
                                    rowsPerPageOptions={[10, 20, 50, 100]}
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

    public handleSort = (id: string) => {
        const orderBy = id;
        let order = 'desc';
        if (this.state.orderBy === id && this.state.order === 'desc') {
            order = 'asc';
        }
        
        
        return this.setState((prevState) => ({
            ...prevState, orderBy: orderBy, order: order
        }), () => {

            this.getListFeedback();
        });
    }

    private handleView = (feedbackId: number) => {
        this.props.history.push("/review/" + feedbackId);
    }


    /**
    * Set state for array filters and isCLickPaginate to make it paginate
    * @param filtes
    * 
    * @return Get list staff
    */
    private handleFilter = (filtes: any) => {
        const filters = objectToQueryString(filtes);
        this.setState({
            filters: filters ? filters : undefined,
        }, () => {
            this.getListFeedback();
        })
    }

    /**
     * Set state for limit
     * 
     * @event handleDisplayNoPage
     */
    private handleDisplayNoPage = (event: any) => {
        this.setState({ limit: event.target.value }, () => this.getListFeedback());
    }

    /**
     * Get Feedback data
     * Return: not need to return set to state is OK
     */
    private getListFeedback = async () => {
        this.setState({ isLoading: true });
        const { activePage, limit, orderBy, order, filters } = this.state;

        //TODO set request api page, limit
        // Call api get Feedback
        const response = await HandleRequest.GetList(API_URL.REVIEW, activePage + 1, limit, orderBy, order, filters);

        if (response.isError) {
            return this.setState({ isErrorList: response.isError, errorInfo: response.message });
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
    public handlePageChange = (event: any, pageNumber: number) => {
        const { activePage } = this.state;
        if (activePage === pageNumber) {
            return;
        }
        return this.setState((prevState) => ({
            ...prevState, activePage: pageNumber, isCLickPaginate: true
        }), () => {

            this.getListFeedback();
        });
    }
}

export default withStyles(styles)(FeedbackScreen);
