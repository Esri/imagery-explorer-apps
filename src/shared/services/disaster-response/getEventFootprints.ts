import { IFeature } from '@esri/arcgis-rest-feature-service';
import {
    DISASTER_RESPONSE_IMAGERY_SERVICE_URL,
    DisasterResponseImageryServiceField,
} from './config';

const cache = new Map<string, IFeature[]>();

/**
 * Fetches the footprints for a given event from the Disaster Response imagery service.
 * @param eventId
 * @returns
 */
export const getEventFootprints = async (
    eventId: string
): Promise<IFeature[]> => {
    if (cache.has(eventId)) {
        return cache.get(eventId)!;
    }

    const params = new URLSearchParams({
        where: `${DisasterResponseImageryServiceField.EVENT}='${eventId}'`,
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
