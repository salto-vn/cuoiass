import HandleResponse from './HandleResponse';

export const GetList = async (url: string, offset: number = 0, limit: number = 100, columns: string[] = []) => {
    const result = await fetch(`${url}?offset=${offset}&limit=${limit}&columns=${columns}`);
    return HandleResponse(result);
};

