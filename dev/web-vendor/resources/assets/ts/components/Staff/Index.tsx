import * as React from 'react';
import { IStaffState, IStaffList, IStaffFilter } from '../../interface/IStaff';
import { StaffModel } from '../../model/StaffModel';
import * as HandleRequest from '../../api/HandleRequest';
import CONSTANT from '../../bootstrap/Constant';
import APP_URL from '../../bootstrap/Url';
import { Table } from '../../common/Grid/Table';
import { DisplayNoPage } from '../../common/Grid/DisplayNoPage';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSortUp } from '@fortawesome/free-solid-svg-icons';
import StaffModal from './Edit';
import { objectToQueryString } from '../../common/Utils';

library.add(faSortUp)

const subjectPage = 'Quản lý nhân viên'; //Header Content page

/**
 * Feedback Screen Component
 * Display Staff list data, include paging 
 * Properties: N/A
 * State: Required IStaffState , Optional another variale
 */
export class StaffScreen extends React.Component<{}, IStaffState> {

    // inital state varialble using in this Component, 
    public state = {
        staffGrid: [],
        model: new StaffModel,
        isLoading: false,
        isCLickPaginate: false,
        isHandleEvent: false,
        itemRepeat: CONSTANT.ITEM_REPEAT,
        limit: CONSTANT.LIMIT,
        isShowModal: false,
        totalItem: CONSTANT.TOTAL_COUNT,
        pageRange: CONSTANT.PAGE_RANGE_DISPLAY,
        isError: false,
        isErrorList: false,
        isValidate: false,
        errorInfo: '',
        validateMessage: {},
        activePage: CONSTANT.CURRENT_PAGE,
        tableHeader: [],
        filters: CONSTANT.UNDEFINED,
        isCreate: false
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
        const { staffGrid, totalItem, pageRange, limit, activePage, isLoading, isCLickPaginate, errorInfo, isErrorList, tableHeader } = this.state;
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
                                        headers={tableHeader}
                                        activePage={activePage}
                                        totalItem={totalItem}
                                        pageRange={pageRange}
                                        dataSet={listdata}
                                        limit={limit}
                                        isError={isErrorList}
                                        isLoading={isLoading}
                                        isCLickPaginate={isCLickPaginate}
                                        errorInfo={errorInfo}
                                        desc='Staff data' onSort={this.handleSort}
                                        canEdit={true} onEdit={this.handleEdit}
                                        canDelete={true} onDelete={this.handleDelete}
                                        canView={false} onView={this.handleEdit}
                                        filterFlag={true}
                                        onFilter={this.handleFilter}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {
                            this.state.isShowModal &&
                            <StaffModal
                                modalTitle={this.state.isCreate ? 'Create staff' : 'Update staff'}
                                model={this.state.model}
                                onToggleModal={this.onToggleModal}
                                onSaveModel={this.onSave}
                                isCreate={this.state.isCreate}
                                isValidate={this.state.isValidate}
                                errorInfo={this.state.errorInfo}
                            />
                        }
                    </div>
                </div>
            </>
        );
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
     * @return not need to return set to state is OK
     */
    private getListStaff = async () => {
        const { activePage, limit, filters } = this.state;

        this.setState({ isLoading: true });

        const response = await HandleRequest.GetList(APP_URL.STAFF, activePage, limit, undefined, undefined, filters);

        if (response.isError) {
            return this.setState({ isErrorList: response.isError, errorInfo: response.message });
        }

        this.setState({
            staffGrid: response.result.data,
            totalItem: response.result.total,
            isLoading: false
        });
    }

    /**
     * @param id: string | number
     * @return model
     */
    private handleEdit = async (id: string | number) => {
        if (this.state.isHandleEvent) {
            return;
        }

        this.setState({ isHandleEvent: true });

        const response = await HandleRequest.Edit(APP_URL.STAFF, id);

        if (response.isError) {
            return this.setState({ isError: response.isError, errorInfo: response.message });
        }

        this.setState({
            model: response.result,
            isHandleEvent: false,
        }, () => this.onToggleModal());
    }

    private handleDelete = (id: any) => {
        console.log(id);
    }

    /**
     * Save model
     */
    public onSave = async (model: any) => {
        if (this.state.isHandleEvent) {
            return;
        }

        this.setState({ isHandleEvent: true });
        const response = await HandleRequest.Update(APP_URL.STAFF, model, model.staff_id);

        if (response.isError) {
            return this.setState({ isValidate: response.isError, errorInfo: response.message, isHandleEvent: false });
        }

        if (response.isValidate) {
            return this.setState({
                isValidate: response.isValidate,
                // validateMessage: { response.validateMessage }
            });
        }

        this.setState({
            isHandleEvent: false,
            isCreate: false
        }, () => {
            this.onToggleModal();
            this.getListStaff();
        });
    }

    private handleSort = () => {
        console.log('Call API Sort');
    }

    /**
     * Set state for array filters and isCLickPaginate to make it paginate
     * @param filtes
     * 
     * @return Get list staff
     */
    private handleFilter = (filtes: IStaffFilter) => {
        const filters = objectToQueryString(filtes);
        this.setState({
            filters, isCLickPaginate: false
        }, () => {
            this.getListStaff();
        })
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
            ...prevState, activePage: pageNumber, isCLickPaginate: true
        }), () => {
            this.getListStaff()
        });
    }

    /**
     * @event Change perpage
     * 
     * @return Get list staff
     */
    private handleDisplayNoPage = (limit: number) => {
        this.setState({ limit }, () => this.getListStaff());
    }

    /**
     * Show popup modal
     */
    private onToggleModal = () => {
        const { isShowModal } = this.state;

        if (!isShowModal) {
            document.body.classList.add('modal-open');
            document.body.style.paddingRight = '17px';
        } else {
            document.body.attributes.removeNamedItem('class');
            document.body.attributes.removeNamedItem('style');
        }

        this.setState({ isShowModal: !this.state.isShowModal });
    }
}
