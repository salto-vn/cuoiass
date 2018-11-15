import { isEmpty, isEmail } from '../Utils';

const ValidateStaff = (isRequired: boolean, name: string, value: string) => {
    if (isRequired && name === "staff_name") {
        if (isEmpty(value)) {
            return "Vui lòng nhập tên nhân viên";
        }

        if (value.length > 100) {
            return "Tên không được vượt quá 100 ký tự";
        }
    }

    if (isRequired && name === "email") {
        if (isEmpty(value)) {
            return "Vui lòng nhập email";
        }
        if (!isEmail(value)) {
            return "Định dạng email không đúng";
        }
    }
};

export default ValidateStaff;