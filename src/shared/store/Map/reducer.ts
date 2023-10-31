import {
    createSlice,
    // createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';
import { MAP_CENTER, MAP_ZOOM, WEB_MAP_ID } from '../../constants/map';
import Point from '@arcgis/core/geometry/Point';

// import { RootState, StoreDispatch, StoreGetState } from '../configureStore';

export type MapState = {
    /**
     * item id of the web map
     */
    webmapId: string;
    /**
     * center of map [longitude, latitude]
     */
    center: number[];
    /**
     * zoom level
     */
    zoom: number;
    /**
     * If true, Map Reference Labels layer will be on
     */
    showMapLabel: boolean;
    /**
     * If true, Terrain Layer will be on
     */
    showTerrain: boolean;
    /**
     * If true, Basemap Layers will be on
     */
    showBasemap: boolean;
    /**
     * handler position of swipe widget ranged from 0 - 100
     */
    swipeWidgetHanlderPosition: number;
    /**
     * anchor location of the map popup windown
     */
    popupAnchorLocation: Point;
};

export const initialMapState: MapState = {
    webmapId: WEB_MAP_ID, // Topographic
    center: MAP_CENTER,
    zoom: MAP_ZOOM,
    showMapLabel: true,
    showTerrain: true,
    showBasemap: true,
    swipeWidgetHanlderPosition: 50,
    popupAnchorLocation: null,
};

const slice = createSlice({
    name: 'Map',
    initialState: initialMapState,
    reducers: {
        webmapIdChanged: (state, action: PayloadAction<string>) => {
            state.webmapId = action.payload;
        },
        centerChanged: (state, action: PayloadAction<number[]>) => {
            state.center = action.payload;
        },
        zoomChanged: (state, action: PayloadAction<number>) => {
            state.zoom = action.payload;
        },
        showMapLabelToggled: (state) => {
            state.showMapLabel = !state.showMapLabel;
        },
        showTerrainToggled: (state) => {
            state.showTerrain = !state.showTerrain;
        },
        showBasemapToggled: (state) => {
            state.showBasemap = !state.showBasemap;
        },
        swipeWidgetHanlderPositionChanged: (
            state,
            action: PayloadAction<number>
        ) => {
            state.swipeWidgetHanlderPosition = action.payload;
        },
        popupAnchorLocationChanged: (state, action: PayloadAction<Point>) => {
            state.popupAnchorLocation = action.payload;
        },
    },
});

const { reducer } = slice;

export const {
    webmapIdChanged,
    centerChanged,
    zoomChanged,
    showMapLabelToggled,
    showTerrainToggled,
    showBasemapToggled,
    swipeWidgetHanlderPositionChanged,
    popupAnchorLocationChanged,
} = slice.actions;

export default reducer;
