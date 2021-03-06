import * as React from 'react';
import { IStaffState, IStaffFilter, IStaffList } from '../../interface/IStaff';
import { StaffModel } from '../../model/StaffModel';
import * as HandleRequest from '../../api/HandleRequest';
import CONSTANT from '../../bootstrap/Constant';
import APP_URL from '../../bootstrap/Url';
// import { DisplayNoPage } from '../../common/Grid/DisplayNoPage';
import StaffModal from './Edit';
import { objectToQueryString, createSnackBarMess } from '../../common/Utils';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import Card from '../../common/Card/Card';
import CardHeader from '../../common/Card/CardHeader';
import CardBody from '../../common/Card/CardBody';
import Table from '../../common/Table/Table';
import Button from '../../common/FormControls/CustomButtons/Button';
import { createStyles, withStyles, TablePagination, Modal, Theme } from '@material-ui/core';
import { IOption } from '../../common/FormControls/CustomSelect/CustomSelect';
import { infoColor } from '../../../styles/material-dashboard-pro-react';
import CustomLinearProgress from '../../common/CustomLinearProgress/CustomLinearProgress';



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
    modal: {
        position: 'absolute',
        // width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%)`,
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
 * Staff Screen Component
 * Display Staff list data, include paging 
 * Properties: N/A
 * State: Required IStaffState , Optional another variale
 */
class StaffScreen extends React.Component<{ classes: any }, IStaffState> {

    abortControler = new AbortController();

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
        isErrorList: false,
        isValidate: false,
        isError: false,
        showMessage: false,
        errorInfo: '',
        validateMessage: { errors: '' },
        activePage: CONSTANT.CURRENT_PAGE,
        tableHeader: [],
        filters: CONSTANT.UNDEFINED,
        isCreate: false,
        orderBy: 'staff_id',
        order: 'desc',
        roles: [],
    };

    /**
     * Event usualy mount data to State variale
     */
    public async componentDidMount() {
        document.title = CONSTANT.PAGE_TITLE;
        // this.getRoles();
        this.getListStaff();

    }

    public componentWillUnmount() {
        this.abortControler.abort();
    }


    /**
     * Render event will be run first time, 
     * on initial this Component 
     * Render view
     */
    render() {
        const { staffGrid, totalItem, limit, activePage, order, orderBy, isLoading, tableHeader } = this.state;
        const { classes } = this.props
        const listdata: Array<string[]> = new Array();

        //Convert Datajson to Array with last index id PK key.
        for (let i: number = 0; i < staffGrid.length; i++) {
            let item: IStaffList = staffGrid[i];
            //last index is PK KEY, assign to Action on row
            let data: string[] = [String(i + 1), item.staff_name, item.role_name, item.phone, item.email, item.address, item.staff_id.toString()];
            listdata.push(data);
        }
        return (
            <>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="primary">
                                <div className={classes.cardTitle}>
                                    <h4 className={classes.cardTitleWhite}>Danh sách nhân viên</h4>
                                    <span className={classes.cardCategoryWhite}>
                                        Danh sách tài khoản đăng nhập của nhân viên
                                    </span>
                                    {isLoading ?
                                        <Button color="info" className={classes.headerButton} disabled onClick={this.handleCreate}>Tạo tài khoản</Button>
                                        : <Button color="info" className={classes.headerButton} onClick={this.handleCreate}>Tạo tài khoản</Button>}
                                    <div>
                                        {isLoading &&
                                            <CustomLinearProgress
                                                color="info" />}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <Table hover={true}
                                    tableHeaderColor="primary"
                                    tableHead={tableHeader}
                                    tableData={listdata}
                                    onEdit={this.handleEdit}
                                    onDelete={this.handleDelete}
                                    onSort={this.handleSort}
                                    order={order}
                                    orderBy={orderBy}
                                    onFilter={this.handleFilter}
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
                <div>
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.isShowModal}
                        onClose={this.handleClose}
                    >
                        <div className={classes.modal}>
                            <StaffModal
                                modalTitle={this.state.isCreate ? 'Create staff' : 'Update staff'}
                                model={this.state.model}
                                onCreate={this.onCreate}
                                onUpdate={this.onUpdate}
                                onDelete={this.handleDelete}
                                isCreate={this.state.isCreate}
                                isValidate={this.state.isValidate}
                                errorInfo={this.state.validateMessage}
                                roles={this.state.roles}
                                isLoading={this.state.isLoading}
                            />
                        </div>
                    </Modal>
                    {createSnackBarMess(this.state.isValidate, this.state.isError, this.state.showMessage, this.handleCloseMessage)}
                </div>
            </>
        );
    }


    private handleCloseMessage = (event: any) => {
        this.setState({ showMessage: false });
    }

    handleClose = () => {
        this.setState({ isShowModal: false });
    };

    /**
     * Set header for table
     */
    private setTableHeader = () => {
        const { roles } = this.state;
        var roleSource: IOption[] = [];
        //Convert Datajson to Array with last index id PK key.
        for (let i: number = 0; i < roles.length; i++) {
            let role: any = roles[i];
            var option = {
                key: role.role_id,
                value: role.role_name
            };
            roleSource.push(option);
        }

        const tableHeader = [
            { id: 'id', numeric: false, disablePadding: true, label: '#', type: 'none' },
            { id: 'filter_staff_name', numeric: false, disablePadding: true, label: 'Tên nhân viên', type: 'text' },
            { id: 'filter_role_name', numeric: false, disablePadding: true, label: 'Quyền', type: 'select', sources: roleSource },
            { id: 'filter_phone', numeric: false, disablePadding: true, label: 'Điện thoại', type: 'text' },
            { id: 'filter_email', numeric: false, disablePadding: true, label: 'Email', type: 'text' },
            { id: 'filter_address', numeric: false, disablePadding: true, label: 'Địa chỉ', type: 'text' },
            { id: 'action', numeric: false, disablePadding: true, label: '' },
        ];
        this.setState({ tableHeader });
    }

    /**
     * Get staff data
     * @return not need to return set to state is OK
     * 
     */
    private getListStaff = async () => {
        const { activePage, limit, order, orderBy, filters } = this.state;

        this.setState({ isLoading: true });
        const signal = this.abortControler.signal;
        const response = await HandleRequest.GetList(APP_URL.STAFF_CRL, activePage + 1, limit, orderBy, order, filters, signal);

        if (response.isError) {
            return this.setState({ isErrorList: response.isError, errorInfo: response.message });
        }
        this.setState({
            staffGrid: response.result.staffs.data,
            totalItem: response.result.staffs.total,
            roles: response.result.roles,
            isLoading: false,
        }), () => {
        };
        this.setTableHeader();

    }


    /**
     * @param id: string | number
     * @return model
     */
    public handleEdit = async (id: string | number) => {
        this.setState({ isLoading: true });
        if (this.state.isHandleEvent) {
            return;
        }
        this.setState({ isHandleEvent: true, isLoading: true });
        const signal = this.abortControler.signal;
        const response = await HandleRequest.Show(APP_URL.STAFF_CRL, id,signal);

        if (response.isError) {
            return this.setState(
                {
                    errorInfo: response.message
                });
        }
        var model: StaffModel = response.result;
        model.password = '';
        this.setState({
            model: model,
            isHandleEvent: false,
            isLoading: false,
            isShowModal: true,
        }
        );
    }

    /**
     * @param id: string | number
     * @return model
     */
    public handleCreate = () => {

        this.setState({
            isHandleEvent: false,
            isShowModal: true,
            isCreate: true,
            model: new StaffModel
        }
        );
    }


    /**
     * Save model
     * 
     * @return List staff have new record
     */
    public onCreate = async (model: any) => {
        this.setState({ isLoading: true });
        if (this.state.isHandleEvent) {
            return;
        }

        this.setState({ isHandleEvent: true });
        const signal = this.abortControler.signal;
        const response = await HandleRequest.Store(APP_URL.STAFF_CRL, model,signal);
        if (response.isError) {
            return this.setState({
                isValidate: response.isValidate,
                isError: response.isError,
                showMessage: response.isValidate,
                errorInfo: response.message,
                validateMessage: response.validateMessage,
                isLoading: false,
                isHandleEvent: false
            });
        }

        if (response.isValidate) {
            return this.setState({
                isValidate: response.isValidate,
                validateMessage: response.validateMessage,
                isError: response.isError,
                showMessage: response.isValidate,
                isLoading: false,
                isHandleEvent: false,

            });
        }

        this.setState({
            isHandleEvent: false,
            isCreate: false,
            isShowModal: false,
            showMessage: true,
            isValidate: response.isValidate,
            isError: response.isError
        }, () => {
            this.getListStaff();
        });
    }

    /**
     * Save model
     * @param model
     * 
     * @return List staff
     */
    public onUpdate = async (model: any) => {
        debugger;
        if (this.state.isHandleEvent) {
            return;
        }

        this.setState({ isHandleEvent: true });
        const signal = this.abortControler.signal;
        const response = await HandleRequest.Update(APP_URL.STAFF_CRL, model, model.staff_id,signal);

        if (response.isError) {
            return this.setState({
                isValidate: response.isValidate,
                isError: response.isError,
                showMessage: response.isValidate,
                errorInfo: response.message,
                validateMessage: response.validateMessage,
                isHandleEvent: false
            });
        }

        if (response.isValidate) {
            return this.setState({
                isValidate: response.isValidate,
                validateMessage: response.validateMessage,
                isError: response.isError,
                showMessage: response.isValidate,
                isHandleEvent: false,

            });
        }

        this.setState({
            isHandleEvent: false,
            isShowModal: false,
            showMessage: true,
            isValidate: response.isValidate,
            isError: response.isError
        }, () => {
            this.getListStaff();
        });
    }

    /**
     * @param id
     * 
     * @return List staff
     */
    public handleDelete = async (id: string) => {
        if (this.state.isHandleEvent) {
            return;
        }

        this.setState({ isHandleEvent: true });
        const signal = this.abortControler.signal;
        const response = await HandleRequest.Destroy(APP_URL.STAFF_CRL, id,signal);
        debugger;
        if (response.isError) {
            return this.setState(
                {
                    isValidate: response.isValidate,
                    isError: response.isError,
                    showMessage: response.isValidate,
                    errorInfo: response.message,
                    validateMessage: response.validateMessage,
                    isHandleEvent: false
                });
        }

        this.setState({
            isHandleEvent: false,
            isShowModal: false,
            isValidate: response.isValidate,
            validateMessage: response.validateMessage,
            isError: response.isError,
            showMessage: true,
        });
        this.getListStaff();
    }

    /**
     * @param key
     * @param index
     * 
     * @return List staff
     */
    public handleSort = (id: string) => {
        const orderBy = id;
        let order = 'desc';
        if (this.state.orderBy === id && this.state.order === 'desc') {
            order = 'asc';
        }


        return this.setState((prevState) => ({
            ...prevState, orderBy: orderBy, order: order
        }), () => {

            this.getListStaff();
        });
    }

    /**
     * Set state for array filters and isCLickPaginate to make it paginate
     * 
     * @param filtes
     * 
     * @return Get list staff
     */
    public handleFilter = (filtes: IStaffFilter) => {
        const filters = objectToQueryString(filtes);
        this.setState({
            filters: filters ? filters : undefined,
        }, () => {
            this.getListStaff();
        })
    }

    /**
     * @event handle Page change
     * @param pageNumber: number
     * 
     * @return List staff
     */
    public handlePageChange = (event: any, pageNumber: number) => {
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
     * @return List staf
     */
    public handleDisplayNoPage = (event: any) => {
        this.setState({ limit: event.target.value }, () => this.getListStaff());
    }

}



export default withStyles(styles)(StaffScreen);