import * as React from "react";
import CONSTANT from '../../bootstrap/Constant';
import { withStyles, createStyles, LinearProgress, FormLabel, Typography } from '@material-ui/core';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import Card from '../../common/Card/Card';
import CardHeader from '../../common/Card/CardHeader';
import { infoColor } from '../../../styles/material-dashboard-pro-react';
import CardBody from '../../common/Card/CardBody';
import { Link } from 'react-router-dom';
import Accordion from '../../common/Accordion/Accordion';
import CustomLinearProgress from '../../common/CustomLinearProgress/CustomLinearProgress';
import Danger from '../../common/Typography/Danger';
import CardFooter from '../../common/Card/CardFooter';
import Button from '../../common/FormControls/CustomButtons/Button';
import EditIcon from '@material-ui/icons/Edit';
import CustomSelect from '../../common/FormControls/CustomSelect/CustomSelect';
import { BookingValidate } from '../../common/Validate/BookingValidate';
import { isEmptyKeyInObject, showError, bookingStatusList } from '../../common/Utils';
import { IFormState } from '../../interface/IForm';
import API_URL from '../../bootstrap/Url';
import * as HandleRequest from '../../api/HandleRequest';


const styles = () => createStyles(
    {
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
        labelHorizontal: {
            // color: "rgba(0, 0, 0, 0.26)",
            fontSize: "14px",
            lineHeight: "1.428571429",
            fontWeight: 400,
            marginRight: "0",
            "@media (min-width: 992px)": {
                float: "right"
            }
        },

        valueHorizontal: {
            fontSize: "14px",
            lineHeight: "1.428571429",
            fontWeight: 400,
            marginRight: "0",
            "@media (min-width: 992px)": {
                float: "left"
            }
        },
        icon: {
            width: "17px",
            height: "17px",
            position: "relative",
            top: "3px"
        },
        footerRight: {
            textAlign: "right",
            width: "100%"
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
    }
);


export interface IDetailBookingState extends IFormState {

}

class DetailBookingScreen extends React.Component<{match:any, classes: any }, IDetailBookingState> {

    abortControler = new AbortController();
    public state = {
        isLoading: true,
        isSubmitDisabled: true,
        isHandleEvent: true,
        isValidate: false,
        isError: false,
        showMessage: false,
        model: [],
        status: "",
        clientError: { status: undefined },
        validateMessage: { errors: "" },
    }

    async componentDidMount() {
        document.title = CONSTANT.PAGE_TITLE;
        const signal = this.abortControler.signal;
        const response = await HandleRequest.findOne(API_URL.BOOKING_CRL, this.props.match.params.booked_cd,signal);
        debugger;
        // let model = Object.assign(new FeedbackModel(), response.result);
        this.setState({
            // model,
            isLoading: false
        })
    }

    private handleEdit = () => {
        debugger;
    }

    public handleChange = (isRequired: boolean, event: any) => {
        var value = event.target.value;
        var name = event.target.name;
        const errMessage = BookingValidate(isRequired, name, value);
        this.setState({
            model: { ...this.state.model, [name]: value ? value : "" },
            clientError: { ...this.state.clientError, [name]: errMessage },
        }, () => {
            this.canSubmit();
        });
    }

    public canSubmit = () => {
        const { clientError, model } = this.state;
        if (!isEmptyKeyInObject(clientError) && model) {
            return this.setState({ isSubmitDisabled: false });
        }
        return this.setState({ isSubmitDisabled: true });
    }

    render() {
        const { classes } = this.props;
        const { isLoading, model, clientError, validateMessage } = this.state;
        const inputStStatus = showError(clientError, validateMessage, "status");
        return (
            <>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={8}>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <Card>
                                    <CardHeader color="primary">
                                        <h4 className={classes.cardTitleWhite}>Đơn hàng: AAAAAA</h4>
                                        <div className={classes.cardCategoryWhite}>
                                            Chi tiết thông tin đơn hàng
                                </div>
                                        <div>
                                            {isLoading &&
                                                <CustomLinearProgress
                                                    color="info"
                                                />
                                            }
                                        </div>
                                    </CardHeader>
                                    <CardBody>
                                        <GridContainer>
                                            <GridItem xs={12} sm={3} md={3}>
                                                <FormLabel className={classes.labelHorizontal}>
                                                    Trạng thái
                                        </FormLabel>
                                            </GridItem>
                                            <GridItem xs={12} sm={9} md={9}>
                                                <FormLabel className={classes.valueHorizontal}>
                                                    PAID
                                                </FormLabel>
                                                <div className={classes.footerRight} >
                                                    <a href="#" onClick={this.handleEdit}>
                                                        <EditIcon className={classes.icon} />
                                                        Chỉnh sửa
                                                    </a>
                                                </div>
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={3} md={3}>
                                                <FormLabel className={classes.labelHorizontal}>
                                                    Ngày mua
                                        </FormLabel>
                                            </GridItem>
                                            <GridItem xs={12} sm={9} md={9}>
                                                <FormLabel className={classes.valueHorizontal}>
                                                    01-01-2018
                                        </FormLabel>
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={3} md={3}>
                                                <FormLabel className={classes.labelHorizontal}>
                                                    Ngày xem
                                        </FormLabel>
                                            </GridItem>
                                            <GridItem xs={12} sm={9} md={9}>
                                                <FormLabel className={classes.valueHorizontal}>
                                                    01-01-2018
                                        </FormLabel>
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={3} md={3}>
                                                <FormLabel className={classes.labelHorizontal}>
                                                    Ngày lấy
                                        </FormLabel>
                                            </GridItem>
                                            <GridItem xs={12} sm={9} md={9}>
                                                <FormLabel className={classes.valueHorizontal}>
                                                    01-01-2018
                                        </FormLabel>
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={3} md={3}>
                                                <FormLabel className={classes.labelHorizontal}>
                                                    Tên khách hàng
                                                </FormLabel>
                                            </GridItem>
                                            <GridItem xs={12} sm={9} md={9}>
                                                <FormLabel className={classes.valueHorizontal}>
                                                    Nguyen A
                                                </FormLabel>
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={3} md={3}>
                                                <FormLabel className={classes.labelHorizontal}>
                                                    Số điện thoại
                                                </FormLabel>
                                            </GridItem>
                                            <GridItem xs={12} sm={9} md={9}>
                                                <FormLabel className={classes.valueHorizontal}>
                                                    09090909090
                                                </FormLabel>
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={3} md={3}>
                                                <FormLabel className={classes.labelHorizontal}>
                                                    Địa chỉ
                                                </FormLabel>
                                            </GridItem>
                                            <GridItem xs={12} sm={9} md={9}>
                                                <FormLabel className={classes.valueHorizontal}>
                                                    12 Khue Trung Cam le
                                                </FormLabel>
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <h6>Thông tin chi tiết</h6>
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <FormLabel className={classes.labelHorizontal}>
                                                    Kích cỡ
                                            </FormLabel>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={9}>
                                                <FormLabel className={classes.valueHorizontal}>
                                                    10X10
                                            </FormLabel>
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <FormLabel className={classes.labelHorizontal}>
                                                    Màu
                                            </FormLabel>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={9}>
                                                <FormLabel className={classes.valueHorizontal}>
                                                    Red
                                            </FormLabel>
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <FormLabel className={classes.labelHorizontal}>
                                                    Chất liệu
                                            </FormLabel>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={9}>
                                                <FormLabel className={classes.valueHorizontal}>
                                                    Red
                                            </FormLabel>
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <FormLabel className={classes.labelHorizontal}>
                                                    Phong cách
                                            </FormLabel>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={9}>
                                                <FormLabel className={classes.valueHorizontal}>
                                                    Red
                                            </FormLabel>
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <FormLabel className={classes.labelHorizontal}>
                                                    Số trang Album
                                            </FormLabel>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={9}>
                                                <FormLabel className={classes.valueHorizontal}>
                                                    Red
                                            </FormLabel>
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <FormLabel className={classes.labelHorizontal}>
                                                    Kích cỡ ảnh tiệc
                                            </FormLabel>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={9}>
                                                <FormLabel className={classes.valueHorizontal}>
                                                    Red
                                            </FormLabel>
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <FormLabel className={classes.labelHorizontal}>
                                                    Kích cỡ 2
                                            </FormLabel>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={9}>
                                                <FormLabel className={classes.valueHorizontal}>
                                                    Red
                                            </FormLabel>
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <FormLabel className={classes.labelHorizontal}>
                                                    Màu 2
                                            </FormLabel>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={9}>
                                                <FormLabel className={classes.valueHorizontal}>
                                                    Red
                                            </FormLabel>
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <FormLabel className={classes.labelHorizontal}>
                                                    Ngày giờ
                                            </FormLabel>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={9}>
                                                <FormLabel className={classes.valueHorizontal}>
                                                    2018/01/01 20:00
                                            </FormLabel>
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <FormLabel className={classes.labelHorizontal}>
                                                    Customize Field 1
                                            </FormLabel>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={9}>
                                                <FormLabel className={classes.valueHorizontal}>
                                                    Answer Field 1
                                                </FormLabel>
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <FormLabel className={classes.labelHorizontal}>
                                                    Customize Field 2
                                            </FormLabel>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={9}>
                                                <FormLabel className={classes.valueHorizontal}>
                                                    Answer Field 2
                                                </FormLabel>
                                            </GridItem>
                                        </GridContainer>

                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <h6>Quả cưới </h6>
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <FormLabel className={classes.labelHorizontal}>
                                                    Quả cưới
                                                </FormLabel>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={9}>
                                                <Accordion
                                                    active={0}
                                                    collapses={[
                                                        {
                                                            title: "9 Quả",
                                                            content: "Quả 1(20 quả)"
                                                        },
                                                    ]} />
                                            </GridItem>
                                        </GridContainer>

                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <h6>Nhà hàng </h6>
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <FormLabel className={classes.labelHorizontal}>
                                                    Thực đơn
                                                </FormLabel>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={9}>
                                                <Accordion
                                                    active={0}
                                                    collapses={[
                                                        {
                                                            title: "Thức ăn",
                                                            content: "Quả 1(20 quả)"
                                                        },
                                                    ]} />
                                            </GridItem>
                                        </GridContainer>

                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <h6>Tuỳ chọn </h6>
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <FormLabel className={classes.labelHorizontal}>
                                                    Option Name 1
                                            </FormLabel>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={9}>
                                                <FormLabel className={classes.valueHorizontal}>
                                                    x2 = 20,000,000đ
                                                </FormLabel>
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <FormLabel className={classes.labelHorizontal}>
                                                    Option Name 2
                                            </FormLabel>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={9}>
                                                <FormLabel className={classes.valueHorizontal}>
                                                    x2 = 20,000,000đ
                                                </FormLabel>
                                            </GridItem>
                                        </GridContainer>

                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <h6>Thanh toán</h6>
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <FormLabel className={classes.labelHorizontal}>
                                                    Phương thức thanh toán
                                            </FormLabel>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={9}>
                                                <FormLabel className={classes.labelHorizontal}>
                                                    Trả sau, Credit card
                                                </FormLabel>
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <FormLabel className={classes.labelHorizontal}>
                                                    Trước thuế
                                            </FormLabel>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={9}>
                                                <FormLabel className={classes.labelHorizontal}>
                                                    20,000,000đ
                                                </FormLabel>
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <FormLabel className={classes.labelHorizontal}>
                                                    Thuế
                                            </FormLabel>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={9}>
                                                <FormLabel className={classes.labelHorizontal}>
                                                    + 200,000đ
                                                </FormLabel>
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <FormLabel className={classes.labelHorizontal}>
                                                    Khuyến mãi
                                            </FormLabel>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={9}>
                                                <FormLabel className={classes.labelHorizontal}>
                                                    <Danger>- 200,000đ</Danger>
                                                </FormLabel>
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <FormLabel className={classes.labelHorizontal}>
                                                    Tổng thanh toán
                                            </FormLabel>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={9}>
                                                <FormLabel className={classes.labelHorizontal}>
                                                    <Danger>
                                                        20,000,000đ
                                                    </Danger>
                                                </FormLabel>
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={3}>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={9}>
                                                <CustomSelect
                                                    id="status"
                                                    labelText="Trạng thái"
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                    value={this.state.status}
                                                    onChange={this.handleChange.bind(this, true)}
                                                    helpText={inputStStatus !== "init" ? inputStStatus : ''}
                                                    error={inputStStatus !== 'init' && inputStStatus !== ''}
                                                    success={inputStStatus === ''}
                                                    inputProps={{
                                                        name: "status",
                                                    }}
                                                    items={bookingStatusList}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                    </CardBody>
                                    <CardFooter>
                                        <div className={classes.footerRight}>
                                            <Button color="primary" onClick={this.handleEdit}>
                                                <EditIcon />Lưu
                                            </Button>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </GridItem>
                        </GridContainer>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <Card>
                            <CardHeader color="info">
                                <h4 className={classes.cardTitleWhite}>Sản phẩm</h4>
                                <p className={classes.cardCategoryWhite}>Sản phẩm dịch vụ đã sử dụng</p>
                            </CardHeader>
                            <CardBody >
                                <a href="#product" onClick={e => e.preventDefault()}>
                                    <img width="100%" src="" />
                                </a>
                                <h6 className={classes.cardCategory}><Link to={"/product/"}> Tên sản phẩm</Link></h6>
                                <p className={classes.cardTitle}>Mô tả sản phẩm</p>
                                <div className={classes.description}>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={5}>
                                            <FormLabel className={classes.valueHorizontal}>
                                                Mã Sản phẩm
                                            </FormLabel>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={7}>
                                            <FormLabel className={classes.labelHorizontal}>
                                                ABCD
                                            </FormLabel>
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={4}>
                                            <FormLabel className={classes.valueHorizontal}>
                                                Dịch vụ
                                            </FormLabel>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={8}>
                                            <FormLabel className={classes.labelHorizontal}>
                                                Cưới
                                            </FormLabel>
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={4}>
                                            <FormLabel className={classes.valueHorizontal}>
                                                Địa chỉ
                                            </FormLabel>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={8}>
                                            <FormLabel className={classes.labelHorizontal}>
                                                123 2-9 Đà Nẵng
                                            </FormLabel>
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={5}>
                                            <FormLabel className={classes.valueHorizontal}>
                                                Số điện thoại
                                            </FormLabel>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={7}>
                                            <FormLabel className={classes.labelHorizontal}>
                                                090909090
                                            </FormLabel>
                                        </GridItem>
                                    </GridContainer>
                                </div>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>

            </>
        );
    }
}

export default withStyles(styles)(DetailBookingScreen)