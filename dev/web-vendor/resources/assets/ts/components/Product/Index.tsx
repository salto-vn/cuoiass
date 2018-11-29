import * as React from 'react';
import { IProductState, IProductList, IProductFilter } from '../../interface/IProduct';
import * as HandleRequest from '../../api/HandleRequest';
import CONSTANT from '../../bootstrap/Constant';
import APP_URL from '../../bootstrap/Url';
import { Table, ITh } from '../../common/Grid/Table';
import { DisplayNoPage } from '../../common/Grid/DisplayNoPage';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSortUp } from '@fortawesome/free-solid-svg-icons';
import { objectToQueryString } from '../../common/Utils';

library.add(faSortUp)

const subjectPage = 'Quản lý Product';

/**
 * Product Screen Component
 * Display Product list data, include paging
 * Properties: N/A
 * State: Required IProductState , Optional another variale
 */
export class ProductScreen extends React.Component<{ history: any }, IProductState> {

    public state = {
        productGrid: [],
        isLoading: false,
        isCLickPaginate: false,
        isHandleEvent: false,
        itemRepeat: CONSTANT.ITEM_REPEAT,
        limit: CONSTANT.LIMIT,
        totalItem: CONSTANT.TOTAL_COUNT,
        pageRange: CONSTANT.PAGE_RANGE_DISPLAY,
        isError: false,
        isErrorList: false,
        errorInfo: '',
        activePage: CONSTANT.CURRENT_PAGE,
        tableHeader: [],
        filters: CONSTANT.UNDEFINED,
        sortbyc: 'prd_id',
        sortby: 'desc',
        sortedIndex: 0
    };

    /**
     * Event usualy mount data to State variale
     */
    public async componentDidMount() {
        document.title = CONSTANT.PAGE_TITLE;
        this.setTableHeader();
        this.getListProduct();
    }

    /**
     * Render event will be run first time, 
     * on initial this Component 
     * Render view
     */
    public render() {
        const { productGrid, totalItem, pageRange, limit, activePage, isLoading, isCLickPaginate, errorInfo, isErrorList, tableHeader } = this.state;
        const listdata: Array<string[]> = new Array();

        //Convert Datajson to Array with last index id PK key.
        for (let i: number = 0; i < productGrid.length; i++) {
            let item: IProductList = productGrid[i];
            //last index is PK KEY, assign to Action on row
            let data: string[] = [String(i + 1), item.prd_cd, item.prd_name, item.price, item.publish_flag === '0' ? 'unpublish' : 'published', item.prd_id];
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
                                    <button type="button" className="btn btn-success">Thêm mới</button>
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
                                        canView={true} onView={this.handleEdit}
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

    /**
     * Set header for table
     */
    private setTableHeader = (sortIcon: string = 'sort') => {
        const source = {
            placeHolder: '-----------',
            items: [
                { id: 0, title: 'unpublish' },
                { id: 1, title: 'published' }
            ]
        };

        const tableHeader = [
            { id: 'id', title: '#', className: 'w35 text-center', dataType: 'none', sortClass: sortIcon, allowSort: false },
            { id: 'prd_cd', title: 'Mã SP', className: 'w150 text-center', dataType: 'text', sortClass: sortIcon, allowSort: true },
            { id: 'prd_name', title: 'Tên SP', className: 'text-center', dataType: 'text', sortClass: sortIcon, allowSort: true },
            { id: 'price', title: 'Giá', className: 'w100 text-center', dataType: 'text', sortClass: sortIcon, allowSort: true },
            { id: 'publish_flag', title: 'Trạng thái', className: 'w100 text-center', dataType: 'list', sortClass: sortIcon, source, allowSort: true },
            { id: 'action', title: 'Actions', className: 'w100 text-center', dataType: 'none', sortClass: sortIcon, allowSort: false }
        ];
        this.setState({ tableHeader });
    }

    /**
     * Get staff data
     * @return not need to return set to state is OK
     */
    private getListProduct = async () => {
        const { activePage, limit, sortbyc, sortby, filters } = this.state;

        this.setState({ isLoading: true });

        const response = await HandleRequest.GetList(APP_URL.PRODUCT, activePage, limit, sortbyc, sortby, filters);

        if (response.isError) {
            return this.setState({ isErrorList: response.isError, errorInfo: response.message });
        }

        this.setState({
            productGrid: response.result.data,
            totalItem: response.result.total,
            isLoading: false
        });
    }

    /**
     * @param id: string | number
     * @return model
     */
    private handleEdit = async (id: string | number) => {
        this.props.history.push(`/product/update/${id}`);
    }

    /**
     * @param id
     * 
     * @return List staff
     */
    private handleDelete = async (id: string) => {
        if (this.state.isHandleEvent) {
            return;
        }

        this.setState({ isHandleEvent: true });

        const response = await HandleRequest.Destroy(APP_URL.PRODUCT, id);

        if (response.isError) {
            return this.setState({ isError: response.isError, errorInfo: response.message, isHandleEvent: false });
        }

        this.setState({ isHandleEvent: false });
        this.getListProduct();
    }

    /**
     * @param key
     * @param index
     * 
     * @return List staff
     */
    private handleSort = (key: any, index: any) => {
        const feedbacHeader: ITh[] = this.state.tableHeader;
        let sortClass = feedbacHeader[index].sortClass;
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

        let sortby: string = "";
        if ((sortClass === "sort") || (sortClass === "sort-up")) {
            sortby = 'asc';
        } else {
            sortby = 'desc';
        }

        return this.setState((prevState) => ({
            ...prevState, sortbyc: key, sortby: sortby, feedbacHeader: feedbacHeader, sortedIndex: index
        }), () => {

            this.getListProduct();
        });
    }

    /**
     * Set state for array filters and isCLickPaginate to make it paginate
     * 
     * @param filtes
     * 
     * @return Get list staff
     */
    private handleFilter = (filtes: IProductFilter) => {
        const filters = objectToQueryString(filtes);
        this.setState({
            filters: filters ? filters : undefined,
            isCLickPaginate: false
        }, () => {
            this.getListProduct();
        })
    }

    /**
     * @event handle Page change
     * @param pageNumber: number
     * 
     * @return List staff
     */
    private handlePageChange = (pageNumber: number) => {
        const { activePage } = this.state;
        if (activePage === pageNumber) {
            return;
        }

        return this.setState((prevState) => ({
            ...prevState, activePage: pageNumber, isCLickPaginate: true
        }), () => {
            this.getListProduct()
        });
    }

    /**
     * @event Change perpage
     * 
     * @return List staf
     */
    private handleDisplayNoPage = (limit: number) => {
        this.setState({ limit }, () => this.getListProduct());
    }
}
