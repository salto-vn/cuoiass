import { ITh } from '../common/Grid/Table';

export interface IFeedback {
    name: string;
    email: string;
    date: string;
    content: string;
    images: string[];
    rate: number;
    productId: string;
    productName: string;
    customerId: string;
    feedbackId: string;
}

export interface IFeedbackState {
    feedbackGrid: IFeedback[],
    isLoading: boolean,
    itemRepeat: number
    limit: number,
    offset: number,
    isShowModal: boolean,
    totalItem: number,
    isError: boolean,
    errorInfo: null | string,
    activePage: number,
    feedbacHeader: ITh[],
}