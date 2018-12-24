import { required } from '../Validate/Rules';

export const BookingValidate = (isRequired: boolean, name: string, value: string) => {
    if (isRequired && name === "status") {
        if (required(value)) {
            return "Vui lòng chọn thao tác";
        }
    }


    return "";
};
