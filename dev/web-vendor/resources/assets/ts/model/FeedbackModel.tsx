import { IFeedback } from '../interface/IFeedback';
export class FeedbackModel implements IFeedback {
    public name: string = '';
    public email: string = '';
    public date: string = '';
    public content: string = '';
    public images: string[] = [];
    public rate: number = 0.0;
    public productId: string = '';
    public productName: string = '';
    public customerId: string = '';
    public feedbackId: string = '';
}
