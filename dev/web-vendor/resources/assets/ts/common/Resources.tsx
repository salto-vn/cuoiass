import { IOption } from './FormControls/CustomSelect/CustomSelect';
import { isEmpty } from './Utils';

/**
 * Payment method
 * 0:Tra sau,1:Credit Card, 2: Tien mat, 3: Internet banking
 */
export const paymentMethods: IOption[] = [
    {
        key: "0",
        value: 'Trả sau'
    },
    {
        key: "1",
        value: 'Credit card'
    },
    {
        key: "2",
        value: 'Tiền mặt'
    },
    {
        key: "3",
        value: 'Internet banking'
    }
];

/**
 * Status list
 */
export const bookingStatusList: IOption[] = [
    {
        key: "IN-PROGRESS",
        value: 'Đang xử lý'
    },
    {
        key: "ACCEPTED",
        value: 'Đã xác nhận'
    },
    {
        key: "PAID",
        value: 'Đã thanh toán'
    },
    {
        key: "CANCELLED",
        value: 'Đã huỷ lịch'
    },
    {
        key: "DENIED",
        value: 'Từ chối'
    },
    {
        key: "FINISHED",
        value: 'Hoàn thành'
    }
];



export class ResourceUtil {
    array: IOption[];
    constructor(array: IOption[]) {
        this.array = array;
    }

    public getValue = (key: string) => {
        if(this.array === undefined) {
            return;
        }
        return this.array.map((value: IOption) => {
            if (value.key == key) {
                return value.value + "";
            } else {
                return undefined;
            }
                
        })
    }

    public existKey = (key: string) => {
        if (isEmpty(this.getValue(key))) {
            return false;
        } else {
            return true;
        }

    }
}