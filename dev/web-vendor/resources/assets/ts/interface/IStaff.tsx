// import { ITh } from '../common/Grid/Table';

export interface IStaff {
    staff_id: number;
    vendor_id: number;
    role_id: string;
    staff_name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    role_name:string;
    created_at: Date,
    updated_at: Date,
}

export interface IStaffList {
    staff_id: string;
    staff_name: string;
    role_name: string;
    email: string;
    phone: string;
    address: string;
}

export interface IStaffFilter {
    staff_name?: string;
    phone?: string;
    email?: string;
    address?: string;
    role_name?: string;
}

export interface IValidateField {
    errors: any
}

export interface IValidateModel {
    staff_id?: string;
    vendor_id?: string;
    role_id?: string;
    staff_name?: string;
    email?: string;
    password?: string;
    phone?: string;
    address?: string;
}

export interface IStaffState {
    staffGrid: IStaffList[];
    roles:any,
    model: IStaff;
    isLoading: boolean;
    isHandleEvent: boolean;
    itemRepeat: number;
    limit: number;
    isShowModal: boolean;
    totalItem: number;
    isErrorList: boolean;
    isError: boolean;
    showMessage: boolean;
    isValidate: boolean;
    validateMessage: IValidateField;
    errorInfo: null | string;
    activePage: number;
    tableHeader: any;
    filters?: string,
    isCreate: boolean
    order:string,
    orderBy:string,
};
