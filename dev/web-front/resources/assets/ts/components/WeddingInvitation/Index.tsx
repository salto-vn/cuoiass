import * as React from 'react';
import Pagination from "react-js-pagination";
import { Select } from '../../common/FormControls/Select';
import * as TransportApi from '../../api/Transport';
import * as WeddingDressApi from '../../api/WeddingDress';
import WeddingDressModal from './Form';
import PlaceHolderLoadding from '../../common/PlaceHolderLoadding';

export interface ISourceDropdown {
    id: number;
    title: string,
}

export interface IWeddingList {
    id: number;
    title: string;
    description: string;
    album_id: number;
    type: string;
    style: string;
    venue: string;
    rent_cost: string;
    price: string;
    tag?: string;
    created_at?: string
    updated_at?: string
}

export interface IWeddingModal {
    id?: number;
    title?: string;
    description?: string;
    album_id?: number;
    type?: string;
    style?: string;
    venue?: string;
    rent_cost?: string;
    price?: string;
    tag?: string;
}

export interface IWeddingDressState {
    isLoading: boolean,
    itemRepeat: number
    limit: number,
    offset: number,
    source: ISourceDropdown[],
    weddingGrid: IWeddingList[],
    weddingModel: IWeddingModal,
    isShowModal: boolean,
    totalItem: number,
    error: string,
    errorInfo: string,
    activePage: number
};

export class WeddingInvitation extends React.Component<{}, IWeddingDressState, IWeddingModal> {
    public state = {
        isLoading: false,
        itemRepeat: 1,
        limit: 10,
        offset: 0,
        source: [],
        weddingGrid: [],
        weddingModel: {
            title: '',
            description: '',
            album_id: 0,
            type: '',
            style: '',
            venue: '',
            rent_cost: '',
            price: '',
            tag: '',
        },
        isShowModal: false,
        totalItem: 0,
        error: '',
        errorInfo: '',
        activePage: 1
    };
    //
    // public componentDidMount() {
    //     TransportApi.listTransport().then(result => this.setState({
    //         source: result.data,
    //         totalItem: result.meta.total
    //     }));
    //     this.getListWeddingDress();
    // }

    // public getListWeddingDress = () => {
    //     const { offset, limit } = this.state;
    //     this.setState({ isLoading: true });
    //     WeddingDressApi.GetListWeddingDress(offset, limit).then(result => this.setState({
    //         weddingGrid: result.data,
    //         totalItem: result.meta.total,
    //         isLoading: false
    //     }));
    // }

    public handlePageChange = (pageNumber: number) => {
        const { limit, activePage } = this.state;
        if (activePage === pageNumber) {
            return;
        }

        return this.setState((prevState) => ({
            ...prevState, activePage: pageNumber, offset: (pageNumber - 1) * limit
        }), () => {
            // this.getListWeddingDress();
        });
    }

    public showLoading = (itemRepeat: number) => {
        return <PlaceHolderLoadding itemRepeat={itemRepeat} />;
    }

    public paginate = () => {
        const { activePage, totalItem, limit } = this.state;
        return <Pagination
            pageRangeDisplayed={limit}
            activePage={activePage}
            totalItemsCount={totalItem}
            onChange={this.handlePageChange}
        />;
    };

    public onToggleModal = () => {
        const { isShowModal } = this.state;

        if (!isShowModal) {
            document.body.classList.add('modal-open');
            document.body.style.paddingRight = '17px';
        } else {
            document.body.attributes.removeNamedItem('class');
            document.body.attributes.removeNamedItem('style');
        }

        this.setState({ isShowModal: !this.state.isShowModal });
    }

    public getValue = (selectedValue: number) => {
        this.setState(prevState => ({
            weddingModel: {
                ...prevState.weddingModel,
                album_id: selectedValue
            }
        }));
    }

    public makeGrid = (data: any) => {
        const { isLoading, itemRepeat } = this.state;

        if (isLoading) {
            return <tr className="is-loadding"><td colSpan={100}><PlaceHolderLoadding itemRepeat={itemRepeat} /></td></tr>;
        }

        return data.map((item: any, key: number) =>
            <tr key={key}>
                <th scope="row">{key + 1}</th>
                <td>{item.title}</td>
                <td>{item.album_id}</td>
                <td>{item.type}</td>
                <td>{item.style}</td>
                <td>{item.venue}</td>
                <td>{item.rent_cost}</td>
                <td>{item.price}</td>
            </tr>
        )
    }

    public render() {
        const { source, weddingGrid, isShowModal, weddingModel } = this.state;

        return (
            <>
                <div className="page-title">
                    <h3 className="breadcrumb-header">Áo cưới</h3>
                </div>
                <div id="main-wrapper">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel panel-white">
                                <Select options={source} value={weddingModel.album_id} placeholder={false} getValue={this.getValue} label='Transport' addClass='form-control form-select-options'  name="ac"/>
                            </div>
                            <div className="panel panel-white">{weddingModel.album_id}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel panel-white">
                                <div className="panel-heading flex justify-content-between align-items-center">
                                    <h4 className="panel-title">Danh sách áo cưới</h4>
                                    <div className="">{this.paginate()}</div>
                                </div>
                                <div className="panel-body">
                                    <button type="button" className="btn btn-success m-b-sm" onClick={this.onToggleModal}>Add new row</button>

                                    <table className="table table-hover custom-table">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Tên</th>
                                                <th>Loại Abum</th>
                                                <th>Kiểu</th>
                                                <th>style</th>
                                                <th>Địa điểm</th>
                                                <th>Giá thuê</th>
                                                <th>Giá bán</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.makeGrid(weddingGrid)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <WeddingDressModal modalTitle="Add title" model={[]} visable={isShowModal} onToggleModal={this.onToggleModal} />
                    </div>
                </div>
            </>
        );
    }
}
