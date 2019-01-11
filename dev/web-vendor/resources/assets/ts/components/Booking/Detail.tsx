import * as React from "react";
import { withStyles, createStyles, FormLabel, Modal, Theme } from '@material-ui/core';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import Card from '../../common/Card/Card';
import CardHeader from '../../common/Card/CardHeader';
import CardBody from '../../common/Card/CardBody';
import { Link } from 'react-router-dom';
import Accordion from '../../common/Accordion/Accordion';
import CustomLinearProgress from '../../common/CustomLinearProgress/CustomLinearProgress';
import Danger from '../../common/Typography/Danger';
import CardFooter from '../../common/Card/CardFooter';
import Button from '../../common/FormControls/CustomButtons/Button';
import EditIcon from '@material-ui/icons/Edit';
import CustomSelect, { IOption } from '../../common/FormControls/CustomSelect/CustomSelect';
import { BookingValidate } from '../../common/Validate/BookingValidate';
import { isEmptyKeyInObject, showError, parseDateFormat, convertCurrency } from '../../common/Utils';
import { IFormState } from '../../interface/IForm';
import API_URL from '../../bootstrap/Url';
import * as HandleRequest from '../../api/HandleRequest';
import { BookingModel } from '../../model/BookingModel';
import Badge from '../../common/Badge/Badge';
import { IFoodDetail } from '../../interface/IBooking';
import { ICustomizeFieldsItem } from '../../interface/ICustomizeFieldsItem';
import CustomTable from '../../common/Table/CustomTable';
import { IBookedOption } from '../../interface/IBookedOption';
import { paymentMethods, ResourceUtil, bookingStatusList } from '../../common/Resources';
import Info from '../../common/Typography/Info';
import { Carousel } from 'react-responsive-carousel';
import CONSTANT from '../../bootstrap/Constant';


const styles = (theme: Theme) => createStyles(
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

        uppercase: {
            textTransform: "uppercase"
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
        footerRight: {
            textAlign: "right",
            width: "100%"
        },
        right: {
            textAlign: "right"
        },
        center: {
            textAlign: "center"
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
    }
);


export interface IDetailBookingState extends IFormState {

}

class DetailBookingScreen extends React.Component<{ match: any, classes: any, history: any }, IDetailBookingState> {

    abortControler = new AbortController();
    public state = {
        isLoading: true,
        isSubmitDisabled: true,
        isHandleEvent: false,
        isValidate: false,
        isError: false,
        showMessage: false,
        model: new BookingModel(),
        status: "",
        clientError: { status: undefined },
        validateMessage: { errors: "" },
        modalImage: "",
        isShowImageModal: false,
    }

    async componentDidMount() {
        document.title = CONSTANT.PAGE_TITLE;
        const signal = this.abortControler.signal;
        const response = await HandleRequest.findOne(API_URL.BOOKING_CRL, this.props.match.params.booked_cd, signal);
        let model = Object.assign(new BookingModel(), response.result.data);

        this.setState({
            model,
            isLoading: false
        })
    }

    public componentWillUnmount() {
        this.abortControler.abort();
    }


    private handleEdit = async () => {
        this.setState({ isLoading: true });
        if (this.state.isHandleEvent) {
            return;
        }

        const { model } = this.state;
        this.setState({ isHandleEvent: true });
        const signal = this.abortControler.signal;
        const response = await HandleRequest.Update(API_URL.BOOKING_CRL, model, this.props.match.params.booked_cd, signal);
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

    public handleClickPhoto = (index: any) => {
        const { model } = this.state;
        this.setState({ isShowImageModal: true, modalImage: model.product.prd_images[index] });
    }

    public onToggleModal = (event: any) => {
        const { isShowImageModal } = this.state;
        this.setState({ isShowImageModal: !isShowImageModal });
    }

    render() {
        const { classes } = this.props;
        const { isLoading, clientError, validateMessage } = this.state;
        const model: BookingModel = this.state.model;
        const inputStStatus = showError(clientError, validateMessage, "status");
        var status = undefined;
        switch (model.status) {
            case CONSTANT.PROGRESS.key:
                status = <Badge color="info">{model.status}</Badge>;
                break;
            case CONSTANT.ACCEPTED.key:
                status = <Badge color="rose">{model.status}</Badge>;
                break;
            case CONSTANT.PAID.key:
                status = <Badge color="primary">{model.status}</Badge>;
                break;
            case CONSTANT.CANCELLED.key:
                status = <Badge color="warning">{model.status}</Badge>;
                break;
            case CONSTANT.DENIED.key:
                status = <Badge color="danger">{model.status}</Badge>;
                break;
            case CONSTANT.FINISHED.key:
                status = <Badge color="success">{model.status}</Badge>;
                break;
            default:
                status = <Badge color="info">{model.status}</Badge>;
                break;
        }

        //Food info
        var totalFood = 0;
        var qcName = "";
        var foodList;
        if (model.foods.length > 0) {
            var foods: any = model.foods.map((object: IFoodDetail, key: number) => {
                var price = Math.ceil(object.unit_price);
                qcName = object.booked_menu;
                totalFood += price * object.booked_total;
                return [object.food_id, object.food_name, object.booked_total, convertCurrency('vi-VN', price), convertCurrency('vi-VN', price * object.booked_total)]
            });
            var total = {
                total: true, colspan: "3", amount: convertCurrency('vi-VN', totalFood)
            };
            foods.push(total);
            var quacuoi = <CustomTable
                tableHeaderColor="primary"
                tableHead={["ID", "Tên quả", "Số lượng", "Đơn giá", "Thành tiền"]}
                tableData={foods}
                coloredColls={[4]}
                colorsColls={["primary"]}
                customCellClasses={[
                    classes.center,
                    classes.right,
                    classes.right
                ]}
                customHeadClassesForCells={[2, 3, 4]}
                customClassesForCells={[2, 3, 4]}
                customHeadCellClasses={[
                    classes.center,
                    classes.right,
                    classes.right
                ]}
            />;
            foodList = <>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <h6>{model.vendor_service.service_code == 'QUAC' ? "Mâm quả" : "Nhà hàng"}</h6>
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                        <FormLabel className={classes.labelHorizontal}>
                            {model.vendor_service.service_code == 'QUAC' ? "Quả cưới" : "Thực đơn"}
                        </FormLabel>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={9}>
                        <Accordion
                            active={0}
                            collapses={[
                                {
                                    title: qcName,
                                    content: quacuoi
                                },
                            ]} />
                    </GridItem>
                </GridContainer>
            </>;
        }

        //Option info
        var optionLists;
        if (model.options.length > 0) {
            var options = model.options.map((option: IBookedOption, index: number) => {
                var optionPrice = convertCurrency('vi-VN', option.option_price * option.option_quality);
                return <GridContainer key={index}>
                    <GridItem xs={12} sm={12} md={3}>
                        <FormLabel className={classes.labelHorizontal}>
                            {option.option_name}
                        </FormLabel>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={9}>
                        <FormLabel className={classes.valueHorizontal}>
                            x{option.option_quality} = {optionPrice}
                        </FormLabel>
                    </GridItem>
                </GridContainer>;
            });

            optionLists = <>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <h6>Tuỳ chọn </h6>
                    </GridItem>
                </GridContainer>
                {options}
            </>;
        }

        var discount = 0;
        if (model.promotion.promotion_type == 'Direct') {
            discount = model.promotion.promotion_amount;
        } else {
            discount = model.gross_price / model.promotion.promotion_amount;
        }

        return (
            <>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={8}>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <Card>
                                    <CardHeader color="primary">
                                        <h4 className={classes.cardTitleWhite}>Đơn hàng: {model.booked_cd}</h4>
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
                                    {model.booked_cd != '' && <CardBody>
                                        <GridContainer>
                                            <GridItem xs={12} sm={3} md={3}>
                                                <FormLabel className={classes.labelHorizontal}>
                                                    Trạng thái
                                        </FormLabel>
                                            </GridItem>
                                            <GridItem xs={12} sm={9} md={9}>
                                                <FormLabel className={classes.valueHorizontal}>
                                                    {status}
                                                </FormLabel>
                                                <div className={classes.footerRight} >
                                                    <a href={"/booking/detail/" + model.booked_cd + "/edit"} >
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
                                                    {parseDateFormat(model.booked_date, "DD-MM-YYYY")}
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
                                                    {parseDateFormat(model.try_date, "DD-MM-YYYY")}
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
                                                    {parseDateFormat(model.activate_date, "DD-MM-YYYY")}
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
                                                    {model.customer.first_name + " " + model.customer.last_name}
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
                                                    {model.customer.phone}
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
                                                    {model.customer.address}
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
                                                    Tên cô dâu
                                            </FormLabel>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={9}>
                                                <FormLabel className={classes.valueHorizontal}>
                                                    {model.plan.br_name}
                                                </FormLabel>
                                            </GridItem>
                                        </GridContainer>

                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <FormLabel className={classes.labelHorizontal}>
                                                    Tên chú rễ
                                            </FormLabel>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={9}>
                                                <FormLabel className={classes.valueHorizontal}>
                                                    {model.plan.gr_name}
                                                </FormLabel>
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
                                                    {model.booked_size}
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
                                                    <div style={{ background: model.booked_color, width: "28px", height: "28px" }}></div>
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
                                                    {model.booked_size_2}
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
                                                    <div style={{ background: model.booked_color_2, width: "28px", height: "28px" }}></div>
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
                                                    {model.booked_material}
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
                                                    {model.booked_style}
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
                                                    {model.booked_album_page}
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
                                                    {model.booked_photo_size}
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
                                                    {model.booked_time}
                                                </FormLabel>
                                            </GridItem>
                                        </GridContainer>
                                        {model.customize_fields.map((field: ICustomizeFieldsItem, k: number) => {
                                            var anwser;
                                            switch (field.customize_field_type) {
                                                case "textbox":
                                                    anwser = field.customize_field_answer;
                                                    break;
                                                case "combobox":
                                                    const customize_field_value: IOption[] = field.customize_field_value
                                                    anwser = new ResourceUtil(customize_field_value).getValue(field.customize_field_answer)
                                                    break;
                                                case "radio":
                                                    const customize_field_value: IOption[] = field.customize_field_value
                                                    anwser = new ResourceUtil(customize_field_value).getValue(field.customize_field_answer)
                                                    break;
                                                case "checkbox":
                                                    const customize_field_value: IOption[] = field.customize_field_value
                                                    anwser = new ResourceUtil(customize_field_value).getValue(field.customize_field_answer)
                                                    break;
                                                default:
                                                anwser = field.customize_field_answer;
                                                    break;
                                            }
                                            return (
                                                <GridContainer key={k}>
                                                    <GridItem xs={12} sm={12} md={3}>
                                                        <FormLabel className={classes.labelHorizontal}>
                                                            {field.customize_field_name}
                                                        </FormLabel>
                                                    </GridItem>
                                                    <GridItem xs={12} sm={12} md={9}>
                                                        <FormLabel className={classes.valueHorizontal}>
                                                            {anwser}
                                                        </FormLabel>
                                                    </GridItem>
                                                </GridContainer>);
                                        })}
                                        {/*Food info*/}
                                        {foodList}
                                        {/*Option info*/}
                                        {optionLists}

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
                                                <FormLabel className={classes.labelHorizontal + " " + classes.uppercase}>
                                                    {new ResourceUtil(paymentMethods).getValue(model.payment_method)}
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
                                                    {convertCurrency('vi-VN', model.gross_price)}
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
                                                    <Info>+ {convertCurrency('vi-VN', model.gross_price / 10)}</Info>
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
                                                    <Danger>- {convertCurrency('vi-VN', discount)}</Danger>
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
                                                        {convertCurrency('vi-VN', model.net_price)}
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
                                                    value={model.status}
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
                                    </CardBody>}

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
                            {model.product.prd_cd != '' &&
                                <CardBody >
                                    {model.product.prd_images.length !== 0 ?
                                        <Carousel onClickItem={this.handleClickPhoto}>
                                            {model.product.prd_images.map((image, key) =>
                                                <div key={key}>
                                                    <img key={key} src={image} />
                                                </div>
                                            )}
                                        </Carousel>
                                        : ''}

                                    <h6 className={classes.cardCategory}><Link to={"/product/"}> {model.product.prd_name}</Link></h6>
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
                                                    {model.product.prd_cd}
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
                                                    {model.vendor_service.ven_serv_name}
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
                                                    {model.customer.address}
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
                                                    {model.customer.phone}
                                                </FormLabel>
                                            </GridItem>
                                        </GridContainer>
                                    </div>
                                </CardBody>
                            }
                        </Card>
                    </GridItem>
                </GridContainer>
                <div>
                    <Modal
                        aria-labelledby="Hình ảnh"
                        aria-describedby="Chi tiết hình ảnh"
                        open={this.state.isShowImageModal}
                        onClose={this.onToggleModal}
                    >
                        <div className={classes.modal}>
                            <img src={this.state.modalImage} width="100%" />
                        </div>
                    </Modal>
                </div>

            </>
        );
    }
}

export default withStyles(styles)(DetailBookingScreen)