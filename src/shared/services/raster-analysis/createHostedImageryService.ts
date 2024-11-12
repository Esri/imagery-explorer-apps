import { ICreateServiceResult } from '@esri/arcgis-rest-feature-service';
import { ARCGIS_REST_API_ROOT } from '@shared/config';
import { getToken, getUserPortal } from '@shared/utils/esri-oauth';
import { canPublishContent } from './checkUserRoleAndPrivileges';

/**
 * Create a new hosted Imagery Service on ArcGIS Online.
 *
 * This function sends a request to the ArcGIS Online API to create an image service with the specified name and properties.
 * It constructs the request parameters and posts them to the appropriate API endpoint.
 *
 * @param {string} serviceName - The name of the imagery service to be created.
 * @returns {Promise<ICreateServiceResult>} A promise that resolves with the API response object containing details of the created service.
 *
 * Example response from the API:
 * ```
 * {
 *    "encodedServiceURL": "https://service.arcgis.com/Gkz.../arcgis/rest/services/Name_of_the_service/ImageServer",
 *    "itemId": "7eeab1...",
 *    "name": "Name_of_the_service",
 *    "serviceItemId": "7eeab1...",
 *    "serviceurl": "https://service.arcgis.com/Gkz.../arcgis/rest/services/Name_of_the_service/ImageServer",
 *    "size": -1,
 *    "success": true,
 *    "type": "Image Service",
 *    "typeKeywords": [
 *      "Dynamic Imagery Layer"
 *    ],
 *    "isView": false
 * }
 * ```
 */
export const createHostedImageryService = async (
    serviceName: string
): Promise<ICreateServiceResult> => {
    const token = getToken();

    const portal = getUserPortal();

    const { user } = portal;

    const username = user?.username;

    if (!token || !username) {
        throw new Error('User is not authenticated');
    }

    if (canPublishContent(user) === false) {
        throw new Error('User does not have the privileges to publish content');
    }

    const params = new URLSearchParams({
        createParameters: JSON.stringify({
            name: serviceName,
            description: '',
            capabilities: 'Image',
            properties: {
                isCached: true,
                path: '@',
                description: '',
                copyright: '',
            },
        }),
        outputType: 'imageService',
        f: 'json',
        token,
    });

    const requestURL = `${ARCGIS_REST_API_ROOT}/content/users/${username}/createService`;

    const res = await fetch(requestURL, {
        method: 'POST',
        body: params,
    });

    const data = await res.json();

    if (data.error) {
        throw data.error;
    }

    if (!data?.success) {
        throw data;
    }

    return data as ICreateServiceResult;
};
