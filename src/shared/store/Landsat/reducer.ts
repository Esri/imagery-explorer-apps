import {
    createSlice,
    // createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';
// import { getCurrentYear } from '@shared/utils/date-time/getCurrentYear';
import { LandsatScene } from '@typing/imagery-service';

/**
 * the app support 5 different modes that the user can use to explore the imagery layer/scene
 */
export type AppMode =
    | 'dynamic'
    | 'find a scene'
    | 'swipe'
    | 'animate'
    | 'analysis';

/**
 * the analysis tool that the app supports
 */
export type AnalysisTool = 'mask' | 'trend' | 'spectral' | 'change';

/**
 * Swipe Mode allows user to compare Imagery scene the
 */
export type Side4SwipeMode = 'left' | 'right';

/**
 * Query Params and Rendering Options for a Imagery Scene (e.g. Landsat or Sentinel-2)
 */
export type QueryParams4ImageryScene = {
    // /**
    //  * the year that will be used to query available Imagery scenes
    //  */
    // acquisitionYear?: number;
    /**
     * User selected acquisition date in format of `YYYY-MM-DD`.
     * This acquisition date will be used to select a Imagery Scene from `availableScenes` array.
     */
    acquisitionDate?: string;
    // /**
    //  * use selected cloud coverage threshold ranges from 0 to 1
    //  */
    // cloudCover?: number;
    /**
     * name of raster function that will be used to render the Imagery scene
     */
    rasterFunctionName?: string;
    /**
     * Object Id of selected Imagery scene.
     *
     * The Object ID of the selected Imagery scene will be automatically determined based on the changes in the `acquisitionDate` or `availableScenes`.
     * We will use the object ID of the Imagery scene from the `availableScenes` that was acquired on the `acquisitionDate`.
     * If no Imagery scene was acquired on that date, the object ID will be reset to null.
     */
    objectIdOfSelectedScene?: number;
    /**
     * unique id of the animation frame that is associated with this Imagery Scene
     */
    animationFrameId?: string;
    /**
     * This property represents the acquisition year inherited from the previously selected animation frame.
     *
     * Normally, the current year is used as the default acquisition year for new query parameters.
     * However, to enhance the user experience in animation mode, we retain the acquisition year from the previous frame.
     * This ensures a seamless workflow, allowing users to seamlessly continue their work on the same year as the prior animation frame.
     */
    acquisitionYearFromPreviousAnimationFrame?: number;
};

export type LandsatState = {
    mode?: AppMode;
    /**
     * active analysis tool
     */
    tool: AnalysisTool;
    /**
     * Imagery scenes that intersect with center point of map view and were acquired during the input year.
     */
    availableScenes?: {
        byObjectId?: {
            [key: number]: LandsatScene;
        };
        objectIds?: number[];
    };
    /**
     * query params for the Imagery scene to be used in "Find a Scene" mode; and
     * on the left side of the "Swipe" mode
     */
    queryParams4MainScene?: QueryParams4ImageryScene;
    /**
     * query params for the Imagery scene that will be used on the right side of the "swipe" mode
     */
    queryParams4SecondaryScene?: QueryParams4ImageryScene;
    /**
     * Selected side for Swipe Mode. This value determines which item in `queryParams4SwipeMode` should be updated.
     */
    selectedSide4SwipeMode?: Side4SwipeMode;
    /**
     * query parameters for Imagery scenes that will be used in different frames of Animation Mode.
     */
    queryParams4ScenesInAnimateMode?: {
        byFrameId?: {
            [key: string]: QueryParams4ImageryScene;
        };
        frameIds?: string[];
    };
    /**
     * Id of the selected frame of the Animation Mode. This Id helps identify which item in `queryParams4ScenesInAnimateMode` should be updated.
     */
    selectedAnimationFrameId?: string;
    /**
     * user selected cloud coverage threshold, the value ranges from 0 to 1
     */
    cloudCover: number;
};

export const DefaultQueryParams4ImageryScene: QueryParams4ImageryScene = {
    // acquisitionYear: getCurrentYear(),
    acquisitionDate: '',
    // cloudCover: 0.5,
    rasterFunctionName: 'Natural Color with DRA',
    objectIdOfSelectedScene: null,
    animationFrameId: null,
};

export const initialLandsatState: LandsatState = {
    mode: 'find a scene',
    tool: 'mask',
    availableScenes: {
        byObjectId: {},
        objectIds: [],
    },
    queryParams4MainScene: {
        ...DefaultQueryParams4ImageryScene,
    },
    queryParams4SecondaryScene: {
        ...DefaultQueryParams4ImageryScene,
    },
    selectedSide4SwipeMode: 'left',
    queryParams4ScenesInAnimateMode: {
        byFrameId: {},
        frameIds: [],
    },
    selectedAnimationFrameId: null,
    cloudCover: 0.5,
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
            action: PayloadAction<QueryParams4ImageryScene>
        ) => {
            state.queryParams4MainScene = action.payload;
        },
        queryParams4SecondarySceneChanged: (
            state,
            action: PayloadAction<QueryParams4ImageryScene>
        ) => {
            state.queryParams4SecondaryScene = action.payload;
        },
        queryParams4SceneInSwipeModeChanged: (
            state,
            action: PayloadAction<QueryParams4ImageryScene>
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
            action: PayloadAction<QueryParams4ImageryScene[]>
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
            action: PayloadAction<QueryParams4ImageryScene>
        ) => {
            const frameId = state.selectedAnimationFrameId;
            state.queryParams4ScenesInAnimateMode.byFrameId[frameId] =
                action.payload;
        },
        cloudCoverChanged: (state, action: PayloadAction<number>) => {
            state.cloudCover = action.payload;
        },
        activeAnalysisToolChanged: (
            state,
            action: PayloadAction<AnalysisTool>
        ) => {
            state.tool = action.payload;
        },
    },
});

const { reducer } = slice;

export const {
    availableScenesUpdated,
    queryParams4MainSceneChanged,
    queryParams4SecondarySceneChanged,
    queryParams4SceneInSwipeModeChanged,
    modeChanged,
    selectedSide4SwipeModeChanged,
    selectedAnimationFrameIdChanged,
    queryParams4ScenesInAnimationModeChanged,
    queryParams4SceneInSelectedAnimationFrameChanged,
    cloudCoverChanged,
    activeAnalysisToolChanged,
} = slice.actions;

export default reducer;
