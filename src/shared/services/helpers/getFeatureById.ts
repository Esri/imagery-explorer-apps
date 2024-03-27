import { IFeature } from '@esri/arcgis-rest-feature-service';

/**
 * Query Imagery Service to get a feature by ObjectID
 * @param serviceUrl URL of the Imagery Service
 * @param objectId object id of the feature
 * @returns
 */
export const getFeatureByObjectId = async (
    serviceUrl: string,
    objectId: number
): Promise<IFeature> => {
    const queryParams = new URLSearchParams({
        f: 'json',
        returnGeometry: 'true',
        objectIds: objectId.toString(),
        outFields: '*',
    });

    const res = await fetch(`${serviceUrl}/query?${queryParams.toString()}`);

    if (!res.ok) {
        throw new Error('failed to query ' + serviceUrl);
    }

    const data = await res.json();

    if (data.error) {
        throw data.error;
    }

    if (!data?.features || !data.features.length) {
        return null;
    }

    return data?.features[0] as IFeature;
};
