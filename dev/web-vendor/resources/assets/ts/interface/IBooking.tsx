import { ITh } from '../common/Grid/Table';

export interface IBooking {
    booked_id: number,
    try_date: string,
    activate_date: string,
    booked_date: string,
    booked_cd: string,
    booked_pro_name: string,
    status: string,
    customer_name: string,
    
}

export interface IBookingManagerState {
    isError: boolean,
    isLoading: boolean,
    isClickPaginate: boolean,
    totalItem: number,
    limit: number,
    activePage: number,
    pageRange: number,
    headers: ITh[],
    dataSet: IBooking[],
    errorInfo: string,
    sortedIndex: number,
    searchForm: IBooking
}
