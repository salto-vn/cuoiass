export interface IProduct {
    prd_id: number;
    prd_cd: string;
    prd_name: string;
    prd_desc: string;
    prd_images?: string[];
    service_code?: string;
    price?: number,
    prd_page?: number,
    publish_flag?:string,
    publish_date?:Date,
    prd_colors?:string[],
    prd_sizes?:string[],
    prd_materials?:string[],
    prd_style?:string,
    prd_party_photo_size?:string,
    prd_times?:string[],
    vendor_service_id?:number,

}