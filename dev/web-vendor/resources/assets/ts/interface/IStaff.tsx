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
    staff_id: number;
    staff_name: string;
    email: string;
    phone: string;
    address: string;
    role_name: string;
    role_code: string;
    system_code: string;
}

export interface IStaffState {
    staffGrid: IStaffList[];
    isLoading: boolean;
    itemRepeat: number;
    limit: number;
    offset: number;
    isShowModal: boolean;
    totalItem: number;
    isError: boolean;
    errorInfo: null | string;
    activePage: number;
    feedbacHeader: ITh[];
};
