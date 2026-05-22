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

export const selectObjectIdsOfScenesInCurrentMapExtent = createSelector(
    (state: RootState) =>
        state.DisasterResponseExplorer.objectIdsOfScenesInCurrentMapExtent,
    (objectIdsOfScenesInCurrentMapExtent) => objectIdsOfScenesInCurrentMapExtent
);

export const selectDisasterResponseScenes = createSelector(
    (state: RootState) => state.DisasterResponseExplorer.disasterResponseScenes,
    (disasterResponseScenes) => {
        const { objectIds, byObjectId } = disasterResponseScenes;
        return objectIds.map((objectId) => byObjectId[objectId]);
    }
);

export const selectObjectIdOfHoveredScene = (state: RootState) =>
    state.DisasterResponseExplorer.objectIdOfHoveredScene;

export const selectIsLoadingScenes = (state: RootState) =>
    state.DisasterResponseExplorer.isLoadingScenes;

export const selectTotalPages = (state: RootState) =>
    state.DisasterResponseExplorer.scenePaginationPages.length;

export const selectSelectedPageIndex = (state: RootState) =>
    state.DisasterResponseExplorer.scenePaginationCurrentPageIndex;

export const selectScenesGroupedByAcquisitionDateForSelectedPage =
    createSelector(
        (state: RootState) =>
            state.DisasterResponseExplorer.scenePaginationPages,
        selectSelectedPageIndex,
        (pages, selectedPageIndex) => {
            if (pages.length === 0) {
                return [];
            }

            return pages[selectedPageIndex] || [];
        }
    );

export const selectObjectIdOfScenesInCurrentPage = createSelector(
    selectScenesGroupedByAcquisitionDateForSelectedPage,
    (scenesGroupedByAcquisitionDateForSelectedPage) => {
        const objectIds: number[] = [];

        for (const group of scenesGroupedByAcquisitionDateForSelectedPage) {
            objectIds.push(...group.objectIds);
        }

        return objectIds;
    }
);

export const selectDisasterResponseScenesByObjectId = createSelector(
    (state: RootState) =>
        state.DisasterResponseExplorer.disasterResponseScenes.byObjectId,
    (scenesByObjectId) => scenesByObjectId
);
