import * as React from 'react';

export interface IOption {
    id: number;
    title: string;
    disabled?: boolean;
}

export interface ISourceProp {
    options: IOption[];
    label: string;
    name: string;
    value: number;
    addClass?: string;
    placeholder: string | boolean;
    getValue: any;
}

/**
 * Select class
 * <Select name={} options={} value={} placeholder={} getValue={} label={} addClass={} />
 * Props: ISourceProp
 */
export class Select extends React.Component<ISourceProp> {

    /**
     * Click change option on select
     * Call event via properties: getValue
     */
    public handleChange = (event: any) => {
        this.props.getValue(parseInt(event.target.value, 10));
    }

    public render() {
        const { label, name, value, options, addClass, placeholder } = this.props;
        const source = [
            {
                id: 0,
                title: placeholder || '-------- SELECT ITEM --------',
                disabled: true
            }, ...options
        ];

        const nullIndex = source.findIndex(d => d.id === 0)
        const selectedIndex = source.findIndex(d => d.id === value)

        return (
            <div className="form-select">
                <select
                    name={name}
                    value={selectedIndex > -1 ? selectedIndex : nullIndex}
                    onChange={this.handleChange}
                    className={addClass}
                >
                    {source.map((option, i) => (
                        <option key={option.id} value={i} disabled={option.disabled}>
                            {option.title}
                        </option>
                    ))}
                </select>
                <label>{label}</label>
            </div>
        );
    }
};
