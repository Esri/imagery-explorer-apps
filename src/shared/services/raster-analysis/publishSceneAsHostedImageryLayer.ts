import { getSignedInUser, getToken } from '@shared/utils/esri-oauth';
import { createHostedImageryService } from './createHostedImageryService';
import { RASTER_ANALYSIS_SERVER_ROOT_URL } from './config';
import { canUseRasterAnalysis } from './checkUserRoleAndPrivileges';

type publishImagerySceneParams = {
    /**
     * service url of the input imagery service
     */
    serviceUrl: string;
    /**
     * object id of the imagery scene
     */
    objectId: number;
    /**
     * name of the imagery service to store the output of the generate raster job.
     */
    outputServiceName: string;
    /**
     * raster function to be applied to the imagery scene
     *
     * @see https://developers.arcgis.com/rest/services-reference/enterprise/raster-function-objects/
     */
    rasterFunction: {
        name: string;
        description: string;
        function: any;
        arguments: any;
    };
};

type PublishImagerySceneResponse = {
    jobId: string;
    jobStatus: string;
};

/**
 * Publishes the selected imagery scene as a hosted imagery service by submitting a generate raster job.
 *
 * @param {Object} params - The parameters for publishing the imagery scene.
 * @param {string} params.serviceUrl - The URL of the imagery service.
 * @param {number} params.objectId - The ID of the imagery scene to be published.
 * @param {string} params.outputServiceName - The name of the output imagery service.
 * @param {any} params.rasterFunction - The raster function to be applied to the imagery scene.
 * @returns {Promise<void>} A promise that resolves when the imagery scene has been published.
 */
export const publishSceneAsHostedImageryLayer = async ({
    serviceUrl,
    objectId,
    outputServiceName,
    rasterFunction,
}: publishImagerySceneParams): Promise<PublishImagerySceneResponse> => {
    const token = getToken();

    const user = getSignedInUser();

    if (!serviceUrl || !objectId || !outputServiceName) {
        throw new Error(
            'serviceUrl, objectId, and outputServiceName are required parameters'
        );
    }

    if (canUseRasterAnalysis(user) === false) {
        throw new Error(
            'User does not have the required privileges to use raster analysis'
        );
    }

    const createServiceResponse = await createHostedImageryService(
        outputServiceName,
        token
    );

    const requestURL =
        RASTER_ANALYSIS_SERVER_ROOT_URL + '/GenerateRaster/submitJob';
    // console.log(requestURL)

    const params = new URLSearchParams({
        f: 'json',
        token,
        outputType: 'dynamicLayer',
        rasterFunction: JSON.stringify(rasterFunction),
        OutputName: JSON.stringify({
            serviceProperties: {
                name: createServiceResponse.name,
                capabilities: 'Image',
                serviceUrl: createServiceResponse.serviceurl,
            },
            itemProperties: {
                itemId: createServiceResponse.itemId,
            },
        }),
    });

    const res = await fetch(requestURL, {
        method: 'POST',
        body: params,
    });

    const data = await res.json();

    if (data.error) {
        throw data.error;
    }

    return data as PublishImagerySceneResponse;
};
