import HandleResponse from './HandleResponse';

export const GetList = async (url: string, offset: number = 0, limit: number = 100, columns: string[] = []) => {
    const abc = 'api/accounts';
    const result = await fetch(`${abc}?offset=${offset}&limit=${limit}&columns=${columns}`);
    return HandleResponse(result);
};

