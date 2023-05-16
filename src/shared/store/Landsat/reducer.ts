import {
    createSlice,
    // createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';

// import { RootState, StoreDispatch, StoreGetState } from '../configureStore';

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
     * object id of selected Landsat scene
     */
    objectIdOfSelectedScene?: number;
};

/**
 * the app support 4 different modes that the user can use to explore the landsat data
 */
export type AppMode = 'explore' | 'find a scene' | 'swipe' | 'animate';

/**
 * Swipe Mode allows user to compare Landsat Scene the
 */
export type Side4SwipeMode = 'left' | 'right';

export type LandsatState = {
    mode?: AppMode;
    /**
     * query params to find a single Landsat scene
     */
    queryParams4FindASceneMode?: QueryParams4LandsatScene;
    /**
     * query params to find Landsat scenes on in swipe mode
     */
    queryParams4SwipeMode?: {
        left?: QueryParams4LandsatScene;
        right?: QueryParams4LandsatScene;
    };
    /**
     * selected side for Swipe Mode, this value helps us to figure out which item in `queryParams4SwipeMode` should be updated
     */
    selectedSide4SwipeMode?: Side4SwipeMode;
    /**
     * array of query params to find Landsat scenes that will be animated
     */
    queryParams4AnimateMode?: QueryParams4LandsatScene[];
    /**
     * index of selected query params for animate mode, this value helps us to figure out which item in `queryParams4AnimateMode` should be updated
     */
    indexOfSelectedQueryParams4AnimateMode?: number;
};

export const DefaultQueryParams4LandsatScene: QueryParams4LandsatScene = {
    acquisitionYear: new Date().getFullYear(),
    acquisitionMonth: null,
    acquisitionDate: '',
    cloudCover: 0.1,
    rasterFunctionName: 'Natural Color with DRA',
    objectIdOfSelectedScene: null,
};

export const initialLandsatState: LandsatState = {
    mode: 'find a scene',
    queryParams4FindASceneMode: {
        ...DefaultQueryParams4LandsatScene,
    },
    queryParams4SwipeMode: {
        left: {
            ...DefaultQueryParams4LandsatScene,
        },
        right: {
            ...DefaultQueryParams4LandsatScene,
        },
    },
    selectedSide4SwipeMode: 'left',
    queryParams4AnimateMode: [],
    indexOfSelectedQueryParams4AnimateMode: 0,
};

const slice = createSlice({
    name: 'Landsat',
    initialState: initialLandsatState,
    reducers: {
        queryParams4FindASceneModeChanged: (
            state,
            action: PayloadAction<QueryParams4LandsatScene>
        ) => {
            state.queryParams4FindASceneMode = action.payload;
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
    queryParams4FindASceneModeChanged,
    modeChanged,
    selectedSide4SwipeModeChanged,
    indexOfSelectedQueryParams4AnimateModeChanged,
} = slice.actions;

export default reducer;
