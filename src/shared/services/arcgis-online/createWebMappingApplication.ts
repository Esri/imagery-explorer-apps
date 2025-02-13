import { getToken } from '@shared/utils/esri-oauth';
import { addItem, AddItemParams, AddItemResponse } from './addItem';

type CreateWebMappingApplicationOptions = {
    title: string;
    snippet: string;
    tags?: string[];
    description?: string;
    /**
     * Credits the source of the item.
     */
    accessInformation?: string;
    /**
     * 	Includes any license information or restrictions.
     */
    licenseInfo?: string;
};

export const createWebMappingApplication = async ({
    title,
    snippet,
    tags,
    description,
    accessInformation,
    licenseInfo,
}: CreateWebMappingApplicationOptions): Promise<AddItemResponse> => {
    const requestBody: AddItemParams = {
        // f: 'json',
        // token: getToken(),
        typeKeywords: ['Web Map', 'Map', 'Online Map', 'Mapping Site'].join(
            ','
        ),
        type: 'Web Mapping Application',
        applicationType: 'web',
        url: window.location.href,
        title,
        snippet,
        tags: tags?.join(',') || '',
        description,
        accessInformation,
        licenseInfo,
    };

    const res = await addItem(requestBody);

    return res;
};
