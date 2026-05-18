import { init } from 'i18next';
import { DRXState, initialDRXState } from './reducer';

export const getPreloadedState4DisasterResponseExplorer = (
    hashParams: URLSearchParams
): DRXState => {
    const eventName = hashParams.get('disasterResponseEvent');

    return {
        ...initialDRXState,
        selectedEvent: eventName,
    };
};
