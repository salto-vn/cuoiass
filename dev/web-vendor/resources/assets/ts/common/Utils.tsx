/**
 * Convert object to query string: page=1&limit=20
 * 
 * @param params 
 * @param glue 
 * @param delimiter 
 * 
 * @return string
 */
export const objectToQueryString = (params: object | any, glue: string = ':', delimiter: string = ';') => {
    return Object.keys(JSON.parse(JSON.stringify(params))).map(key => key + `${glue}` + params[key]).join(delimiter);
};

/**
 * 
 * @param value 
 * 
 * @return boolean
 */
export const showError = (clientError: any, errorInfo: any, key: string) => {
    if (clientError[key] && !isEmpty(clientError[key])) {
        return clientError[key];
    }

    if (errorInfo.errors[key] && Array.isArray(errorInfo.errors[key])) {
        return errorInfo.errors[key][0];
    }

    return '';
}

/**
 * 
 * @param value 
 * 
 * @return boolean
 */
export const isEmpty = (value: any) => {
    return (value === undefined || value === null || value === '');
}

export const isEmail = (email: string) => {
    return email.match(/^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/g);
}
