import { ITh } from "../common/Grid/Table";

export interface IProduct {
    prd_id: number;
    prd_cd: string;
    prd_name: string;
    prd_desc: string;
    prd_images: string[];
}

export interface IProductList {
    prd_id: string;
    prd_cd: string;
    prd_name: string;
    prd_desc: string;
    price: string;
    publish_flag: string;
    prd_colors: string[];
    prd_sizes: string[];
    prd_materials: string[],
    prd_style: string[],
    prd_page: number;
    prd_party_photo_size: string;
    prd_times: string;
    prd_images: string[];
    vendor_service_id: number;
    service_code: number;
}

export interface IProductFilter {
    prd_id?: string;
    prd_cd?: string;
    price?: string;
    publish_flag?: number;
    prd_party_photo_size?: number;
}

export interface IProductState {
    productGrid: IProductList[];
    isLoading: boolean;
    isCLickPaginate: boolean;
    isHandleEvent: boolean;
    itemRepeat: number;
    limit: number;
    totalItem: number;
    pageRange: number;
    isError: boolean;
    isErrorList: boolean;
    errorInfo: null | string;
    activePage: number;
    tableHeader: ITh[];
    filters?: string;
    sortbyc: string;
    sortby: string;
    sortedIndex: number;
};