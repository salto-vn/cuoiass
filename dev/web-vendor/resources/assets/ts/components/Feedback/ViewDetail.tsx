import * as React from 'react';
import { IVFeedbackState } from '../../interface/IFeedback';
import { FeedbackModel } from '../../model/FeedbackModel';
import { Carousel } from 'react-responsive-carousel';
import { StartRate } from '../../common/FormControls/StarRate';
import { Link } from 'react-router-dom';
import * as HandleRequest from '../../api/HandleRequest';
import API_URL from '../../bootstrap/Url';

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
        id: this.props.match.params.id
    }

    async componentDidMount() {
        const { id } = this.state;

        //TODO: Hard Data
        // const response = {
        //     feedbackId: params.id,
        //     date: '2018-12-12',
        //     title: 'Feedback Title',
        //     content: 'Review content, Good Job!,',
        //     images: ['https://apod.nasa.gov/apod/image/1502/HDR_MVMQ20Feb2015ouellet1024.jpg', 'http://apod.nasa.gov/apod/image/1502/2015_02_20_conj_bourque1024.jpg'],
        //     rate: 4.5,
        //     product: {
        //         id: '1',
        //         product_code: 'ABC001',
        //         name: 'Product Name',
        //         description: 'descriptiondescription',
        //         image_urls: ['https://connec-place.com/wp-content/uploads/2018/08/2018-08-30-15.17.22.jpg', '']
        //     },
        //     customer: {
        //         id: '1',
        //         name: 'Ngo Tuan Anh2',
        //         email: 'ngoanh@mulodo.com'
        //     },
        //     booking: {
        //         id: 'CAS-0001',
        //         booked_date: '2018-12-12',
        //         activate_date: '2018-12-12',
        //     }
        // };

        const response = await HandleRequest.findOne(API_URL.REVIEW, id);

        let model = Object.assign(new FeedbackModel(), response);
        this.setState({
            model
        })
    }

    public handleClickPhoto = (index: any) => {
        const { model } = this.state;
        this.setState({ isShowImageModal: true, image: model.images[index] });
    }

    public onToggle = (event: any) => {
        const { isShowImageModal } = this.state;
        this.setState({ isShowImageModal: isShowImageModal ? false : true });
    }

    public handleRate = (even: any) => {
        console.log(even);
    }

    render() {
        const { model, image, isShowImageModal } = this.state;

        return <>
            <div className="page-title" >
                <h3 className="breadcrumb-header">Mã số đánh giá: {model.feedbackId}</h3>
            </div>
            <div id="main-wrapper">
                <div className="row">
                    <div className="col-md-12">
                        <div className="panel panel-white">
                            <div className="panel-heading flex justify-content-between align-items-center">
                                <h4 className="panel-title">Sản phẩm</h4>
                            </div>
                            <div className="row">
                                <div className="col-md-2 text-center no-p">
                                    <img width="100" alt="100x100" title="100x100" src={model.product.image_urls[0]} />
                                </div>
                                <div className="col-md-10 no-p" >
                                    <h5 className="mt-0">{model.product.name}</h5>
                                    <p>{model.product.description}</p>
                                </div>
                            </div>

                        </div>
                        <div className="panel panel-white">
                            <div className="panel-heading flex justify-content-between align-items-center">
                                <h4 className="panel-title">Chi tiết</h4>
                            </div>
                            <div className="panel-body " >
                                <div className="row">
                                    <div className="col-md-4">
                                        <Carousel onClickItem={this.handleClickPhoto}>
                                            {model.images.map((image, key) =>
                                                <div key={key}>
                                                    <img key={key} src={image} />
                                                </div>
                                            )}
                                        </Carousel>

                                    </div>
                                    <div className="col-md-8 no-p">
                                        <div>
                                            <h4 className="mt-0">
                                                <Link to="/booking/1"> {model.booking.id}</Link>
                                            </h4>
                                            <div className="row">
                                                <label className="col-md-2">Ngày đặt </label>
                                                <div className="col-md-10">{model.booking.booked_date}</div>
                                            </div>
                                            <div className="row">
                                                <label className="col-md-2">Ngày tổ chức</label>
                                                <div className="col-md-10">{model.booking.activate_date}</div>
                                            </div>
                                            <div className="row">
                                                <label className="col-md-2">Đánh giá</label>
                                                <div className="col-md-10 f-size-40"><StartRate disabled={true} value={4.5} /></div>
                                            </div>
                                            <div className="row">
                                                <label className="col-md-2">Tên</label>
                                                <div className="col-md-10">{model.customer.name}</div>
                                            </div>
                                            <div className="row">
                                                <label className="col-md-2">Email</label>
                                                <div className="col-md-10 ">{model.customer.email}</div>
                                            </div>
                                            <div className="row">
                                                <label className="col-md-2">Ngày</label>
                                                <div className="col-md-10">{model.date}</div>
                                            </div>
                                            <div className="row">
                                                <label className="col-md-2">Tiêu đề</label>
                                                <div className="col-md-10">{model.title}</div>
                                            </div>
                                            <div className="row">
                                                <label className="col-md-2">Nội dung</label>
                                                <div className="col-md-10">{model.content}</div>
                                            </div>
                                        </div>
                                        <div className="m-t-md">
                                            <form className="form-inline">
                                                <div className="row">
                                                    <div className="form-group col-md-11">
                                                        <label className="no-m">Trả lời:</label><br></br>
                                                        <textarea style={{ width: "100%" }} rows={5} ></textarea>
                                                    </div>
                                                </div>
                                                <div>
                                                    <button type="button" id="add-row" className="btn btn-success">Lưu</button>
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
            </div>
        </>;
    }
}