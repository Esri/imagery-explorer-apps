import {
    createSlice,
    // createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';
import { LandsatScene } from '../../../landsat-explorer/services/landsat-2/getLandsatScenes';
import { getCurrentYear } from '../../utils/snippets/getCurrentYear';

/**
 * the app support 4 different modes that the user can use to explore the landsat data
 */
export type AppMode = 'explore' | 'find a scene' | 'swipe' | 'animate';

/**
 * Swipe Mode allows user to compare Landsat Scene the
 */
export type Side4SwipeMode = 'left' | 'right';

/**
 * Query Params and Rendering Options for a Landsat Scene
 */
export type QueryParams4LandsatScene = {
    /**
     * the year that will be used to query available Landsat scenes
     */
    acquisitionYear?: number;
    /**
     * the month that will be used to query available Landsat scenes
     */
    acquisitionMonth?: number;
    /**
     * percent of cloud coverage ranges from 0 to 1 that will be used to query available Landsat scenes
     */
    cloudCover?: number;
    /**
     * selected acquisition date in format of `YYYY-MM-DD`
     */
    acquisitionDate?: string;
    /**
     * name of raster function that will be used to render the Landsat scene
     */
    rasterFunctionName?: string;
    /**
     * Object Id of selected Landsat scene.
     *
     * The Object ID of the selected Landsat scene will be automatically determined based on the changes in the `acquisitionDate` or `availableScenes`.
     * We will use the object ID of the Landsat scene from the `availableScenes` that was acquired on the `acquisitionDate`.
     * If no Landsat scene was acquired on that date, the object ID will be reset to null.
     */
    objectIdOfSelectedScene?: number;
};

export type LandsatState = {
    mode?: AppMode;
    /**
     * Landsat scenes that intersect with center point of map view and were acquired during the input year.
     */
    availableScenes?: {
        byObjectId?: {
            [key: number]: Partial<LandsatScene>;
        };
        objectIds?: number[];
    };
    /**
     * query params for the Landsat scene to be used in "Find a Scene" mode; and
     * on the left side of the "Swipe" mode
     */
    queryParams4MainScene?: QueryParams4LandsatScene;
    /**
     * query params for the Landsat scene that will be used on the right side of the "swipe" mode
     */
    queryParams4SecondaryScene?: QueryParams4LandsatScene;
    /**
     * Selected side for Swipe Mode. This value determines which item in `queryParams4SwipeMode` should be updated.
     */
    selectedSide4SwipeMode?: Side4SwipeMode;
    /**
     * Array of query parameters for Landsat scenes that will be animated.
     */
    queryParams4ScenesInAnimateMode?: QueryParams4LandsatScene[];
    /**
     * Index of the selected query parameters for animate mode. This value helps identify which item in `queryParams4AnimateMode` should be updated.
     */
    indexOfSelectedQueryParams4AnimateMode?: number;
};

export const DefaultQueryParams4LandsatScene: QueryParams4LandsatScene = {
    acquisitionYear: getCurrentYear(),
    acquisitionMonth: null,
    acquisitionDate: '',
    cloudCover: 0.5,
    rasterFunctionName: 'Natural Color with DRA',
    objectIdOfSelectedScene: null,
};

export const initialLandsatState: LandsatState = {
    mode: 'find a scene',
    availableScenes: {
        byObjectId: {},
        objectIds: [],
    },
    queryParams4MainScene: {
        ...DefaultQueryParams4LandsatScene,
    },
    queryParams4SecondaryScene: {
        ...DefaultQueryParams4LandsatScene,
    },
    selectedSide4SwipeMode: 'left',
    queryParams4ScenesInAnimateMode: [],
    indexOfSelectedQueryParams4AnimateMode: 0,
};

const slice = createSlice({
    name: 'Landsat',
    initialState: initialLandsatState,
    reducers: {
        availableScenesUpdated: (
            state,
            action: PayloadAction<LandsatScene[]>
        ) => {
            const objectIds: number[] = [];

            const byObjectId = {};

            for (const scene of action.payload) {
                const { objectId } = scene;

                objectIds.push(objectId);
                byObjectId[objectId] = scene;
            }

            state.availableScenes = {
                objectIds,
                byObjectId,
            };
        },
        queryParams4MainSceneChanged: (
            state,
            action: PayloadAction<QueryParams4LandsatScene>
        ) => {
            state.queryParams4MainScene = action.payload;
        },
        queryParams4ScenesInSwipeModeChanged: (
            state,
            action: PayloadAction<QueryParams4LandsatScene>
        ) => {
            const side = state.selectedSide4SwipeMode;

            if (side === 'left') {
                state.queryParams4MainScene = action.payload;
            } else {
                state.queryParams4SecondaryScene = action.payload;
            }
        },
        modeChanged: (state, action: PayloadAction<AppMode>) => {
            state.mode = action.payload;
        },
        selectedSide4SwipeModeChanged: (
            state,
            action: PayloadAction<Side4SwipeMode>
        ) => {
            state.selectedSide4SwipeMode = action.payload;
        },
        indexOfSelectedQueryParams4AnimateModeChanged: (
            state,
            action: PayloadAction<number>
        ) => {
            state.indexOfSelectedQueryParams4AnimateMode = action.payload;
        },
    },
});

const { reducer } = slice;

export const {
    availableScenesUpdated,
    queryParams4MainSceneChanged,
    queryParams4ScenesInSwipeModeChanged,
    modeChanged,
    selectedSide4SwipeModeChanged,
    indexOfSelectedQueryParams4AnimateModeChanged,
} = slice.actions;

export default reducer;
