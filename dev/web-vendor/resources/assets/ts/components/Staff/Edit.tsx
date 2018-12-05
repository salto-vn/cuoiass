import * as React from 'react';
// import { Select } from '../../common/FormControls/Select';
// import * as HandleRequest from '../../api/HandleRequest';
import { IStaff, IValidateModel } from '../../interface/IStaff';
import { isEmptyKeyInObject, showError } from '../../common/Utils';
import { ValidateStaff } from '../../common/Validate/StaffValidate';
import { ValidateModel } from '../../model/StaffModel';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import Card from '../../common/Card/Card';
import CardHeader from '../../common/Card/CardHeader';
import CardBody from '../../common/Card/CardBody';
import CustomInput from '../../common/FormControls/CustomInput/CustomInput';
import CardFooter from '../../common/Card/CardFooter';
import Button from '../../common/FormControls/CustomButtons/Button';
import CardAvatar from '../../common/Card/CardAvatar';
import { createStyles, withStyles, Theme } from '@material-ui/core';
import avatar from "../../../img/faces/marc.jpg";
import CustomSelect,{ IOption } from '../../common/FormControls/CustomSelect/CustomSelect';


interface IStaffModalProp {
    modalTitle?: string;
    model: IStaff;
    onCreate: any;
    onUpdate: any;
    onDelete: any,
    isCreate: boolean;
    isValidate: boolean;
    errorInfo: any;
    classes: any;
    roles: any
}

interface IinitState {
    // source: ISourceDropdown[];
    model: IStaff;
    isSubmitDisabled: boolean;
    clientError: IValidateModel
}



const styles = (theme: Theme) => createStyles({
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: 300,
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    },
    description: {
        textAlign: "left"
    },
    modal: {
        width: "800px"
    },
});


class StaffModal extends React.Component<IStaffModalProp, IinitState> {

    public state = {
        // source: this.props.source,
        model: this.props.model,
        isSubmitDisabled: false,
        clientError: new ValidateModel
    }

    componentDidMount() {

        this.setState({
            isSubmitDisabled: this.props.isCreate ? true : false
        })
    }

    public handleSubmit = (evt: any) => {
        evt.preventDefault();

        if (isEmptyKeyInObject(this.state.clientError)) {
            return;
        }

        const { model } = this.state;
        this.props.isCreate ? this.props.onCreate(model) : this.props.onUpdate(model);
    }


    public handleDelete = (evt: any) => {
        evt.preventDefault();

        if (isEmptyKeyInObject(this.state.clientError)) {
            return;
        }
        const { model } = this.state;
        !this.props.isCreate && this.props.onDelete(model.staff_id);
    }

    public handleSelect = (selectedValue: number) => {
        this.setState({
            model: { ...this.state.model, album_id: selectedValue }
        });
    }

    public handleChange = (isRequired: boolean, event: any) => {
        var value = event.target.value;
        var name = event.target.name;
        const errMessage = ValidateStaff(isRequired, name, value);
        this.setState({
            model: { ...this.state.model, [name]: value ? value : "" },
            clientError: { ...this.state.clientError, [name]: errMessage },
        }, () => {
            this.canSubmit();
        });
    }

    public canSubmit = () => {
        const { clientError,model } = this.state;
        if (!isEmptyKeyInObject(clientError) && model ) {
            return this.setState({ isSubmitDisabled: false });
        }
        return this.setState({ isSubmitDisabled: true });
    }


    public render() {
        const { classes, modalTitle, isCreate, errorInfo,roles } = this.props;
        const { model, clientError, isSubmitDisabled } = this.state;
        var roleSource: IOption[] = [];
         //Convert Datajson to Array with last index id PK key.
         for (let i: number = 0; i < roles.length; i++) {
            let role = roles[i];
            var option = {
                key:role.role_id,
                value:role.role_name
            };
            roleSource.push(option);
        }
        return (
            <>
                <div className={classes.modal}>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={8}>
                            <Card>
                                <CardHeader color="primary">
                                    <h4 className={classes.cardTitleWhite}>{modalTitle}</h4>
                                    <p className={classes.cardCategoryWhite}>Chỉnh sửa thông tin tài khoản</p>
                                </CardHeader>
                                <CardBody>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <CustomSelect
                                                labelText="Quyền"
                                                id="role_id"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                value={model.role_id}
                                                onChange={this.handleChange.bind(this, true)}
                                                errorContent={showError(clientError, errorInfo, 'role_id')}
                                                error={showError(clientError, errorInfo, 'role_id') == '' ? false : true}
                                                inputProps={{
                                                    name: "role_id"
                                                }}
                                                items={roleSource}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <CustomInput
                                                labelText="Họ và Tên"
                                                id="staff_name"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                errorContent={showError(clientError, errorInfo, 'staff_name')}
                                                error={showError(clientError, errorInfo, 'staff_name') == '' ? false : true}
                                                inputProps={{
                                                    value: model.staff_name,
                                                    name: "staff_name",
                                                    onChange: this.handleChange.bind(this, true),
                                                }}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <CustomInput
                                                labelText="Email"
                                                id="email"
                                                errorContent={showError(clientError, errorInfo, 'email')}
                                                error={showError(clientError, errorInfo, 'email') == '' ? false : true}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    value: model.email,
                                                    name: "email",
                                                    onChange: this.handleChange.bind(this, true),
                                                }}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <CustomInput
                                                labelText="Điện thoại"
                                                id="phone"
                                                errorContent={showError(clientError, errorInfo, 'phone')}
                                                error={showError(clientError, errorInfo, 'phone') == '' ? false : true}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    value: model.phone ? model.phone : '',
                                                    name: "phone",
                                                    onChange: this.handleChange.bind(this, false),
                                                }}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <CustomInput
                                                labelText="Mật khẩu"
                                                id="password"
                                                errorContent={showError(clientError, errorInfo, 'password')}
                                                error={showError(clientError, errorInfo, 'password') == '' ? false : true}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    value: model.password,
                                                    name: "password",
                                                    type: 'password',
                                                    onChange: this.handleChange.bind(this, true),
                                                }}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <CustomInput
                                                labelText="Địa chỉ"
                                                id="address"
                                                errorContent={showError(clientError, errorInfo, 'address')}
                                                error={showError(clientError, errorInfo, 'address') == '' ? false : true}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    value: model.address ? model.address : '',
                                                    type: 'text',
                                                    name: 'address',
                                                    onChange: this.handleChange.bind(this, false),
                                                }}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                </CardBody>
                                <CardFooter>
                                    {isSubmitDisabled ?
                                        <Button color="primary" onClick={this.handleSubmit} disabled>
                                            {isCreate ? "Tạo" : "Lưu"}
                                        </Button>
                                        :
                                        <Button color="primary" onClick={this.handleSubmit} >
                                            {isCreate ? "Tạo" : "Lưu"}
                                        </Button>
                                    }
                                </CardFooter>
                            </Card>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <Card profile>
                                <CardAvatar profile>
                                    <a href="#pablo" onClick={e => e.preventDefault()}>
                                        <img src={avatar} alt="..." />
                                    </a>
                                </CardAvatar>
                                <CardBody profile>

                                    <h6 className={classes.cardCategory}>{model.role_name}</h6>
                                    <h4 className={classes.cardTitle}>{model.staff_name}</h4>
                                    <div className={classes.description}>
                                        Ngày tạo: {model.created_at ? model.created_at.toLocaleString() : ""} <br />
                                        Ngày cập nhật: {model.updated_at ? model.updated_at.toLocaleString() : ""}
                                    </div>
                                    {!isCreate &&
                                        <Button color="danger" round onClick={this.handleDelete}>
                                            Xoá
                                        </Button>
                                    }
                                </CardBody>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </div>
            </>
        );
    }
    
}
export default withStyles(styles)(StaffModal);