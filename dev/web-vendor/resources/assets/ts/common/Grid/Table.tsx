import * as React from 'react'
import LoadingGrid from '../../common/Loading/LoadingGrid';
import CONSTANT from '../../bootstrap/Constant';
import LoadingPaginate from '../Loading/LoadingPaginate';
import Pagination from 'react-js-pagination';
import ReactDOM from 'react-dom';

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
    className: string;
    dataType?: string;
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
    limit: number;
}

/**
 * Header Class
 * Display Header on Table
 * <thead><tr className={}><th key={} className={}></th></tr></thead>
 * properties:IHeader
 * state:N/A
 */
export class Header extends React.Component<IHeader>{

    /**
     * Change Page click event
     * call event via properties
     */
    handleSortClicked = (event: React.SyntheticEvent<HTMLElement>) => {
        const { onSort } = this.props;

        //Call event onSort if have set
        if (typeof onSort !== "undefined") {
            this.props.onSort(event);
        }

        const elem: any = ReactDOM.findDOMNode(event.currentTarget);

        let className = elem.firstElementChild.className;
        if (className.indexOf("fa fa-sort-up") >= 0) {
            className = className.replace('fa fa-sort-up', 'fa fa-sort-down');
        } else if (className.indexOf("fa-sort-down") >= 0) {
            className = className.replace('fa fa-sort-down', 'fa fa-sort-up');
        } else {
            className = "fa fa-sort-down"; //default is down
        }

        elem.firstElementChild.className = className;
    }

    public render() {
        const { className, dataSet } = this.props;
        return (<thead>
            <tr role="row" className={className}>
                {dataSet.map((thdata, key) => (
                    <th key={key} >
                        <div onClick={this.handleSortClicked} >
                            <i className={thdata.className}></i>
                            {thdata.title}</div>
                        {key === 0 || key === dataSet.length - 1 ? '' :
                            <input
                                className={'form-control ' + thdata.dataType}
                                type='text'
                                id={thdata.title}
                                name={thdata.title} />}

                    </th>
                ))}
            </tr>
        </thead>);
    }
}

// private setClassName(dataType: string) {
//     const className = 'form-control ';
//     if (dataType === "date") {
//         return className + 'date-picker';
//     } else if (dataType === "list") {
//         return className + 'date-picker';
//     }
// }

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

    public render() {
        const { dataSet, isError, isLoading, errorInfo, colsNo } = this.props;

        const actionElement = <>
            <a className="action-icon">
                <i className="fa fa-pencil" />
            </a>
            <a className="action-icon">
                <i className="fa fa-trash-o" />
            </a>
        </>;

        if (isError) {
            return <tbody><tr><td>{errorInfo}</td></tr></tbody>;
        }

        if (isLoading) {
            return <tbody><tr><td colSpan={colsNo} className='is-loadding'><LoadingGrid itemRepeat={1} /></td></tr></tbody>;
        }

        return (
            <tbody>
                {
                    dataSet.map((rows, key) => (
                        <tr role="row" key={key} className={key % 2 ? 'odd' : 'even'} >
                            {rows.map((d, k) => <td key={k}>{d}</td>)}
                            <td key={rows.length + 1}>{actionElement}</td>
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

    public render() {
        const { headers, dataSet, desc } = this.props;
        const isLoading: boolean = Boolean(this.props.isLoading);
        const isError: boolean = Boolean(this.props.isError);
        const errorInfo: string = String(this.props.errorInfo);
        const limit: number = Number(this.props.limit);

        return (<div>
            <table id="tabledata" className="table table-hover custom-table" role="grid" aria-describedby={desc}>
                <Header dataSet={headers} />
                <Body dataSet={dataSet} limit={limit} colsNo={headers.length} isLoading={isLoading} isError={isError} errorInfo={errorInfo} />
            </table>
            {this.paginate()}
        </div>
        )
    }

    /**
     * Change Page click event
     * Call event via properties
     */
    private handlePageClicked = (event: any) => {
        this.props.pageClicked(event);
    }

    /**
     * Render Pagination
     */
    private paginate = () => {
        const activePage = Number(this.props.activePage);
        const totalItem: number = Number(this.props.totalItem);
        const limit: number = Number(this.props.limit);
        const isError: boolean = Boolean(this.props.isError);

        if (isError) {
            return null;
        }

        return totalItem === CONSTANT.TOTAL_COUNT ? <LoadingPaginate width={300} height={30} /> :
            <Pagination
                pageRangeDisplayed={limit}
                activePage={activePage}
                totalItemsCount={totalItem}
                onChange={this.handlePageClicked}
            />;
    };
}
