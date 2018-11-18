/**
 * Table Class
 * Display Table
 * Use: <Table pageClicked={this.handlePageChange} 
 *      headers={headers} activePage={activePage} 
 *      totalItem={totalItem} dataSet={listdata} 
 *      limit={limit} isError={isError} isLoading={isLoading} 
 *      errorInfo={errorInfo} desc={desc} 
 *      />
 * properties:ISourceProp
 * headers: ITh[];
    headerClass?: string;
    dataSet: Array<string[]>;
    desc: string;
    isLoading: boolean;
    isError: boolean;
    errorInfo: string;
    limit: number;
    totalItem?: number;
    activePage?: number;
    pageClicked?: any;
    filterFlag?: boolean;
    onSort?: any;
    canEdit?: boolean;
    canView?: boolean;
    canDelete?: boolean;
    onEdit?: any;
    onView?: any;
    onDelete?: any;
 * state:N/A
 * return: <table><Header></Header><Body></Body></table>
 */

import * as React from 'react'
import LoadingGrid from '../../common/Loading/LoadingGrid';
import LoadingPaginate from '../Loading/LoadingPaginate';
import Pagination from 'react-js-pagination';
import DatePicker from 'react-date-picker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Interface
 * Table Properties
 * headers: Array[ITh] Header data
 * dataSet: Array<string[]> Dataset of List
 * desc: string Description of Table
 * isLoading: boolean Display Loading Component Flag
 * isError: boolean Display Error Flag
 * errorInfo: string Display Error content
 * limit: number Using for Pagination , default 10/page
 * totalItem: number Using for Pagination, Total records
 * activePage: number Default Page for Pagination
 * pageClicked: any Event Page Click
 */
export interface ISourceProp {
    headers: ITh[];
    headerClass?: string;
    dataSet: Array<string[]>;
    desc: string;
    isLoading: boolean;
    isCLickPaginate: boolean;
    isError: boolean;
    errorInfo: string;
    limit: number;
    totalItem?: number;
    pageRange?: number;
    activePage?: number;
    pageClicked?: any;
    filterFlag?: boolean;
    onSort?: any;
    canEdit: boolean;
    canView: boolean;
    canDelete: boolean;
    onEdit?: any;
    onView?: any;
    onDelete?: any;
    onFilter?: any;
}

/**
 * Interface
 * Header <th></th> Properties
 * title:string Header Title
 * className:string Header Class
 * desc:string Header aria-label
 */
export interface ITh {
    title: string;
    id: string;
    className: string;
    dataType: string;
    sortClass?: any;
    allowSort: boolean;

}

/**
 * Interface 
 * Header <thead></thead>
 * className:string Header Class
 * dataSet:ITh[] Header Data
 */
export interface IHeader {
    className?: string;
    dataSet: ITh[]; //[{title:'',className:'', desc:''}],
    onSort?: any;
    filterFlag?: any;
    onFilter?: any
}

/**
 * Interface
 * Row <tr><td>></td</tr>
 * dataSet:Array<string[]> Data List
 * rowClass:string <tr></tr> class
 * isLoading:boolean Display Loading at Row
 * isError:boolean Disply Error flag
 * errorInfo:string Display Error content
 * limit:number N.o Records on Page default:10/page
 */
export interface IRowState {
    dataSet: Array<string[]>;
    rowClass?: string;
    colsNo: number;
    isLoading: boolean;
    isError: boolean;
    errorInfo: string;
    canEdit: boolean;
    canView: boolean;
    canDelete: boolean;
    onEdit?: any;
    onView?: any;
    onDelete?: any;
}

/**
 * Header Class
 * Display Header on Table
 * <thead><tr className={}><th key={} className={}></th></tr></thead>
 * properties:IHeader
 * state:N/A
 */
export class Header extends React.Component<IHeader>{
    state = {
        date: undefined,
        filters: {},
        time: 0
    }

    /**
     * @event Change Page click event
     * call event via properties
     */
    handleSortClicked = (key: any, index: any, allowSort: boolean) => {
        if (!allowSort) {
            return;
        }

        const { onSort } = this.props;
        //Call event onSort if have set
        if (typeof onSort !== "undefined") {
            this.props.onSort(key, index);
        }
    }

    /**
     * @param evt: any
     * @event onFilter through props
     */
    handleFilter = (evt: any) => {
        const { onFilter } = this.props;
        if (typeof onFilter === "undefined") {
            return;
        }

        this.setState({
            filters: {
                ...this.state.filters,
                [evt.target.name]: evt.target.value ? evt.target.value : undefined
            }
        }, () => {
            return;
        });

        clearTimeout(this.state.time);
        const that = this;
        const timeout = setTimeout(() => {
            that.props.onFilter(that.state.filters);
        }, 800);
        this.setState({ time: timeout });
    }

    /**
     * Set state for current date and callback filters
     * 
     * @param name: string of datepicker
     * @param date: any, selected date of datepicker
     * @callback onFilter
     * @return filters
     */
    onChangeDate = (name: string, date: any) => {
        const d = new Date(date);

        if (d.getFullYear() === 1970) {
            return;
        }

        const newDate = [d.getDate(), d.getMonth() + 1, d.getFullYear()].join('-');

        this.setState({
            date,
            filters: {
                ...this.state.filters,
                [name]: newDate ? newDate : undefined
            }
        }, () => this.props.onFilter(this.state.filters));
    }

    /**
     * Reader header input element
     * @param (dataType: string
     * @param id: string
     * @param dataSet: undefined or string[]
     */
    private renderHeaderInputElement = (dataType: string, id: string, dataSet?: string[]) => {
        const ds: string[] = dataSet as string[];
        const calIcon = <FontAwesomeIcon icon="calendar-alt" />
        const clearIcon = <FontAwesomeIcon icon="times" />;
        if (dataType === "date") {
            return <DatePicker className="form-control react-date-picker-header"
                name={id}
                clearIcon={clearIcon}
                calendarIcon={calIcon}
                onChange={this.onChangeDate.bind(this, id)}
                value={this.state.date}
            />;
        } else if (dataType === "list") {
            return <select onChange={this.handleFilter} id={id} name={id} className="form-control form-select-options">
                {ds.map((data, key) => (
                    <option key={key}>{data}</option>
                ))}
            </select>;
        } else if (dataType === "text") {
            return <input onKeyUp={this.handleFilter} className="form-control" id={id} name={id} type="text" />
        } else if (dataType === "none") {
            return null;
        } else {
            return null;
        }
    }

    public render() {
        const { className, dataSet, filterFlag } = this.props;
        return (
            <thead className={className}>
                <tr role="row" key={0}>
                    {dataSet.map((thdata, key) => (
                        <th key={key} scope="col" className={thdata.className}>
                            <div onClick={this.handleSortClicked.bind(this, thdata.id, key, thdata.allowSort)}>
                                {thdata.title}
                                {key === 0 || key === dataSet.length - 1 ? '' : <FontAwesomeIcon icon={thdata.sortClass} />}
                            </div>
                        </th>
                    ))}
                </tr>
                <tr role="row" key={1}>
                    {dataSet.map((thdata, key) => (
                        <th key={key} scope="col" className={thdata.className}>
                            {key === 0 || key === dataSet.length - 1 ? '' :
                                filterFlag === true ? this.renderHeaderInputElement(thdata.dataType, thdata.id) : ''
                            }
                        </th>
                    ))}
                </tr>
            </thead>
        );
    }
}

/**
 * Body Class
 * Display Body data on Table
 * Display error if isError === true
 * Display loading if isLoading === true
 * <tbody><tr key={} className={}><td key={}></td></tr></tbody>
 * properties:IRowState
 * state:N/A
 */
export class Body extends React.Component<IRowState> {
    /**
     * Change Page click event
     * @param id: string | number
     * @event call event via properties
     */
    handleViewClicked = (id: number | string) => {
        if (this.props.canView) {
            this.props.onView(id);
        }
    }

    /**
      * Change Page click event
      * @param id: string | number
      * @event call event via properties
      */
    handleEditClicked = (id: number | string) => {
        if (this.props.canEdit) {
            this.props.onEdit(id);
        }
    }

    /**
      * Change Page click event
      * @param id: string | number
      * @event call event via properties
      */
    handleDeleteClicked = (id: number | string) => {
        if (this.props.canDelete) {
            this.props.onDelete(id);
        }
    }

    public render() {
        const { dataSet, isError, isLoading, errorInfo, colsNo, canEdit, canView, canDelete } = this.props;

        if (isError) {
            return <tbody><tr className={'flex-full-height'}><td colSpan={colsNo}>{errorInfo}</td></tr></tbody>;
        }

        if (isLoading) {
            return <tbody><tr><td colSpan={colsNo} className='is-loadding'><LoadingGrid /></td></tr></tbody>;
        }

        if (dataSet.length == 0) {
            return <tbody><tr className={'flex-full-height'}><td colSpan={colsNo}>Không có dữ liệu</td></tr></tbody>;
        }

        return (
            <tbody>
                {
                    dataSet.map((rows, key) => (
                        <tr role="row" key={key} >
                            {rows.map((d, k) =>
                                k < rows.length - 1 ?
                                    <td key={k}>{d}</td> :
                                    <td key={rows.length + 1} className="text-center">
                                        {canView === true ? <a onClick={this.handleViewClicked.bind(this, d)} className="action-icon"><FontAwesomeIcon title="Chi tiết" icon='sticky-note' /></a> : ''}
                                        {canEdit === true ? <a onClick={this.handleEditClicked.bind(this, d)} className="action-icon"><FontAwesomeIcon title="Chỉnh sửa" icon='edit' /></a> : ''}
                                        {canDelete === true ? <a onClick={this.handleDeleteClicked.bind(this, d)} className="action-icon"><FontAwesomeIcon title="Xoá" icon='trash-alt' /></a> : ''}
                                    </td>
                            )}
                        </tr>
                    ))
                }
            </tbody>
        );
    }
}

/**
 * Table Class
 * Display Table
 * Use: <Table pageClicked={this.handlePageChange} 
 *      headers={headers} activePage={activePage} 
 *      totalItem={totalItem} dataSet={listdata} 
 *      limit={limit} isError={isError} isLoading={isLoading} 
 *      errorInfo={errorInfo} desc={desc} />
 * properties:ISourceProp
 * state:N/A
 * return: <table><Header></Header><Body></Body></table>
 */
export class Table extends React.Component<ISourceProp, {}> {

    public state = {
        isFilterOrSort: false
    }

    public render() {
        const { headers, dataSet, desc, onSort, headerClass, filterFlag, isLoading, isCLickPaginate, isError,
            canEdit, canView, canDelete, errorInfo } = this.props;
        return (
            <div className="table-responsive">
                <table id="tabledata" className="table table-bordered table-hover custom-table" role="grid" aria-describedby={desc}>
                    <Header onFilter={this.props.onFilter} filterFlag={filterFlag} dataSet={headers} onSort={onSort} className={headerClass} />
                    <Body
                        canEdit={canEdit} onEdit={this.props.onEdit}
                        canView={canView} onView={this.props.onView}
                        canDelete={canDelete} onDelete={this.props.onDelete}
                        dataSet={dataSet} colsNo={headers.length}
                        isLoading={isLoading} isError={isError} errorInfo={errorInfo}
                    />
                </table>
                <div className="text-center">{this.paginate(isLoading, isCLickPaginate)}</div>
            </div>
        );
    }

    /**
     * Change Page click event
     * @param event: any
     * @event Call event via properties
     */
    private handlePageClicked = (event: any) => {
        this.props.pageClicked(event);
    }

    /**
     * Render Pagination
     * totalItemsCount: Number => Required. Total count of items which you are going to display
     * onChange: Function => Required. Page change handler. Receive pageNumber as arg
     * activePage: Number => Default: 1, Required. Active page,
     * itemsCountPerPage: Defalt: 10, Count of items per page
     * pageRangeDisplayed: Number => Default 5, Range of pages in paginator, Dislay total button on paginate
     * @param isLoading: boolean
     * @param isCLickPaginate: boolean
     * @return null | <LoadingPaginate /> | <Pagination />
     */
    private paginate = (isLoading: boolean, isCLickPaginate: boolean) => {
        const activePage = Number(this.props.activePage);
        const totalItem: number = Number(this.props.totalItem);
        const pageRange: number = Number(this.props.pageRange)
        const isError: boolean = Boolean(this.props.isError);
        const limit: number = Number(this.props.limit);

        if (isError) {
            return null;
        }

        if (isLoading && !isCLickPaginate) {
            return <LoadingPaginate width={300} height={30} />;
        }

        if (totalItem === 0 || totalItem <= limit) {
            return null;
        }

        return <Pagination
            totalItemsCount={totalItem}
            itemsCountPerPage={limit}
            pageRangeDisplayed={pageRange}
            activePage={activePage}
            onChange={this.handlePageClicked}
        />;
    };
}
