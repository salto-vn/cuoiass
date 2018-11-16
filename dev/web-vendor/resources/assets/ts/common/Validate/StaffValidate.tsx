import { required, email, min, max } from '../Validate/Rules';

export const ValidateStaff = (isRequired: boolean, name: string, value: string) => {
    if (isRequired && name === "staff_name") {
        if (required(value)) {
            return "Vui lòng nhập tên nhân viên";
        }

        if (max(value, 100)) {
            return "Tên không được vượt quá 100 ký tự";
        }
    }

    if (isRequired && name === "email") {
        if (required(value)) {
            return "Vui lòng nhập email";
        }

        if (!email(value)) {
            return "Định dạng email không đúng";
        }
    }

    if (isRequired && name === "phone") {
        if (required(value)) {
            return "Vui lòng nhập số điện thoại";
        }

        // if (!isEmail(value)) {
        //     return "Định dạng email không đúng";
        // }
    }


    if (isRequired && name === "password") {
        if (required(value)) {
            return "Vui lòng nhập mật khẩu";
        }

        if (min(value, 6)) {
            return "Mật khẩu phải nhiều hơn 6 ký tự";
        }

        if (max(value, 255)) {
            return "Mật khẩu quá dài";
        }
    }

    if (!isRequired && name === "password") {
        if (min(value, 1) && max(value, 6)) {
            return "Mật khẩu phải nhiều hơn 6 ký tự";
        }

        if (max(value, 255)) {
            return "Mật khẩu quá dài";
        }
    }

    return undefined;
};

export const ValidateAllStaff = (model: any, isCreate: boolean) => {
    const rules: any = {
        staff_name: 'Vui lòng nhập tên',
        email: 'vui lòng nhập email',
        phone: 'Vui lòng nhập số điện thoại',
        password: 'Vui lòng nhập password'
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
