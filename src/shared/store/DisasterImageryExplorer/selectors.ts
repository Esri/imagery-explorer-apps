import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

export const selectDisasterResponseEvents = createSelector(
    (state: RootState) => state.DisasterImageryExplorer.events,
    (events) => {
        const { eventIds, byEventId } = events;
        return eventIds.map((eventId) => byEventId[eventId]);
    }
);

export const selectSelectedEventName = (state: RootState) =>
    state.DisasterImageryExplorer.selectedEvent;

export const selectObjectIdsOfScenesInCurrentMapExtent = createSelector(
    (state: RootState) =>
        state.DisasterImageryExplorer.objectIdsOfScenesInCurrentMapExtent,
    (objectIdsOfScenesInCurrentMapExtent) => objectIdsOfScenesInCurrentMapExtent
);

export const selectDisasterResponseScenes = createSelector(
    (state: RootState) => state.DisasterImageryExplorer.disasterResponseScenes,
    (disasterResponseScenes) => {
        const { objectIds, byObjectId } = disasterResponseScenes;
        return objectIds.map((objectId) => byObjectId[objectId]);
    }
);

export const selectObjectIdOfHoveredScene = (state: RootState) =>
    state.DisasterImageryExplorer.objectIdOfHoveredScene;

export const selectIsLoadingScenes = (state: RootState) =>
    state.DisasterImageryExplorer.isLoadingScenes;

export const selectTotalPages = (state: RootState) =>
    state.DisasterImageryExplorer.scenePaginationPages.length;

export const selectSelectedPageIndex = (state: RootState) =>
    state.DisasterImageryExplorer.scenePaginationCurrentPageIndex;

export const selectScenesGroupedByAcquisitionDateForSelectedPage =
    createSelector(
        (state: RootState) =>
            state.DisasterImageryExplorer.scenePaginationPages,
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
        state.DisasterImageryExplorer.disasterResponseScenes.byObjectId,
    (scenesByObjectId) => scenesByObjectId
);
