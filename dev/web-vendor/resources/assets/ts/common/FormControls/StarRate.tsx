import React from 'react';

export interface StartRateState {
    value: number
}

export class StartRate extends React.Component<{ disabled: boolean, value: number }, StartRateState>{

    public state = {
        value: this.props.value
    }


    private handleClick = (e: any) => {
        const star = e.currentTarget.getAttribute('data-index');
        this.setState({
            value: star
        })
    }

    render() {
        const stars = [];
        const { value } = this.state;
        const { disabled } = this.props;

        for (let index = 1; index <= 5; index++) {
            if (value >= index) {
                if (disabled) {
                    const element = <span key={index} data-index={index} className="fa fa-star rate-star rate-checked"></span>;
                    stars.push(element);
                } else {
                    const element = <span key={index} data-index={index} className="fa fa-star rate-star-hover rate-checked" onClick={this.handleClick}></span>;
                    stars.push(element);
                }

            } else {
                if (disabled) {
                    const element = <span key={index} data-index={index} className="fa fa-star-o rate-star"></span>;
                    stars.push(element);
                } else {
                    const element = <span key={index} data-index={index} className="fa fa-star-o rate-star-hover" onClick={this.handleClick}></span>;
                    stars.push(element);
                }

            }
        }
        return <>{stars}</>;

    }

}