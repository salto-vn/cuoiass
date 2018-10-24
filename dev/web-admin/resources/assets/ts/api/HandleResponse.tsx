interface IHandleResponse {
    isError: boolean;
    message: string;
    data: any;
}

const HandleResponse = async (res: Response) => {
    let isError = true;
    let data = null;

    if (res.ok) {
        isError = false;
        data = await res.json();
    }

    return { isError, message: res.statusText, data } as IHandleResponse;
};

export default HandleResponse;