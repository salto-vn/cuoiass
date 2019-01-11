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
export const findOne = async (url: string, id: string, signal: any, columns?: string[]) => {
    var fullUrl: string = "";
    if (columns == undefined) {
        fullUrl = `${url}/${id}`;
    } else {
        fullUrl = `${url}/${id}/${columns}`;
    }

    const result = await fetch(fullUrl, {
        method: "GET",
        signal: signal,
        headers: headerOptions,
    });

    return HandleResponse(result);
};

/**
 * Make request with method get
 * @method GET
 * @param url 
 * @param columns 
 * 
 * @return HandleResponse
 */

export const Get = async (url: string, queryString?: string, signal?: any, columns?: string[], ) => {
    const result = await fetch(`${url}?${queryString}`, {
        method: "GET",
        signal: signal,
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

export const GetList = async (url: string, page: number = 1, limit: number = 10, orderBy?: string, order?: string, search?: string, signal?: any, columns?: string[], ) => {
    const params: any = { page, limit, orderBy, order, search };
    const queryString = objectToQueryString(params, '=', '&');
    const result = await fetch(`${url}?${queryString}`, {
        method: "GET",
        signal: signal,
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
export const Store = async (url: string, model: object, signal: any) => {
    const result = await fetch(`${url}`, {
        method: "POST",
        signal: signal,
        headers: headerOptions,
        body: JSON.stringify(model)
    });

    return HandleResponse(result);
};

/**
 * Function edit
 * @param url 
 * @param id 
 */

/**
* Function edit
* @method GET
* @param url 
* 
* @return HandleResponse
*/
export const Edit = async (url: string, id: number | string, signal: any) => {
    const result = await fetch(`${url}/${id}/edit`, {
        method: "GET",
        signal: signal,
        headers: headerOptions,
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
export const Show = async (url: string, id: number | string, signal: any) => {
    const result = await fetch(`${url}/${id}`, {
        method: "GET",
        signal: signal,
        headers: headerOptions,
    });

    return HandleResponse(result);
};

/**
 * Function update
 * @method GET
 * @param url
 * @param model
 * @param id
 * 
 * @return HandleResponse
 */
export const Update = async (url: string, model: object, id: string | number, signal: any) => {
    const result = await fetch(`${url}/${id}`, {
        method: "PUT",
        signal: signal,
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
export const Destroy = async (url: string, id: string, signal: any) => {
    const result = await fetch(`${url}/${id}`, {
        method: "DELETE",
        signal: signal,
        headers: headerOptions
    });

    return HandleResponse(result);
}
