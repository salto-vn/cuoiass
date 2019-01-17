import * as React from "react";
import { withStyles, Theme, createStyles, FormLabel, Modal, Popover, FormControlLabel, Radio, Checkbox, RadioGroup, IconButton, List, ListItem, ListItemIcon, ListSubheader, ListItemText } from '@material-ui/core';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import Card from '../../common/Card/Card';
import CardMiniHeader from '../../common/Card/CardMiniHeader';
import { IFormState } from '../../interface/IForm';
import { BookingModel } from '../../model/BookingModel';
import CustomLinearProgress from '../../common/CustomLinearProgress/CustomLinearProgress';
import CardBody from '../../common/Card/CardBody';
import CustomSelect, { IOption } from '../../common/FormControls/CustomSelect/CustomSelect';
import { BookingValidate } from '../../common/Validate/BookingValidate';
import { isEmptyKeyInObject, showError, convertCurrency, isDateCorrectFormat, isEmpty, objectToQueryString, parseDateFormat, delay } from '../../common/Utils';
import { bookingStatusList, ResourceUtil, paymentMethods } from '../../common/Resources';
import CustomDatePicker from '../../common/FormControls/CustomDatePicker/CustomDatePicker';
import { ICustomizeFieldsItem } from '../../interface/ICustomizeFieldsItem';
import Accordion from '../../common/Accordion/Accordion';
import { IFoodDetail, IDrinkDetail } from '../../interface/IBooking';
import CustomTable from '../../common/Table/CustomTable';
import { IBookedOption } from '../../interface/IBookedOption';
import Info from '../../common/Typography/Info';
import Danger from '../../common/Typography/Danger';
import CardFooter from '../../common/Card/CardFooter';
import Button from '../../common/FormControls/CustomButtons/Button';
import EditIcon from '@material-ui/icons/Edit';
import CardHeader from '../../common/Card/CardHeader';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import CONSTANT from '../../bootstrap/Constant';
import * as HandleRequest from '../../api/HandleRequest';
import API_URL from '../../bootstrap/Url';
import CustomInput from '../../common/FormControls/CustomInput/CustomInput';
import { SketchPicker } from 'react-color';
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import Check from "@material-ui/icons/Check";
import Remove from "@material-ui/icons/Remove";
import Add from "@material-ui/icons/Add";
import Save from "@material-ui/icons/SaveAlt";

import customCheckboxRadioSwitch from "../../../styles/components/regularFormStyle";
import buttonGroupStyle from "../../../styles/components/buttonGroupStyle";
import { infoColor } from "../../../styles/material-dashboard-pro-react"

import MenuPopup from '../Menu/MenuPopup';


const styles = (theme: Theme) => createStyles({

    ...customCheckboxRadioSwitch,
    ...buttonGroupStyle,
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
        alignSelf: "center",
        "@media (min-width: 992px)": {
            float: "right",
            top: "30%",
            position: "relative"
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

    formControl: {
        paddingTop: "5px !important",
        margin: "0px !important"
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
    total: {
        fontSize: "14px",
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
    },
    editlink: {
        zIndex: 1,
        position: "relative",
        left: "85%",
        top: "35px"
    },
    icon: {
        color: infoColor
    }

});


export interface IEditBookingState extends IFormState {
    anchorEl: any,
    anchorEl2: any,
    menus: any,
    isShowMenuModal: boolean,
    menu_type: string,
    services_mst:any,
}

class BookingEditScreen extends React.Component<{ classes: any, match: any }, IEditBookingState> {

    abortControler = new AbortController();
    public state = {
        menu_type: 'food',
        anchorEl: null,
        anchorEl2: null,
        isLoading: true,
        isSubmitDisabled: true,
        isHandleEvent: false,
        isValidate: false,
        isError: false,
        showMessage: false,
        model: new BookingModel(),
        menus: [],
        status: "",
        clientError: { status: undefined },
        validateMessage: { errors: "" },
        modalImage: "",
        isShowImageModal: false,
        isShowMenuModal: false,
        time: undefined,
        services_mst:[],
    }

    async componentDidMount() {
        document.title = CONSTANT.PAGE_TITLE;
        const signal = this.abortControler.signal;
        const response = await HandleRequest.findOne(API_URL.BOOKING_CRL_show, this.props.match.params.booked_cd, signal);
        let model: BookingModel = Object.assign(new BookingModel(), response.result.data);
        model.try_date_time = parseDateFormat(model.try_date, 'HH:mm');
        model.activate_date_time = parseDateFormat(model.activate_date, 'HH:mm');
        model.plan.org_date_time = parseDateFormat(model.plan.org_date, 'HH:mm');
        debugger;
        const cachedService:string = localStorage.getItem(CONSTANT.LOCAL_STORE.services);
        const services_mst:IOption[] = JSON.parse(cachedService);

        this.setState({
            model,
            isLoading: false,
            services_mst:services_mst
        })
    }

    public componentWillUnmount() {
        this.abortControler.abort();
    }

    public hanleChangeTime = (isRequired: boolean, name: string, event: any) => {
        const { model } = this.state;
        var value;
        //Change Booking infor with Date formate
        if (name == "try_date_time" || name == "activate_date_time" || name == "org_date_time") {
            if (event._isValid !== undefined) {
                value = event.format('HH:mm');
            } else if (isDateCorrectFormat(event.trim(), 'HH:mm')) {
                value = event.trim();
            } else {
                value = "";
            }
        } else if (name == "try_date" || name == "activate_date") {
            if (event._isValid !== undefined) {
                value = event.format('DD-MM-YYYY');
            } else if (isDateCorrectFormat(event.trim(), 'DD-MM-YYYY')) {
                value = event.trim();
            } else {
                value = "";
            }
        }

        const errMessage = BookingValidate(isRequired, name, value);
        this.setState({
            model: { ...model, [name]: value ? value : "" },
            clientError: { ...this.state.clientError, [name]: errMessage },
        }, () => {
            this.canSubmit();
        });
    }


    public handleChange = (isRequired: boolean, name: string, event: any) => {
        debugger;
        const { model } = this.state;
        var value = event.target.value;
        // Change Customer info model.customer
        var customerInfo = ["first_name", "last_name", "address", "phone"];
        if (customerInfo.includes(name)) {
            model.customer[name] = value;
        }

        //Change Plan info model.plan
        var planInfo = ["br_name", "gr_name", "org_address", "org_date", "plan_date"];
        if (planInfo.includes(name)) {
            model.plan[name] = value;
        }
        const errMessage = BookingValidate(isRequired, name, value);
        this.setState({
            model: { ...model, [name]: value ? value : "" },
            clientError: { ...this.state.clientError, [name]: errMessage },
        }, () => {
            this.canSubmit();
        });

    }

    public handleChangeCustomizeFields = (isRequired: boolean, name: string, event: any) => {
        // Change Custom Fields
        const { model } = this.state;
        var value = event.target.value;

        var customizeFields = model.customize_fields.map((field: ICustomizeFieldsItem, index) => {
            var customize_field_answers = field.customize_field_answer.trim().split(",");
            if (field.customize_field_type.toLowerCase() == "checkbox") {
                var checked = event.target.checked;
                field.customize_field_value.map((option: IOption, index: number) => {
                    if (name == field.customize_field_id + ":" + option.key) {
                        var buildedAws: [] = this.buildAnswerCustomField(customize_field_answers, value, checked);
                        field.customize_field_answer = buildedAws.filter(function (el: any) { return !isEmpty(el) }).join(",")
                    }
                });
            } else if (field.customize_field_type.toLowerCase() == "radio") {
                field.customize_field_value.map((option: IOption, index: number) => {
                    if (name == field.customize_field_id + ":" + option.key) {
                        field.customize_field_answer = value;
                    }
                });
            } else {
                if (name == "customize_field_" + field.customize_field_id) {
                    field.customize_field_answer = value;
                }
            }
            return field;
        });
        //build answer
        model.customize_fields = customizeFields;
        const errMessage = BookingValidate(isRequired, name, value);
        this.setState({
            model: { ...model, [name]: value ? value : "" },
            clientError: { ...this.state.clientError, [name]: errMessage },
        }, () => {
            this.canSubmit();
        });

    }

    /**
     * build answer 
     * @param answers array
     * @param answer string
     * @param checked boolean
     */
    private buildAnswerCustomField = (answers: any, answer: string, checked: boolean) => {
        if (answers.length == 0) {
            return answers;
        }

        if (answers.indexOf(answer) < 0) {
            if (checked) {

                answers.push(answer);
            }
        } else {
            if (checked) {
                answers[answers.indexOf(answer)] = answer;
            } else {
                answers[answers.indexOf(answer)] = "";
            }
        }


        return answers;
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

    public onToggleMenuModal = (event: any) => {
        const { isShowMenuModal } = this.state;
        this.setState({ isShowMenuModal: !isShowMenuModal });
    }

    private handleEdit = async () => {
    }

    private handleChangeComplete = (id: any, color: any) => {
        const { model } = this.state;
        if (id == "color_picker_1") {
            model.booked_color = color.hex;
        } else {
            model.booked_color_2 = color.hex;
        }

        this.setState({ model });
    };


    private handleClickCloseColor = () => {
        this.setState({
            anchorEl: null,
            anchorEl2: null,
        });
    };

    private handleClickOpenColor = (event: any) => {
        if (event.currentTarget.id == "color_1") {
            this.setState({
                anchorEl: event.currentTarget,
            });
        } else if (event.currentTarget.id == "color_2") {
            this.setState({
                anchorEl2: event.currentTarget,
            });
        }

    };

    /**
     * Edit Menu Action
     * 
     */
    private handleEditMenu = async (name: string, evt: any) => {
        this.setState({ isLoading: true, isShowMenuModal: true })
        const signal = this.abortControler.signal;
        var param = { service_code: this.state.model.product.service_code };
        const filter = objectToQueryString(param);
        // Call api get Feedback
        const response = await HandleRequest.GetList(API_URL.BOOKING_CRL_getMenus, 1, 100000, "menu_name", "desc", filter, signal);
        this.setState({
            menus: response.result.data,
            isLoading: false,
            menu_type: name
        })

    }




    public render() {

        const { classes } = this.props;
        const { isLoading, anchorEl, anchorEl2, model, clientError, validateMessage, menus } = this.state;
        const openColor = Boolean(anchorEl);
        const openColor2 = Boolean(anchorEl2);
        const inputStStatus = showError(clientError, validateMessage, "status");

        //Food info
        var totalFood = 0;
        var totalDrink = 0;
        var qcName: any;
        var foodList: any = [];
        if (model.foods.length > 0) {
            var foods: any = model.foods.map((object: IFoodDetail, key: number) => {
                var price = Math.ceil(object.unit_price);
                qcName = <div style={{ width: "100%" }}><span>{object.booked_menu}</span></div>;
                totalFood += price * object.booked_total;
                return [object.id, object.name,
                <>

                    <div className={classes.buttonGroup}>
                        <Button
                            color="info"
                            size="sm"
                            round
                            className={classes.firstButton}
                        >
                            <Remove />
                        </Button>
                        <Button
                            disabled
                            color="info"
                            size="sm"
                            round
                            className={classes.middleButton}
                        >
                            <span style={{ fontWeight: "bold" }}>{object.booked_total}</span>
                        </Button>
                        <Button
                            color="info"
                            size="sm"
                            round
                            className={classes.lastButton}
                        >
                            <Add />
                        </Button>
                    </div></>
                    , convertCurrency('vi-VN', price), convertCurrency('vi-VN', price * object.booked_total)
                ]
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

            foodList.push(<GridContainer key={2}>
                <GridItem xs={12} sm={12} md={3}>
                    <FormLabel className={classes.labelHorizontal}>
                        Món ăn
                    </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={12} md={9}>
                    <IconButton aria-label="Edit" className={classes.right + " " + classes.editlink} onClick={this.handleEditMenu.bind(this, 'food')}>
                        <EditIcon className={classes.icon} fontSize="small" />
                    </IconButton>
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

            //Drink list

            if (model.drinks.length > 0) {
                var drinks: any = model.drinks.map((object: IDrinkDetail, key: number) => {
                    var price = Math.ceil(object.unit_price);
                    qcName = <div style={{ width: "100%" }}><span>{object.booked_menu}</span></div>;
                    totalDrink += price * object.booked_total;
                    return [object.id, object.name,
                    <>

                        <div className={classes.buttonGroup}>
                            <Button
                                color="info"
                                size="sm"
                                round
                                className={classes.firstButton}
                            >
                                <Remove />
                            </Button>
                            <Button
                                disabled
                                color="info"
                                size="sm"
                                round
                                className={classes.middleButton}
                            >
                                <span style={{ fontWeight: "bold" }}>{object.booked_total}</span>
                            </Button>
                            <Button
                                color="info"
                                size="sm"
                                round
                                className={classes.lastButton}
                            >
                                <Add />
                            </Button>
                        </div></>
                        , convertCurrency('vi-VN', price), convertCurrency('vi-VN', price * object.booked_total)
                    ]
                });
                var total = {
                    total: true, colspan: "3", amount: convertCurrency('vi-VN', totalDrink)
                };
                drinks.push(total);

                var drink = <CustomTable
                    tableHeaderColor="primary"
                    tableHead={["ID", "Tên", "Số lượng", "Đơn giá", "Thành tiền"]}
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
                                Nước uống
                            </FormLabel>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={9}>
                            <IconButton aria-label="Edit" className={classes.right + " " + classes.editlink} onClick={this.handleEditMenu.bind(this, 'drink')}>
                                <EditIcon className={classes.icon} fontSize="small" />
                            </IconButton>
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



        return <>
            <GridContainer>
                <GridItem xs={12} sm={12} md={8}>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <Card>
                                <CardMiniHeader color="primary">
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
                                </CardMiniHeader>
                                {model.booked_cd != '' && <CardBody>
                                    <GridContainer>
                                        <GridItem xs={12} sm={3} md={3}>
                                            <FormLabel className={classes.labelHorizontal}>
                                                Trạng thái
                                            </FormLabel>
                                        </GridItem>
                                        <GridItem xs={12} sm={9} md={9}>
                                            <CustomSelect
                                                id="status"
                                                formControlProps={{
                                                    fullWidth: true,
                                                    className: classes.formControl
                                                }}
                                                value={model.status}
                                                onChange={this.handleChange.bind(this, true, "status")}
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
                                    <GridContainer>
                                        <GridItem xs={12} sm={3} md={3}>
                                            <FormLabel className={classes.labelHorizontal}>
                                                Ngày mua
                                            </FormLabel>
                                        </GridItem>
                                        <GridItem xs={12} sm={9} md={9}>
                                            <CustomDatePicker
                                                formControlProps={{
                                                    fullWidth: true,
                                                    className: classes.formControl
                                                }}
                                                prop={
                                                    {
                                                        timeFormat: false,
                                                        dateFormat: 'DD-MM-YYYY HH:mm:ss',
                                                        value: parseDateFormat(model.booked_date, 'DD-MM-YYYY HH:mm:ss'),
                                                    }
                                                }

                                                inputProps={
                                                    {
                                                        name: "booked_date",
                                                        disabled: true
                                                    }
                                                }
                                            />
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={3} md={3}>
                                            <FormLabel className={classes.labelHorizontal}>
                                                Ngày xem
                                            </FormLabel>
                                        </GridItem>
                                        <GridItem xs={6} sm={3} md={3}>
                                            <CustomDatePicker
                                                formControlProps={{
                                                    fullWidth: true,
                                                    className: classes.formControl
                                                }}
                                                prop={
                                                    {
                                                        timeFormat: false,
                                                        dateFormat: 'DD-MM-YYYY',
                                                        defaultValue: parseDateFormat(model.try_date, 'DD-MM-YYYY'),
                                                        onBlur: this.hanleChangeTime.bind(this, true, "try_date")
                                                    }
                                                }
                                                inputProps={
                                                    {
                                                        name: "try_date",
                                                    }
                                                }
                                            />
                                        </GridItem>
                                        <GridItem xs={6} sm={2} md={2}>
                                            <CustomDatePicker
                                                formControlProps={{
                                                    className: classes.formControl
                                                }}
                                                prop={
                                                    {
                                                        dateFormat: false,
                                                        timeFormat: 'HH:mm',
                                                        defaultValue: parseDateFormat(model.try_date_time, 'HH:mm'),
                                                        onBlur: this.hanleChangeTime.bind(this, true, "try_date_time"),
                                                        timeConstraints: {
                                                            minutes: {
                                                                min: 0,
                                                                max: 59,
                                                                step: 5,
                                                            }
                                                        }
                                                    }
                                                }
                                                inputProps={
                                                    {
                                                        name: "try_date_time",
                                                    }
                                                }
                                            />
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={3} md={3}>
                                            <FormLabel className={classes.labelHorizontal}>
                                                Ngày nhận
                                            </FormLabel>
                                        </GridItem>
                                        <GridItem xs={6} sm={3} md={3}>
                                            <CustomDatePicker
                                                formControlProps={{
                                                    fullWidth: true,
                                                    className: classes.formControl
                                                }}
                                                prop={
                                                    {
                                                        timeFormat: false,
                                                        dateFormat: 'DD-MM-YYYY',
                                                        defaultValue: parseDateFormat(model.activate_date, 'DD-MM-YYYY'),
                                                        onBlur: this.hanleChangeTime.bind(this, true, "activate_date")
                                                    }
                                                }
                                                inputProps={
                                                    {
                                                        name: "activate_date",
                                                    }
                                                }
                                            />
                                        </GridItem>
                                        <GridItem xs={6} sm={2} md={2}>
                                            <CustomDatePicker
                                                formControlProps={{
                                                    className: classes.formControl
                                                }}
                                                prop={
                                                    {
                                                        dateFormat: false,
                                                        timeFormat: 'HH:mm',
                                                        defaultValue: parseDateFormat(model.activate_date_time, 'HH:mm'),
                                                        onBlur: this.hanleChangeTime.bind(this, true, "activate_date_time"),
                                                        timeConstraints: {
                                                            minutes: {
                                                                min: 0,
                                                                max: 59,
                                                                step: 5,
                                                            }
                                                        }
                                                    }
                                                }
                                                inputProps={
                                                    {
                                                        name: "activate_date_time",
                                                    }
                                                }
                                            />
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={3} md={3}>
                                            <FormLabel className={classes.labelHorizontal}>
                                                Tên khách hàng
                                                </FormLabel>
                                        </GridItem>
                                        <GridItem xs={12} sm={4} md={4}>
                                            <CustomInput
                                                id="first_name"
                                                formControlProps={{
                                                    fullWidth: true,
                                                    className: classes.formControl
                                                }}
                                                inputProps={{
                                                    type: "text",
                                                    defaultValue: model.customer.first_name,
                                                    onBlur: this.handleChange.bind(this, true, "first_name")
                                                }}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={4} md={4}>
                                            <CustomInput
                                                id="last_name"
                                                formControlProps={{
                                                    fullWidth: true,
                                                    className: classes.formControl
                                                }}
                                                inputProps={{
                                                    type: "text",
                                                    defaultValue: model.customer.last_name,
                                                    onBlur: this.handleChange.bind(this, true, "last_name")
                                                }}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={3} md={3}>
                                            <FormLabel className={classes.labelHorizontal}>
                                                Số điện thoại
                                                </FormLabel>
                                        </GridItem>
                                        <GridItem xs={12} sm={9} md={9}>
                                            <CustomInput
                                                id="phone"
                                                formControlProps={{
                                                    fullWidth: true,
                                                    className: classes.formControl
                                                }}
                                                inputProps={{
                                                    type: "text",
                                                    defaultValue: model.customer.phone,
                                                    onBlur: this.handleChange.bind(this, true, "phone")
                                                }}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={3} md={3}>
                                            <FormLabel className={classes.labelHorizontal}>
                                                Địa chỉ
                                                </FormLabel>
                                        </GridItem>
                                        <GridItem xs={12} sm={9} md={9}>
                                            <CustomInput
                                                id="address"
                                                formControlProps={{
                                                    fullWidth: true,
                                                    className: classes.formControl
                                                }}
                                                inputProps={{
                                                    type: "text",
                                                    defaultValue: model.customer.address,
                                                    onBlur: this.handleChange.bind(this, true, "address")
                                                }}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <h6>Khách hàng </h6>
                                        </GridItem>
                                    </GridContainer>

                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={3}>
                                            <FormLabel className={classes.labelHorizontal}>
                                                Tên cô dâu
                                            </FormLabel>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={9}>
                                            <CustomInput
                                                id="br_name"
                                                formControlProps={{
                                                    fullWidth: true,
                                                    className: classes.formControl
                                                }}
                                                inputProps={{
                                                    type: "text",
                                                    defaultValue: model.plan.br_name,
                                                    onBlur: this.handleChange.bind(this, true, "br_name")
                                                }}
                                            />
                                        </GridItem>
                                    </GridContainer>

                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={3}>
                                            <FormLabel className={classes.labelHorizontal}>
                                                Tên chú rễ
                                            </FormLabel>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={9}>
                                            <CustomInput
                                                id="gr_name"
                                                formControlProps={{
                                                    fullWidth: true,
                                                    className: classes.formControl
                                                }}
                                                inputProps={{
                                                    type: "text",
                                                    defaultValue: model.plan.gr_name,
                                                    onBlur: this.handleChange.bind(this, true, "gr_name")
                                                }}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={3}>
                                            <FormLabel className={classes.labelHorizontal}>
                                                Nơi tổ chức
                                            </FormLabel>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={9}>
                                            <CustomInput
                                                id="org_address"
                                                formControlProps={{
                                                    fullWidth: true,
                                                    className: classes.formControl
                                                }}
                                                inputProps={{
                                                    type: "text",
                                                    defaultValue: model.plan.org_address,
                                                    onBlur: this.handleChange.bind(this, true, "org_address")
                                                }}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={3}>
                                            <FormLabel className={classes.labelHorizontal}>
                                                Ngày tổ chức
                                            </FormLabel>
                                        </GridItem>
                                        <GridItem xs={12} sm={3} md={3}>
                                            <CustomDatePicker
                                                formControlProps={{
                                                    fullWidth: true,
                                                    className: classes.formControl
                                                }}
                                                prop={
                                                    {
                                                        timeFormat: false,
                                                        dateFormat: 'DD-MM-YYYY',
                                                        defaultValue: parseDateFormat(model.plan.org_date, 'DD-MM-YYYY'),
                                                    }
                                                }
                                                inputProps={
                                                    {
                                                        name: "org_date",
                                                        onBlur: this.handleChange.bind(this, true, "org_date")
                                                    }
                                                }
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={3} md={3}>
                                            <CustomDatePicker
                                                formControlProps={{
                                                    className: classes.formControl
                                                }}
                                                prop={
                                                    {
                                                        dateFormat: false,
                                                        timeFormat: 'HH:mm',
                                                        defaultValue: parseDateFormat(model.plan.org_date_time, 'HH:mm'),
                                                        timeConstraints: {
                                                            minutes: {
                                                                min: 0,
                                                                max: 59,
                                                                step: 5,
                                                            }
                                                        }
                                                    }
                                                }
                                                inputProps={
                                                    {
                                                        name: "org_date_time",
                                                        onBlur: this.handleChange.bind(this, true, "org_date_time")
                                                    }
                                                }
                                            />
                                        </GridItem>

                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <h6>Sản phẩm </h6>
                                        </GridItem>
                                    </GridContainer>
                                    {!isEmpty(model.booked_size) &&
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
                                                <CustomInput
                                                    id="booked_size"
                                                    formControlProps={{
                                                        fullWidth: true,
                                                        className: classes.formControl
                                                    }}
                                                    inputProps={{
                                                        type: "number",
                                                        defaultValue: model.booked_size,
                                                        onBlur: this.handleChange.bind(this, true, "booked_size")
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                    }

                                    {!isEmpty(model.booked_color) &&
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={3}>
                                            <FormLabel className={classes.labelHorizontal}>
                                                Màu
                                            </FormLabel>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={1}>
                                            <div style={{
                                                background: model.booked_color,
                                                width: "28px",
                                                height: "28px",
                                                marginTop: "5px"
                                            }}
                                                id="color_1"
                                                onClick={this.handleClickOpenColor}></div>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={8}>
                                            <Button
                                                aria-owns={open ? 'simple-popper' : undefined}
                                                aria-haspopup="true"
                                                variant="contained"
                                                color='primary'
                                                size="sm"
                                                id="color_1"
                                                onClick={this.handleClickOpenColor}
                                            >
                                                Chọn
                                            </Button>
                                        </GridItem>
                                    </GridContainer>
                                    }

                                    {!isEmpty(model.booked_size_2) &&
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={3}>
                                            <FormLabel className={classes.labelHorizontal}>
                                                {
                                                    ['NC', 'PHT', 'STD', 'TC', 'DRSS', 'NC'].includes(model.vendor_service.service_code) ? 'Size 2'
                                                        : ['QUAC', 'REST', 'TRTR', 'VN'].includes(model.vendor_service.service_code) ? 'Số lượng 2'
                                                            : ['XC'].includes(model.vendor_service.service_code) ? 'Số chỗ 2' : 'Size 2'
                                                }
                                            </FormLabel>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={9}>
                                            <CustomInput
                                                id="booked_size_2"
                                                formControlProps={{
                                                    fullWidth: true,
                                                    className: classes.formControl
                                                }}
                                                inputProps={{
                                                    type: "text",
                                                    defaultValue: model.booked_size_2,
                                                    onBlur: this.handleChange.bind(this, true, "booked_size_2")
                                                }}
                                            />

                                        </GridItem>
                                    </GridContainer>
                                    }

                                    {!isEmpty(model.booked_color_2) &&
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={3}>
                                            <FormLabel className={classes.labelHorizontal}>
                                                Màu 2
                                            </FormLabel>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={1}>
                                            <div style={{
                                                background: model.booked_color_2,
                                                width: "28px",
                                                height: "28px",
                                                marginTop: "5px"
                                            }}
                                                id="color_2"
                                                onClick={this.handleClickOpenColor}></div>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={8}>
                                            <Button
                                                aria-owns={open ? 'simple-popper' : undefined}
                                                aria-haspopup="true"
                                                variant="contained"
                                                color='primary'
                                                size="sm"
                                                id="color_2"
                                                onClick={this.handleClickOpenColor}
                                            >
                                                Chọn
                                            </Button>
                                        </GridItem>
                                    </GridContainer>
                                    }
                                    
                                    {!isEmpty(model.booked_material) &&
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={3}>
                                            <FormLabel className={classes.labelHorizontal}>
                                                Chất liệu
                                            </FormLabel>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={9}>
                                            <CustomInput
                                                id="booked_material"
                                                formControlProps={{
                                                    fullWidth: true,
                                                    className: classes.formControl
                                                }}
                                                inputProps={{
                                                    type: "text",
                                                    defaultValue: model.booked_material,
                                                    onBlur: this.handleChange.bind(this, true, "booked_material")
                                                }}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                    }

                                    {!isEmpty(model.booked_style) &&
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={3}>
                                            <FormLabel className={classes.labelHorizontal}>
                                                Phong cách
                                            </FormLabel>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={9}>
                                            <CustomInput
                                                id="booked_style"
                                                formControlProps={{
                                                    fullWidth: true,
                                                    className: classes.formControl
                                                }}
                                                inputProps={{
                                                    type: "text",
                                                    defaultValue: model.booked_style,
                                                    onBlur: this.handleChange.bind(this, true, "booked_style")
                                                }}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                    }
                                    
                                    {!isEmpty(model.booked_album_page) &&
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={3}>
                                            <FormLabel className={classes.labelHorizontal}>
                                                Số trang Album
                                            </FormLabel>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={9}>
                                            <CustomInput
                                                id="booked_album_page"
                                                formControlProps={{
                                                    fullWidth: true,
                                                    className: classes.formControl
                                                }}
                                                inputProps={{
                                                    type: "number",
                                                    defaultValue: model.booked_album_page,
                                                    onBlur: this.handleChange.bind(this, true, "booked_album_page")
                                                }}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                    }
                                    
                                    {!isEmpty(model.booked_photo_size) &&
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={3}>
                                            <FormLabel className={classes.labelHorizontal}>
                                                Kích cỡ ảnh tiệc
                                            </FormLabel>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={9}>
                                            <CustomInput
                                                id="booked_photo_size"
                                                formControlProps={{
                                                    fullWidth: true,
                                                    className: classes.formControl
                                                }}
                                                inputProps={{
                                                    type: "text",
                                                    defaultValue: model.booked_photo_size,
                                                    onBlur: this.handleChange.bind(this, true, "booked_photo_size")
                                                }}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                    }

                                    {!isEmpty(model.booked_time) &&
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={3}>
                                            <FormLabel className={classes.labelHorizontal}>
                                                Giờ
                                            </FormLabel>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={9}>
                                            <CustomDatePicker
                                                formControlProps={{
                                                    className: classes.formControl
                                                }}
                                                prop={
                                                    {
                                                        dateFormat: false,
                                                        timeFormat: 'HH:mm',
                                                        defaultValue: parseDateFormat(model.booked_time, 'HH:mm'),
                                                        onBlur: this.hanleChangeTime.bind(this, true, "booked_time"),
                                                        timeConstraints: {
                                                            minutes: {
                                                                min: 0,
                                                                max: 59,
                                                                step: 5,
                                                            }
                                                        }
                                                    }
                                                }
                                                inputProps={
                                                    {
                                                        name: "booked_time",
                                                    }
                                                }
                                            />

                                        </GridItem>
                                    </GridContainer>
                                    }

                                    {/** Customize Field */}
                                    {model.customize_fields.map((field: ICustomizeFieldsItem, k: number) => {
                                        var input: any;
                                        switch (field.customize_field_type.toLowerCase()) {
                                            case "textbox":
                                                input = <CustomInput key={k}
                                                    id={"customize_field_" + field.customize_field_id}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                        className: classes.formControl
                                                    }}
                                                    inputProps={{
                                                        type: "text",
                                                        defaultValue: field.customize_field_answer,
                                                        onBlur: this.handleChangeCustomizeFields.bind(this, true, "customize_field_" + field.customize_field_id)
                                                    }}
                                                />
                                                break;
                                            case "textarea":
                                                input = <CustomInput key={k}
                                                    multiline={true}
                                                    id={"customize_field_" + field.customize_field_id}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                        className: classes.formControl
                                                    }}
                                                    inputProps={{
                                                        type: "text",
                                                        defaultValue: field.customize_field_answer,
                                                        onBlur: this.handleChangeCustomizeFields.bind(this, true, "customize_field_" + field.customize_field_id),
                                                        rows: 3
                                                    }}
                                                />
                                                break;
                                            case "combobox":
                                                var values: IOption[] = field.customize_field_value;
                                                input = <CustomSelect
                                                    id={"customize_field_" + field.customize_field_id}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                    value={field.customize_field_answer}
                                                    onChange={this.handleChangeCustomizeFields.bind(this, true, "customize_field_" + field.customize_field_id)}
                                                    inputProps={{
                                                        name: "customize_field_" + field.customize_field_id,
                                                    }}
                                                    items={values}
                                                />
                                                break;
                                            case "checkbox":
                                                var values: IOption[] = field.customize_field_value;
                                                var checkbox: any;
                                                input = [];
                                                var customize_field_answers = field.customize_field_answer.trim().split(",");
                                                values.map((option: IOption, index: number) => {
                                                    var checked = customize_field_answers.includes(option.key);
                                                    checkbox = <FormControlLabel key={index}
                                                        control={
                                                            <Checkbox
                                                                checked={checked}
                                                                value={option.key}
                                                                onChange={this.handleChangeCustomizeFields.bind(this, false, field.customize_field_id + ":" + option.key)}
                                                                checkedIcon={
                                                                    <Check className={classes.checkedIcon} />
                                                                }
                                                                icon={<Check className={classes.uncheckedIcon} />}
                                                                classes={{
                                                                    checked: classes.checked,
                                                                    root: classes.checkRoot
                                                                }}
                                                            />
                                                        }
                                                        classes={{
                                                            label: classes.label
                                                        }}
                                                        label={option.value}
                                                    />
                                                    input.push(checkbox)
                                                })
                                                break;
                                            case "radio":
                                                var values: IOption[] = field.customize_field_value;
                                                var radio: any;
                                                input = [];
                                                values.map((option: IOption, index: number) => {
                                                    radio = <FormControlLabel key={index}
                                                        control={
                                                            <Radio
                                                                checked={option.key == field.customize_field_answer}
                                                                value={option.key}
                                                                onChange={this.handleChangeCustomizeFields.bind(this, false, field.customize_field_id + ":" + option.key)}
                                                                icon={
                                                                    <FiberManualRecord
                                                                        className={classes.radioUnchecked}
                                                                    />
                                                                }
                                                                checkedIcon={
                                                                    <FiberManualRecord
                                                                        className={classes.radioChecked}
                                                                    />
                                                                }
                                                                classes={{
                                                                    checked: classes.radio,
                                                                    root: classes.radioRoot
                                                                }}
                                                            />
                                                        }
                                                        classes={{
                                                            label: classes.label
                                                        }}
                                                        label={option.value}
                                                    />
                                                    input.push(radio)
                                                })
                                                break;
                                            default:
                                                input = <CustomInput key={k}
                                                    id={"customize_field_" + field.customize_field_id}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                        className: classes.formControl
                                                    }}
                                                    inputProps={{
                                                        type: "text",
                                                        defaultValue: field.customize_field_value,
                                                        onBlur: this.handleChangeCustomizeFields.bind(this, true, "customize_field_" + field.customize_field_id)
                                                    }}
                                                />
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
                                                    {input}
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
                <MenuPopup type={this.state.menu_type} service_code={model.product.service_code} title="Thực đơn" data={menus} isShowModal={this.state.isShowMenuModal} onToggleMenuModal={this.onToggleMenuModal} isLoading={this.state.isLoading} />
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
                <Popover
                    open={openColor}
                    anchorEl={this.state.anchorEl}
                    onClose={this.handleClickCloseColor}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <SketchPicker
                        color={model.booked_color}
                        id="color_picker_1"
                        onChangeComplete={this.handleChangeComplete.bind(this, "color_picker_1")}
                    />
                </Popover>
                <Popover
                    open={openColor2}
                    anchorEl={this.state.anchorEl2}
                    onClose={this.handleClickCloseColor}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <SketchPicker
                        color={model.booked_color_2}
                        id="color_picker_2"
                        onChangeComplete={this.handleChangeComplete.bind(this, "color_picker_2")}
                    />
                </Popover>
            </div>

        </>
    }
}

export default withStyles(styles)(BookingEditScreen)