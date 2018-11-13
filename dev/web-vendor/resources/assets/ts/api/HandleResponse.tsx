interface IHandleResponse {
    isError: boolean;
    message: string;
    result: any;
}

/**
 * 
 * @param res 
 * @return IHandleResponse
 */
const HandleResponse = async (res: Response) => {
    let isError = true;
    let result = null;

    if (res.ok) {
        isError = false;
        result = await res.json();
    }

    return { isError, message: res.statusText, result } as IHandleResponse;
};

export default HandleResponse;