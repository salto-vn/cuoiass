import { IProduct } from '../interface/IProduct';
import { IOptionsItem } from '../interface/IOptionsItem';
import { IFood } from '../interface/IFood';
import { IDrink } from '../interface/IDrink';
import { ISchedule } from '../interface/ISchedule';
import { ICustomizeFieldsItem } from '../interface/ICustomizeFieldsItem';

export class ProductModel implements IProduct {
    public prd_id: number = 0;
    public prd_cd: string = "";
    public prd_name: string = "";
    public prd_desc: string = "";
    public prd_images: string[] = [];
    public service_code: string = "";
    public price?: number = 0;
    public publish_flag?: string = "";
    public publish_date?: Date = undefined;
    public prd_colors?: string[] = [];
    public prd_sizes?: string[] = [];
    public prd_page?: number = 0;
    public prd_materials?: string[] = [];
    public prd_style?: string = "";
    public prd_party_photo_size?: string = "";
    public prd_times?: string[] = [];
    public vendor_service_id?: number = 0;
    public customize_fields:ICustomizeFieldsItem[] =  [];
    public options:IOptionsItem[] =  [];
    public schedule_photos:ISchedule[] = [];
    public menu_foods:IFood[] =[];
    public menu_drinks:IDrink[] =[];
}