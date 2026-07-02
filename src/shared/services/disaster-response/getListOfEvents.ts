import { DisasterResponseEvent } from '@shared/store/DisasterImageryExplorer/reducer';
import {
    DISASTER_RESPONSE_IMAGERY_SERVICE_URL,
    DisasterResponseImageryServiceField,
} from './config';
import { IFeature } from '@esri/arcgis-rest-feature-service';

export const getDistinctListOfEvents = async (): Promise<
    DisasterResponseEvent[]
> => {
    const whereClause = [
        `(${DisasterResponseImageryServiceField.EVENT} IS NOT NULL)`,
        `(${DisasterResponseImageryServiceField.EVENT_START_DATE} IS NOT NULL)`,
    ];

    const params = new URLSearchParams({
        where: whereClause.join(' AND '),
        outFields: [
            DisasterResponseImageryServiceField.EVENT,
            DisasterResponseImageryServiceField.TITLE,
            DisasterResponseImageryServiceField.DESCRIPTION,
            DisasterResponseImageryServiceField.EVENT_START_DATE,
        ].join(','),
        returnDistinctValues: 'true',
        returnGeometry: 'false',
        orderByFields: `${DisasterResponseImageryServiceField.EVENT_START_DATE} DESC`,
        f: 'json',
    });

    const response = await fetch(
        `${DISASTER_RESPONSE_IMAGERY_SERVICE_URL}/query?${params.toString()}`
    );

    if (!response.ok) {
        throw new Error(
            `Failed to fetch distinct list of disaster response events: ${response.statusText}`
        );
    }

    const data = await response.json();

    if (data.error) {
        throw new Error(
            `Error response when fetching distinct list of disaster response events: ${JSON.stringify(data.error)}`
        );
    }

    if (!data.features || !Array.isArray(data.features)) {
        throw new Error(
            `Invalid response format when fetching distinct list of disaster response events: ${JSON.stringify(data)}`
        );
    }

    const events: DisasterResponseEvent[] = data.features.map(
        (feature: IFeature) => {
            const attributes = feature.attributes;
            const event: DisasterResponseEvent = {
                event: attributes[DisasterResponseImageryServiceField.EVENT],
                title: attributes[DisasterResponseImageryServiceField.TITLE],
                description:
                    attributes[DisasterResponseImageryServiceField.DESCRIPTION],
                startDate:
                    attributes[
                        DisasterResponseImageryServiceField.EVENT_START_DATE
                    ],
            };
            return event;
        }
    );
    // console.log('fetched distinct list of events: ', events);

    const sortedEvents = events.sort((a, b) => b.startDate - a.startDate);

    return sortedEvents;
};
