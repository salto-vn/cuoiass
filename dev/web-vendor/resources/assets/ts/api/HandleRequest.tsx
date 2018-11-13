import HandleResponse from './HandleResponse';

const headerOptions = {
    "Content-Type": "application/json",
    "Accept": "application/json"
};

export const findOne = async (url: string, id: string, columns?: string[]) => {
    var fullUrl: string = "";
    if (columns == undefined) {
        fullUrl = `${url}/${id}`;
    } else {
        fullUrl = `${url}/${id}/${columns}`;
    }

    const result = await fetch(fullUrl, {
        method: "GET",
        headers: headerOptions,
    });

    return HandleResponse(result);
};

export const GetList = async (url: string, page: number = 1, limit: number = 10, sortbyc?: string, sortby?: string, search?: string, columns?: string[]) => {
    const fullUrl = `${url}?page=${page}&limit=${limit}&sortbyc=${sortbyc}&sortby=${sortby}&search=${search}`;
    const result = await fetch(fullUrl, {
        method: "GET",
        headers: headerOptions,
    });

    return HandleResponse(result);
};

export const Store = async (url: string, model: object) => {
    const result = await fetch(`${url}`, {
        method: "POST",
        headers: headerOptions,
        body: JSON.stringify(model)
    });

    return HandleResponse(result);
};

export const Edit = async (url: string) => {
    const result = await fetch(`${url}`, {
        method: "GET",
        headers: headerOptions,
    });

    return HandleResponse(result);
};

export const Update = async (url: string, model: object) => {
    const result = await fetch(`${url}`, {
        method: "PUT",
        headers: headerOptions,
        body: JSON.stringify(model)
    });

    return HandleResponse(result);
}

export const Destroy = async (url: string) => {
    const result = await fetch(`${url}`, {
        method: "DELETE",
        headers: headerOptions
    });

    return HandleResponse(result);
}
