import { required , max } from './Rules';

export const ReviewValidate = (isRequired: boolean, name: string, value: string) => {
    if (isRequired && name === "review_id") {
        if (required(value)) {
            return "Vui lòng nhập Review ID";
        }
    }

    if (isRequired && name === "review_response_vendor_id") {
        if (required(value)) {
            return "Vui lòng nhập Vendor ID";
        }

    }

    if (isRequired && name === "review_response_content") {
        if (required(value)) {
            return "Vui lòng nhập nội dung trả lời";
        }
        if (max(value, 255)) {
            return "Mật khẩu quá dài";
        }
    }

    return undefined;
};

