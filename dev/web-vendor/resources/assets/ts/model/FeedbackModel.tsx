import { IFeedback } from '../interface/IFeedback';
import { IProduct } from '../interface/IProduct';
import { ICustomer } from '../interface/ICustomer';
import { IBooking } from '../interface/IBooking';
export class FeedbackModel implements IFeedback {
    public review_id: number = 0;
    public review_title: string = '';
    public review_content: string = '';
    public review_date: string = '';
    public review_rate: number = 0.0;
    public review_imgs: string[] = [];
    public prd_id: number = 0;
    public booked_id: number = 0;
    public customer_id: number = 0;
    public created_by: string = "";
    public created_at: string = "";
    public updated_by: string = "";
    public updated_at: string = "";
    public title: string = '';
    public product: IProduct[] = [];
    public customer: ICustomer[] = [];
    public booking: IBooking[] = [];
}
