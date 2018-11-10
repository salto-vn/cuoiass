import * as React from 'react';
// import { Select } from '../../common/FormControls/Select';
import Input from '../../common/FormControls/Input';
// import * as HandleRequest from '../../api/HandleRequest';
import { IStaff } from '../../interface/IStaff';

// interface ISourceDropdown {
//     id: number;
//     title: string;
// }

interface IStaffModalProp {
    modalTitle?: string;
    model: IStaff
    onToggleModal: any;
    onSaveModel: any;
    // onSaveSource: any;
    // source: ISourceDropdown[]
}

interface IinitState {
    // source: ISourceDropdown[];
    model: IStaff;
    isError: boolean,
    errorInfo: null | string
}

export default class StaffModal extends React.Component<IStaffModalProp, IinitState> {

    public state = {
        // source: this.props.source,
        model: this.props.model,
        isError: false,
        errorInfo: null
    }

    public componentDidMount() {
        // if (!this.state.source.length) {
        //     this.getListTransport();

        // }
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

    public handleChange = (evt: any) => {
        this.setState({
            model: {
                ...this.state.model,
                [evt.target.name]: evt.target.value
            }
        });
    }

    public render() {
        const { modalTitle, onToggleModal } = this.props;
        const { model } = this.state;

        return (
            <>
                <div className="modal fade in" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" onClick={onToggleModal}><span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title">{modalTitle}</h4>
                            </div>
                            <div className="modal-body">
                                <form className="form-inline">
                                    <div className="row">
                                        <div className="form-group col-md-6">
                                            <Input label={'Tên'} name={'title'} required={true} value={model.staff_name || ''} handleInput={this.handleChange} />
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
                                        <div className="form-group col-md-6">
                                            <Input label={'Type'} name={'type'} required={true} value={model.email || ''} handleInput={this.handleChange} />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <Input label={'Style'} name={'style'} required={true} value={model.password || ''} handleInput={this.handleChange} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-md-6">
                                            <Input label={'Type'} name={'type'} required={true} value={model.phone || ''} handleInput={this.handleChange} />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <Input label={'Style'} name={'style'} required={true} value={model.address || ''} handleInput={this.handleChange} />
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

    // private getListTransport = async () => {
    // const response = await HandleRequest.GetList(urlGetListTransport);

    // if (response.isError) {
    //     return this.setState({ isError: response.isError, errorInfo: response.message });
    // }

    // this.setState({
    //     source: response.result.data
    // }, () => this.props.onSaveSource(response.result.data));
    // }
}