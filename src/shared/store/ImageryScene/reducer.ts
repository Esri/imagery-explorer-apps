/* Copyright 2025 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
    createSlice,
    // createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';
// import { getCurrentYear } from '@shared/utils/date-time/getCurrentDateTime';
import {
    getDateRangeForPast12Month,
    // getDateRangeForYear,
} from '@shared/utils/date-time/getTimeRange';
import { DateRange } from '@typing/shared';

/**
 * modes that the user can use to explore the imagery layer/scene
 */
export type AppMode =
    | 'dynamic' // view the mosaicked scenes
    | 'find a scene' // find and explorer a single scene
    | 'swipe' // compare two scenes side by side using Swipe widget
    | 'animate' // animate a list of scenes
    | 'analysis' // analyze the selected scene
    | 'spectral sampling'; // sampling data from a list of scenes

/**
 * the imagery explorer app supports these analysis tools
 */
export type AnalysisTool =
    | 'mask'
    | 'trend'
    | 'spectral'
    | 'change'
    | 'temporal composite';

/**
 * Query Params and Rendering Options for a Imagery Scene (e.g. Landsat or Sentinel-2)
 */
export type QueryParams4ImageryScene = {
    /**
     * User selected acquisition date in format of `YYYY-MM-DD`.
     * This acquisition date will be used to select a Imagery Scene from `availableScenes` array.
     */
    acquisitionDate?: string;
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
     * unique id of the query params that is associated with this Imagery Scene
     */
    uniqueId?: string;
    /**
     * User selected acquisition date range that will be used to query available imagery scenes.
     */
    acquisitionDateRange: DateRange;
};

export type ImageryScene = {
    objectId: number;
    /**
     * Unique Identifier of this imagery scene
     * @example LC08_L1GT_029030_20151209_20160131_01_RT
     */
    sceneId: string;
    /**
     * acquisitionDate as a string in ISO format (YYYY-MM-DD).
     */
    formattedAcquisitionDate: string;
    /**
     * acquisitionDate in unix timestamp
     */
    acquisitionDate: number;
    /**
     * year when this scene was acquired
     */
    acquisitionYear: number;
    /**
     * month when this scene was acquired
     */
    acquisitionMonth: number;
    /**
     * name of the satellite that captured this imagery scene (e.g. 'Landsat 8')
     */
    satellite: string;
    /**
     * percent of cloud cover, the value ranges from 0 - 1
     */
    cloudCover: number;
    /**
     * Flag indicating if the imagery scene does not meet all user-selected criteria
     */
    doesNotMeetCriteria?: boolean;
    /**
     * custom text to be displayed in the calendar component
     */
    customTooltipText?: string[];
};

export type ImageryScenesState = {
    /**
     * mode to be used to visualize and compare the imagery scenes
     */
    mode: AppMode;
    /**
     * tool to be used to analyze the imagery scene
     */
    tool: AnalysisTool;
    /**
     * query params for the Imagery scene to be used in "Find a Scene" mode; and
     * on the left side of the "Swipe" mode
     */
    queryParams4MainScene: QueryParams4ImageryScene;
    /**
     * query params for the Imagery scene that will be used on the right side of the "swipe" mode
     */
    queryParams4SecondaryScene: QueryParams4ImageryScene;
    /**
     * if true, user has selected the secondary scene, this happens when user selects the "right" side of
     * of the Swipe Mode, or selects the "Scene B" of the Change tool
     */
    isSecondarySceneActive: boolean;
    /**
     * query parameters for list of Imagery scenes that will be used in Animation Mode, Spectral Sampling Mode and etc.
     */
    queryParamsList: {
        byId: {
            [key: string]: QueryParams4ImageryScene;
        };
        ids: string[];
        /**
         * Id of the selected item. This Id helps identify which item should be updated.
         */
        selectedItemID: string;
    };
    /**
     * List of imagery scenes that intersect with center point of map view and were acquired within the user selected acquisition year.
     */
    availableImageryScenes: {
        byObjectId: {
            [key: number]: ImageryScene;
        };
        objectIds: number[];
    };
    /**
     * user selected cloud coverage threshold, the value ranges from 0 to 1
     */
    cloudCover: number;
    /**
     * Flag indicating whether the scene should be forcibly reselected.
     * If true, the default logic (inside of `useFindSelectedSceneByDate` custom hook) of keeping with the currently selected scene
     * will be overridden, and the scene will be reselected from the new list of scenes.
     */
    shouldForceSceneReselection: boolean;
};

export const DefaultQueryParams4ImageryScene: QueryParams4ImageryScene = {
    acquisitionDate: '',
    rasterFunctionName: '',
    objectIdOfSelectedScene: null,
    uniqueId: null,
    acquisitionDateRange: getDateRangeForPast12Month(),
};

export const initialImagerySceneState: ImageryScenesState = {
    mode: 'dynamic',
    tool: 'mask',
    queryParams4MainScene: {
        ...DefaultQueryParams4ImageryScene,
    },
    queryParams4SecondaryScene: {
        ...DefaultQueryParams4ImageryScene,
    },
    isSecondarySceneActive: false,
    queryParamsList: {
        byId: {},
        ids: [],
        selectedItemID: null,
    },
    availableImageryScenes: {
        byObjectId: {},
        objectIds: [],
    },
    cloudCover: 0.5,
    shouldForceSceneReselection: false,
};

const slice = createSlice({
    name: 'ImageryScenes',
    initialState: initialImagerySceneState,
    reducers: {
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
        modeChanged: (state, action: PayloadAction<AppMode>) => {
            state.mode = action.payload;
        },
        isSecondarySceneActiveToggled: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.isSecondarySceneActive = action.payload;
        },
        selectedItemIdOfQueryParamsListChanged: (
            state,
            action: PayloadAction<string>
        ) => {
            state.queryParamsList.selectedItemID = action.payload;
        },
        queryParamsListChanged: (
            state,
            action: PayloadAction<{
                queryParams: QueryParams4ImageryScene[];
                selectedItemID: string;
            }>
        ) => {
            const byId: {
                [key: string]: QueryParams4ImageryScene;
            } = {};
            const ids: string[] = [];

            const { selectedItemID, queryParams } = action.payload;

            for (const item of queryParams) {
                const { uniqueId } = item;

                if (!uniqueId) {
                    continue;
                }

                ids.push(uniqueId);
                byId[uniqueId] = item;
            }

            state.queryParamsList = {
                byId,
                ids,
                selectedItemID,
            };
        },
        queryParams4SelectedItemInListChanged: (
            state,
            action: PayloadAction<QueryParams4ImageryScene>
        ) => {
            const itemId = state.queryParamsList.selectedItemID;
            state.queryParamsList.byId[itemId] = action.payload;
        },
        cloudCoverChanged: (state, action: PayloadAction<number>) => {
            state.cloudCover = action.payload;
        },
        // acquisitionYearChanged: (state, action: PayloadAction<number>) => {
        //     state.acquisitionYear = action.payload;
        // },
        activeAnalysisToolChanged: (
            state,
            action: PayloadAction<AnalysisTool>
        ) => {
            state.tool = action.payload;
        },
        availableImageryScenesUpdated: (
            state,
            action: PayloadAction<ImageryScene[]>
        ) => {
            const objectIds: number[] = [];

            const byObjectId: {
                [key: number]: ImageryScene;
            } = {};

            for (const scene of action.payload) {
                const { objectId } = scene;

                objectIds.push(objectId);
                byObjectId[objectId] = scene;
            }

            state.availableImageryScenes = {
                objectIds,
                byObjectId,
            };
        },
        shouldForceSceneReselectionUpdated: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.shouldForceSceneReselection = action.payload;
        },
    },
});

const { reducer } = slice;

export const {
    // availableScenesUpdated,
    queryParams4MainSceneChanged,
    queryParams4SecondarySceneChanged,
    modeChanged,
    isSecondarySceneActiveToggled,
    selectedItemIdOfQueryParamsListChanged,
    queryParamsListChanged,
    queryParams4SelectedItemInListChanged,
    cloudCoverChanged,
    activeAnalysisToolChanged,
    availableImageryScenesUpdated,
    shouldForceSceneReselectionUpdated,
} = slice.actions;

export default reducer;
