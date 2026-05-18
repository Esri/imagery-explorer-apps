import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

export const selectDisasterResponseEvents = createSelector(
    (state: RootState) => state.DisasterResponseExplorer.events,
    (events) => {
        const { eventIds, byEvent } = events;
        return eventIds.map((eventId) => byEvent[eventId]);
    }
);

export const selectSelectedEventName = (state: RootState) =>
    state.DisasterResponseExplorer.selectedEvent;
