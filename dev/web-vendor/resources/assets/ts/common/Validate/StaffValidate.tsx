import { required, email, min, max } from '../Validate/Rules';

export const ValidateStaff = (isRequired: boolean, name: string, value: string) => {

    if (name === "staff_name") {
        if (isRequired && required(value)) {
            return "Vui lòng nhập tên nhân viên";
        }

        if (max(value, 100)) {
            return "Tên nhân viên không được vượt quá 100 ký tự";
        }

        if (min(value, 6)) {
            return "Tên nhân viên ít nhất 6 ký tự";
        }
    }

    if (name === "email") {
        if (isRequired && required(value)) {
            return "Email không được để trống";
        }

        if (!email(value)) {
            return "Định dạng email không đúng";
        }
    }

    if (name === "phone") {
        if (isRequired && required(value)) {
            return "Vui lòng nhập số điện thoại";
        }
    }


    if (name === "password") {
        if (isRequired && required(value)) {
            return "Vui lòng nhập mật khẩu";
        }
        if (min(value, 6)) {
            return "Mật khẩu phải nhiều hơn 6 ký tự";
        }

        if (max(value, 255)) {
            return "Mật khẩu quá dài";
        }
    }

    if (name === "role_id") {
        if (isRequired && required(value)) {
            return "Vui lòng chọn quyền";
        }
    }

    return undefined;
};

export const ValidateAllStaff = (model: any, isCreate: boolean) => {
    const rules: any = {
        staff_name: 'Vui lòng nhập tên',
        email: 'vui lòng nhập email',
        phone: 'Vui lòng nhập số điện thoại',
        password: 'Vui lòng nhập password',
        role_id: 'Vui lòng chọn quyền'
    }

    const keys = isCreate ? rules : delete rules.password;

    let errors: any = {};

    Object.keys(keys).map(k => {
        console.log(k);
        if (required(model[k])) {
            errors[k] = rules[k]
        }
    });

    return errors;
}
