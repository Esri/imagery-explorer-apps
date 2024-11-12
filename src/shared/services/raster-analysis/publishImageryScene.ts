import { getToken } from '@shared/utils/esri-oauth';
import { getExtentByObjectId } from '../helpers/getExtentById';
import { createHostedImageryService } from './createHostedImageryService';
import { RASTER_ANALYSIS_SERVER_ROOT_URL } from './config';

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
};

/**
 * Publishes an imagery scene by creating a hosted imagery service and submitting a generate raster job.
 *
 * @param {Object} params - The parameters for publishing the imagery scene.
 * @param {string} params.serviceUrl - The URL of the imagery service.
 * @param {number} params.objectId - The ID of the imagery scene to be published.
 * @param {string} params.outputServiceName - The name of the output imagery service.
 * @returns {Promise<void>} A promise that resolves when the imagery scene has been published.
 */
export const publishImageryScene = async ({
    serviceUrl,
    objectId,
    outputServiceName,
}: publishImagerySceneParams): Promise<void> => {
    const token = getToken();

    const createServiceResponse = await createHostedImageryService(
        outputServiceName,
        token
    );

    const clippingGeometry = await getExtentByObjectId(serviceUrl, objectId);

    const requestURL =
        RASTER_ANALYSIS_SERVER_ROOT_URL + '/GenerateRaster/submitJob';
    // console.log(requestURL)

    const params = new URLSearchParams({
        f: 'json',
        token,
        outputType: 'dynamicLayer',
        rasterFunction: JSON.stringify({
            name: 'Clip',
            description:
                'Sets the extent of a raster using coordinates or another dataset.',
            function: {
                type: 'ClipFunction',
                pixelType: 'UNKNOWN',
                name: 'Clip',
                description:
                    'Sets the extent of a raster using coordinates or another dataset.',
            },
            arguments: {
                Raster: {
                    name: 'Raster',
                    isPublic: false,
                    isDataset: true,
                    value: {
                        // "url": `https://landsatdev.imagery1.arcgis.com/arcgis/rest/services/LandsatC2L2/ImageServer?token=${token}`,
                        url: `${serviceUrl}?token=${token}`,
                        name: 'LandsatC2L2',
                        mosaicRule: {
                            ascending: false,
                            lockRasterIds: [objectId],
                            mosaicMethod: 'esriMosaicLockRaster',
                            where: `objectid in (${objectId})`,
                        },
                    },
                    type: 'RasterFunctionVariable',
                },
                ClippingType: {
                    name: 'ClippingType',
                    isPublic: false,
                    isDataset: false,
                    value: 1,
                    type: 'RasterFunctionVariable',
                },
                ClippingRaster: {
                    name: 'ClippingRaster',
                    isPublic: false,
                    isDataset: true,
                    type: 'RasterFunctionVariable',
                },
                ClippingGeometry: {
                    name: 'ClippingGeometry',
                    isPublic: false,
                    isDataset: false,
                    value: clippingGeometry,
                    type: 'RasterFunctionVariable',
                },
                UseInputFeatureGeometry: {
                    name: 'UseInputFeatureGeometry',
                    isPublic: false,
                    isDataset: false,
                    type: 'RasterFunctionVariable',
                },
                type: 'ClipFunctionArguments',
            },
            functionType: 0,
            thumbnail: '',
            thumbnailEx: '',
            help: '',
        }),
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

    return data;
};
