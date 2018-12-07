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
    limit: number,
    isShowModal: boolean,
    isErrorList: boolean,
    totalItem: number,
    errorInfo: null | string,
    activePage: number,
    feedbacHeader: any,
    orderBy: string,
    order: string,
    filters?: string,
}

export interface IVFeedbackState {
    model: any,
    isShowImageModal: boolean,
    image: string,
    isSubmitDisabled: boolean,
    clientError: ValidateModel,
    isHandleEvent: boolean,
    isValidate: boolean | undefined,
    isError: boolean,
    isLoading:boolean,
    showMessage: boolean,
    validateMessage: any,
}
