import HandleResponse from './HandleResponse';

export const GetList = async (url: string, offset: number = 0, limit: number = 100, sortbyc?: string, sortby?: string, search?: string) => {
    const result = await fetch(`${url}?offset=${offset}&limit=${limit}&sortbyc=${sortbyc}&sortby=${sortby}&search=${search}`);
    return HandleResponse(result);
};

