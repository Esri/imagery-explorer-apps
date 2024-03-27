import { IExtent } from '@esri/arcgis-rest-feature-service';

/**
 * Get the extent of a feature from a imagery service using the object Id as key.
 * @param objectId The unique identifier of the feature
 * @returns IExtent The extent of the feature from the input service
 */
export const getExtentByObjectId = async (
    serviceUrl: string,
    objectId: number
): Promise<IExtent> => {
    const queryParams = new URLSearchParams({
        f: 'json',
        returnExtentOnly: 'true',
        objectIds: objectId.toString(),
    });

    const res = await fetch(`${serviceUrl}/query?${queryParams.toString()}`);

    if (!res.ok) {
        throw new Error('failed to query ' + serviceUrl);
    }

    const data = await res.json();

    if (data.error) {
        throw data.error;
    }

    if (!data?.extent) {
        return null;
    }

    return data?.extent as IExtent;
};
