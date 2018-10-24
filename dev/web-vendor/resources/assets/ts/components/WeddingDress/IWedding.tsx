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

export interface ISourceDropdown {
    id: number;
    title: string,
}

export interface IWeddingModal {
    title: string;
    description: string;
    album_id: number;
    type: string;
    style: string;
    venue: string;
    rentCost: string;
    price: string;
    tag: string;
}

export class WeddingModal implements IWeddingModal {
    public title: string = '';
    public description: string = '';
    public album_id: number = 0;
    public type: string = '';
    public style: string = '';
    public venue: string = '';
    public rentCost: string = '';
    public price: string = '';
    public tag: string = '';
}

export interface IWeddingDressState {
    isLoading: boolean,
    itemRepeat: number
    limit: number,
    offset: number,
    weddingGrid: IWeddingList[],
    sourceTransport: ISourceDropdown[],
    isShowModal: boolean,
    totalItem: number,
    isError: boolean,
    errorInfo: null | string,
    activePage: number
};

