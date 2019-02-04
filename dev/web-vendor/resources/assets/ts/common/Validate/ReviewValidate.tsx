import { required, min } from './Rules';

export const ReviewValidate = (isRequired: boolean, name: string, value: string) => {
    if (isRequired) {
        if (required(value)) {
            switch (name) {
                case "review_id":
                    return "Vui lòng nhập Review ID";
                case "review_response_vendor_id":
                    return "Vui lòng nhập Vendor ID";
                case "review_response_content":
                    return "Vui lòng nhập nội dung trả lời";
                default:
                    break;
            }
        }
    } 
    if (name == "review_response_content" && min(value, 20)) {
        return "Nội dung trả lời phải nhiều hơn 20 ký tự";
    }
    
    return "";

}


