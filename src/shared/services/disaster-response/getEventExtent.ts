import { IExtent } from '@esri/arcgis-rest-feature-service';
import {
    DISASTER_RESPONSE_IMAGERY_SERVICE_URL,
    DisasterResponseImageryServiceField,
} from './config';

/**
 * This function queries the disaster response imagery service for the extent of a given event, and returns the extent in the format of IExtent.
 * The extent can then be used to zoom the map to the full extent of the event.
 * @param param.eventName the name of the event to query for its extent
 * @returns
 */
export const getEventExtent = async ({
    eventName,
}: {
    eventName: string;
}): Promise<IExtent> => {
    const params = new URLSearchParams({
        where: `${DisasterResponseImageryServiceField.EVENT}='${eventName}'`,
        returnExtentOnly: 'true',
        f: 'json',
    });

    const response = await fetch(
        `${DISASTER_RESPONSE_IMAGERY_SERVICE_URL}/query?${params.toString()}`
    );

    if (!response.ok) {
        throw new Error(
            `Failed to fetch extent for event ${eventName}: ${response.statusText}`
        );
    }

    const data = await response.json();

    if (data.error) {
        throw new Error(
            `Error response when fetching extent for event ${eventName}: ${JSON.stringify(data.error)}`
        );
    }

    if (!data.extent) {
        throw new Error(`No extent found for event ${eventName}`);
    }

    return data.extent as IExtent;
};
