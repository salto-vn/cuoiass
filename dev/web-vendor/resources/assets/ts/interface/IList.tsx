/**
 * Use it for list screen 
 */
export interface IListResultState{
    datas: any,
    headers: any,
    isLoading: boolean,
    limit: number,
    isShowModal: boolean,
    isErrorList: boolean,
    totalItem: number,
    errorInfo: null | string,
    activePage: number,
    orderBy: string,
    order: string,
    filters?: string,
}