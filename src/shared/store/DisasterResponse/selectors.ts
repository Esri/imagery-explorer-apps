import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

export const selectDisasterResponseEvents = createSelector(
    (state: RootState) => state.DisasterResponseExplorer.events,
    (events) => {
        const { eventIds, byEventId } = events;
        return eventIds.map((eventId) => byEventId[eventId]);
    }
);

export const selectSelectedEventName = (state: RootState) =>
    state.DisasterResponseExplorer.selectedEvent;
