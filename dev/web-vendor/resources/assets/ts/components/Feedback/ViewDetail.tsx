import * as React from 'react';
import { IVFeedbackState } from '../../interface/IFeedback';
import { FeedbackModel, ValidateModel } from '../../model/FeedbackModel';
import { Carousel } from 'react-responsive-carousel';
import StarRate from '../../common/FormControls/StarRate';
import { Link } from 'react-router-dom';
import * as HandleRequest from '../../api/HandleRequest';
import API_URL from '../../bootstrap/Url';
import { isEmptyKeyInObject, showError, createSnackBarMess, parseDateFormat } from '../../common/Utils';
import { ReviewValidate } from '../../common/Validate/ReviewValidate';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import Card from '../../common/Card/Card';
import CardHeader from '../../common/Card/CardHeader';
import CardBody from '../../common/Card/CardBody';
import Button from '../../common/FormControls/CustomButtons/Button';
import CardFooter from '../../common/Card/CardFooter';
import { infoColor } from '../../../styles/material-dashboard-pro-react';
import { createStyles, Theme, withStyles, Typography, Modal } from '@material-ui/core';
import CustomInput from '../../common/FormControls/CustomInput/CustomInput';
import CONSTANT from '../../bootstrap/Constant';
import CustomLinearProgress from '../../common/CustomLinearProgress/CustomLinearProgress';
import SweetAlert from "react-bootstrap-sweetalert";


const styles = (theme: Theme) => createStyles({
    cardCategoryWhite: {
        "&,& a,& a:hover,& a:focus": {
            color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            marginTop: "0",
            marginBottom: "0",
        },
        "& a,& a:hover,& a:focus": {
            color: "#FFFFFF"
        }
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: 300,
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
            color: "#777",
            fontSize: "65%",
            fontWeight: 400,
            lineHeight: "1"
        }
    },
    headerButton: {
        position: "absolute",
        right: "10px",
        bottom: "20px"
    },
    progress: {
        color: infoColor
    },
    linearColorPrimary: {
        backgroundColor: '#FFFFFF',
    },
    linearBarColorPrimary: {
        backgroundColor: infoColor,
    },
    pos: {
        marginBottom: 12
    },
    modal: {
        position: 'absolute',
        width: theme.spacing.unit * 100,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 1,
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%)`,
    }
});

class ViewDetailFeedbackScreen extends React.Component<{ match: any, history: any, classes: any }, IVFeedbackState> {
    abortControler = new AbortController();

    public state = {
        model: new FeedbackModel(),
        isShowImageModal: false,
        image: '',
        clientError: new ValidateModel(),
        isSubmitDisabled: false,
        isHandleEvent: false,
        isError: false,
        isValidate: undefined,
        showMessage: false,
        isLoading: true,
        validateMessage: { errors: "" },
        alert: ""
    }

    async componentDidMount() {
        document.title = CONSTANT.PAGE_TITLE;
        const signal = this.abortControler.signal;
        const response = await HandleRequest.findOne(API_URL.REVIEW_CRL, this.props.match.params.id, signal);
        if (response.isError) {
            const alert = <SweetAlert
                style={{ display: "block", marginTop: "-100px" }}
                title={response.message}
                onConfirm={() => this.hideAlert()}
                showConfirm={false}
            >
                Đang gặp lỗi, chuyển sang trang chính sau 3giây!
            </SweetAlert>
            setTimeout(this.hideAlert, 3000);

            this.setState({
                isLoading: false,
                alert: alert
            })
        } else {
            let model = Object.assign(new FeedbackModel(), response.result.data);
            this.setState({
                model,
                isLoading: false
            })
        }
    }


    public componentWillUnmount() {
        this.abortControler.abort();
    }

    private hideAlert = () => {
        this.setState({
            alert: null
        });
        this.props.history.push("/");
    }

    /**
     * Submit Answer Feedback of User
     */
    public handleSubmit = async () => {

        this.setState({
            isLoading: true
        })
        if (this.state.isHandleEvent) {
            return;
        }

        const { model } = this.state;
        // model.review_response_vendor_id = 1; //Logon User TODO
        this.setState({ isHandleEvent: true });
        const response = await HandleRequest.Update(API_URL.REVIEW_CRL, model, this.props.match.params.id);
        if (response.isError) { //Server Error 500 not 422 validtion

            return this.setState({
                isValidate: response.isValidate,
                isError: response.isError,
                showMessage: response.isError,
                isHandleEvent: false,
                isLoading: false,
            });
        }

        if (response.isValidate) {
            return this.setState({
                isValidate: response.isValidate,
                isError: response.isError,
                showMessage: response.isValidate,
                validateMessage: response.validateMessage,
                isHandleEvent: false,
                isLoading: false,
            });
        } else {
            return this.setState({
                showMessage: true,
                isValidate: response.isValidate,
                isError: response.isError,
                isHandleEvent: false,
                isLoading: false,
            });
        }

    }

    public handleClickPhoto = (index: any) => {
        const { model } = this.state;
        this.setState({ isShowImageModal: true, image: model.review_imgs[index] });
    }

    public onToggleModal = (event: any) => {
        const { isShowImageModal } = this.state;
        this.setState({ isShowImageModal: !isShowImageModal });
    }

    public handleCloseMessage = (event: any) => {
        this.setState({ showMessage: false });
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

        const { model, isSubmitDisabled, image, isShowImageModal, validateMessage, clientError, isValidate, isError, showMessage, isLoading } = this.state;
        const { classes } = this.props;
        const inputStRvwCtnt = showError(clientError, validateMessage, 'review_response_content');

        return (<>
            {this.state.alert}
            <GridContainer>
                <GridItem xs={12} sm={12} md={8}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Nội dung đánh giá</h4>
                            <p className={classes.cardCategoryWhite}>Chỉnh sửa thông tin tài khoản</p>
                            <div>
                                {isLoading &&
                                    <CustomLinearProgress
                                        color="info" />
                                }
                            </div>
                        </CardHeader>
                        <CardBody>
                            {model.product[0] !== undefined && <>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        {model.review_imgs !== undefined ?
                                            <Carousel onClickItem={this.handleClickPhoto}>
                                                {model.review_imgs.map((image, key) =>
                                                    <div key={key}>
                                                        <img key={key} src={image} />
                                                    </div>
                                                )}
                                            </Carousel>
                                            : ''}
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <StarRate size="large" disabled={true} value={model.review_rate} />
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <Typography variant="h5" component="h5">
                                                    {model.review_title}
                                                </Typography>
                                                <Typography color="textSecondary" className={classes.pos} >
                                                    {model.review_date}<br />
                                                    {model.customer[0].email}
                                                </Typography>
                                                <Typography component="p">
                                                    {model.review_content}
                                                </Typography>
                                            </GridItem>
                                        </GridContainer>
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <CustomInput
                                            multiline={true}
                                            labelText="Trả lời"
                                            id="review_response_content"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            helpText={inputStRvwCtnt !== "init" ? inputStRvwCtnt : ''}
                                            error={inputStRvwCtnt !== 'init' && inputStRvwCtnt !== ''}
                                            success={inputStRvwCtnt === ''}
                                            inputProps={{
                                                value: model.review_response_content === null ? '' : model.review_response_content,
                                                name: "review_response_content",
                                                onChange: this.onChangeInput.bind(this, true),
                                                rows: 5
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer></>}
                        </CardBody>
                        <CardFooter>
                            {!isSubmitDisabled ?
                                <Button color="primary" onClick={this.handleSubmit} disabled>
                                    Lưu
                                </Button>
                                :
                                <Button color="primary" onClick={this.handleSubmit} >
                                    Lưu
                                </Button>
                            }
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <Card>
                        <CardHeader color="info">
                            <h4 className={classes.cardTitleWhite}>Sản phẩm</h4>
                            <p className={classes.cardCategoryWhite}>Sản phẩm dịch vụ đã sử dụng</p>
                        </CardHeader>
                        <CardBody >
                            {model.product[0] !== undefined && <>
                                <a href="#pablo" onClick={e => e.preventDefault()}>
                                    {model.review_imgs !== undefined ?
                                        <img width="100%" src={model.product[0].prd_images[0]} />
                                        : ''}
                                </a>
                                <h6 className={classes.cardCategory}>{model.product[0].prd_name}</h6>
                                <p className={classes.cardTitle}>{model.product[0].prd_desc}</p>
                                <div className={classes.description}>
                                    <b>Mã đặt: <Link to={"/booking/" + model.booking[0].booked_cd}> {model.booking[0].booked_cd}</Link><br /></b>

                                    Ngày mua: {parseDateFormat(model.booking[0].booked_date, "DD-MM-YYYY")}<br />
                                    Ngày xem(trải nghiệm): {parseDateFormat(model.booking[0].try_date, "DD-MM-YYYY")}<br />
                                    Ngày nhận(tổ chức): {parseDateFormat(model.booking[0].activate_date, "DD-MM-YYYY")}<br />
                                </div></>}
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
            <div>
                <Modal
                    aria-labelledby="Hình ảnh đánh giá"
                    aria-describedby="Chi tiết hình ảnh đánh giá"
                    open={isShowImageModal}
                    onClose={this.onToggleModal}
                >
                    <div className={classes.modal}>
                        <img src={image} width="100%" />
                    </div>
                </Modal>
            </div>
            {createSnackBarMess(isValidate, isError, showMessage, this.handleCloseMessage)}
        </>);
    }
}

export default withStyles(styles)(ViewDetailFeedbackScreen)