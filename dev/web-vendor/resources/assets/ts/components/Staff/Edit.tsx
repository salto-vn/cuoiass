import * as React from 'react';
// import { Select } from '../../common/FormControls/Select';
import Input from '../../common/FormControls/Input';
// import * as HandleRequest from '../../api/HandleRequest';
import { IStaff, IValidateModel } from '../../interface/IStaff';
import { isEmptyKeyInObject, showError } from '../../common/Utils';
import { ValidateStaff } from '../../common/Validate/StaffValidate';
import { ValidateModel } from '../../model/StaffModel';

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
    // onSaveSource: any;
    // source: ISourceDropdown[]
}

interface IinitState {
    // source: ISourceDropdown[];
    model: IStaff;
    isSubmitDisabled: boolean;
    clientError: IValidateModel
}

export default class StaffModal extends React.Component<IStaffModalProp, IinitState> {

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

        this.props.isCreate ? this.props.onCreate(this.state.model) : this.props.onUpdate(this.state.model);
    }

    public handleSelect = (selectedValue: number) => {
        this.setState({
            model: { ...this.state.model, album_id: selectedValue }
        });
    }

    public handleChange = (isRequired: boolean, name: string, value: string) => {
        const errMessage = ValidateStaff(isRequired, name, value);
        this.setState({
            model: { ...this.state.model, [name]: value ? value : undefined },
            clientError: { ...this.state.clientError, [name]: errMessage },
        }, () => {
            this.canSubmit();
        }
        );
    }

    public canSubmit = () => {
        const { clientError } = this.state;
        if (isEmptyKeyInObject(clientError)) {
            console.log(isEmptyKeyInObject(clientError))
            return this.setState({ isSubmitDisabled: false });
        }

        return this.setState({ isSubmitDisabled: true });
    }

    public render() {
        const { modalTitle, onToggleModal, isCreate, errorInfo } = this.props;
        const { model, clientError } = this.state;

        return (
            <>
                <div className="modal fade in" style={{ display: 'block' }}>
                    <div className="modal-dialog w800">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" onClick={onToggleModal}><span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title">{modalTitle}</h4>
                            </div>
                            <div className="modal-body">
                                <form className="form-inline">
                                    <div className="row">
                                        <div className="form-group col-md-6 h85">
                                            <Input label={'Tên'} name={'staff_name'} type={'text'} required={true} value={model.staff_name || ''} handleInput={this.handleChange.bind(this, true)} />
                                            {<span className={'required'}>{showError(clientError, errorInfo, 'staff_name')}</span>}
                                        </div>
                                        <div className="form-group col-md-6 h85">
                                            <Input label={'Email'} name={'email'} type={'text'} required={true} value={model.email || ''} handleInput={this.handleChange.bind(this, true)} />
                                            {<span className={'required'}>{showError(clientError, errorInfo, 'email')}</span>}
                                        </div>
                                        {/* <div className="form-group col-md-6">
                                            <Select
                                                name={'album_id'}
                                                options={this.state.source}
                                                value={model.role_id}
                                                placeholder={false}
                                                getValue={this.handleSelect}
                                                label='Transport'
                                                addClass='form-control' />
                                        </div> */}
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-md-6 h85">
                                            <Input label={'Điện thoại'} name={'phone'} type={'text'} required={true} value={model.phone || ''} handleInput={this.handleChange.bind(this, true)} />
                                            {<span className={'required'}>{showError(clientError, errorInfo, 'phone')}</span>}
                                        </div>
                                        <div className="form-group col-md-6 h85">
                                            <Input label={'Mật khẩu'} name={'password'} type={'password'} required={isCreate ? true : false} value={model.password || ''} handleInput={this.handleChange.bind(this, isCreate ? true : false)} />
                                            {<span className={'required'}>{showError(clientError, errorInfo, 'password')}</span>}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-md-12 h85">
                                            <Input label={'Địa chỉ'} name={'address'} type={'text'} required={false} value={model.address || ''} handleInput={this.handleChange.bind(this, false)} />
                                            {<span className={'required'}>{showError(clientError, errorInfo, 'address')}</span>}
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" onClick={onToggleModal}>Huỷ</button>
                                <button type="button" onClick={this.handleSubmit} id="add-row" className={`btn btn-success ${!this.state.isSubmitDisabled ? 'disabled' : ''}`}>Lưu</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-backdrop fade in" style={{ display: 'block' }} />
            </>
        );
    }
}
