import * as React from 'react';
import { IVFeedbackState } from '../../interface/IFeedback';
import { FeedbackModel, ValidateModel } from '../../model/FeedbackModel';
import { Carousel } from 'react-responsive-carousel';
import { StartRate } from '../../common/FormControls/StarRate';
import { Link } from 'react-router-dom';
import * as HandleRequest from '../../api/HandleRequest';
import API_URL from '../../bootstrap/Url';
import { isEmptyKeyInObject } from '../../common/Utils';
import { MessageModal } from '../../common/Modals/MessageModal';

export class ViewImageModal extends React.Component<{ image: string, onToggle: any }, {}>{

    public handleTogglle = (event: any) => {
        this.props.onToggle(event);
    }

    render() {
        const { image } = this.props;
        return <>
            <div className="modal fade in" style={{ display: "block" }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" onClick={this.handleTogglle}><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">Hình ảnh</h4>
                        </div>
                        <div className="modal-body">
                            <img src={image} width="100%" />
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={this.handleTogglle} className="btn btn-default" >Huỷ</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal-backdrop fade in" style={{ display: "block" }} />
        </>;
    }
}

export class ViewDetailFeedback extends React.Component<{ match: any }, IVFeedbackState> {
    public state = {
        model: new FeedbackModel(),
        isShowImageModal: false,
        image: '',
        id: this.props.match.params.id,
        clientError: new ValidateModel,
        isSubmitDisabled: false,
        isHandleEvent:false,
        isError: false,
        isErrorList: false,
        isValidate: false,
        validateMessage: { errors: "" },
        errorInfo:'',
    }

    async componentDidMount() {
        const { id } = this.state;
        const response = await HandleRequest.findOne(API_URL.REVIEW, id);
        let model = Object.assign(new FeedbackModel(), response.result);
        this.setState({
            model
        })
    }


    public handleSubmit = async () => {
        
        if (this.state.isHandleEvent) {
            return;
        }

        const { id, model } = this.state;
        this.setState({ isHandleEvent: true });
        const response = await HandleRequest.Update(API_URL.REVIEW,model, id);
        if (response.isError) {
            return this.setState({ isValidate: response.isError, errorInfo: response.message, isHandleEvent: false });
        }

        if (response.isValidate) {
            this.setState({
                isValidate: response.isValidate,
                validateMessage: response.validateMessage,
                isHandleEvent: false
            });
        }
        
        this.setState({
            isHandleEvent: false,
        }, () => {
            //
        });
        
    }

    public handleClickPhoto = (index: any) => {
        const { model } = this.state;
        this.setState({ isShowImageModal: true, image: model.review_imgs[index] });
    }

    public onToggle = (event: any) => {
        const { isShowImageModal } = this.state;
        this.setState({ isShowImageModal: isShowImageModal ? false : true });
    }

    public onShowError = (event: any) => {
        const { isValidate } = this.state;
        this.setState({ isValidate: isValidate ? false : true });
    }

    public handleRate = (even: any) => {
        console.log(even);
    }


    public onChangeInput = (isRequired: boolean, item:any) => {
        // const errMessage = ReviewValidate(isRequired, name, value);
        this.setState({
            model: { ...this.state.model, [item.target.name]: item.target.value ? item.target.value : undefined },
        }, () => {
            this.canSubmit();
        });
    }

    public canSubmit = () => {
        const { clientError } = this.state;
        if (isEmptyKeyInObject(clientError)) {
            return this.setState({ isSubmitDisabled: false });
        }

        return this.setState({ isSubmitDisabled: true });
    }

    render() {
        
        const { model, image, isShowImageModal, validateMessage,isValidate } = this.state;
        var product_info;
        var messages = [];
        if (validateMessage.errors.hasOwnProperty("review_response_content")) {
            messages.push(validateMessage.errors.review_response_content)
        } 
        if (validateMessage.errors.hasOwnProperty("review_response_vendor_id")) {
            messages.push(validateMessage.errors.review_response_vendor_id)
        }
        
        if (model.product[0] !== undefined) {
            product_info = <div className="row">
                <div className="col-md-2 text-center no-p">
                    <img width="100" alt="100x100" title="100x100" src={model.product[0].prd_images[0]} />
                </div>
                <div className="col-md-10 no-p" >
                    <h5 className="mt-0">{model.product[0].prd_name}</h5>
                    <p>{model.product[0].prd_desc}</p>
                </div>
            </div>;
        } else {
            product_info = <div className="row"></div>;
        }
        return <>
            <div className="page-title" >
                <h3 className="breadcrumb-header">Mã số đánh giá: {model.review_id}</h3>
            </div>
            <div id="main-wrapper">
                <div className="row">
                    <div className="col-md-12">
                        <div className="panel panel-white">
                            <div className="panel-heading flex justify-content-between align-items-center">
                                <h4 className="panel-title">Sản phẩm</h4>
                            </div>
                            {product_info}
                        </div>
                        <div className="panel panel-white">
                            <div className="panel-heading flex justify-content-between align-items-center">
                                <h4 className="panel-title">Chi tiết</h4>
                            </div>
                            <div className="panel-body " >
                                <div className="row">
                                    <div className="col-md-4">
                                        {model.review_imgs !== undefined ?
                                            <Carousel onClickItem={this.handleClickPhoto}>
                                                {model.review_imgs.map((image, key) =>
                                                    <div key={key}>
                                                        <img key={key} src={image} />
                                                    </div>
                                                )}
                                            </Carousel>
                                            : ''}
                                    </div>
                                    <div className="col-md-8 no-p">
                                        <div>
                                            <h4 className="mt-0">
                                                {model.booking[0] !== undefined ? <Link to={"/booking/" + model.booking[0].booked_id}> {model.booking[0].booked_id}</Link> : ''}
                                            </h4>
                                            <div className="row">
                                                <label className="col-md-2">Ngày đặt </label>
                                                <div className="col-md-10">{model.booking[0] !== undefined ? model.booking[0].booked_date : ''}</div>

                                            </div>
                                            <div className="row">
                                                <label className="col-md-2">Ngày tổ chức</label>
                                                <div className="col-md-10">{model.booking[0] !== undefined ? model.booking[0].activate_date : ''}</div>
                                            </div>
                                            <div className="row">
                                                <label className="col-md-2">Đánh giá</label>
                                                <div className="col-md-10 f-size-40"><StartRate disabled={true} value={model.review_rate} /></div>
                                            </div>
                                            <div className="row">
                                                <label className="col-md-2">Tên</label>
                                                <div className="col-md-10">{model.customer[0] !== undefined ? model.customer[0].first_name + " " + model.customer[0].last_name : ''}</div>
                                            </div>
                                            <div className="row">
                                                <label className="col-md-2">Email</label>
                                                <div className="col-md-10">{model.customer[0] !== undefined ? model.customer[0].email : ''}</div>
                                            </div>
                                            <div className="row">
                                                <label className="col-md-2">Ngày</label>
                                                <div className="col-md-10">{model.review_date}</div>
                                            </div>
                                            <div className="row">
                                                <label className="col-md-2">Tiêu đề</label>
                                                <div className="col-md-10">{model.review_title}</div>
                                            </div>
                                            <div className="row">
                                                <label className="col-md-2">Nội dung</label>
                                                <div className="col-md-10">{model.review_content}</div>
                                            </div>
                                        </div>
                                        <div className="m-t-md">
                                            <form className="form-inline">
                                                <div className="row">
                                                    <div className="form-group col-md-11">
                                                        <label className="no-m">Trả lời:</label><br></br>
                                                        <textarea name="review_response_content" style={{ width: "100%" }} rows={5} onChange={this.onChangeInput.bind(this, true)} defaultValue={model.review_response_content}>
                                                        </textarea>
                                                    </div>
                                                </div>
                                                <div>
                                                    <button type="button" id="add-row" onClick={this.handleSubmit} className={`btn btn-success ${!this.state.isSubmitDisabled ? 'disabled' : ''}`}>Lưu</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {isShowImageModal && <ViewImageModal image={image} onToggle={this.onToggle} />}
                </div>
                <div className="row">
                {(isValidate)&&<MessageModal onShowError={this.onShowError} title="Lỗi" message={messages}/>}
                    
                </div>
            </div>
        </>;
    }
}