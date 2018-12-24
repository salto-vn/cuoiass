import { IListResultState } from './IList';
import { IProduct } from './IProduct';
import { IPlan } from './IPlan';
import { IVendorService } from './IVendorService';
import { ICustomer } from './ICustomer';
import { IOptionsItem } from './IOptionsItem';
import { ICustomizeFieldsItem } from './ICustomizeFieldsItem';

export interface IBooking {
    try_date: string,
    activate_date: string,
    booked_date: string,
    booked_cd: string,
    booked_pro_name: string,
    status: string,
    customer_name?: string,
    first_name?: string,
    last_name?: string,
    booked_size: number;
    booked_color: string;
    booked_material: string;
    booked_style: string;
    booked_album_page: number;
    booked_photo_size: string;
    booked_size_2: number;
    booked_color_2: string;
    booked_time: string;
    memo: string;
    payment_name: string;
    payment_phone: string;
    payment_email: string;
    net_price: number;
    gross_price: number;
    invoice_url: string;
    vendor_service: IVendorService;
    plan: IPlan;
    product: IProduct;
    customer: ICustomer;
    options: IOptionsItem[];
    customize_fields: ICustomizeFieldsItem[];
    foods: [];

}

export interface IBookingSearchState {
    searchForm: IBooking
}


export interface IBookingResultState extends IBookingSearchState, IListResultState{
}
