import * as React from 'react';
import { INFeedbackState } from '../../interface/IFeedback';
import { FeedbackModel } from '../../model/FeedbackModel';

const subjectPage = 'Chi tiết phản hồi'; //Header Content page

export class ViewDetailFeedback extends React.Component<{}, INFeedbackState> {
    public state = {
        model: new FeedbackModel()
    }

    componentDidMount() {
        debugger;
        console.log(this.props);
    }

    render() {


        return <>
            <div className="page-title">
                <h3 className="breadcrumb-header">{subjectPage}</h3>
            </div>
            <div id="main-wrapper">
                <div className="row">
                    <div className="col-md-12">
                        <div className="panel panel-white">
                            <div className="panel-heading flex justify-content-between align-items-center">
                                <h4 className="panel-title">phản hồi</h4>
                            </div>
                            <div className="panel-body">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>;
    }
}