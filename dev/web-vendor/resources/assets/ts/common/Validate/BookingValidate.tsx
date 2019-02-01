import { required, isDateCorrectFormat, max, phone, isNumber  } from '../Validate/Rules';
import { IOption } from '../FormControls/CustomSelect/CustomSelect';
import { ResourceUtil } from '../Resources';

export const BookingValidate = (isRequired: boolean, name: string, value: any, rule?:any) => {
    if (isRequired && required(value)) {
        return "Vui lòng nhập ";
    }

    var dates = ["try_date", "activate_date", "org_date"]
    if (dates.includes(name)) {

        if (!isDateCorrectFormat(value, 'DD-MM-YYYY')) {
            return "Vui lòng nhập DD-MM-YYYY";
        }

    }

    var times = ["try_date_time", "activate_date_time", "org_date_time"]

    if (times.includes(name)) {
        if (!isDateCorrectFormat(value, 'H:mm')) {
            return "Vui lòng nhập giờ xem, h:mm";
        }
    }

    if (name === "phone") {
        if (!phone(value)) {
            return "Vui lòng nhập số điện thoại, đúng định dạng";
        }
    }


    var max255s = ["org_address", "booked_material", "br_name", "gr_name", "address", "first_name", "last_name"]
    if (max255s.includes(name)) {
        if (max(value, 255)) {
            return "Vui lòng nhập dưới 255 ký tự";
        }
    }

    if (name === "booked_size" || name === "booked_size_2") {
        let value1 = parseInt(value);
        if (!isNumber(value) || value1 < 1 || value1 > 1000000000) {
            return "Vui lòng nhập số trên 1 dưới 1.000.000.000";
        }
    }

    if (name.search('customize_field_') >= 0 ) {
        if (rule !== undefined) {
            if ('in_array' in rule) {
                var ins:IOption[] = rule.in_array;
                var exists = new ResourceUtil(ins).existKey(value)
                if (!exists) {
                    return "Vui lòng chọn lại";
                }
            }
            
            if ('max' in rule) {
                if (max(value,rule.max)) {
                    return "Vui lòng nhập dưới 255 ký tự";
                }
            }

        }
    }
    
    return "";
};
