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
export const isEmpty = (value: any) => {
    return (value === undefined || value === null || value === '');
}

/**
 * 
 * @param value 
 * 
 * @return boolean
 */
export const showError = (errorInfo: any, key: string) => {
    if (errorInfo.errors[key] && Array.isArray(errorInfo.errors[key])) {
        return errorInfo.errors[key][0];
    }

    return '';
}
