import * as React from 'react';


interface IInputNumberProp {
    label: string;
    value: string;
    defaultValue?: string;
    handleInput: any;
    required: boolean;
    min?: number;
    max?: number;
}

export default class InputNumber extends React.Component<IInputNumberProp> {
    public render() {
        const { label, value, min, max, defaultValue, handleInput, required } = this.props;
        return (
            <div className="form-input float-label">
                <input
                    className={`${value ? 'is-not-empty' : 'is-empty'}`}
                    type="text"
                    value={value}
                    min={min ? min : 0}
                    max={max ? max : 9999999999}
                    onChange={handleInput}
                    required={required}
                    defaultValue={defaultValue}
                />
                <label>{label}</label>
            </div>
        );
    }
};
