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

    const pageIndexFromHash = getPageIndexFromHashParams(hashParams);
    console.log('pageIndexFromHash: ', pageIndexFromHash);

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
        scenePaginationCurrentPageIndex: pageIndexFromHash || 0,
        events: {
            eventIds,
            byEventId,
        },
    };
};

const getPageIndexFromHashParams = (hashParams: URLSearchParams): number => {
    const pageIndexFromHash = hashParams.get('pageIndex');

    return pageIndexFromHash && !isNaN(Number(pageIndexFromHash))
        ? Number(pageIndexFromHash)
        : 0;
};
