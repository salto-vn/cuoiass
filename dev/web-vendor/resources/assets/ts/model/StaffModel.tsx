import { IStaff } from '../interface/IStaff';

export class StaffModel implements IStaff {
    public staff_id: number = 0;
    public vendor_id: number = 0;
    public role_id: number = 0;
    public staff_name: string = '';
    public email: string = '';
    public password: string = '';
    public phone: string = '';
    public address: string = '';
}

export class ValidateModel {
    public staff_id: string = '';
    public vendor_id: string = '';
    public role_id: string = '';
    public staff_name: string = '';
    public email: string = '';
    public password: string = '';
    public phone: string = '';
    public address: string = '';
}
