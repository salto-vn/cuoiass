
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
    totalItem: number,
    limit: number,
    activePage: number,
    headers: any,
    dataSet: IBooking[],
    errorInfo: string,
    searchForm: IBooking
}
