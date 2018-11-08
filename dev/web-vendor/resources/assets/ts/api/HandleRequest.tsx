import HandleResponse from './HandleResponse';

const headerOptions = {
    "Content-Type": "application/json",
    "Accept": "application/json"
};

export const GetList = async (url: string, offset: number = 0, limit: number = 100, columns: string[] = []) => {
    const result = await fetch(`${url}?offset=${offset}&limit=${limit}&columns=${columns}`, {
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

