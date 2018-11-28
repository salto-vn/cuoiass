import { ITh } from '../common/Grid/Table';
import { IProduct } from './IProduct';
import { ICustomer } from './ICustomer';
import { IBooking } from './IBooking';
import { ValidateModel } from '../model/FeedbackModel';


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
    review_id: number;
    review_content: string;
    review_title: string;
    review_date: string;
    review_rate: number;
    review_imgs?: string[];
    prd_id: number;
    booked_id: number;
    customer_id: number;
    created_by: string;
    created_at: string;
    updated_by: string;
    updated_at: string;
    product: IProduct[];
    customer: ICustomer[];
    booking: IBooking[];
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
    isCLickPaginate: boolean,
    limit: number,
    isShowModal: boolean,
    totalItem: number,
    isError: boolean,
    errorInfo: null | string,
    activePage: number,
    feedbacHeader: ITh[],
    sortbyc: string,
    sortby: string,
    search?: string,
    sortedIndex: number,
    pageRange: number,
}

export interface IVFeedbackState {
    model: any,
    isShowImageModal: boolean,
    image: string,
    id: string,
    isSubmitDisabled: boolean,
    clientError: ValidateModel,
    isHandleEvent: boolean,
    isValidate: boolean,
    isLoading:boolean,
    showMessage: boolean,
    messages: any,
    messageTitle: string,
    validateMessage: any,
    errorInfo:string
}
