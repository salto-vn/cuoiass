import * as React from "react";
import { withStyles, Theme, createStyles, FormLabel, Modal, Popover, FormControlLabel, Radio, Checkbox, IconButton, List, ListItem, ListItemIcon, ListSubheader, ListItemText, Input, Icon } from '@material-ui/core';
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
import { isEmptyKeyInObject, showError, convertCurrency, isDateCorrectFormat, isEmpty, objectToQueryString, parseDateFormat, createSnackBarMess, filterEmpty } from '../../common/Utils';
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
import EditIcon from "@material-ui/icons/Edit";
import Save from "@material-ui/icons/SaveAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import normalFormStyle from "../../../styles/components/normalFormStyle";

import MenuPopup from '../Menu/MenuPopup';
import OptionPopup from '../Menu/OptionPopup';

export interface IEditBookingState extends IFormState {
    anchorEl: any,
    anchorEl2: any,
    menus: any,
    isShowMenuModal: boolean,
    isShowOptionModal: boolean,
    menu_type: string,
    services_mst: any,
    isEditMenu: boolean,
}

const styles = (theme: Theme) => createStyles({
    ...normalFormStyle(theme),
    maxWidth: {
        maxWidth: "100px",
        minWidth: "100px"
    },
    minWidth: {
        minWidth: "150px"
    },
});

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
        isShowOptionModal: false,
        time: undefined,
        services_mst: [],
        isEditMenu: false
    }

    async componentDidMount() {
        document.title = CONSTANT.PAGE_TITLE;
        const signal = this.abortControler.signal;
        const response = await HandleRequest.findOne(API_URL.BOOKING_CRL_show, this.props.match.params.booked_cd, signal);
        let model: BookingModel = Object.assign(new BookingModel(), response.result.data);
        model.old_options = model.options.concat();
        model.try_date_time = parseDateFormat(model.try_date, 'HH:mm');
        model.activate_date_time = parseDateFormat(model.activate_date, 'HH:mm');
        model.plan.org_date_time = parseDateFormat(model.plan.org_date, 'HH:mm');
        const cachedService: string = localStorage.getItem(CONSTANT.LOCAL_STORE.services);
        const services_mst: IOption[] = JSON.parse(cachedService);
        localStorage.removeItem("SELECTED_MENU_TMP");
        this.setState({
            model,
            isLoading: false,
            services_mst: services_mst
        })
    }

    public componentWillUnmount() {
        this.abortControler.abort();
    }

    public hanleChangeTime = (isRequired: boolean, name: string, event: any) => {
        const { model } = this.state;
        var value;
        //Change Booking infor with Date formate
        if (name == "try_date_time" || name == "activate_date_time" || name == "org_date_time" || name == "booked_time") {
            if (event._isValid !== undefined) {
                value = event.format('HH:mm');
            } else if (isDateCorrectFormat(event.trim(), 'HH:mm')) {
                value = event.trim();
            } else {
                value = event;
            }
        } else if (name == "try_date" || name == "activate_date" || name == "org_date") {
            if (event._isValid !== undefined) {
                value = event.format('DD-MM-YYYY');
            } else if (isDateCorrectFormat(event.trim(), 'DD-MM-YYYY')) {
                value = event.trim();
            } else {
                value = event;
            }
        }


        const errMessage = BookingValidate(isRequired, name, value);

        var planInfo = ["org_date", "org_date_time"];
        if (planInfo.includes(name)) {
            model.plan[name] = value;
        }

        this.setState({
            model: { ...model, [name]: value ? value : "" },
            clientError: { ...this.state.clientError, [name]: errMessage },
        }, () => {
            this.canSubmit();
        });
    }

    /**
     * 
     */
    private handleChange = (isRequired: boolean, name: string, event: any) => {
        const { model } = this.state;
        var value = event.target.value;
        // Change Customer info model.customer
        var customerInfo = ["first_name", "last_name", "address", "phone"];
        //Change Plan info model.plan
        var planInfo = ["br_name", "gr_name", "org_address", "plan_date"];
        if (customerInfo.includes(name)) {
            model.customer[name] = value;
        } else if (planInfo.includes(name)) {
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


    /**
     * 
     */
    private handleChangeCustomizeFields = (isRequired: boolean, name: string, event: any) => {
        // Change Custom Fields
        const { model } = this.state;
        var value = event.target.value;
        var customFieldQuestion: IOption[] = [];
        var rule: any;
        let errMessage ="";
        var customizeFields = model.customize_fields.map((field: ICustomizeFieldsItem, index) => {
            var customize_field_answers = field.customize_field_answer.trim().split(",");
            if (field.customize_field_type.toLowerCase() == "checkbox") {
                customFieldQuestion = field.customize_field_questions;
                var checked = event.target.checked;
                field.customize_field_questions.map((option: IOption, index: number) => {
                    if (name == "customize_field_" + field.customize_field_id) {
                        var buildedAws: any = this.buildAnswerCustomField(customize_field_answers, value, checked);
                        field.customize_field_answer = filterEmpty(buildedAws).join(',');
                         errMessage = BookingValidate(isRequired, name, field.customize_field_answer, rule);
                    }
                });
                rule = { in_array: customFieldQuestion };
            } else if ("radio" == field.customize_field_type.toLowerCase()) {
                customFieldQuestion = field.customize_field_questions;
                field.customize_field_questions.map((option: IOption, index: number) => {
                    if (name == "customize_field_" + field.customize_field_id) {
                        field.customize_field_answer = value;
                    }
                });
                rule = { in_array: customFieldQuestion };
                 errMessage = BookingValidate(isRequired, name, field.customize_field_answer, rule);
            } else {
                rule = { max: 255 };
                if (name == "customize_field_" + field.customize_field_id) {
                    field.customize_field_answer = value;
                }
                 errMessage = BookingValidate(isRequired, name, field.customize_field_answer, rule);
            }
            return field;
        });
        //build answer
        model.customize_fields = customizeFields;
        
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
        if (isShowMenuModal) {
            this.abortControler.abort();
        }
    }

    public onToggleOptionModal = (event: any) => {
        const { isShowOptionModal } = this.state;
        this.setState({ isShowOptionModal: !isShowOptionModal });
        if (isShowOptionModal) {
            this.abortControler.abort();
        }

    }

    private handleEdit = async () => {
        this.setState({
            isLoading: true
        })
        if (this.state.isHandleEvent) {
            return;
        }

        const { model } = this.state;

        // model.review_response_vendor_id = 1; //Logon User TODO
        this.setState({ isHandleEvent: true });
        this.abortControler = new AbortController();
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
            let model: BookingModel = Object.assign(new BookingModel(), response.result.data);
            return this.setState({
                model: model,
                showMessage: true,
                isValidate: response.isValidate,
                isError: response.isError,
                isHandleEvent: false,
                isLoading: false,
            });
        }
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

        var response: any;
        const { model } = this.state;
        this.abortControler = new AbortController();
        const signal = this.abortControler.signal;
        this.setState({
            menus: [],
        });
        if (name == 'option') {
            model.old_options = model.options.concat();
            this.setState({ isLoading: true, isShowOptionModal: true });
            var param = { prd_id: this.state.model.product.prd_id };
            const filter = objectToQueryString(param, '=', '&');
            response = await HandleRequest.Get(API_URL.BOOKING_CRL_getOptions, filter, signal);
        } else {
            this.setState({ isLoading: true, isShowMenuModal: true });
            var param1 = { service_code: this.state.model.product.service_code, menu_type: name };
            const filter = objectToQueryString(param1, '=', '&');
            response = await HandleRequest.Get(API_URL.BOOKING_CRL_getMenus, filter, signal);
        }
        this.setState({
            menus: response.result.data,
            isLoading: false,
            menu_type: name,
            isEditMenu: true
        });

    }

    /**
     * 
     */
    private changeQuantity = (index: number, type: string, action: string, ev: any) => {
        const { model } = this.state;
        var rule: any = {digitsBetween: { min: 1, max: 1000000000 }};
        let errMessage = "";
        var name = "";
        debugger;
        if (type === "food") {
            name = "booked_total_food:" + index;
            var value = this.refs[name].props.inputProps.value;
            if (action === "up") {
                model.foods[index].booked_total = value + 1;
            } else {
                model.foods[index].booked_total = value <= 0 ? 0 : value - 1;
            }
            errMessage = BookingValidate(true, name, model.foods[index].booked_total, rule);

        } else if (type === 'option') {
            name = "booked_total_option:" + index;
            var value = this.refs[name].props.inputProps.value;
            if (action === "up") {
                model.options[index].option_quality = value + 1;
            } else {
                model.options[index].option_quality = value <= 0 ? 0 : value - 1;
            }
            if (this.checkExistOption(model.options[index].option_id, model.old_options)) {
                model.options[index].action = 'UPD';
            } else {
                model.options[index].action = 'NEW';
            }
            errMessage = BookingValidate(true, name, model.options[index].option_quality, rule);
        } else {
            name = "booked_total_drink:" + index;
            var value = this.refs[name].props.inputProps.value;
            if (action === "up") {
                model.drinks[index].booked_total = value + 1;
            } else {
                model.drinks[index].booked_total = value <= 0 ? 0 : value - 1;
            }
            errMessage = BookingValidate(true, name, model.drinks[index].booked_total, rule);
        }
        this.setState({ 
            model, 
            isEditMenu: false ,
            clientError: { ...this.state.clientError, [name]: errMessage }
        });
    }

    /**
     * 
     */
    private changeQuantityByInput = (index: number, type: string, ev: any) => {
        const { model } = this.state;
        var value = ev.target.value;
        var rule: any = {digitsBetween: { min: 1, max: 1000000000 }};
        var name = "";
        if (value < 0) {
            return;
        }
        if (type === "food") {
            name = "booked_total_food:" + index;
            model.foods[index].booked_total = isEmpty(value) ? '' : parseInt(value);
        } else if (type === "option") {
            model.options[index].option_quality = isEmpty(value) ? '' : parseInt(value);
            if (this.checkExistOption(model.options[index].option_id, model.old_options)) {
                model.options[index].action = 'UPD';
            } else {
                model.options[index].action = 'NEW';
            }
            name = "booked_total_option:" + index;
        } else {
            model.drinks[index].booked_total = isEmpty(value) ? '' : parseInt(value);;
            name = "booked_total_drink:" + index;
            
        }
        var errMessage = BookingValidate(true, name, value, rule);
        this.setState({ 
            model, 
            isEditMenu: false,
            clientError: { ...this.state.clientError, [name]: errMessage } });
    }

    private checkExistOption(option_id: number, old_options: IBookedOption[]) {
        let exist: boolean = false;
        old_options.forEach(option => {
            if (option.option_id == option_id) {
                exist = true;
            }
        });
        return exist;
    }

    /**
     * 
     */
    private deleteOptionHandle = (key: number, evt: any) => {
        const { model } = this.state;
        // model.old_options[key].action = 'DEL';//old_options
        model.options[key].action = 'DEL';
        this.setState({ model, isEditMenu: false });
    }

    /**
     * Get selected item at Popup screen in LocalStorage SELECTED_MENU_TMP
     * set again foods, drinks, options to model
     */
    static getDerivedStateFromProps(nextProps: any, prevState: any) {
        const selectedMenu = prevState.isEditMenu ? JSON.parse(localStorage.getItem('SELECTED_MENU_TMP')) : null;
        const { model } = prevState;
        if (!isEmpty(selectedMenu)) {
            if (!isEmpty(selectedMenu.foods)) {
                model.foods = selectedMenu.foods;
            }

            if (!isEmpty(selectedMenu.drinks)) {
                model.drinks = selectedMenu.drinks;
            }

            if (!isEmpty(selectedMenu.options)) {
                model.options = selectedMenu.options;
            }
            return { ...prevState, model };
        }

        return { ...prevState };
    }

    public handleCloseMessage = (event: any) => {
        this.setState({ showMessage: false });
    }

    public render() {

        const { classes } = this.props;
        const { isLoading, anchorEl, anchorEl2, model, clientError, isValidate, isError, showMessage, validateMessage, menus } = this.state;
        const openColor = Boolean(anchorEl);
        const openColor2 = Boolean(anchorEl2);
        //Error check
        const inputStStatus = showError(clientError, validateMessage, "status");
        const inputTryDateStatus = showError(clientError, validateMessage, "try_date");
        const inputTryDateTimeStatus = showError(clientError, validateMessage, "try_date_time");
        const inputAcDateStatus = showError(clientError, validateMessage, "activate_date");
        const inputAcDateTimeStatus = showError(clientError, validateMessage, "activate_date_time");
        const inputfirstNameStatus = showError(clientError, validateMessage, "first_name");
        const inputlastNameStatus = showError(clientError, validateMessage, "last_name");
        const inputCusPhnStatus = showError(clientError, validateMessage, "phone");
        const inputCusAddrStatus = showError(clientError, validateMessage, "address");

        const inputBrNameStatus = showError(clientError, validateMessage, "br_name");
        const inputGrNameStatus = showError(clientError, validateMessage, "gr_name");
        const inputOrAddrStatus = showError(clientError, validateMessage, "org_address");
        const inputOrDateStatus = showError(clientError, validateMessage, "org_date");
        const inputOrDateTimeStatus = showError(clientError, validateMessage, "org_date_time");
        const inputBkSizeStatus = showError(clientError, validateMessage, "booked_size");
        const inputBkSize2Status = showError(clientError, validateMessage, "booked_size_2");
        const inputBkMatlStatus = showError(clientError, validateMessage, "booked_material");
        const inputBkStyleStatus = showError(clientError, validateMessage, "booked_style");
        const inputBkAlPgStatus = showError(clientError, validateMessage, "booked_album_page");
        const inputbkPtsStatus = showError(clientError, validateMessage, "booked_photo_size");
        const inputBkTimeStatus = showError(clientError, validateMessage, "booked_time");
        const customizeFieldStatus: any = [];
        model.customize_fields.map((field: ICustomizeFieldsItem, k: number) => {
            customizeFieldStatus.push(showError(clientError, validateMessage, "customize_field_" + field.customize_field_id));
        });
        

        var totalFood = 0;
        var totalDrink = 0;
        var qcName: any;
        var resInfo: any = [];
        var paymentPrice = 0;
        resInfo.push(<GridContainer key={0}>
            <GridItem xs={12} sm={12} md={12}>
                <h6>{new ResourceUtil(this.state.services_mst).getValue(model.vendor_service.service_code)}</h6>
            </GridItem>
        </GridContainer>);

        //Food info
        if (model.foods.length > 0) {
            var foods: any = model.foods.map((object: IFoodDetail, key: number) => {
                var price = Math.ceil(object.unit_price);
                qcName = <div style={{ width: "100%" }}>
                    <span>{object.booked_menu}</span>
                </div>;
                totalFood += price * parseInt(object.booked_total);
                return [object.id, object.name,
                <>

                    <div className={classes.buttonGroup}>
                        <Button
                            color="info"
                            size="sm"
                            round
                            className={classes.firstButton}
                            onClick={this.changeQuantity.bind(this, key, "food", 'down')}
                        >
                            <Remove />
                        </Button>
                        <div className={classes.middleButton} style={{ padding: "0 5px 0 5px", width: "60px" }}>
                            <CustomInput
                                id={"booked_total_food:" + key}
                                ref={"booked_total_food:" + key}
                                formControlProps={{
                                    className: classes.formControl + " " + classes.npt
                                }}
                                center={true}
                                inputProps={{
                                    type: "number",
                                    value: object.booked_total,
                                    onChange: this.changeQuantityByInput.bind(this, key, "food"),
                                }}
                                InputProps={{
                                    min: 0
                                }}
                            />
                        </div>

                        <Button
                            color="info"
                            size="sm"
                            round
                            className={classes.lastButton}
                            onClick={this.changeQuantity.bind(this, key, "food", 'up')}
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
            paymentPrice += totalFood;
            foods.push(total);

            var quacuoi = <CustomTable
                tableHeaderColor="primary"
                tableHead={["ID", "Tên", "Số lượng", "Đơn giá", "Thành tiền"]}
                tableData={foods}
                coloredColls={[4]}
                colorsColls={["primary"]}
                customClassesForCells={[1, 2, 3, 4]}
                customCellClasses={[
                    classes.maxWidth,
                    classes.center + " " + classes.minWidth,
                    classes.right,
                    classes.right
                ]}
                customHeadClassesForCells={[2, 3, 4]}
                customHeadCellClasses={[
                    classes.center,
                    classes.right,
                    classes.right
                ]}
                customTotalClassForCell={classes.total}
            />;
            resInfo.push(<GridContainer key={2}>
                <GridItem xs={12} sm={12} md={3}>
                    <FormLabel className={classes.labelHorizontal}>
                        Món ăn
                        <Button
                            color={window.innerWidth > 959 ? "transparent" : "white"}
                            justIcon={window.innerWidth > 959}
                            simple={!(window.innerWidth > 959)}
                            className={classes.buttonLink}
                            onClick={this.handleEditMenu.bind(this, 'food')}
                        >
                            <EditIcon className={classes.icon} />
                        </Button>
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
                var price = Math.ceil(object.unit_price);
                qcName = <div style={{ width: "100%" }}>
                    <span>{object.booked_menu}</span>
                </div>;
                totalDrink += price * object.booked_total;
                return [object.id, object.name,
                <>

                    <div className={classes.buttonGroup}>
                        <Button
                            color="info"
                            size="sm"
                            round
                            className={classes.firstButton}
                            onClick={this.changeQuantity.bind(this, key, "drink", 'down')}
                        >
                            <Remove />
                        </Button>
                        <div className={classes.middleButton} style={{ padding: "0 5px 0 5px", width: "60px" }}>
                            <CustomInput
                                id={"booked_total_drink:" + key}
                                ref={"booked_total_drink:" + key}
                                formControlProps={{
                                    className: classes.formControl + " " + classes.npt
                                }}
                                center={true}
                                inputProps={{
                                    type: "number",
                                    value: object.booked_total,
                                    onChange: this.changeQuantityByInput.bind(this, key, "drink"),
                                }}
                                InputProps={{
                                    min: 0
                                }}
                            />
                        </div>
                        <Button
                            color="info"
                            size="sm"
                            round
                            className={classes.lastButton}
                            onClick={this.changeQuantity.bind(this, key, "drink", 'up')}
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
            paymentPrice += totalDrink;
            drinks.push(total);

            var drink = <CustomTable
                tableHeaderColor="primary"
                tableHead={["ID", "Tên", "Số lượng", "Đơn giá", "Thành tiền"]}
                tableData={drinks}
                coloredColls={[4]}
                colorsColls={["primary"]}
                customClassesForCells={[1, 2, 3, 4]}
                customCellClasses={[
                    classes.maxWidth,
                    classes.center + " " + classes.minWidth,
                    classes.right,
                    classes.right
                ]}
                customHeadClassesForCells={[2, 3, 4]}
                customHeadCellClasses={[
                    classes.center,
                    classes.right,
                    classes.right
                ]}
                customTotalClassForCell={classes.total}
            />;


            resInfo.push(
                <GridContainer key={3}>
                    <GridItem xs={12} sm={12} md={3}>
                        <FormLabel className={classes.labelHorizontal}>
                            Nước uống
                            <Button
                                color={window.innerWidth > 959 ? "transparent" : "white"}
                                justIcon={window.innerWidth > 959}
                                simple={!(window.innerWidth > 959)}
                                className={classes.buttonLink}
                                onClick={this.handleEditMenu.bind(this, 'drink')}
                            >
                                <EditIcon className={classes.icon} />
                            </Button>
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
        //Options
        if (model.options.length > 0) {
            var options: any = [];
            model.options.map((object: IBookedOption, key: number) => {
                if (object.action != 'DEL') {
                    var price = Math.ceil(object.option_price);
                    debugger;
                    var errorStatus = showError(clientError, validateMessage, "booked_total_option:" + key);
                    qcName = <div style={{ width: "100%" }}>Chi tiết</div>;
                    totalOption += price * object.option_quality;
                    options.push([object.option_id, object.option_name,
                    <>
                        <div className={classes.buttonGroup}>
                            <Button
                                color="info"
                                size="sm"
                                round
                                className={classes.firstButton}
                                onClick={this.changeQuantity.bind(this, key, "option", 'down')}
                            >
                                <Remove />
                            </Button>
                            <div className={classes.middleButton} style={{ padding: "0 5px 0 5px", width: "60px" }}>
                                <CustomInput
                                    id={"booked_total_option:" + key}
                                    ref={"booked_total_option:" + key}
                                    formControlProps={{
                                        className: classes.formControl + " " + classes.npt
                                    }}
                                    center={true}
                                    inputProps={{
                                        type: "number",
                                        value: object.option_quality,
                                        onChange: this.changeQuantityByInput.bind(this, key, "option"),
                                    }}
                                    InputProps={{
                                        min: 0
                                    }}
                                    helpText={errorStatus !== "init" ? errorStatus : ''}
                                    error={errorStatus !== 'init' && errorStatus !== ''}
                                    success={errorStatus === ''}
                                />
                            </div>
                            <Button
                                color="info"
                                size="sm"
                                round
                                className={classes.lastButton}
                                onClick={this.changeQuantity.bind(this, key, "option", 'up')}
                            >
                                <Add />
                            </Button>
                        </div></>
                        , convertCurrency('vi-VN', price), convertCurrency('vi-VN', price * object.option_quality)
                        , <Button
                            color={window.innerWidth > 959 ? "transparent" : "white"}
                            justIcon={window.innerWidth > 959}
                            simple={!(window.innerWidth > 959)}
                            className={classes.buttonLink}
                            onClick={this.deleteOptionHandle.bind(this, key)}
                        >
                        <DeleteIcon className={classes.icon} />
                    </Button>
                    ])
                }

            });
            var total = {
                total: true, colspan: "3", amount: convertCurrency('vi-VN', totalOption)
            };
            paymentPrice += totalOption;
            options.push(total);

            var optionTable = <CustomTable
                tableHeaderColor="primary"
                tableHead={["ID", "Tên", "Số lượng", "Đơn giá", "Thành tiền"]}
                tableData={options}
                coloredColls={[4]}
                colorsColls={["primary"]}
                customClassesForCells={[1, 2, 3, 4]}
                customCellClasses={[
                    classes.maxWidth,
                    classes.center + " " + classes.minWidth,
                    classes.right,
                    classes.right
                ]}
                customHeadClassesForCells={[2, 3, 4]}
                customHeadCellClasses={[
                    classes.center,
                    classes.right,
                    classes.right
                ]}
                customTotalClassForCell={classes.total}
            />;


            resInfo.push(
                <GridContainer key={4}>
                    <GridItem xs={12} sm={12} md={3}>
                        <FormLabel className={classes.labelHorizontal}>
                            Tuỳ chọn
                            <Button
                                color={window.innerWidth > 959 ? "transparent" : "white"}
                                justIcon={window.innerWidth > 959}
                                simple={!(window.innerWidth > 959)}
                                className={classes.buttonLink}
                                onClick={this.handleEditMenu.bind(this, 'option')}
                            >
                                <EditIcon className={classes.icon} />
                            </Button>
                        </FormLabel>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={9}>
                        <Accordion
                            active={0}
                            collapses={[
                                {
                                    title: qcName,
                                    content: optionTable
                                },
                            ]} />
                    </GridItem>
                </GridContainer>);
        }

        model.gross_price = paymentPrice;
        var discount = 0;
        if (model.promotion.promotion_type == 'Direct') {
            discount = model.promotion.promotion_amount;
        } else {
            discount = model.gross_price / model.promotion.promotion_amount;
        }
        var tax = model.gross_price / 10;

        return <>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12} lg={8}>
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
                                                        onChange: this.hanleChangeTime.bind(this, true, "try_date"),
                                                    }
                                                }
                                                inputProps={
                                                    {
                                                        name: "try_date",
                                                    }
                                                }
                                                helpText={inputTryDateStatus !== "init" ? inputTryDateStatus : ''}
                                                error={inputTryDateStatus !== 'init' && inputTryDateStatus !== ''}
                                                success={inputTryDateStatus === ''}
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
                                                        onChange: this.hanleChangeTime.bind(this, true, "try_date_time"),
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
                                                helpText={inputTryDateTimeStatus !== "init" ? inputTryDateTimeStatus : ''}
                                                error={inputTryDateTimeStatus !== 'init' && inputTryDateTimeStatus !== ''}
                                                success={inputTryDateTimeStatus === ''}
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
                                                        onChange: this.hanleChangeTime.bind(this, true, "activate_date")
                                                    }
                                                }
                                                inputProps={
                                                    {
                                                        name: "activate_date",
                                                    }
                                                }
                                                helpText={inputAcDateStatus !== "init" ? inputAcDateStatus : ''}
                                                error={inputAcDateStatus !== 'init' && inputAcDateStatus !== ''}
                                                success={inputAcDateStatus === ''}
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
                                                        onChange: this.hanleChangeTime.bind(this, true, "activate_date_time"),
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
                                                helpText={inputAcDateTimeStatus !== "init" ? inputAcDateTimeStatus : ''}
                                                error={inputAcDateTimeStatus !== 'init' && inputAcDateTimeStatus !== ''}
                                                success={inputAcDateTimeStatus === ''}
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
                                                helpText={inputfirstNameStatus !== "init" ? inputfirstNameStatus : ''}
                                                error={inputfirstNameStatus !== 'init' && inputfirstNameStatus !== ''}
                                                success={inputfirstNameStatus === ''}
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
                                                helpText={inputlastNameStatus !== "init" ? inputlastNameStatus : ''}
                                                error={inputlastNameStatus !== 'init' && inputlastNameStatus !== ''}
                                                success={inputlastNameStatus === ''}
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
                                                helpText={inputCusPhnStatus !== "init" ? inputCusPhnStatus : ''}
                                                error={inputCusPhnStatus !== 'init' && inputCusPhnStatus !== ''}
                                                success={inputCusPhnStatus === ''}
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
                                                helpText={inputCusAddrStatus !== "init" ? inputCusAddrStatus : ''}
                                                error={inputCusAddrStatus !== 'init' && inputCusAddrStatus !== ''}
                                                success={inputCusAddrStatus === ''}
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
                                                helpText={inputBrNameStatus !== "init" ? inputBrNameStatus : ''}
                                                error={inputBrNameStatus !== 'init' && inputBrNameStatus !== ''}
                                                success={inputBrNameStatus === ''}
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
                                                helpText={inputGrNameStatus !== "init" ? inputGrNameStatus : ''}
                                                error={inputGrNameStatus !== 'init' && inputGrNameStatus !== ''}
                                                success={inputGrNameStatus === ''}
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
                                                helpText={inputOrAddrStatus !== "init" ? inputOrAddrStatus : ''}
                                                error={inputOrAddrStatus !== 'init' && inputOrAddrStatus !== ''}
                                                success={inputOrAddrStatus === ''}
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
                                                        onChange: this.hanleChangeTime.bind(this, true, "org_date")
                                                    }
                                                }
                                                inputProps={
                                                    {
                                                        name: "org_date",
                                                    }
                                                }
                                                helpText={inputOrDateStatus !== "init" ? inputOrDateStatus : ''}
                                                error={inputOrDateStatus !== 'init' && inputOrDateStatus !== ''}
                                                success={inputOrDateStatus === ''}
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
                                                        },
                                                        onChange: this.hanleChangeTime.bind(this, true, "org_date_time")
                                                    }
                                                }
                                                inputProps={
                                                    {
                                                        name: "org_date_time",
                                                    }
                                                }
                                                helpText={inputOrDateTimeStatus !== "init" ? inputOrDateTimeStatus : ''}
                                                error={inputOrDateTimeStatus !== 'init' && inputOrDateTimeStatus !== ''}
                                                success={inputOrDateTimeStatus === ''}
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
                                                    InputProps={{
                                                        min: 0
                                                    }}
                                                    helpText={inputBkSizeStatus !== "init" ? inputBkSizeStatus : ''}
                                                    error={inputBkSizeStatus !== 'init' && inputBkSizeStatus !== ''}
                                                    success={inputBkSizeStatus === ''}
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
                                                        type: "number",
                                                        defaultValue: model.booked_size_2,
                                                        onBlur: this.handleChange.bind(this, true, "booked_size_2")
                                                    }}
                                                    InputProps={{
                                                        min: 0
                                                    }}
                                                    helpText={inputBkSize2Status !== "init" ? inputBkSize2Status : ''}
                                                    error={inputBkSize2Status !== 'init' && inputBkSize2Status !== ''}
                                                    success={inputBkSize2Status === ''}
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
                                                    helpText={inputBkMatlStatus !== "init" ? inputBkMatlStatus : ''}
                                                    error={inputBkMatlStatus !== 'init' && inputBkMatlStatus !== ''}
                                                    success={inputBkMatlStatus === ''}
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
                                                    helpText={inputBkStyleStatus !== "init" ? inputBkStyleStatus : ''}
                                                    error={inputBkStyleStatus !== 'init' && inputBkStyleStatus !== ''}
                                                    success={inputBkStyleStatus === ''}
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
                                                    InputProps={{
                                                        min: 0
                                                    }}
                                                    helpText={inputBkAlPgStatus !== "init" ? inputBkAlPgStatus : ''}
                                                    error={inputBkAlPgStatus !== 'init' && inputBkAlPgStatus !== ''}
                                                    success={inputBkAlPgStatus === ''}
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
                                                    helpText={inputbkPtsStatus !== "init" ? inputbkPtsStatus : ''}
                                                    error={inputbkPtsStatus !== 'init' && inputbkPtsStatus !== ''}
                                                    success={inputbkPtsStatus === ''}
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
                                                            defaultValue: model.booked_time.substr(0, model.booked_time.length - 3),
                                                            onChange: this.hanleChangeTime.bind(this, true, "booked_time"),
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
                                                    helpText={inputBkTimeStatus !== "init" ? inputBkTimeStatus : ''}
                                                    error={inputBkTimeStatus !== 'init' && inputBkTimeStatus !== ''}
                                                    success={inputBkTimeStatus === ''}
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
                                                    helpText={customizeFieldStatus[k] !== "init" ? customizeFieldStatus[k] : ''}
                                                    error={customizeFieldStatus[k] !== 'init' && customizeFieldStatus[k] !== ''}
                                                    success={customizeFieldStatus[k] === ''}
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
                                                    helpText={customizeFieldStatus[k] !== "init" ? customizeFieldStatus[k] : ''}
                                                    error={customizeFieldStatus[k] !== 'init' && customizeFieldStatus[k] !== ''}
                                                    success={customizeFieldStatus[k] === ''}
                                                />
                                                break;
                                            case "combobox":
                                                input = <CustomSelect
                                                    id={"customize_field_" + field.customize_field_id}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                    value={field.customize_field_answer}
                                                    onChange={this.handleChangeCustomizeFields.bind(this, true, "customize_field_" + field.customize_field_id)}
                                                    inputProps={{
                                                        name: "customize_field_" + field.customize_field_id
                                                    }}
                                                    items={field.customize_field_questions}
                                                    helpText={customizeFieldStatus[k] !== "init" ? customizeFieldStatus[k] : ''}
                                                    error={customizeFieldStatus[k] !== 'init' && customizeFieldStatus[k] !== ''}
                                                    success={customizeFieldStatus[k] === ''}
                                                />
                                                break;
                                            case "checkbox":
                                                var checkbox: any;
                                                input = [];
                                                var customize_field_answers = field.customize_field_answer.trim().split(",");
                                                var iconColor: any;
                                                if (customizeFieldStatus[k] !== 'init' && customizeFieldStatus[k] !== ''){
                                                    iconColor = {borderColor:"#f44336"}
                                                }

                                                field.customize_field_questions.map((option: IOption, index: number) => {
                                                    var checked = customize_field_answers.includes(option.key);
                                                    checkbox = <FormControlLabel key={index}
                                                        control={
                                                            <Checkbox
                                                                checked={checked}
                                                                value={option.key}
                                                                onChange={this.handleChangeCustomizeFields.bind(this, true, "customize_field_" + field.customize_field_id)}
                                                                checkedIcon={
                                                                    <Check className={classes.checkedIcon} />
                                                                }
                                                                icon={<Check className={classes.uncheckedIcon} style={iconColor} />}
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
                                                var radio: any;
                                                input = [];
                                                var iconColor: any;
                                                if (customizeFieldStatus[k] !== 'init' && customizeFieldStatus[k] !== ''){
                                                    iconColor = {borderColor:"#f44336"}
                                                }
                                                field.customize_field_questions.map((option: IOption, index: number) => {
                                                    radio = <FormControlLabel key={index}
                                                        control={
                                                            <Radio
                                                                checked={option.key == field.customize_field_answer}
                                                                value={option.key}
                                                                onChange={this.handleChangeCustomizeFields.bind(this, false, "customize_field_" + field.customize_field_id)}
                                                                icon={
                                                                    <FiberManualRecord
                                                                        className={classes.radioUnchecked}
                                                                        style={iconColor} 
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
                                                        defaultValue: field.customize_field_answer,
                                                        onBlur: this.handleChangeCustomizeFields.bind(this, true, "customize_field_" + field.customize_field_id)
                                                    }}
                                                    helpText={customizeFieldStatus[k] !== "init" ? customizeFieldStatus[k] : ''}
                                                    error={customizeFieldStatus[k] !== 'init' && customizeFieldStatus[k] !== ''}
                                                    success={customizeFieldStatus[k] === ''}
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
                                    {/*Restaurant or Qua  info*/}
                                    {resInfo}

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
                                                <Info>+ {convertCurrency('vi-VN', tax)}</Info>
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
                                                    {convertCurrency('vi-VN', model.gross_price + tax - discount)}
                                                </Danger>
                                            </FormLabel>
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
                <GridItem xs={12} sm={12} md={12} lg={4}>
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
                {this.state.isShowOptionModal && <OptionPopup data={menus} selected={this.state.model.options} isShowModal={this.state.isShowOptionModal} onToggleMenuModal={this.onToggleOptionModal} isLoading={this.state.isLoading} />}
                {this.state.isShowMenuModal && <MenuPopup type={this.state.menu_type} service_code={model.product.service_code} title="Thực đơn" data={menus} isShowModal={this.state.isShowMenuModal} onToggleMenuModal={this.onToggleMenuModal} isLoading={this.state.isLoading} />}
                {this.state.isShowImageModal && <Modal
                    aria-labelledby="Hình ảnh"
                    aria-describedby="Chi tiết hình ảnh"
                    open={this.state.isShowImageModal}
                    onClose={this.onToggleModal}
                >
                    <div className={classes.modal}>
                        <img src={this.state.modalImage} width="100%" />
                    </div>
                </Modal>
                }
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
            {createSnackBarMess(isValidate, isError, showMessage, this.handleCloseMessage)}

        </>
    }
}

export default withStyles(styles)(BookingEditScreen)