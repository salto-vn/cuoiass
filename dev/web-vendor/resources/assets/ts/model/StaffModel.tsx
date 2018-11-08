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
