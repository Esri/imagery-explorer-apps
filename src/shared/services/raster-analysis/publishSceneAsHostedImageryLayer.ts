import { getSignedInUser, getToken } from '@shared/utils/esri-oauth';
import { createHostedImageryService } from './createHostedImageryService';
import {
    RASTER_ANALYSIS_SERVER_ROOT_URL,
    RasteranalysisTaskName,
} from './config';
import { hasRasterAnalysisPrivileges } from './checkUserRoleAndPrivileges';
import { updateItem } from '../arcgis-online/updateItem';
import { getUserLicense } from '../arcgis-online/getUserLicense';

type publishImagerySceneParams = {
    //  * object id of the imagery scene
    //  */
    // objectId: number;
    /**
     * name of the imagery service to store the output of the generate raster job.
     */
    title: string;
    /**
     * description of the imagery service to store the output of the generate raster job.
     */
    snippet: string;
    /**
     * description of the ArcGIS Online item to store the output of the generate raster job.
     */
    description: string;
    /**
     * access information for the ArcGIS Online item to store the output of the generate raster job.
     */
    accessInformation: string;
    /**
     * license information for the ArcGIS Online item to store the output of the generate raster job.
     */
    licenseInfo: string;
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
    /**
     * estimated cost of the raster analysis job in credits
     */
    cost: number;
};

/**
 * Represents the response from publishing an imagery scene as a hosted imagery layer.
 *
 * @property {string} rasterAnalysisJobId - The unique identifier for the raster analysis job.
 * @property {string} outputServiceUrl - The URL of the output service where the imagery layer is hosted.
 * @property {string} outputItemId - The unique identifier for the output item.
 */
type PublishImagerySceneResponse = {
    /**
     * The unique identifier for the raster analysis job.
     */
    rasterAnalysisJobId: string;
    /**
     * The URL of the output service where the imagery layer is hosted.
     */
    outputServiceUrl: string;
    /**
     * The unique identifier for the output item.
     */
    outputItemId: string;
};

/**
 * Publishes the selected imagery scene as a hosted imagery service by submitting a generate raster job.
 *
 * @param {Object} params - The parameters for publishing the imagery scene.
 * - {string} params.title - The name of the output imagery service.
 * - {string} params.snippet - The description of the output imagery service.
 * - {any} params.rasterFunction - The raster function to be applied to the imagery scene.
 * @returns {Promise<void>} A promise that resolves when the imagery scene has been published.
 */
export const publishSceneAsHostedImageryLayer = async ({
    // serviceUrl,
    // objectId,
    title,
    snippet,
    rasterFunction,
    description,
    accessInformation,
    licenseInfo,
    cost,
}: publishImagerySceneParams): Promise<PublishImagerySceneResponse> => {
    const token = getToken();

    const user = getSignedInUser();

    if (!rasterFunction || !title) {
        throw new Error(
            'serviceUrl, objectId, and outputServiceName are required parameters'
        );
    }

    const { userLicenseTypeId, availableCredits } = await getUserLicense(
        user.username
    );

    if (hasRasterAnalysisPrivileges(userLicenseTypeId) === false) {
        throw new Error(
            'User does not have the required license to use raster analysis'
        );
    }

    if (availableCredits < cost) {
        throw new Error(
            'User does not have enough credits to run this raster analysis job'
        );
    }

    // create a new hosted imagery service
    const createServiceResponse = await createHostedImageryService(
        title,
        token
    );

    // submit a generate raster job to generate the hosted imagery layer
    const requestURL =
        RASTER_ANALYSIS_SERVER_ROOT_URL +
        `/${RasteranalysisTaskName.GenerateRaster}/submitJob`;
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

    // update the item with the title and snippet
    await updateItem({
        id: createServiceResponse.itemId,
        title,
        snippet,
        description,
        accessInformation,
        licenseInfo,
    });

    return {
        rasterAnalysisJobId: data.jobId,
        outputServiceUrl: createServiceResponse.serviceurl,
        outputItemId: createServiceResponse.itemId,
    };
};
