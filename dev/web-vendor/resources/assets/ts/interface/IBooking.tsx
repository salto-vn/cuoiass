import { IListResultState } from './IList';

export interface IBooking {
    try_date: string,
    activate_date: string,
    booked_date: string,
    booked_cd: string,
    booked_pro_name: string,
    status: string,
    customer_name: string,
    first_name?: string,
    last_name?: string,

}

export interface IBookingSearchState {
    searchForm: IBooking
}


export interface IBookingResultState extends IBookingSearchState, IListResultState{
}