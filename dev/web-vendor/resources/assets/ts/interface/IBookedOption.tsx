export interface IBookedOption {
    booked_opt_id:number,
    option_id: number;
    option_name: string;
    option_quality: any;
    option_price: number;
    action?:string;
}