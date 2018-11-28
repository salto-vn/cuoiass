import * as React from 'react';

export class BackButton extends React.Component<{ history: any }, {}>{

    public goBack = () => {
        this.props.history.goBack();
    }

    render() {
        return (
            <button className="btn btn-default m-b-xxs w-xs f-right" type="button" onClick={this.goBack}>
                <i className="fa fa-arrow-left"></i>
            </button>
        )
    }
}