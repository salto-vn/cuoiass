import * as React from 'react';
import { createStyles, Theme, withStyles, FormLabel, GridList, GridListTile, GridListTileBar, IconButton } from '@material-ui/core';
import normalFormStyle from "../../../styles/components/normalFormStyle";
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import Card from '../../common/Card/Card';
import CardHeader from '../../common/Card/CardHeader';
import CardBody from '../../common/Card/CardBody';
import { ResourceUtil } from '../../common/Resources';
import { IFormState } from '../../interface/IForm';
import CustomSelect, { IOption } from '../../common/FormControls/CustomSelect/CustomSelect';
import CONSTANT from '../../bootstrap/Constant';
import CustomInput from '../../common/FormControls/CustomInput/CustomInput';
import { ProductModel } from '../../model/ProductModel';
import { IVendorService } from '../../interface/IVendorService';
import { isEmpty, isEmptyKeyInObject } from '../../common/Utils';
import { VendorServiceModel } from '../../model/VendorServiceModel';
import Add from "@material-ui/icons/Add";
import Delete from "@material-ui/icons/Delete";
import Upload from "@material-ui/icons/CloudUpload"
import MenuIcon from "@material-ui/icons/Menu"
import Button from '../../common/FormControls/CustomButtons/Button';
import { ICustomizeFieldsItem } from '../../interface/ICustomizeFieldsItem';
import UploadPopup from '../Image/UploadPopup';
import { warningColor } from '../../../styles/material-dashboard-pro-react';
import { IOptionsItem } from '../../interface/IOptionsItem';
import Accordion from '../../common/Accordion/Accordion';

const styles = (theme: Theme) => createStyles({
    ...normalFormStyle(theme),
    maxWidth: {
        maxWidth: "100px",
        minWidth: "100px"
    },
    minWidth: {
        minWidth: "150px"
    },
    carousel: {
        padding: "7px"
    },
    gridRoot: {
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        padding: "7px"
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
    title: {
        color: warningColor,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
});

export interface INewProductState extends IFormState {
    services_mst: IOption[],
    vendor_service: IVendorService,
    customize_field: ICustomizeFieldsItem,
    upload: any,
    isDisplayPopup: boolean,
    isSelectImage: boolean,
    add_customize_field: ICustomizeFieldsItem,
    add_option: IOptionsItem,
    isShowMenuModal: boolean

}

export const InputTypes: IOption[] = [
    {
        key: "TEXTBOX",
        value: "TEXTBOX"
    },
    {
        key: "COMBOBOX",
        value: "COMBOBOX"
    },
    {
        key: "CHECKBOX",
        value: "CHECKBOX"
    },
    {
        key: "TEXTAREA",
        value: "TEXTAREA"
    },
    {
        key: "RADIO",
        value: "RADIO"
    }
]

class NewProductScreen extends React.Component<{ match: any, history: any, classes: any }, {}> {

    public state = {
        isDisplayPopup: false,
        services_mst: [],
        model: new ProductModel(),
        vendor_service: new VendorServiceModel(),
        customize_field: {
            customize_field_id: 0,
            customize_field_name: "",
            customize_field_type: "",
            customize_field_questions: [],
            customize_field_answer: "",
        },
        add_customize_field: {
            customize_field_id: 0,
            customize_field_name: "",
            customize_field_type: "",
            customize_field_questions: [],
            customize_field_answer: "",
        },
        clientError: { status: undefined },
        validateMessage: { errors: "" },
        upload: undefined,
        add_option: {
            id: 0,
            name: "",
            unit_price: 0,
        },
        isShowMenuModal:false,
        isLoading:false
    };
    componentDidMount() {
        const cachedService: string = localStorage.getItem(CONSTANT.LOCAL_STORE.services);
        const services_mst: IOption[] = JSON.parse(cachedService);
        localStorage.removeItem("TMP_UPLOAD");
        this.setState({ services_mst });

    }

    private handleChange = (isRequired: boolean, name: string, evt: any) => {
        const { model } = this.state;
        let value: string = evt.target.value;
        debugger;
        const errMessage = "BookingValidate(isRequired, item, value)";

        if (name === "prd_sizes") {
            model.prd_sizes = value.split("\n");
        }

        this.setState({
            model: { ...model, [name]: value ? value : "" },
            clientError: { ...this.state.clientError, [name]: errMessage },
        }, () => {
            this.canSubmit();
        });
    }

    public onToggleMenuModal = (event: any) => {
        const { isShowMenuModal } = this.state;
        this.setState({ isShowMenuModal: !isShowMenuModal });
    }

    private handleChangeSize = (evt: any) => {
        const { model } = this.state;
        let value: string = evt.target.value;
        debugger;
        const errMessage = "BookingValidate(isRequired, item, value)";
        model.prd_sizes = value.split("\n");

        this.setState({
            model: { ...model },
            clientError: { ...this.state.clientError, [name]: errMessage },
        }, () => {
            this.canSubmit();
        });
    }

    public handleClickPhoto = (index: any) => {
        const { model } = this.state;
        this.setState({ isShowImageModal: true, modalImage: model.prd_images[index] });
    }

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

    private handleChangeCustomField = (isRequired: boolean, item: string, index: number, type: string, evt: any) => {
        const { customize_field, model, add_customize_field } = this.state;
        let value = evt.target.value;

        let items = item.split(":");
        if (items.length == 1) { //Change of Default row
            if (type !== 'not_input') { //Label thogn tin sp
                return this.setState({
                    customize_field: { ...customize_field, [item]: value ? value : "" },
                });
            } else { //Input thong tin khi khach dat lich
                return this.setState({
                    add_customize_field: { ...add_customize_field, [item]: value ? value : "" },
                });
            }

        } else { // Change of Added fields
            model.customize_fields[index][items[0]] = value;
            this.setState({ model });
        }



    }


    public canSubmit = () => {
        const { clientError, model } = this.state;
        if (!isEmptyKeyInObject(clientError) && model) {
            return this.setState({ isSubmitDisabled: false });
        }
        return this.setState({ isSubmitDisabled: true });
    }


    public onToggleModal = (e: any) => {
        const { isDisplayPopup } = this.state;
        this.setState({ isDisplayPopup: !isDisplayPopup, isSelectImage: true });
    }

    private onToggleModalWithData = (images: any) => {
        debugger;
        const { model, isDisplayPopup } = this.state;
        model.prd_images = images;
        this.setState({ model, isDisplayPopup: !isDisplayPopup, isSelectImage: true });
    }

    private handleDelete = (index: number, e: any) => {
        const { model } = this.state;
        debugger;
        model.prd_images.splice(index, 1)
        this.setState({ model, isSelectImage: false });
    }


    private handleAddCustomField = (index: number, type: string, evt: any) => {
        const { add_customize_field, customize_field, model } = this.state;
        if (type !== 'input') {
            let newCustomizeField = { ...add_customize_field };
            newCustomizeField.customize_field_type = 'LABEL';
            model.customize_fields.push(newCustomizeField);
            //clear default row
            add_customize_field.customize_field_id = 0;
            add_customize_field.customize_field_name = "";
            add_customize_field.customize_field_type = "";
            add_customize_field.customize_field_questions = [];
            add_customize_field.customize_field_answer = "";
        } else {
            let newCustomizeField = { ...customize_field };
            customize_field.customize_field_id = 0;
            customize_field.customize_field_name = "";
            customize_field.customize_field_type = "";
            customize_field.customize_field_questions = [];
            customize_field.customize_field_answer = "";
            model.customize_fields.push(newCustomizeField);
        }


        this.setState({ model, add_customize_field, customize_field });
    }

    private handleChangeOption = (isRequired: boolean, item: string, index: number, evt: any) => {
        const { model, add_option } = this.state;
        let value = evt.target.value;

        let items = item.split(":");
        if (items.length == 1) { //Change of Default row
            return this.setState({
                add_option: { ...add_option, [item]: value ? value : "" },
            });

        } else {
            model.options[index][items[0]] = value;
            this.setState({ model });
        }

    }

    private handleAddOption = (event: any) => {
        debugger;
        const { add_option, model } = this.state;
        let new_option = { ...add_option };
        model.options.push(new_option);
        add_option.name = "";
        add_option.unit_price = 0;
        this.setState({ model });

    }


    public render() {
        const { classes } = this.props;
        const {isShowMenuModal, isLoading, model, isDisplayPopup, services_mst, vendor_service, customize_field, add_customize_field, add_option } = this.state;
        debugger;
        return <>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12} lg={8}>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <Card>
                                <CardHeader color="primary">
                                    <h4 className={classes.cardTitleWhite}>Đăng ký sản phẩm </h4>
                                    <p className={classes.cardCategoryWhite}>Tuỳ vào dịch vụ nhà hàng, quả cưới, album, xe cưới, thiệp cưới,... mà thông tin nhập khác nhau</p>
                                </CardHeader>
                                <CardBody>
                                    <GridContainer>
                                        <GridItem xs={12} sm={3} md={3}>
                                            <FormLabel className={classes.labelHorizontal}>
                                                Mã sản phẩm
                                            </FormLabel>
                                        </GridItem>
                                        <GridItem xs={12} sm={9} md={9}>
                                            <CustomInput
                                                id="prd_cd"
                                                formControlProps={{
                                                    fullWidth: true,
                                                    className: classes.formControl
                                                }}
                                                inputProps={{
                                                    type: "text",
                                                    defaultValue: model.prd_cd,
                                                    onBlur: this.handleChange.bind(this, true, "prd_cd")
                                                }}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={3} md={3}>
                                            <FormLabel className={classes.labelHorizontal}>
                                                Tên sản phẩm
                                            </FormLabel>
                                        </GridItem>
                                        <GridItem xs={12} sm={9} md={9}>
                                            <CustomInput
                                                id="prd_name"
                                                formControlProps={{
                                                    fullWidth: true,
                                                    className: classes.formControl
                                                }}
                                                inputProps={{
                                                    type: "text",
                                                    defaultValue: model.prd_name,
                                                    onBlur: this.handleChange.bind(this, true, "prd_name")
                                                }}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={3} md={3}>
                                            <FormLabel className={classes.labelHorizontal}>
                                                Mô tả
                                            </FormLabel>
                                        </GridItem>
                                        <GridItem xs={12} sm={9} md={9}>
                                            <CustomInput
                                                id="prd_desc"
                                                formControlProps={{
                                                    fullWidth: true,
                                                    className: classes.formControl
                                                }}
                                                inputProps={{
                                                    type: "text",
                                                    multiline: true,
                                                    rows: 5,
                                                    defaultValue: model.prd_desc,
                                                    onBlur: this.handleChange.bind(this, true, "prd_desc")
                                                }}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                    {['TRTR', 'PHT', 'DRSS', 'TC', 'XC'].includes(vendor_service.service_code) &&
                                        <GridContainer>
                                            <GridItem xs={12} sm={3} md={3}>
                                                <FormLabel className={classes.labelHorizontal}>
                                                    Màu chủ đạo
                                                </FormLabel>
                                            </GridItem>
                                            {!isEmpty(model.prd_colors) &&
                                                model.prd_colors.map((color: string, index: number) => {
                                                    <GridItem xs={12} sm={1} md={1}>
                                                        <div style={{
                                                            background: color,
                                                            width: "28px",
                                                            height: "28px",
                                                            marginTop: "5px"
                                                        }}
                                                            id="color_1"
                                                            onClick={this.handleClickOpenColor}></div>
                                                    </GridItem>
                                                })
                                            }

                                            <GridItem xs={12} sm={1} md={1}>
                                                <Button
                                                    color={window.innerWidth > 959 ? "transparent" : "white"}
                                                    justIcon={true}
                                                    simple={true}
                                                    className={classes.buttonLink}
                                                    onClick={this.handleClickOpenColor}
                                                >
                                                    <Add className={classes.icon} />
                                                </Button>
                                            </GridItem>
                                        </GridContainer>
                                    }
                                    <GridContainer>
                                        <GridItem xs={12} sm={3} md={3}>
                                            <FormLabel className={classes.labelHorizontal}>
                                                {
                                                    ['NC', 'PHT', 'STD', 'TC', 'DRSS', 'NC'].includes(vendor_service.service_code) ? 'Size'
                                                        : ['QUAC', 'REST', 'TRTR', 'VN'].includes(vendor_service.service_code) ? 'Số lượng'
                                                            : ['XC'].includes(vendor_service.service_code) ? 'Số chỗ' : 'Size'
                                                }
                                            </FormLabel>
                                        </GridItem>

                                        <GridItem xs={12} sm={9} md={9}>
                                            <CustomInput
                                                id="prd_size"
                                                formControlProps={{
                                                    fullWidth: true,
                                                    className: classes.formControl
                                                }}
                                                inputProps={{
                                                    type: "text",
                                                    multiline: true,
                                                    rows: 3,
                                                    defaultValue: isEmpty(model.prd_sizes) ? "" : model.prd_sizes,
                                                    onBlur: this.handleChangeSize
                                                }}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                    {['TRTR', 'PHT', 'DRSS', 'TC'].includes(vendor_service.service_code) &&
                                        <GridContainer>
                                            <GridItem xs={12} sm={3} md={3}>
                                                <FormLabel className={classes.labelHorizontal}>
                                                    Chất liệu
                                            </FormLabel>
                                            </GridItem>
                                            {!isEmpty(model.prd_materials) &&
                                                <GridItem xs={3} sm={3} md={3}>
                                                    <FormLabel className={classes.valueHorizontal}>
                                                        {model.prd_materials.join(',')}
                                                    </FormLabel>
                                                </GridItem>
                                            }

                                            <GridItem xs={3} sm={2} md={2}>
                                                <CustomInput
                                                    id="prd_material"
                                                    formControlProps={{
                                                        fullWidth: true,
                                                        className: classes.formControl
                                                    }}
                                                    inputProps={{
                                                        type: "text",
                                                        defaultValue: model.prd_sizes,
                                                        onBlur: this.handleChange.bind(this, true, "prd_material")
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={3} sm={1} md={1}>
                                                <Button
                                                    color={window.innerWidth > 959 ? "transparent" : "white"}
                                                    justIcon={true}
                                                    simple={true}
                                                    className={classes.buttonLink}
                                                    onClick={this.handleClickOpenColor}
                                                >
                                                    <Add className={classes.icon} />
                                                </Button>
                                            </GridItem>
                                        </GridContainer>
                                    }
                                    {['TRTR', 'PHT', 'DRSS', 'TC', 'REST', 'QUAC', 'VN'].includes(vendor_service.service_code) &&
                                        <GridContainer>
                                            <GridItem xs={12} sm={3} md={3}>
                                                <FormLabel className={classes.labelHorizontal}>
                                                    Phong cách
                                            </FormLabel>
                                            </GridItem>
                                            <GridItem xs={12} sm={9} md={9}>
                                                <CustomInput
                                                    id="prd_style"
                                                    formControlProps={{
                                                        fullWidth: true,
                                                        className: classes.formControl
                                                    }}
                                                    inputProps={{
                                                        type: "text",
                                                        defaultValue: model.prd_style,
                                                        onBlur: this.handleChange.bind(this, true, "prd_style")
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                    }

                                    {['PHT', 'STD'].includes(vendor_service.service_code) && <>
                                        <GridContainer>
                                            <GridItem xs={12} sm={3} md={3}>
                                                <FormLabel className={classes.labelHorizontal}>
                                                    Số trang
                                            </FormLabel>
                                            </GridItem>
                                            <GridItem xs={12} sm={9} md={9}>
                                                <CustomInput
                                                    id="prd_page"
                                                    formControlProps={{
                                                        fullWidth: true,
                                                        className: classes.formControl
                                                    }}
                                                    inputProps={{
                                                        type: "text",
                                                        defaultValue: model.prd_page,
                                                        onBlur: this.handleChange.bind(this, true, "prd_page")
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={3} md={3}>
                                                <FormLabel className={classes.labelHorizontal}>
                                                    Kích cỡ ảnh tiệc
                                        </FormLabel>
                                            </GridItem>
                                            <GridItem xs={12} sm={9} md={9}>
                                                <CustomInput
                                                    id="prd_party_photo_size"
                                                    formControlProps={{
                                                        fullWidth: true,
                                                        className: classes.formControl
                                                    }}
                                                    inputProps={{
                                                        type: "text",
                                                        defaultValue: model.prd_party_photo_size,
                                                        onBlur: this.handleChange.bind(this, true, "prd_party_photo_size")
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer></>
                                    }

                                    {['REST', 'XC'].includes(vendor_service.service_code) &&
                                        <GridContainer>
                                            <GridItem xs={12} sm={3} md={3}>
                                                <FormLabel className={classes.labelHorizontal}>
                                                    Thời gian
                                        </FormLabel>
                                            </GridItem>
                                            {!isEmpty(model.prd_times) &&
                                                <GridItem xs={3} sm={3} md={3}>
                                                    <FormLabel className={classes.valueHorizontal}>
                                                        {model.prd_times.join(',')}
                                                    </FormLabel>
                                                </GridItem>
                                            }

                                            <GridItem xs={3} sm={2} md={2}>
                                                <CustomInput
                                                    id="prd_time"
                                                    formControlProps={{
                                                        fullWidth: true,
                                                        className: classes.formControl
                                                    }}
                                                    inputProps={{
                                                        type: "text",
                                                        defaultValue: "",
                                                        onBlur: this.handleChange.bind(this, true, "prd_time")
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={3} sm={1} md={1}>
                                                <Button
                                                    color={window.innerWidth > 959 ? "transparent" : "white"}
                                                    justIcon={true}
                                                    simple={true}
                                                    className={classes.buttonLink}
                                                    onClick={this.handleClickOpenColor}
                                                >
                                                    <Add className={classes.icon} />
                                                </Button>
                                            </GridItem>
                                        </GridContainer>
                                    }
                                    <GridContainer>
                                        <GridItem xs={12} sm={3} md={3}>
                                            <FormLabel className={classes.labelHorizontal}>
                                                Hình ảnh
                                                </FormLabel>
                                        </GridItem>
                                        <GridItem xs={12} sm={9} md={9}>
                                            <div className={classes.gridRoot}>
                                                <GridList className={classes.gridList} cols={2.8}>
                                                    {!isEmpty(model.prd_images) && model.prd_images.map((image: any, index: number) => (
                                                        <GridListTile key={index}>
                                                            <img src={URL.createObjectURL(image)} />
                                                            <GridListTileBar
                                                                // title={tile.title}
                                                                classes={{
                                                                    root: classes.titleBar,
                                                                    title: classes.title,
                                                                }}
                                                                actionIcon={
                                                                    <IconButton onClick={this.handleDelete.bind(this, index)}>
                                                                        <Delete fontSize="small" className={classes.title} />
                                                                    </IconButton>
                                                                }
                                                            />
                                                        </GridListTile>
                                                    ))}

                                                </GridList>
                                            </div>
                                            <Button
                                                justIcon
                                                round
                                                color="rose"
                                                onClick={this.onToggleModal}
                                            >
                                                <Upload />
                                            </Button>
                                        </GridItem>
                                    </GridContainer>

                                    {/** Menu  cho dịch vụ nhà hàng, quả*/}
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <h6>Thực đơn</h6>
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={3} md={3}>
                                            <FormLabel className={classes.labelHorizontal}>
                                                Món ăn
                                                
                                            </FormLabel>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={9}>
                                            {/* <Accordion
                                                active={0}
                                                collapses={[
                                                    {
                                                        title: "Tên menu1",
                                                        content: "foodList"
                                                    },
                                                    {
                                                        title: "Tên menu2",
                                                        content: "foodList"
                                                    },
                                                ]} /> */}
                                                <Button
                                                    color="primary"
                                                    size="sm"
                                                    className={classes.marginRight}
                                                    >
                                                    Chọn thực đơn 
                                                </Button>
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={3} md={3}>
                                            <FormLabel className={classes.labelHorizontal}>
                                                Nước uống
                                            </FormLabel>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={9}>
                                            {/* <Accordion
                                                active={0}
                                                collapses={[
                                                    {
                                                        title: "Tên menu1",
                                                        content: "foodList"
                                                    },
                                                    {
                                                        title: "Tên menu2",
                                                        content: "foodList"
                                                    },
                                                ]} /> */}
                                                <Button
                                                    color="primary"
                                                    size="sm"
                                                    className={classes.marginRight}
                                                    >
                                                    Chọn thực đơn
                                                </Button>
                                        </GridItem>
                                    </GridContainer>
                                    {/** Option */}
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <h6>Option</h6>
                                        </GridItem>
                                    </GridContainer>

                                    {/**Added options row */}
                                    {model.options.map((option: IOptionsItem, index: number) => {
                                        return <GridContainer key={index}>
                                            <GridItem xs={12} sm={3} md={3}>
                                                <CustomInput className={classes.labelHorizontal}
                                                    id="option_name"
                                                    formControlProps={{
                                                        fullWidth: true,
                                                        className: classes.formControl
                                                    }}
                                                    inputProps={{
                                                        placeholder: "Nhãn",
                                                        type: "text",
                                                        value: option.name,
                                                        onChange: this.handleChangeOption.bind(this, true, "name", index)
                                                    }}

                                                />
                                            </GridItem>
                                            <GridItem xs={11} sm={8} md={8}>
                                                <CustomInput className={classes.labelHorizontal}
                                                    id="option_price"
                                                    formControlProps={{
                                                        fullWidth: true,
                                                        className: classes.formControl
                                                    }}
                                                    inputProps={{
                                                        placeholder: "Giá",
                                                        type: "number",
                                                        value: option.unit_price,
                                                        onChange: this.handleChangeOption.bind(this, true, "unit_price", index)
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                    })}


                                    {/**Default row */}
                                    <GridContainer>
                                        <GridItem xs={12} sm={3} md={3}>
                                            <CustomInput className={classes.labelHorizontal}
                                                id="option_name"
                                                formControlProps={{
                                                    fullWidth: true,
                                                    className: classes.formControl
                                                }}
                                                inputProps={{
                                                    placeholder: "Nhãn",
                                                    type: "text",
                                                    value: add_option.name,
                                                    onChange: this.handleChangeOption.bind(this, true, "name", 0)
                                                }}

                                            />
                                        </GridItem>
                                        <GridItem xs={11} sm={8} md={8}>
                                            <CustomInput className={classes.labelHorizontal}
                                                id="option_price"
                                                formControlProps={{
                                                    fullWidth: true,
                                                    className: classes.formControl
                                                }}
                                                inputProps={{
                                                    placeholder: "Giá",
                                                    type: "number",
                                                    value: add_option.unit_price,
                                                    onChange: this.handleChangeOption.bind(this, true, "unit_price", 0)
                                                }}
                                            />
                                        </GridItem>
                                        <GridItem xs={1} sm={1} md={1}>
                                            <Button
                                                color={window.innerWidth > 959 ? "transparent" : "white"}
                                                justIcon={true}
                                                simple={true}
                                                className={classes.buttonLink}
                                                onClick={this.handleAddOption.bind(this, 0)}
                                            >
                                                <Add className={classes.icon} />
                                            </Button>
                                        </GridItem>
                                    </GridContainer>


                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <h6>Thêm thông tin cho sản phẩm</h6>
                                        </GridItem>
                                    </GridContainer>

                                    {/** Added customize Fields*/}
                                    {
                                        model.customize_fields.map((field: ICustomizeFieldsItem, index: number) => {
                                            return field.customize_field_type === 'LABEL' && <GridContainer key={index}>
                                                <GridItem xs={12} sm={3} md={3}>
                                                    <CustomInput className={classes.labelHorizontal}
                                                        id={"customize_field_name:" + index}
                                                        formControlProps={{
                                                            fullWidth: true,
                                                            className: classes.formControl
                                                        }}
                                                        inputProps={{
                                                            placeholder: "Nhãn bổ sung",
                                                            type: "text",
                                                            value: field.customize_field_name,
                                                            onChange: this.handleChangeCustomField.bind(this, true, "customize_field_name:" + index, index, 'not_input')
                                                        }}
                                                    />
                                                </GridItem>
                                                <GridItem xs={12} sm={8} md={8}>
                                                    <CustomInput className={classes.labelHorizontal}
                                                        id="customize_field_questions"
                                                        formControlProps={{
                                                            fullWidth: true,
                                                            className: classes.formControl
                                                        }}
                                                        inputProps={{
                                                            placeholder: "Giá trị nhập",
                                                            type: "text",
                                                            // multiline: ["COMBOBOX", "CHECKBOX", "RADIO"].includes(field.customize_field_type),
                                                            // rows: 5,
                                                            value: field.customize_field_questions,
                                                            onChange: this.handleChangeCustomField.bind(this, true, "customize_field_questions:" + index, index, 'not_input')
                                                        }}

                                                    />
                                                </GridItem>
                                            </GridContainer>
                                        })
                                    }

                                    {/**Default row */}
                                    <GridContainer>
                                        <GridItem xs={12} sm={3} md={3}>
                                            <CustomInput className={classes.labelHorizontal}
                                                id="customize_field_name"
                                                formControlProps={{
                                                    fullWidth: true,
                                                    className: classes.formControl
                                                }}
                                                inputProps={{
                                                    placeholder: "Nhãn bổ sung",
                                                    type: "text",
                                                    value: add_customize_field.customize_field_name,
                                                    onChange: this.handleChangeCustomField.bind(this, true, "customize_field_name", 0, 'not_input')
                                                }}

                                            />
                                        </GridItem>
                                        <GridItem xs={11} sm={8} md={8}>
                                            <CustomInput className={classes.labelHorizontal}
                                                id="customize_field_questions"
                                                formControlProps={{
                                                    fullWidth: true,
                                                    className: classes.formControl
                                                }}
                                                inputProps={{
                                                    placeholder: "Giá trị nhập",
                                                    type: "text",
                                                    // multiline: ["COMBOBOX", "CHECKBOX", "RADIO"].includes(customize_field.customize_field_type),
                                                    // rows: 5,
                                                    value: add_customize_field.customize_field_questions,
                                                    onChange: this.handleChangeCustomField.bind(this, true, "customize_field_questions", 0, 'not_input')
                                                }}
                                            />
                                        </GridItem>
                                        <GridItem xs={1} sm={1} md={1}>
                                            <Button
                                                color={window.innerWidth > 959 ? "transparent" : "white"}
                                                justIcon={true}
                                                simple={true}
                                                className={classes.buttonLink}
                                                onClick={this.handleAddCustomField.bind(this, 0, 'not_input')}
                                            >
                                                <Add className={classes.icon} />
                                            </Button>
                                        </GridItem>
                                    </GridContainer>

                                    {/**Thong tin cau hoi cho khach hang khi dat lich */}
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <h6>Thông tin khác muốn khách hàng nhập</h6>
                                        </GridItem>
                                    </GridContainer>

                                    {/** Added customize Fields*/}
                                    {
                                        model.customize_fields.map((field: ICustomizeFieldsItem, index: number) => {
                                            return field.customize_field_type !== 'LABEL' && <GridContainer key={index}>
                                                <GridItem xs={3} sm={3} md={3}>
                                                    <CustomInput className={classes.labelHorizontal}
                                                        id={"customize_field_name:" + index}
                                                        formControlProps={{
                                                            fullWidth: true,
                                                            className: classes.formControl
                                                        }}
                                                        inputProps={{
                                                            placeholder: "Nhãn bổ sung",
                                                            type: "text",
                                                            value: field.customize_field_name,
                                                            onChange: this.handleChangeCustomField.bind(this, true, "customize_field_name:" + index, index, 'input')
                                                        }}
                                                    />
                                                </GridItem>
                                                <GridItem xs={3} sm={3} md={3}>
                                                    <CustomSelect
                                                        id="customize_field_type"
                                                        formControlProps={{
                                                            fullWidth: true,
                                                            className: classes.formControl
                                                        }}
                                                        value={field.customize_field_type}
                                                        onChange={this.handleChangeCustomField.bind(this, false, "customize_field_type:" + index, index, 'input')}
                                                        inputProps={{
                                                            name: "status",
                                                            placeholder: "Cách nhập"
                                                        }}
                                                        items={InputTypes}
                                                    />
                                                </GridItem>
                                                <GridItem xs={5} sm={5} md={5}>
                                                    <CustomInput className={classes.labelHorizontal}
                                                        id="customize_field_questions"
                                                        formControlProps={{
                                                            fullWidth: true,
                                                            className: classes.formControl
                                                        }}
                                                        inputProps={{
                                                            placeholder: "Giá trị nhập",
                                                            type: "text",
                                                            multiline: ["COMBOBOX", "CHECKBOX", "RADIO"].includes(field.customize_field_type),
                                                            rows: 5,
                                                            value: field.customize_field_questions,
                                                            onChange: this.handleChangeCustomField.bind(this, true, "customize_field_questions:" + index, index, 'input')
                                                        }}

                                                    />
                                                </GridItem>
                                            </GridContainer>
                                        })
                                    }

                                    {/**Default row */}
                                    <GridContainer>
                                        <GridItem xs={3} sm={3} md={3}>
                                            <CustomInput className={classes.labelHorizontal}
                                                id="customize_field_name"
                                                formControlProps={{
                                                    fullWidth: true,
                                                    className: classes.formControl
                                                }}
                                                inputProps={{
                                                    placeholder: "Nhãn bổ sung",
                                                    type: "text",
                                                    value: customize_field.customize_field_name,
                                                    onChange: this.handleChangeCustomField.bind(this, true, "customize_field_name", 0, 'input')
                                                }}

                                            />
                                        </GridItem>
                                        <GridItem xs={3} sm={3} md={3}>
                                            <CustomSelect
                                                id="customize_field_type"
                                                formControlProps={{
                                                    fullWidth: true,
                                                    className: classes.formControl
                                                }}
                                                value={customize_field.customize_field_type}
                                                onChange={this.handleChangeCustomField.bind(this, false, "customize_field_type", 0, 'input')}
                                                inputProps={{
                                                    name: "status",
                                                    placeholder: "Cách nhập"
                                                }}
                                                items={InputTypes}
                                            />
                                        </GridItem>
                                        <GridItem xs={5} sm={5} md={5}>
                                            <CustomInput className={classes.labelHorizontal}
                                                id="customize_field_questions"
                                                formControlProps={{
                                                    fullWidth: true,
                                                    className: classes.formControl
                                                }}
                                                inputProps={{
                                                    placeholder: "Giá trị nhập",
                                                    type: "text",
                                                    multiline: ["COMBOBOX", "CHECKBOX", "RADIO"].includes(customize_field.customize_field_type),
                                                    rows: 5,
                                                    value: customize_field.customize_field_questions,
                                                    onChange: this.handleChangeCustomField.bind(this, true, "customize_field_questions", 0, 'input')
                                                }}
                                            />
                                        </GridItem>
                                        <GridItem xs={1} sm={1} md={1}>
                                            <Button
                                                color={window.innerWidth > 959 ? "transparent" : "white"}
                                                justIcon={true}
                                                simple={true}
                                                className={classes.buttonLink}
                                                onClick={this.handleAddCustomField.bind(this, 0, 'input')}
                                            >
                                                <Add className={classes.icon} />
                                            </Button>
                                        </GridItem>
                                    </GridContainer>

                                </CardBody>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </GridItem>
                <GridItem xs={12} sm={12} md={12} lg={4}>
                    <Card>
                        <CardHeader color="info">
                            <h4 className={classes.cardTitleWhite}>Dịch vụ </h4>
                            <p className={classes.cardCategoryWhite}>Thông tin dịch vụ</p>
                        </CardHeader>
                        {!isEmpty(vendor_service) &&
                            <CardBody>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={5}>
                                        <FormLabel className={classes.valueHorizontal}>
                                            Nhà cung cấp ID
                                            </FormLabel>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={7}>
                                        <FormLabel className={classes.labelHorizontal}>
                                            {vendor_service.vendor_id}
                                        </FormLabel>
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={5}>
                                        <FormLabel className={classes.valueHorizontal}>
                                            Mã Dịch vụ
                                            </FormLabel>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={7}>
                                        <FormLabel className={classes.labelHorizontal}>
                                            {new ResourceUtil(services_mst).getValue(vendor_service.service_code)}
                                        </FormLabel>
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={5}>
                                        <FormLabel className={classes.valueHorizontal}>
                                            Tên dịch vụ
                                            </FormLabel>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={7}>
                                        <FormLabel className={classes.labelHorizontal}>
                                            {vendor_service.ven_serv_name}
                                        </FormLabel>
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={5}>
                                        <FormLabel className={classes.valueHorizontal}>
                                            Địa chỉ
                                    </FormLabel>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={7}>
                                        <FormLabel className={classes.labelHorizontal}>
                                            {vendor_service.add_service}
                                        </FormLabel>
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={5}>
                                        <FormLabel className={classes.valueHorizontal}>
                                            Khu vực
                                    </FormLabel>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={7}>
                                        <FormLabel className={classes.labelHorizontal}>
                                            {vendor_service.city}
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
                                            {vendor_service.phone_service}
                                        </FormLabel>
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={5}>
                                        <FormLabel className={classes.valueHorizontal}>
                                            Fax
                                    </FormLabel>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={7}>
                                        <FormLabel className={classes.labelHorizontal}>
                                            {vendor_service.fax_service}
                                        </FormLabel>
                                    </GridItem>
                                </GridContainer>
                            </CardBody>
                        }
                    </Card>
                </GridItem>
            </GridContainer>
            {isShowMenuModal && <MenuPopup type={this.state.menu_type} service_code={model.product.service_code} title="Thực đơn" data={menus} isShowModal={this.state.isShowMenuModal} onToggleMenuModal={this.onToggleMenuModal} isLoading={isLoading} />}
            {isDisplayPopup && <UploadPopup files={model.prd_images} onToggleModal={this.onToggleModalWithData} />}
        </>;
    }
}

export default withStyles(styles)(NewProductScreen)
