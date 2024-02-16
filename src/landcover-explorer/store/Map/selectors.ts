import { createSelector } from '@reduxjs/toolkit';
import { MIN_MAP_ZOOM_FOR_SENTINEL_2_LAYER } from '@landcover-explorer/constants/map';
import { RootState } from '../configureStore';

/**
 * Select years that will be used to get the Leading and Trailing layers in Swipe Widget
 *
 * @return `[year4LeadingLayer, year4TrailingLayer]`
 */
export const selectYearsForSwipeWidgetLayers = createSelector(
    (state: RootState) => state.Map.swipeWidget.year4LeadingLayer,
    (state: RootState) => state.Map.swipeWidget.year4TrailingLayer,
    (year4LeadingLayer, year4TrailingLayer) => {
        return {
            year4LeadingLayer,
            year4TrailingLayer,
        };
    }
);

/**
 * Select default values (zoom and center) that will be used to initiate map
 *
 * @return `{ zoom: number, cenetr: {lat: number, lon: number} }`
 */
export const selectMapCenterAndZoom = createSelector(
    (state: RootState) => state.Map.zoom,
    (state: RootState) => state.Map.center,
    (zoom, center) => {
        return {
            zoom,
            center,
        };
    }
);

export const selectMapExtent = createSelector(
    (state: RootState) => state.Map.extent,
    (extent) => extent
);

export const selectMapResolution = createSelector(
    (state: RootState) => state.Map.resolution,
    (resolution) => resolution
);

export const selectShouldShowSentinel2Layer = createSelector(
    (state: RootState) => state.Map.shouldShowSentinel2Layer,
    (shouldShowSentinel2Layer) => shouldShowSentinel2Layer
);

export const selectActiveLandCoverType = createSelector(
    (state: RootState) => state.Map.activeLandCoverType,
    (activeLandCoverType) => activeLandCoverType
);

export const selectSwipePosition = createSelector(
    (state: RootState) => state.Map.swipeWidget.position,
    (position) => position
);

export const selectShowMapLabel = createSelector(
    (state: RootState) => state.Map.showMapLabel,
    (showMapLabel) => showMapLabel
);

export const selectShowTerrain = createSelector(
    (state: RootState) => state.Map.showTerrain,
    (showTerrain) => showTerrain
);

export const selectSentinel2RasterFunction = createSelector(
    (state: RootState) => state.Map.sentinel2RasterFunction,
    (sentinel2RasterFunction) => sentinel2RasterFunction
);

export const selectIsSentinel2LayerOutOfVisibleRange = createSelector(
    (state: RootState) => state.Map.shouldShowSentinel2Layer,
    (state: RootState) => state.Map.zoom,
    (shouldShowSentinel2Layer, zoom) => {
        return (
            shouldShowSentinel2Layer && zoom < MIN_MAP_ZOOM_FOR_SENTINEL_2_LAYER
        );
    }
);

export const selectSentinel2AquisitionMonth = createSelector(
    (state: RootState) => state.Map.sentinel2AquisitionMonth,
    (sentinel2AquisitionMonth) => sentinel2AquisitionMonth
);

export const selectMapMode = createSelector(
    (state: RootState) => state.Map.mode,
    (mode) => mode
);

export const selectYear = createSelector(
    (state: RootState) => state.Map.year,
    (year) => year
);
