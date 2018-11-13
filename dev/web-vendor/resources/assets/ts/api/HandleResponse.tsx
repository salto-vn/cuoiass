interface IHandleResponse {
    isError: boolean;
    isValidate: boolean;
    message: string;
    validateMessage: string;
    result: any;
}

/**
 * 
 * @param res 
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

    if (!res.ok && res.status === 422) {
        isValidate = true;
        validateMessage = await res.json();
    }

    return { isError, message: res.statusText, isValidate, validateMessage, result } as IHandleResponse;
};

export default HandleResponse;