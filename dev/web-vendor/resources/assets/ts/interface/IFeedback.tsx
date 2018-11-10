import { ITh } from '../common/Grid/Table';
import { IProduct } from './IProduct';
import { ICustomer } from './ICustomer';
import { IBooking } from './IBooking';


export interface Feedbacks {
    data: FeedbackItem[];
    total: number;
}

export interface FeedbackItem {
    review_id: number;
    review_content: string;
    review_date: string;
    review_rate: number;
    review_imgs: string[];
    booked_cd: string;
    prd_cd: string;
    booked_pro_name: string;
    first_name: string;
    last_name: string;
    product: IProduct;
    customer: ICustomer;
    booking: IBooking;
}




export interface IFeedback {
    feedbackId: string;
    date: string;
    title: string;
    content: string;
    images: string[];
    rate: number;
    product: IProduct;
    customer: ICustomer;
    booking: IBooking;
}

export interface IFeedbackList {
    review_id: number;
    review_content: string;
    review_date: string;
    review_rate: number;
    review_imgs: string[];
    booked_cd: string;
    prd_cd: string;
    booked_pro_name: string;
    first_name: string;
    last_name: string;
}

export interface IFeedbackState {
    feedbackGrid: IFeedbackList[],
    isLoading: boolean,
    limit: number,
    isShowModal: boolean,
    totalItem: number,
    isError: boolean,
    errorInfo: null | string,
    activePage: number,
    feedbacHeader: ITh[],
    sortbyc: string,
    sortby: string,
    search: string
    sortedIndex: number,
    pageRange:number,
}

export interface IVFeedbackState {
    model: any,
    isShowImageModal: boolean,
    image: string
}
