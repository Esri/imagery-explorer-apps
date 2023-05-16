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

export type LandsatState = {
    mode?: AppMode;
    queryParams4FindASceneMode?: QueryParams4LandsatScene;
    queryParams4SwipeMode?: {
        left?: QueryParams4LandsatScene;
        right?: QueryParams4LandsatScene;
    };
    queryParams4AnimateMode?: QueryParams4LandsatScene[];
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
        left: null,
        right: null,
    },
    queryParams4AnimateMode: [],
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
    },
});

const { reducer } = slice;

export const { queryParams4FindASceneModeChanged, modeChanged } = slice.actions;

export default reducer;
