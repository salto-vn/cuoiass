import { IFeedback } from '../interface/IFeedback';
import { IProduct } from '../interface/IProduct';
import { ICustomer } from '../interface/ICustomer';
import { IBooking } from '../interface/IBooking';
export class FeedbackModel implements IFeedback {
    public feedbackId: string = '';
    public date: string = '';
    public content: string = '';
    public images: string[] = [];
    public rate: number = 0.0;
    public title: string = '';
    public product: IProduct = {
        id: '',
        product_code: '',
        name: '',
        description: '',
        image_urls: []
    };
    public customer: ICustomer = {
        id: '',
        name: '',
        email: ''
    };
    public booking: IBooking = {
        id: '',
        booked_date: '',
        activate_date: '',
    };
}
