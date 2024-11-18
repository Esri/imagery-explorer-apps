import { getToken } from '@shared/utils/esri-oauth';
import { addItem, AddItemResponse } from './addItem';

type CreateWebMappingApplicationOptions = {
    title: string;
    snippet: string;
    tags?: string;
};

export const createWebMappingApplication = async ({
    title,
    snippet,
    tags,
}: CreateWebMappingApplicationOptions): Promise<AddItemResponse> => {
    const requestBody = new URLSearchParams({
        f: 'json',
        token: getToken(),
        typeKeywords: ['Web Map', 'Map', 'Online Map', 'Mapping Site'].join(
            ','
        ),
        type: 'Web Mapping Application',
        applicationType: 'web',
        url: window.location.href,
        title,
        snippet,
        tags,
    });

    const res = await addItem(requestBody);

    return res;
};
