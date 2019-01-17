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
        staff_name: [{
            rule: "required",
            message: 'Vui lòng nhập tên'
        }],
        email: [{
            rule: "required",
            message: 'vui lòng nhập email'
        }],
        phone: [{
            rule: "required",
            message: 'vui lòng nhập điện thoại'
        }],
        password: [{
            rule: "required",
            message: 'vui lòng nhập Mật khảu'
        }],
        role_id: [{
            rule: "required",
            message: 'Vui lòng chọn quyền'
        }],
    }

    const keys = isCreate ? rules : delete rules.password;

    let errors: any = {};

    Object.keys(keys).map((k,v) => {
        if (required(model[k])) {
            errors[k] = rules[k][0].message;
        }
    });

    return errors;
}
