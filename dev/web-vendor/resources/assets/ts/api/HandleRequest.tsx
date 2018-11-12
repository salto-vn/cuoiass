import HandleResponse from './HandleResponse';
import { objectToQueryString } from '../common/Utils';

const headerOptions = {
    "Content-Type": "application/json",
    "Accept": "application/json"
};

/**
 * Fine one by id and select dynamic columns
 * @method GET
 * @param url 
 * @param id 
 * @param columns 
 * 
 * @return HandleResponse
 */
export const findOne = async (url: string, id: string, columns?: string[]) => {
    var fullUrl: string = "";
    if (columns == undefined) {
        fullUrl = `${url}?id=${id}`;
    } else {
        fullUrl = `${url}?id=${id}&columns=${columns}`;
    }

    const result = await fetch(fullUrl, {
        method: "GET",
        headers: headerOptions,
    });

    return HandleResponse(result);
};

/**
 * Make request with method get
 * @method GET
 * @param url 
 * @param page 
 * @param limit 
 * @param sortbyc 
 * @param sortby 
 * @param search 
 * @param columns 
 * 
 * @return HandleResponse
 */

export const GetList = async (url: string, page: number = 1, limit: number = 10, sortbyc?: string, sortby?: string, search?: string, columns?: string[]) => {
    const params: any = { page, limit, sortbyc, sortby, search };
    const queryString = objectToQueryString(params, '=', '&');
    const result = await fetch(`${url}?${queryString}`, {
        method: "GET",
        headers: headerOptions,
    });

    return HandleResponse(result);
};

/**
 * Function store data
 * @method POST
 * @param url 
 * @param model 
 * @return HandleResponse
 */
export const Store = async (url: string, model: object) => {
    const result = await fetch(`${url}`, {
        method: "POST",
        headers: headerOptions,
        body: JSON.stringify(model)
    });

    return HandleResponse(result);
};

/**
 * Function edit
 * @method GET
 * @param url 
 * 
 * @return HandleResponse
 */
export const Edit = async (url: string) => {
    const result = await fetch(`${url}`, {
        method: "GET",
        headers: headerOptions,
    });

    return HandleResponse(result);
};

/**
 * Function update
 * @method GET
 * @param url
 * @param model
 * 
 * @return HandleResponse
 */
export const Update = async (url: string, model: object) => {
    const result = await fetch(`${url}`, {
        method: "PUT",
        headers: headerOptions,
        body: JSON.stringify(model)
    });

    return HandleResponse(result);
}

/**
 * Function delete
 * @method GET
 * @param url 
 * 
 * @return HandleResponse
 */
export const Destroy = async (url: string) => {
    const result = await fetch(`${url}`, {
        method: "DELETE",
        headers: headerOptions
    });

    return HandleResponse(result);
}
