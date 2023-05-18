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
    /**
     * unique id of the animation frame that is associated with this Landsat Scene
     */
    animationFrameId?: string;
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
     * query parameters for Landsat scenes that will be used in different frames of Animation Mode.
     */
    queryParams4ScenesInAnimateMode?: {
        byFrameId?: {
            [key: string]: QueryParams4LandsatScene;
        };
        frameIds?: string[];
    };
    /**
     * Id of the selected frame of the Animation Mode. This Id helps identify which item in `queryParams4ScenesInAnimateMode` should be updated.
     */
    selectedAnimationFrameId?: string;
};

export const DefaultQueryParams4LandsatScene: QueryParams4LandsatScene = {
    acquisitionYear: getCurrentYear(),
    acquisitionMonth: null,
    acquisitionDate: '',
    cloudCover: 0.5,
    rasterFunctionName: 'Natural Color with DRA',
    objectIdOfSelectedScene: null,
    animationFrameId: null,
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
    queryParams4ScenesInAnimateMode: {
        byFrameId: {},
        frameIds: [],
    },
    selectedAnimationFrameId: null,
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
        queryParams4SceneInSwipeModeChanged: (
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
        selectedAnimationFrameIdChanged: (
            state,
            action: PayloadAction<string>
        ) => {
            state.selectedAnimationFrameId = action.payload;
        },
        queryParams4ScenesInAnimationModeChanged: (
            state,
            action: PayloadAction<QueryParams4LandsatScene[]>
        ) => {
            const byFrameId = {};
            const frameIds = [];

            for (const item of action.payload) {
                const { animationFrameId } = item;

                if (!animationFrameId) {
                    continue;
                }

                frameIds.push(animationFrameId);
                byFrameId[animationFrameId] = item;
            }

            state.queryParams4ScenesInAnimateMode = {
                byFrameId,
                frameIds,
            };
        },
        queryParams4SceneInSelectedAnimationFrameChanged: (
            state,
            action: PayloadAction<QueryParams4LandsatScene>
        ) => {
            const frameId = state.selectedAnimationFrameId;
            state.queryParams4ScenesInAnimateMode.byFrameId[frameId] =
                action.payload;
        },
    },
});

const { reducer } = slice;

export const {
    availableScenesUpdated,
    queryParams4MainSceneChanged,
    queryParams4SceneInSwipeModeChanged,
    modeChanged,
    selectedSide4SwipeModeChanged,
    selectedAnimationFrameIdChanged,
    queryParams4ScenesInAnimationModeChanged,
    queryParams4SceneInSelectedAnimationFrameChanged,
} = slice.actions;

export default reducer;
