import { IBooking, IFoodDetail, IDrinkDetail } from '../interface/IBooking';
import { IVendorService } from '../interface/IVendorService';
import { ICustomizeFieldsItem } from '../interface/ICustomizeFieldsItem';
import { IPlan } from '../interface/IPlan';
import { IProduct } from '../interface/IProduct';
import { ICustomer } from '../interface/ICustomer';
import { IBookedOption } from '../interface/IBookedOption';
import { IPromotion } from '../interface/IPromotion';

export class BookingModel implements IBooking {
    public status: string = "";
    public booked_cd: string = "";
    public booked_pro_name: string = "";
    public booked_size: number = 0;
    public booked_color: string = "";
    public booked_material: string = "";
    public booked_style: string = "";
    public booked_album_page: number = 0;
    public booked_photo_size: string = "";
    public booked_size_2: number = 0;
    public booked_color_2: string = "";
    public booked_time: string = "";
    public try_date: string = "";
    public try_date_time: string = "";
    public activate_date: string = "";
    public activate_date_time: string = "";
    public memo: string = "";
    public booked_date: string = "";
    public payment_method: string = "";
    public payment_name: string = "";
    public payment_phone: string = "";
    public payment_email: string = "";
    public net_price: number = 0;
    public gross_price: number = 0;
    public invoice_url: string = "";
    public vendor_service: IVendorService = {
        vendor_id: 0,
        service_code: "",
        ven_serv_name: "",
        add_service: "",
        city: "",
        phone_service: "",
    };
    public plan: IPlan = {
        plan_date: "",
        org_date: "",
        org_date_time: "",
        gr_name: "",
        br_name: "",
        org_address: "",
    };
    public product: IProduct = {
        prd_id: 0,
        prd_cd: "",
        prd_name: "",
        prd_desc: "",
        prd_images: [],
        service_code:''
    };
    public customer: ICustomer = {
        customer_id: 0,
        first_name: "",
        last_name: "",
        email: ""
    };
    public options: IBookedOption[] = [];
    public customize_fields: ICustomizeFieldsItem[] = [];
    public foods:IFoodDetail[] = [];
    public drinks:IDrinkDetail[] = [];
    public promotion:IPromotion = {
        end_date: "",
        promotion_amount: 0,
        promotion_code: "",
        promotion_title: "",
        promotion_type: "",
        start_date: ""
    };
}