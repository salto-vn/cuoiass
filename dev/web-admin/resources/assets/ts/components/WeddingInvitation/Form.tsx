import * as React from 'react';

interface IModel {
    id?: number;
    title?: string;
    description?: string;
    album_id?: number;
    type: string;
    style?: string;
    venue?: string;
    rent_cost?: string;
    price?: string;
    tag?: string;
}

interface IWeddingDressModalProp {
    modalTitle?: string;
    model: IModel[],
    visable: boolean,
    onToggleModal: any
}

export default class WeddingDressModal extends React.Component<IWeddingDressModalProp> {
    public state = {
        error: false
    }

    public handleSubmit = (event: any) => {
        alert('An essay was submitted: ');
        event.preventDefault();
    }

    public render() {
        const { modalTitle, visable, onToggleModal } = this.props;

        if (!visable) {
            return null;
        }

        return (
            <>
                <form id="add-row-form" onSubmit={this.handleSubmit}>
                    <div className="modal fade in" style={{ display: 'block' }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" onClick={onToggleModal}><span aria-hidden="true">&times;</span></button>
                                    <h4 className="modal-title">{modalTitle}</h4>
                                </div>
                                <div className="modal-body">
                                    test
                                {/* <div className="form-group">
                                    <input type="text" value="" id="name-input" className="form-control" placeholder="Name" />
                                </div>
                                <div className="form-group">
                                    <input type="text" id="position-input" className="form-control" placeholder="Position" />
                                </div>
                                <div className="form-group">
                                    <input type="number" id="age-input" className="form-control" placeholder="Age" />
                                </div>
                                <div className="form-group">
                                    <input type="text" id="date-input" className="form-control date-picker" placeholder="Start Date" />
                                </div>
                                <div className="form-group">
                                    <input type="number" id="salary-input" className="form-control" placeholder="Salary" />
                                </div> */}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" onClick={onToggleModal}>Huỷ</button>
                                    <button type="submit" id="add-row" className="btn btn-success">Lưu</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="modal-backdrop fade in" style={{ display: 'block' }} />
            </>
        );
    }
}