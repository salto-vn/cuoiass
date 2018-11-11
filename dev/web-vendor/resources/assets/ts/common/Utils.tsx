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
