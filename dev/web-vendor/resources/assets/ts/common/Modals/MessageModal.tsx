import * as React from 'react';
export class MessageModal extends React.Component<{ title: string, message: Array<string> ,onShowError : any}, { isValidate: boolean }>{



    /**
     * handleToggle
    */
    public handleToggle = (event:any) => {
        this.props.onShowError(event);
    }

    render() {
        const { message } = this.props;
        return <>
            <div className="modal fade in" ref="message-box" style={{  display:"block"}}>
                <div className="modal-dialog modal-sm modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" onClick={this.handleToggle}><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">{this.props.title}</h4>
                        </div>
                        <div className="modal-body">
                            {message.map((v, k) =>
                                <p key={k}>{v}<br /></p>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={this.handleToggle} className="btn btn-default" >Huỷ</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal-backdrop fade in" ref="message-box-background"  style={{ display: "block" }} />
        </>;
    }
}