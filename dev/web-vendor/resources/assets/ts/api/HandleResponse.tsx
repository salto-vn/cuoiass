interface IErr {
    errors: string[]
}

interface IHandleResponse {
    isError: boolean;
    isValidate: boolean;
    message: string;
    validateMessage: IErr;
    result: any;
}

/**
 * 
 * @param res:Response
 * @return IHandleResponse
 */
const HandleResponse = async (res: Response) => {
    let isError = false;
    let isValidate = false;
    let result = null;
    let validateMessage = null;
    if (res.ok && res.status >= 200 && res.status < 300) {
        result = await res.json();
    }
    if (!res.ok && res.status === 404) {
        validateMessage = await res.json();
        isError = true;
        return { isError, message: res.statusText, isValidate, validateMessage, result } as IHandleResponse;
    }

    if (!res.ok && res.status === 422) {
        isValidate = true;
        validateMessage = await res.json();
    }
    
    if (!res.ok && res.status === 500) {
        isError = true;
    }

    return { isError, message: res.statusText, isValidate, validateMessage, result } as IHandleResponse;
};

export default HandleResponse;