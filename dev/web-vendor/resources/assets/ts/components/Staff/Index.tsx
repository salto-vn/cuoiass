import * as React from 'react';
import { IStaffState, IStaffList } from '../../interface/IStaff';
import { StaffModel } from '../../model/StaffModel';
import * as HandleRequest from '../../api/HandleRequest';
import CONSTANT from '../../bootstrap/Constant';
import APP_URL from '../../bootstrap/Url';
import { Table } from '../../common/Grid/Table';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSortUp } from '@fortawesome/free-solid-svg-icons'

library.add(faSortUp)

const subjectPage = 'Quản lý nhân viên'; //Header Content page

/**
 * Feedback Screen Component
 * Display Feedback list data, include paging 
 * Properties: N/A
 * State: Required IFeedbackState , Optional another variale 
 */
export class StaffScreen extends React.Component<{}, IStaffState> {

    // inital state varialble using in this Component, 
    public state = {
        staffGrid: [],
        model: new StaffModel(),
        isLoading: false,
        itemRepeat: CONSTANT.ITEM_REPEAT,
        limit: CONSTANT.LIMIT,
        offset: CONSTANT.OFFSET,
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
        const { staffGrid, isError, totalItem, limit, activePage, isLoading, errorInfo, feedbacHeader } = this.state;
        const listdata: Array<string[]> = new Array();

        //Convert Datajson to Array with last index id PK key.
        for (let i: number = 0; i < staffGrid.length; i++) {
            let item: IStaffList = staffGrid[i];
            //last index is PK KEY, assign to Action on row
            let data: string[] = [String(i + 1), item.staff_name, item.email, item.phone, item.address, item.role_name, item.role_code, item.system_code];
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
                                    <h4 className="panel-title">Danh sách nhân viên</h4>
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

    private handleView = (feedbackId: number) => {
    }

    private handleSort = () => {
        console.log('Call API Sort');
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

        const { offset, limit } = this.state;
        this.setState({ isLoading: true });

        //TODO
        const sortIcon: string = 'sort';
        const header = [
            { id: 'id', title: '#', className: '', dataType: 'none', sortClass: sortIcon },
            { id: 'staff_name', title: 'Tên nhân viên', className: 'col-sm-2', dataType: 'text', sortClass: sortIcon },
            { id: 'email', title: 'Email', className: 'col-sm-2', dataType: 'text', sortClass: sortIcon },
            { id: 'phone', title: 'Điện thoại', dataType: 'text', className: 'col-sm-2', sortClass: sortIcon },
            { id: 'address', title: 'Địa chỉ', className: 'col-sm-3', dataType: 'text', sortClass: sortIcon },
            { id: 'role_name', title: 'Quyền', className: 'col-sm-2', dataType: 'text', sortClass: sortIcon },
            { id: '', title: 'Actions', className: 'col-md-auto', dataType: 'none', sortClass: sortIcon }
        ];

        const response = await HandleRequest.GetList(APP_URL.STAFF, offset, limit);

        if (response.isError) {
            return this.setState({ isError: response.isError, errorInfo: response.message });
        }

        this.setState({
            staffGrid: response.result.data,
            totalItem: response.result.total,
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
            console.log('CALL API');
        });
    }
}