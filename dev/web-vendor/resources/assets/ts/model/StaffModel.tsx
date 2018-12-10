import { IStaff } from '../interface/IStaff';

export class StaffModel implements IStaff {
    public staff_id: number = 2;
    public vendor_id: number = 1;
    public role_id: string = "";
    public role_name: string = '';
    public staff_name: string = '';
    public email: string = '';
    public password: string = '';
    public phone: string = '';
    public address: string = '';
    public created_at: Date = new Date();
    public updated_at: Date = new Date();
}

export class ValidateModel {
    public staff_id = "";
    public vendor_id = "";
    public role_id = "";
    public staff_name = "";
    public email = "";
    public password = "";
    public phone = "";
    public address = "";
}
