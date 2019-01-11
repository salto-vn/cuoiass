import { IOption } from '../common/FormControls/CustomSelect/CustomSelect';

export interface ICustomizeFieldsItem {
    customize_field_id: number;
    customize_field_name: string;
    customize_field_type: string;
    customize_field_value: string | IOption[];
    customize_field_answer: string;
}