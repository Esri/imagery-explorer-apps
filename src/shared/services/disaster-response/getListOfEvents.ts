import { DisasterResponseEvent } from '@shared/store/DisasterImageryExplorer/reducer';
import {
    DISASTER_RESPONSE_IMAGERY_SERVICE_URL,
    DisasterResponseImageryServiceField,
} from './config';

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

    const events: DisasterResponseEvent[] = [];

    // returnDistinctValues only dedupes on the exact combination of outFields requested,
    // so rows with the same event name but differing title/description/date still come
    // back as separate features; track seen event names to collapse those into one.
    const eventNameSet: Set<string> = new Set();

    for (const feature of data.features) {
        const attributes = feature.attributes;

        if (!attributes) {
            continue;
        }

        const eventName = attributes[DisasterResponseImageryServiceField.EVENT];

        if (!eventName || eventNameSet.has(eventName)) {
            continue;
        }

        eventNameSet.add(eventName);

        const event: DisasterResponseEvent = {
            event: attributes[DisasterResponseImageryServiceField.EVENT],
            title:
                attributes[DisasterResponseImageryServiceField.TITLE] ||
                attributes[DisasterResponseImageryServiceField.EVENT],
            description:
                attributes[DisasterResponseImageryServiceField.DESCRIPTION],
            startDate:
                attributes[
                    DisasterResponseImageryServiceField.EVENT_START_DATE
                ],
        };

        events.push(event);
    }

    const sortedEvents = events.sort((a, b) => b.startDate - a.startDate);

    return sortedEvents;
};
