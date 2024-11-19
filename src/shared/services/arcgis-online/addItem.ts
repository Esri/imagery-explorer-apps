import {
    getPortalBaseUrl,
    getSignedInUser,
    getToken,
} from '@shared/utils/esri-oauth';
import { canPublishContent } from '../raster-analysis/checkUserRoleAndPrivileges';

export type AddItemResponse = {
    success: boolean;
    id: string;
    folder: string;
};

/**
 * Add an item to the signed in user's content
 * @param requestBody
 * @returns
 *
 * @see https://developers.arcgis.com/rest/users-groups-and-items/add-item/
 */
export const addItem = async (
    requestBody: URLSearchParams
): Promise<AddItemResponse> => {
    const portalRoot = getPortalBaseUrl();
    const signedInUser = getSignedInUser();

    if (!signedInUser) {
        throw new Error('Cannot add item without a signed-in user');
    }

    if (!requestBody.has('token')) {
        throw new Error('Cannot add item in anonymous mode, sign in first');
    }

    if (canPublishContent(signedInUser) === false) {
        throw new Error('User does not have permission to publish content');
    }

    const requestURL = `${portalRoot}/sharing/rest/content/users/${signedInUser.username}/addItem`;

    const response = await fetch(requestURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: requestBody,
    });

    const data = await response.json();

    if (data.error) {
        throw new Error(data.error.message);
    }

    return data as AddItemResponse;
};
