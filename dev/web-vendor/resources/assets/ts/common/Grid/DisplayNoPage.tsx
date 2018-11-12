import * as React from 'react';

interface IDisplayNoPageProps {
    displayDefault: number;
    options: number[];
    name: string;
    addClass?: string;
    onChange: any;
    selectedValue: number
}

/**
 * @class DisplayNoPage
 * @interface IDisplayNoPageProps
 * @event handleDisplayNoPage
 * @property displayDefault
 */
export class DisplayNoPage extends React.Component<IDisplayNoPageProps> {
    /**
     * Click change option on select
     * Call event via properties: getValue
     */
    public onChangePerPage = (event: any) => {
        const { selectedValue } = this.props;
        const newSelectValue = parseInt(event.target.value, 10);
        if (selectedValue === newSelectValue) {
            return null;
        }

        return this.props.onChange(newSelectValue)
    }

    public render() {
        const { name, options, addClass, selectedValue } = this.props;

        return (
            <select
                name={name}
                value={selectedValue}
                onChange={this.onChangePerPage}
                className={addClass} >
                {options.map((val) => (
                    <option key={val} value={val}>{val}</option>
                ))}
            </select>
        );
    }
};
