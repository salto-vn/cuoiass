import * as React from 'react';
import { IStaffState, IStaffFilter, IStaffList } from '../../interface/IStaff';
import { StaffModel } from '../../model/StaffModel';
import * as HandleRequest from '../../api/HandleRequest';
import CONSTANT from '../../bootstrap/Constant';
import APP_URL from '../../bootstrap/Url';
// import { DisplayNoPage } from '../../common/Grid/DisplayNoPage';
import StaffModal from './Edit';
import { objectToQueryString } from '../../common/Utils';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import Card from '../../common/Card/Card';
import CardHeader from '../../common/Card/CardHeader';
import CardBody from '../../common/Card/CardBody';
import Table from '../../common/Table/Table';
import Button from '../../common/FormControls/CustomButtons/Button';
import { createStyles, withStyles, TablePagination, Modal, Theme } from '@material-ui/core';



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
        position: "absolute";
        right: "10px";
        bottom: "10px";
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
});

/**
 * Staff Screen Component
 * Display Staff list data, include paging 
 * Properties: N/A
 * State: Required IStaffState , Optional another variale
 */
class StaffScreen extends React.Component<{ classes: any }, IStaffState> {

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
        isError: false,
        isErrorList: false,
        isValidate: false,
        errorInfo: '',
        validateMessage: { errors: '' },
        activePage: CONSTANT.CURRENT_PAGE,
        tableHeader: [],
        filters: CONSTANT.UNDEFINED,
        isCreate: false,
        orderBy: 'staff_id',
        order: 'desc',
        sortedIndex: 0,

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
    render() {
        const { staffGrid, totalItem, limit, activePage, order, orderBy, isLoading, tableHeader } = this.state;
        const { classes } = this.props
        const listdata: Array<string[]> = new Array();

        //Convert Datajson to Array with last index id PK key.
        for (let i: number = 0; i < staffGrid.length; i++) {
            let item: IStaffList = staffGrid[i];
            //last index is PK KEY, assign to Action on row
            let data: string[] = [String(i + 1), item.staff_name, item.phone, item.email, item.address, item.staff_id.toString()];
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
                                    <Button color="info" className={classes.headerButton} onClick={this.handleCreate}>Tạo tài khoản</Button>
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
                            />
                        </div>
                    </Modal>
                </div>
            </>
        );
    }


    handleClose = () => {
        this.setState({ isShowModal: false });
    };

    /**
     * Set header for table
     */
    private setTableHeader = (sortIcon: string = 'sort') => {
        const tableHeader = [
            { id: 'id', numeric: false, disablePadding: true, label: '#' },
            { id: 'filter_staff_name', numeric: false, disablePadding: true, label: 'Tên nhân viên' },
            { id: 'filter_phone', numeric: false, disablePadding: true, label: 'Điện thoại' },
            { id: 'filter_email', numeric: false, disablePadding: true, label: 'Email' },
            { id: 'filter_address', numeric: false, disablePadding: true, label: 'Địa chỉ' },
            { id: 'action', numeric: false, disablePadding: true, label: '' },
        ];
        this.setState({ tableHeader });
    }

    /**
     * Get staff data
     * @return not need to return set to state is OK
     */
    private getListStaff = async () => {
        const { activePage, limit, order, orderBy, filters } = this.state;
        this.setState({ isLoading: true });
        const response = await HandleRequest.GetList(APP_URL.STAFF, activePage + 1, limit, orderBy, order, filters);

        if (response.isError) {
            return this.setState({ isErrorList: response.isError, errorInfo: response.message });
        }

        this.setState({
            staffGrid: response.result.data,
            totalItem: response.result.total,
            isLoading: false,
        });
    }

    /**
     * @param id: string | number
     * @return model
     */
    public handleEdit = async (id: string | number) => {
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
            model: new StaffModel,
        }
        );
    }


    /**
     * Save model
     * 
     * @return List staff have new record
     */
    public onCreate = async (model: any) => {
        if (this.state.isHandleEvent) {
            return;
        }
        debugger;

        this.setState({ isHandleEvent: true });

        const response = await HandleRequest.Store(APP_URL.STAFF, model);

        if (response.isError) {
            return this.setState({ isValidate: response.isError, errorInfo: response.message, isHandleEvent: false });
        }

        if (response.isValidate) {
            return this.setState({
                isValidate: response.isValidate,
                validateMessage: response.validateMessage,
                isHandleEvent: false
            });
        }

        this.setState({
            isHandleEvent: false,
            isCreate: false,
            isShowModal: false
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
                validateMessage: response.validateMessage,
                isHandleEvent: false
            });
        }

        this.setState({
            isHandleEvent: false,
            isShowModal: false
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

        const response = await HandleRequest.Destroy(APP_URL.STAFF, id);

        if (response.isError) {
            return this.setState({ isError: response.isError, errorInfo: response.message, isHandleEvent: false });
        }

        this.setState({ isHandleEvent: false, isShowModal: false });
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
            isCLickPaginate: false
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