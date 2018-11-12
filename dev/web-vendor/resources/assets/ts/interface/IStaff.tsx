import { ITh } from '../common/Grid/Table';

export interface IStaff {
    staff_id: number;
    vendor_id: number;
    role_id: number;
    staff_name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
}

export interface IStaffList {
    staff_id: string;
    staff_name: string;
    email: string;
    phone: string;
    address: string;
    role_name: string;
}

export interface IStaffFilter {
    staff_name?: string;
    phone?: string;
    email?: string;
    address?: string;
    role_name?: string;
}

export interface IStaffState {
    staffGrid: IStaffList[];
    isLoading: boolean;
    isCLickPaginate: boolean;
    itemRepeat: number;
    limit: number;
    isShowModal: boolean;
    totalItem: number;
    pageRange: number;
    isError: boolean;
    errorInfo: null | string;
    activePage: number;
    tableHeader: ITh[];
    filters?: string
};
