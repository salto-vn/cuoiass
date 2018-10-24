import * as React from 'react';
import CONSTANT from '../../bootstrap/Constant';
import Pagination from "react-js-pagination";
import * as WeddingDressApi from '../../api/WeddingDress';
import LoadingGrid from '../../common/Loading/LoadingGrid';
import LoadingPaginate from '../../common/Loading/LoadingPaginate';
import { IWeddingDressState, WeddingModal } from './IWedding';
import WeddingDressModal from './Form';
const urlGetList = 'api/weddingdress';

export class WeddingDress extends React.Component<{}, IWeddingDressState> {
    public state = {
        isLoading: false,
        itemRepeat: CONSTANT.ITEM_REPEAT,
        limit: CONSTANT.LIMIT,
        offset: CONSTANT.OFFSET,
        weddingGrid: [],
        weddingModel: new WeddingModal(),
        sourceTransport: [],
        isShowModal: false,
        totalItem: CONSTANT.TOTAL_COUNT,
        isError: false,
        errorInfo: null,
        activePage: CONSTANT.CURRENT_PAGE
    };

    public async componentDidMount() {
        document.title = 'Áo cưới';
        this.getListWeddingDress();
    }

    public handleSave = (dataChild: any) => {
        console.log(dataChild);
    }

    public saveStateSource = (sourceTransport: any) => {
        this.setState({ sourceTransport }, () => console.log(this.state.sourceTransport));
    }

    public render() {
        const { weddingGrid, isShowModal, totalItem } = this.state;

        return (
            <>
                <div className="page-title">
                    <h3 className="breadcrumb-header">Áo cưới</h3>
                </div>
                <div id="main-wrapper">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel panel-white">
                                <div className="panel-heading flex justify-content-between align-items-center">
                                    <h4 className="panel-title">Danh sách áo cưới</h4>
                                    {
                                        totalItem === CONSTANT.TOTAL_COUNT ? <LoadingPaginate width={300} height={30} /> : this.paginate()
                                    }

                                </div>
                                <div className="panel-body">
                                    <button type="button" className="btn btn-success m-b-sm" onClick={this.onToggleModal}>Add new row</button>
                                    <div className="table table-hover custom-table">
                                        <div className="flex">
                                            <div className="flex justify-content-center grid-header w-xxs">#</div>
                                            <div className="flex flex-2 grid-header">Tên</div>
                                            <div className="flex flex-1 grid-header">Loại Abum</div>
                                            <div className="flex flex-1 grid-header">style</div>
                                            <div className="flex flex-2 grid-header">Địa điểm</div>
                                            <div className="flex justify-content-center flex-1 grid-header">Giá thuê</div>
                                            <div className="flex justify-content-center flex-1 grid-header">Giá bán</div>
                                            <div className="flex justify-content-center w-xs grid-header">Actions</div>
                                        </div>
                                        {this.makeGrid(weddingGrid)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {
                            isShowModal &&
                            <WeddingDressModal
                                modalTitle="Add title"
                                source={this.state.sourceTransport}
                                modelWedding={this.state.weddingModel}
                                onToggleModal={this.onToggleModal}
                                onSaveSource={this.saveStateSource}
                                onSaveDate={this.handleSave}
                            />
                        }
                    </div>
                </div>
            </>
        );
    }

    private makeGrid = (data: any) => {
        const { isError, errorInfo, isLoading, itemRepeat } = this.state;

        if (isError) {
            return <div>{errorInfo}</div>;
        }

        if (isLoading) {
            return <div className="is-loadding"><LoadingGrid itemRepeat={itemRepeat} /></div>;
        }

        return data.map((item: any, key: number) =>
            <div className="row-item flex align-items-center" key={key}>
                <div className="flex item justify-content-center w-xxs">{key + 1}</div>
                <div className="flex item flex-2">{item.title}</div>
                <div className="flex item flex-1">{item.album_id}</div>
                <div className="flex item flex-1">{item.type}</div>
                <div className="flex item flex-2">{item.venue}</div>
                <div className="flex item justify-content-center flex-1">{item.rent_cost}</div>
                <div className="flex item justify-content-center flex-1">{item.price}</div>
                <div className="flex item justify-content-center w-xs">
                    <a className="action-icon">
                        <i className="fa fa-pencil" />
                    </a>
                    <a className="action-icon">
                        <i className="fa fa-trash-o" />
                    </a>
                </div>
            </div>
        )
    }

    private onToggleModal = () => {
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

    private handlePageChange = (pageNumber: number) => {
        const { limit, activePage } = this.state;
        if (activePage === pageNumber) {
            return;
        }

        return this.setState((prevState) => ({
            ...prevState, activePage: pageNumber, offset: (pageNumber - 1) * limit
        }), () => {
            this.getListWeddingDress();
        });
    }

    private paginate = () => {
        const { activePage, totalItem, limit } = this.state;
        return <Pagination
            pageRangeDisplayed={limit}
            activePage={activePage}
            totalItemsCount={totalItem}
            onChange={this.handlePageChange}
        />;
    };

    private getListWeddingDress = async () => {
        this.setState({ isLoading: true });

        const { offset, limit } = this.state;
        const response = await WeddingDressApi.GetList(urlGetList, offset, limit);

        if (response.isError) {
            return this.setState({ isError: response.isError, errorInfo: response.message });
        }

        this.setState({
            weddingGrid: response.data.data,
            totalItem: response.data.meta.total,
            isLoading: false
        });
    }
}
