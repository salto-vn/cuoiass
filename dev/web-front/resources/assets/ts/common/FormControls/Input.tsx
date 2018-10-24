import * as React from 'react';

interface IInputTextProps {
    label: string;
    name: string;
    value: string;
    defaultValue?: string;
    handleInput: any;
    required: boolean;
}

export default class InputText extends React.Component<IInputTextProps> {
    public render() {
        const { label, name, value, defaultValue, handleInput, required } = this.props;
        return (
            <div className="form-input float-label">
                <input
                    name={name}
                    className={`${value ? 'is-not-empty' : 'is-empty'}`}
                    type="text"
                    value={value}
                    onChange={handleInput}
                    required={required}
                    defaultValue={defaultValue}
                />
                <label>{label}</label>
            </div>
        );
    }
};
