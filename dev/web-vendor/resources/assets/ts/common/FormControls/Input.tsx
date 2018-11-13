import * as React from 'react';

interface IInputTextProps {
    label: string;
    name: string;
    value: string;
    type: string;
    defaultValue?: string;
    handleInput: any;
    required: boolean;
}

export default class InputText extends React.Component<IInputTextProps, { isEmpty: boolean }> {
    public state = {
        isEmpty: this.props.value ? false : true
    }

    public isEmpty = (value: any) => {
        return (value === undefined || value === null || value === '');
    }

    onChange = (evt: any) => {
        this.setState({
            isEmpty: this.isEmpty(evt.target.value),
        });

        this.props.handleInput(evt.target.name, evt.target.value);
    }

    public render() {
        const { label, name, value, type, defaultValue, required } = this.props;
        const isRequired = `${value ? 'is-not-empty' : 'is-empty'} ${required ? 'required' : ''}`;
        return (
            <div className={`form-input float-label ${isRequired}`}>
                <input
                    name={name}
                    type={type}
                    value={value}
                    onChange={this.onChange}
                    defaultValue={defaultValue}
                />
                <label>{label}</label>
            </div>
        );
    }
};
