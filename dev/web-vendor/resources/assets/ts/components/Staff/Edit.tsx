import * as React from 'react';
// import { Select } from '../../common/FormControls/Select';
import Input from '../../common/FormControls/Input';
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
import { createStyles, withStyles } from '@material-ui/core';
import avatar from "../../../img/faces/marc.jpg";

// interface ISourceDropdown {
//     id: number;
//     title: string;
// }

interface IStaffModalProp {
    modalTitle?: string;
    model: IStaff;
    onToggleModal: any;
    onCreate: any;
    onUpdate: any;
    isCreate: boolean;
    isValidate: boolean;
    errorInfo: any;
    classes: any,
    // onSaveSource: any;
    // source: ISourceDropdown[]
}

interface IinitState {
    // source: ISourceDropdown[];
    model: IStaff;
    isSubmitDisabled: boolean;
    clientError: IValidateModel
}



const styles = createStyles({
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
    }
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
            isSubmitDisabled: this.props.isCreate ? false : true
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

    public handleSelect = (selectedValue: number) => {
        this.setState({
            model: { ...this.state.model, album_id: selectedValue }
        });
    }

    public handleChange = (isRequired: boolean, event: any) => {
        var value = event.currentTarget.value;
        var name = event.currentTarget.id;
        const errMessage = ValidateStaff(isRequired, name, value);
        this.setState({
            model: { ...this.state.model, [name]: value ? value : undefined },
            clientError: { ...this.state.clientError, [name]: errMessage },
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

    public render() {
        const { classes, modalTitle, onToggleModal, isCreate, errorInfo } = this.props;
        const { model, clientError } = this.state;
        return (
            <>
                <div>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={8}>
                            <Card>
                                <CardHeader color="primary">
                                    <h4 className={classes.cardTitleWhite}>{modalTitle}</h4>
                                    <p className={classes.cardCategoryWhite}>Chỉnh sửa thông tin tài khoản</p>
                                </CardHeader>
                                <CardBody>
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
                                                    value: model.phone,
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
                                                    value: model.address,
                                                    type: 'text',
                                                    onChange: this.handleChange.bind(this, false),
                                                }}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                </CardBody>
                                <CardFooter>
                                    <Button color="primary">Update Profile</Button>
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
                                    <h6 className={classes.cardCategory}>TODO:ROLE</h6>
                                    <h4 className={classes.cardTitle}>{model.staff_name}</h4>
                                    <p className={classes.description}>
                                       Ngay tao: 2019/10/10
                                       Ngay truy cap cuoi cung: 2019/10/10
                                    </p>
                                    <Button color="danger" round>
                                        Delete
                                    </Button>
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