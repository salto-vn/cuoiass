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
 * Check key in object not empty value
 * 
 * @param params 
 * @param glue 
 * @param delimiter 
 * 
 * @return boolean
 */
export const isEmptyKeyInObject = (params: object) => {
    if (Object.keys(JSON.parse(JSON.stringify(params))).length) {
        return true;
    }

    return false;
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
