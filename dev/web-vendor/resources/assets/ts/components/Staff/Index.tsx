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
        isShowModal: false,
        totalItem: CONSTANT.TOTAL_COUNT,
        pageRange: CONSTANT.PAGE_RANGE_DISPLAY,
        isError: false,
        errorInfo: '',
        activePage: CONSTANT.CURRENT_PAGE,
        tableHeader: []
    };


    /**
     * Event usualy mount data to State variale
     */
    public async componentDidMount() {
        document.title = CONSTANT.PAGE_TITLE;
        this.setTableHeader();
        this.getListStaff();
    }


    /**
     * Render event will be run first time, 
     * on initial this Component 
     * Render view
     */
    public render() {
        const { staffGrid, isError, totalItem, pageRange, limit, activePage, isLoading, errorInfo, tableHeader } = this.state;
        const listdata: Array<string[]> = new Array();

        //Convert Datajson to Array with last index id PK key.
        for (let i: number = 0; i < staffGrid.length; i++) {
            let item: IStaffList = staffGrid[i];
            //last index is PK KEY, assign to Action on row
            let data: string[] = [String(i + 1), item.staff_name, item.phone, item.email, item.address, item.role_name, item.staff_id];
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
                                        headers={tableHeader}
                                        activePage={activePage}
                                        totalItem={totalItem}
                                        pageRange={pageRange}
                                        dataSet={listdata}
                                        limit={limit} isError={isError}
                                        isLoading={isLoading} errorInfo={errorInfo}
                                        desc='Feedback data' onSort={this.handleSort}
                                        canEdit={true}
                                        canDelete={true}
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

    private handleFilter = async (value: string) => {
        const sleep = (msec: number) => new Promise(resolve => setTimeout(resolve, msec));
        await sleep(3000)
        console.log('filter ' + value);
    }

    /**
     * Set header for table
     */
    private setTableHeader = (sortIcon: string = 'sort') => {
        const tableHeader = [
            { id: 'id', title: '#', className: '', dataType: 'none', sortClass: sortIcon },
            { id: 'staff_name', title: 'Tên nhân viên', className: 'w200 text-center', dataType: 'text', sortClass: sortIcon },
            { id: 'phone', title: 'Điện thoại', dataType: 'text', className: 'w150 text-center', sortClass: sortIcon },
            { id: 'email', title: 'Email', className: 'text-center', dataType: 'text', sortClass: sortIcon },
            { id: 'address', title: 'Địa chỉ', className: 'text-center', dataType: 'text', sortClass: sortIcon },
            { id: 'role_name', title: 'Quyền', className: 'w100 text-center', dataType: 'text', sortClass: sortIcon },
            { id: '', title: 'Actions', className: 'w100 text-center', dataType: 'none', sortClass: sortIcon }
        ];
        this.setState({ tableHeader });
    }

    /**
     * Get staff data
     * Return: not need to return set to state is OK
     */
    private getListStaff = async () => {
        const { activePage, limit } = this.state;

        this.setState({ isLoading: true });

        const response = await HandleRequest.GetList(APP_URL.STAFF, activePage, limit);

        if (response.isError) {
            return this.setState({ isError: response.isError, errorInfo: response.message });
        }

        this.setState({
            staffGrid: response.result.data,
            totalItem: response.result.total,
            isLoading: false
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
            this.getListStaff()
        });
    }
}