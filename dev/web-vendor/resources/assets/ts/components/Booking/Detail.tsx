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
import { isEmptyKeyInObject, showError, parseDateFormat, convertCurrency, createSnackBarMess } from '../../common/Utils';
import { IFormState } from '../../interface/IForm';
import API_URL from '../../bootstrap/Url';
import * as HandleRequest from '../../api/HandleRequest';
import { BookingModel } from '../../model/BookingModel';
import Badge from '../../common/Badge/Badge';
import { IFoodDetail, IDrinkDetail } from '../../interface/IBooking';
import { ICustomizeFieldsItem } from '../../interface/ICustomizeFieldsItem';
import CustomTable from '../../common/Table/CustomTable';
import { IBookedOption } from '../../interface/IBookedOption';
import { paymentMethods, ResourceUtil, bookingStatusList } from '../../common/Resources';
import Info from '../../common/Typography/Info';
import { Carousel } from 'react-responsive-carousel';
import CONSTANT from '../../bootstrap/Constant';
import Save from "@material-ui/icons/SaveAlt";
import normalFormStyle from "../../../styles/components/normalFormStyle";



export interface IDetailBookingState extends IFormState {
    services_mst: any,
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
        time: undefined,
        services_mst: []
    }

    async componentDidMount() {
        document.title = CONSTANT.PAGE_TITLE;
        const signal = this.abortControler.signal;
        const response = await HandleRequest.findOne(API_URL.BOOKING_CRL_show, this.props.match.params.booked_cd, signal);
        let model = Object.assign(new BookingModel(), response.result.data);
        const cachedService: string = localStorage.getItem(CONSTANT.LOCAL_STORE.services);
        const services_mst: IOption[] = JSON.parse(cachedService);
        this.setState({
            model,
            services_mst,
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
        const response = await HandleRequest.Update(API_URL.BOOKING_CRL_update, model, this.props.match.params.booked_cd, signal);
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
        var foodList: any = [];
        var totalDrink = 0;
        if (model.foods.length > 0) {
            var foods: any = model.foods.map((object: IFoodDetail, key: number) => {
                var price = Math.ceil(object.unit_price);
                qcName = object.booked_menu;
                totalFood += price * object.booked_total;
                return [object.id, object.name, object.booked_total, convertCurrency('vi-VN', price), convertCurrency('vi-VN', price * object.booked_total)]
            });
            var total = {
                total: true, colspan: "3", amount: convertCurrency('vi-VN', totalFood)
            };
            foods.push(total);
            var quacuoi = <CustomTable
                tableHeaderColor="primary"
                tableHead={["ID", "Tên", "Số lượng", "Đơn giá", "Thành tiền"]}
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
                customTotalClassForCell={classes.total}
            />;
            foodList.push(<GridContainer key={0}>
                <GridItem xs={12} sm={12} md={12}>
                    <h6>{model.vendor_service.service_code == 'QUAC' ? "Mâm quả" : "Nhà hàng"}</h6>
                </GridItem>
            </GridContainer>);

            foodList.push(
                <GridContainer key={1}>
                    <GridItem xs={12} sm={12} md={3}>
                        <FormLabel className={classes.labelHorizontal}>
                            {model.vendor_service.service_code == 'QUAC' ? "Mâm quả" : "Món ăn"}
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
                </GridContainer>);
        }

        //Drink list
        if (model.drinks.length > 0) {
            var drinks: any = model.drinks.map((object: IDrinkDetail, key: number) => {
                qcName = object.booked_menu;
                var price = Math.ceil(object.unit_price);
                totalDrink += price * object.booked_total;
                return [object.id, object.name, object.booked_total, convertCurrency('vi-VN', price), convertCurrency('vi-VN', price * object.booked_total)]
            });
            var total = {
                total: true, colspan: "3", amount: convertCurrency('vi-VN', totalDrink)
            };
            drinks.push(total);
            var drink = <CustomTable
                tableHeaderColor="primary"
                tableHead={["ID", "Tên ", "Số lượng", "Đơn giá", "Thành tiền"]}
                tableData={drinks}
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
                customTotalClassForCell={classes.total}
            />;


            foodList.push(
                <GridContainer key={3}>
                    <GridItem xs={12} sm={12} md={3}>
                        <FormLabel className={classes.labelHorizontal}>
                            {model.vendor_service.service_code == 'QUAC' ? "Mâm quả" : "Nước uống"}
                        </FormLabel>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={9}>
                        <Accordion
                            active={0}
                            collapses={[
                                {
                                    title: qcName,
                                    content: drink
                                },
                            ]} />
                    </GridItem>
                </GridContainer>);

        }

        //Option info
        var totalOption = 0;
        if (model.options.length > 0) {
            var options: any = model.options.map((object: IBookedOption, key: number) => {
                var price = Math.ceil(object.option_price);
                totalOption += price * object.option_quality;
                return [object.option_id, object.option_name, object.option_quality, convertCurrency('vi-VN', price), convertCurrency('vi-VN', price * object.option_quality)]
            });
            var total = {
                total: true, colspan: "3", amount: convertCurrency('vi-VN', totalOption)
            };
            options.push(total);
            var optionTable = <CustomTable
                tableHeaderColor="primary"
                tableHead={["ID", "Tên ", "Số lượng", "Đơn giá", "Thành tiền"]}
                tableData={options}
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
                customTotalClassForCell={classes.total}
            />;


            foodList.push(
                <GridContainer key={4}>
                    <GridItem xs={12} sm={12} md={3}>
                        <FormLabel className={classes.labelHorizontal}>
                            Tuỳ chọn
                        </FormLabel>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={9}>
                        <Accordion
                            active={0}
                            collapses={[
                                {
                                    title: "Chi tiết",
                                    content: optionTable
                                },
                            ]} />
                    </GridItem>
                </GridContainer>);
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
                                                        <EditIcon fontSize="small" />
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
                                                <h6>Thông tin Khách hàng </h6>
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
                                                    {
                                                        ['NC', 'PHT', 'STD', 'TC', 'DRSS', 'NC'].includes(model.vendor_service.service_code) ? 'Size'
                                                            : ['QUAC', 'REST', 'TRTR', 'VN'].includes(model.vendor_service.service_code) ? 'Số lượng'
                                                                : ['XC'].includes(model.vendor_service.service_code) ? 'Số chỗ' : 'Size'
                                                    }
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
                                                    var question: IOption[] = field.customize_field_questions;
                                                    anwser = new ResourceUtil(question).getValue(field.customize_field_answer)
                                                    break;
                                                case "radio":
                                                    var question: IOption[] = field.customize_field_questions;
                                                    anwser = new ResourceUtil(question).getValue(field.customize_field_answer)
                                                    break;
                                                case "checkbox":
                                                    var question: IOption[] = field.customize_field_questions;
                                                    anwser = new ResourceUtil(question).getValue(field.customize_field_answer)
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
                                                <Save />Lưu
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
                                                    Mã Dịch vụ
                                            </FormLabel>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={8}>
                                                <FormLabel className={classes.labelHorizontal}>
                                                    {new ResourceUtil(this.state.services_mst).getValue(model.vendor_service.service_code)}
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
                                                    {model.vendor_service.add_service}
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
                                                    {model.vendor_service.phone_service}
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
                {createSnackBarMess(this.state.isValidate, this.state.isError, this.state.showMessage, () => { this.setState({ showMessage: false }); })}

            </>
        );
    }
}

export default withStyles(normalFormStyle)(DetailBookingScreen)