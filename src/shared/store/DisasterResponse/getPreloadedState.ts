import { init } from 'i18next';
import { DisasterResponseEvent, DRXState, initialDRXState } from './reducer';

export const getPreloadedState4DisasterResponseExplorer = ({
    hashParams,
    events,
}: {
    hashParams: URLSearchParams;
    events: DisasterResponseEvent[];
}): DRXState => {
    const eventName = hashParams.get('disasterResponseEvent');

    const eventIds: string[] = [];

    const byEventId: {
        [key: string]: DisasterResponseEvent;
    } = {};

    for (const event of events) {
        const { event: eventId } = event;

        eventIds.push(eventId);
        byEventId[eventId] = event;
    }

    return {
        ...initialDRXState,
        selectedEvent: eventName,
        events: {
            eventIds,
            byEventId,
        },
    };
};
