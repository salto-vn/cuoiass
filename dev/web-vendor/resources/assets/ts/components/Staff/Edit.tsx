import * as React from 'react';
// import { Select } from '../../common/FormControls/Select';
import Input from '../../common/FormControls/Input';
// import * as HandleRequest from '../../api/HandleRequest';
import { IStaff } from '../../interface/IStaff';
import { isEmpty } from '../../common/Utils';

// interface ISourceDropdown {
//     id: number;
//     title: string;
// }

interface IStaffModalProp {
    modalTitle?: string;
    model: IStaff;
    onToggleModal: any;
    onSaveModel: any;
    isCreate: boolean;
    isValidate: boolean;
    errorInfo: string;
    // onSaveSource: any;
    // source: ISourceDropdown[]
}

interface IinitState {
    // source: ISourceDropdown[];
    model: IStaff;
}

export default class StaffModal extends React.Component<IStaffModalProp, IinitState> {

    public state = {
        // source: this.props.source,
        model: this.props.model,
    }

    public handleSubmit = (evt: any) => {
        evt.preventDefault();
        this.props.onSaveModel(this.state.model);
    }

    public handleSelect = (selectedValue: number) => {
        this.setState({
            model: {
                ...this.state.model,
                album_id: selectedValue
            }
        });
    }

    public handleChange = (name: string, value: string) => {
        this.setState({
            model: {
                ...this.state.model,
                [name]: value
            }
        });
    }

    public render() {
        const { modalTitle, onToggleModal, isCreate, errorInfo } = this.props;
        const { model } = this.state;
        console.log(errorInfo);
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
                                        <div className="form-group col-md-6 h70">
                                            <Input label={'Tên'} name={'staff_name'} type={'text'} required={true} value={model.staff_name || ''} handleInput={this.handleChange} />
                                            {isEmpty(model.staff_name) && <span className={'required'}>{}</span>}

                                        </div>
                                        <div className="form-group col-md-6">
                                            <Input label={'Email'} name={'email'} type={'text'} required={true} value={model.email || ''} handleInput={this.handleChange} />
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
                                        <div className="form-group col-md-6 h70">
                                            <Input label={'Điện thoại'} name={'phone'} type={'text'} required={true} value={model.phone || ''} handleInput={this.handleChange} />
                                        </div>
                                        <div className="form-group col-md-6 h70">
                                            <Input label={'Mật khẩu'} name={'password'} type={'password'} required={isCreate ? true : false} value={model.password || ''} handleInput={this.handleChange} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-md-12 h70">
                                            <Input label={'Địa chỉ'} name={'address'} type={'text'} required={true} value={model.address || ''} handleInput={this.handleChange} />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" onClick={onToggleModal}>Huỷ</button>
                                <button type="button" onClick={this.handleSubmit} id="add-row" className="btn btn-success">Lưu</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal-backdrop fade in" style={{ display: 'block' }} />
            </>
        );
    }
}
