import * as React from 'react';
import { IVFeedbackState } from '../../interface/IFeedback';
import { FeedbackModel, ValidateModel } from '../../model/FeedbackModel';
import { Carousel } from 'react-responsive-carousel';
import { StartRate } from '../../common/FormControls/StarRate';
import { Link } from 'react-router-dom';
import * as HandleRequest from '../../api/HandleRequest';
import API_URL from '../../bootstrap/Url';
import { isEmptyKeyInObject, showError } from '../../common/Utils';
import { MessageModal } from '../../common/Modals/MessageModal';
import { ReviewValidate } from '../../common/Validate/ReviewValidate';
import LoadingForm from '../../common/Loading/LoadingForm';
import { BackButton } from '../../common/FormControls/BackButton';

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

export class ViewDetailFeedback extends React.Component<{ match: any, history: any }, IVFeedbackState> {
    public state = {
        model: new FeedbackModel(),
        isShowImageModal: false,
        image: '',
        id: this.props.match.params.id,
        clientError: new ValidateModel,
        isSubmitDisabled: false,
        isHandleEvent: false,
        isError: false,
        isErrorList: false,
        isValidate: false,
        showMessage: false,
        messages: [],
        messageTitle: '',
        isLoading: true,
        validateMessage: { errors: "" },
        errorInfo: '',
    }

    async componentDidMount() {
        const { id } = this.state;
        const response = await HandleRequest.findOne(API_URL.REVIEW, id);
        let model = Object.assign(new FeedbackModel(), response.result);
        this.setState({
            model,
            isLoading: false
        })
    }


    /**
     * Submit Answer Feedback of User
     */
    public handleSubmit = async () => {

        if (this.state.isHandleEvent) {
            return;
        }

        const { id, model } = this.state;
        model.review_response_vendor_id = 1; //Logon User TODO
        this.setState({ isHandleEvent: true });
        const response = await HandleRequest.Update(API_URL.REVIEW, model, id);
        debugger;
        if (response.isError) {
            return this.setState({
                isValidate: response.isError,
                showMessage: response.isError,
                messages: [response.message],
                isHandleEvent: false,
                messageTitle: 'Lỗi'
            });
        }

        if (response.isValidate) {
            return this.setState({
                isValidate: response.isValidate,
                showMessage: response.isValidate,
                validateMessage: response.validateMessage,
                isHandleEvent: false,
                messageTitle: 'Lỗi'
            });
        } else {

            return this.setState({
                showMessage: !response.isValidate,
                messages: ['Đã lưu thành công'],
                isHandleEvent: false,
                messageTitle: 'Thông báo'
            });
        }

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
        const { showMessage } = this.state;
        this.setState({ showMessage: showMessage ? false : true });
    }

    public handleRate = (even: any) => {
        console.log(even);
    }


    public onChangeInput = (isRequired: boolean, item: any) => {
        const errMessage = ReviewValidate(isRequired, item.target.name, item.target.value);
        this.setState({
            model: { ...this.state.model, [item.target.name]: item.target.value ? item.target.value : undefined },
            clientError: { ...this.state.clientError, [item.target.name]: errMessage },
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

        const { model, image, isShowImageModal, validateMessage, clientError, showMessage, isLoading, messages, messageTitle } = this.state;
        var product_info;

        product_info = <div className="row">
            <div className="col-md-2 text-center no-p">
                <div className="p-h-xxl">
                    {isLoading ? <LoadingForm key="prd_images" width={160} height={100} /> :
                        <img width="100" alt="100x100" title="100x100" src={model.product[0].prd_images[0]} />}
                </div>
            </div>
            <div className="col-md-10 p-h-xxl" >
                <h5 className="mt-0">{isLoading ? <LoadingForm key="prd_name" width={200} height={20} /> : model.product[0].prd_name}</h5>
                {isLoading ? <LoadingForm width={200} height={20} /> : <p> {model.product[0].prd_desc}</p>}
            </div>
        </div>;
        return <>
            <div className="page-title" >
                <span className="breadcrumb-header">Mã số đánh giá: {model.review_id}</span>
                <BackButton history={this.props.history} />
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
                                                <div className="col-md-10">
                                                    {isLoading && <LoadingForm width={200} height={20} />}
                                                    {model.booking[0] !== undefined ? model.booking[0].booked_date : ''}
                                                </div>

                                            </div>
                                            <div className="row">
                                                <label className="col-md-2">Ngày tổ chức</label>
                                                <div className="col-md-10">
                                                    {isLoading && <LoadingForm width={200} height={20} />}
                                                    {model.booking[0] !== undefined ? model.booking[0].activate_date : ''}</div>
                                            </div>
                                            <div className="row">
                                                <label className="col-md-2">Đánh giá</label>
                                                <div className="col-md-10 f-size-40">
                                                    {isLoading ? <LoadingForm width={200} height={30} /> :
                                                        <StartRate disabled={true} value={model.review_rate} />}</div>
                                            </div>
                                            <div className="row">
                                                <label className="col-md-2">Tên</label>
                                                <div className="col-md-10">
                                                    {isLoading && <LoadingForm width={200} height={20} />}
                                                    {model.customer[0] !== undefined ? model.customer[0].first_name + " " + model.customer[0].last_name : ''}</div>
                                            </div>
                                            <div className="row">
                                                <label className="col-md-2">Email</label>
                                                <div className="col-md-10">
                                                    {isLoading && <LoadingForm width={200} height={20} />}
                                                    {model.customer[0] !== undefined ? model.customer[0].email : ''}</div>
                                            </div>
                                            <div className="row">
                                                <label className="col-md-2">Ngày</label>
                                                <div className="col-md-10">
                                                    {isLoading && <LoadingForm width={200} height={20} />}{model.review_date}</div>
                                            </div>
                                            <div className="row">
                                                <label className="col-md-2">Tiêu đề</label>
                                                <div className="col-md-10">{isLoading && <LoadingForm width={200} height={20} />}{model.review_title}</div>
                                            </div>
                                            <div className="row">
                                                <label className="col-md-2">Nội dung</label>
                                                <div className="col-md-10">{isLoading && <LoadingForm width={200} height={20} />}{model.review_content}</div>
                                            </div>
                                        </div>
                                        <div className="m-t-md">
                                            <form className="form-inline">
                                                <div className="row">
                                                    <div className="form-group col-md-11">
                                                        <label className="no-m">Trả lời:</label><br></br>
                                                        <textarea required name="review_response_content" style={{ width: "100%" }} rows={5} onChange={this.onChangeInput.bind(this, true)} value={(model.review_response_content) ? model.review_response_content : ""}>
                                                        </textarea>
                                                        {<span className={'required'}>{showError(clientError, validateMessage, 'review_response_content')}</span>}
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
                    {(messages.length !== 0 && showMessage) && <MessageModal onShowError={this.onShowError} title={messageTitle} message={messages} />}

                </div>
            </div>
        </>;
    }
}