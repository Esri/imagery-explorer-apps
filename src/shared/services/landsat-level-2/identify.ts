import { Geometry, Point } from '@arcgis/core/geometry';
import { LANDSAT_LEVEL_2_SERVICE_URL } from './config';
import { IFeature } from '@esri/arcgis-rest-feature-service';
import { getMosaicRuleByObjectId } from './helpers';
import { canBeConvertedToNumber } from '@shared/utils/snippets/canBeConvertedToNumber';

type IdentifyTaskParams = {
    point: Point;
    abortController: AbortController;
    objectId?: number;
};

type IdentifyTaskResponse = {
    catalogItems: {
        features: IFeature[];
        geometryType: string;
        objectIdFieldName: string;
    };
    location: Geometry;
    value: string;
    name: string;
    properties: {
        Values: string[];
    };
};

/**
 * The identify operation is performed on Landsat-2 image service resource.
 * It identifies the content of an image service for a given location, mosaic rule, and rendering rule or rules.
 *
 * @param param0
 * @returns
 *
 * @see https://developers.arcgis.com/rest/services-reference/enterprise/identify-image-service-.htm
 */
export const identify = async ({
    point,
    objectId,
    abortController,
}: IdentifyTaskParams): Promise<IdentifyTaskResponse> => {
    const mosaicRule = objectId
        ? getMosaicRuleByObjectId(objectId)
        : {
              ascending: true,
              mosaicMethod: 'esriMosaicAttribute',
              mosaicOperation: 'MT_FIRST',
              sortField: 'best',
              sortValue: '0',
          };

    const params = new URLSearchParams({
        f: 'json',
        maxItemCount: '1',
        returnGeometry: 'false',
        returnCatalogItems: 'true',
        geometryType: 'esriGeometryPoint',
        geometry: JSON.stringify({
            spatialReference: {
                wkid: 4326,
            },
            x: point.longitude,
            y: point.latitude,
        }),
        mosaicRule: JSON.stringify(mosaicRule),
    });

    const requestURL = `${LANDSAT_LEVEL_2_SERVICE_URL}/identify?${params.toString()}`;

    const res = await fetch(requestURL, { signal: abortController.signal });

    const data = await res.json();

    if (data.error) {
        throw data.error;
    }

    return data as IdentifyTaskResponse;
};

/**
 * Get pixel values from Identify Task Response
 * @param res
 * @returns
 */
export const getPixelValuesFromIdentifyTaskResponse = (
    res: IdentifyTaskResponse
): number[] => {
    let bandValues: number[] = null;

    if (res?.value && res?.value !== 'NoData') {
        // get pixel values from the value property first
        bandValues = res?.value.split(', ').map((d) => +d);
    } else if (res?.properties?.Values[0]) {
        bandValues = res?.properties?.Values[0].split(' ').map((d) => {
            if (canBeConvertedToNumber(d) === false) {
                return null;
            }

            return +d;
        });
    }

    return bandValues;
};

/**
 * Run identify task to get values of the pixel that intersects with the input point from the scene with input object id.
 * @param param0
 * @returns
 */
export const getPixelValues = async ({
    point,
    objectId,
    abortController,
}: IdentifyTaskParams): Promise<number[]> => {
    const res = await identify({
        point,
        objectId,
        abortController,
    });

    if (
        res?.catalogItems?.features &&
        res?.catalogItems?.features.length === 0
    ) {
        throw new Error(
            'Failed to fetch pixel values. Please select a location inside of the selected landsat scene.'
        );
    }

    const bandValues = getPixelValuesFromIdentifyTaskResponse(res);

    if (!bandValues) {
        throw new Error('Identify task does not return band values');
    }

    return bandValues;
};
