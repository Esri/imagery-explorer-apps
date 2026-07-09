import { IFeature } from '@esri/arcgis-rest-feature-service';
import {
    DISASTER_RESPONSE_IMAGERY_SERVICE_URL,
    DisasterResponseImageryServiceField,
} from './config';

const cache = new Map<string, IFeature[]>();

/**
 * Fetches the footprints for a given event from the Disaster Response imagery service.
 * @param eventId - The ID of the event to fetch footprints for.
 * @param objectids - Optional array of object IDs to filter the footprints. If provided, only footprints with these object IDs will be returned.
 * @returns
 */
export const getEventFootprints = async (
    eventId: string,
    objectids?: number[]
): Promise<IFeature[]> => {
    if (cache.has(eventId)) {
        return cache.get(eventId)!;
    }

    const whereClauses = [
        `${DisasterResponseImageryServiceField.EVENT}='${eventId}'`,
    ];

    if (objectids && objectids.length > 0) {
        whereClauses.push(
            `${DisasterResponseImageryServiceField.OBJECTID} IN (${objectids.join(',')})`
        );
    }

    const params = new URLSearchParams({
        where: whereClauses.join(' AND '),
        outFields: DisasterResponseImageryServiceField.OBJECTID,
        returnGeometry: 'true',
        f: 'json',
    });

    const response = await fetch(
        `${DISASTER_RESPONSE_IMAGERY_SERVICE_URL}/query?${params.toString()}`
    );

    if (!response.ok) {
        throw new Error(
            `Failed to fetch footprints for event ${eventId}: ${response.statusText}`
        );
    }

    const data = await response.json();

    if (data.error) {
        throw new Error(
            `Error fetching footprints for event ${eventId}: ${data.error.message}`
        );
    }

    if (!data.features) {
        throw new Error(`No features found for event ${eventId}`);
    }

    const features = data.features as IFeature[];

    cache.set(eventId, features);

    return features;
};
