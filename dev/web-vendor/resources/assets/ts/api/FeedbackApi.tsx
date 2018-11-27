import HandleResponse from './HandleResponse';

export const GetList = async (url: string, offset: number = 0, limit: number = 100, columns: string[] = []) => {
    const review = 'api/reviews';
    const result = await fetch(`${review}?offset=${offset}&limit=${limit}&columns=${columns}`);
    return HandleResponse(result);
};

