/**
 * 
 * @param value 
 * 
 * @return boolean
 */
export const required = (value: any) => {
    return (value === undefined || value === null || value === '' || !value.toString().trim().length);
}

/**
 * 
 * @param value 
 */
export const boolean = (value: boolean) => {

}

/**
 * 
 * @param value 
 * 
 * @return number
 */
export const count = (value: string) => {
    return value.toString().trim().length;
}
/**
 * 
 * @param email 
 * @return null | string
 */
export const email = (email: string) => {
    return email.match(/^[a-z][a-z0-9_\.]{3,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/g);
}

/**
 * 
 * @param value 
 * @param min 
 * @return boolean
 */
export const min = (value: string, min: number) => {
    return value.toString().trim().length < min;
}

/**
 * 
 * @param value 
 * @param max 
 * @return boolean
 */
export const max = (value: string, max: number) => {
    return (value.toString().trim().length > max);
}

/**
 * 
 * @param value 
 * @param parameters 
 * 
 * @return boolean
 */
export const inArray = (value: never, parameters: string[]) => {
    return parameters.includes(value);
}


/**
 * 
 * @param value 
 * @param max 
 * @return boolean
 */
export const between = (value: string, min: number, max: number) => {
    return (value.toString().trim().length < min && value.toString().trim().length > max);
}


/**
 * 
 * @param value 
 * @param min 
 * @param max 
 * 
 * @return boolean
 */
export const digitsBetween = (value: number, min: number, max: number) => {
    return (value >= min && value <= max);
}
