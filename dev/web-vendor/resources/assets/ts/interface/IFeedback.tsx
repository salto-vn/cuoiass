import { ITh } from '../common/Grid/Table';
import { IProduct } from './IProduct';
import { ICustomer } from './ICustomer';
import { IBooking } from './IBooking';

export interface IFeedback {
    // name: string;
    // email: string;
    // date: string;
    // content: string;
    // images: string[];
    // rate: number;
    // productId: string;
    // productName: string;
    // customerId: string;
    // feedbackId: string;
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
    name: string;
    email: string;
    date: string;
    content: string;
    images: string[];
    rate: number;
    productCode: string;
    productName: string;
    customerId: string;
    feedbackId: string;
}

export interface IFeedbackState {
    feedbackGrid: IFeedbackList[],
    isLoading: boolean,
    itemRepeat: number
    limit: number,
    page: number,
    isShowModal: boolean,
    totalItem: number,
    isError: boolean,
    errorInfo: null | string,
    activePage: number,
    feedbacHeader: ITh[],
}

export interface IVFeedbackState {
    model: any,
    isShowImageModal: boolean,
    image: string
}
