import {
    createSlice,
    // createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';
import { getCurrentMonth } from '@shared/utils/date-time/getCurrentDateTime';
import { LandsatProfileData } from '@typing/imagery-service';
import { Point } from 'esri/geometry';

export type AnalysisTool = 'mask' | 'profile';

/**
 * Spectral indices are combinations of the pixel values from two or more spectral bands in a multispectral image.
 * Spectral indices are designed to highlight pixels showing the relative abundance or lack of a land-cover type of interest in an image.
 */
export type SpectralIndex = 'water' | 'vegetation' | 'moisture';

export type MaskOptions = {
    selectedRange: number[];
    /**
     * color array in RGB format
     */
    color: number[];
};

export type AnalysisState = {
    /**
     * active analysis tool
     */
    tool: AnalysisTool;
    /**
     * user selected spectral index to be used in the mask tool
     */
    spectralIndex4MaskTool: SpectralIndex;
    /**
     * maks tool options by spectral index name
     */
    maskOptionsBySpectralIndex: Record<SpectralIndex, MaskOptions>;
    /**
     * opacity of the mask layer
     */
    maskLayerOpacity: number;
    /**
     * if true, mask layer should be used to clip the landsat scene
     */
    shouldClipMaskLayer: boolean;
    /**
     * Query Location for Profile tool
     */
    queryLocation4ProfileTool: Point;
    /**
     * acquisition month to be used to fetch Profile data
     */
    acquisitionMonth4ProfileTool: number;
    /**
     * landsat profile data using object id as key
     */
    profileData: {
        byObjectId: {
            [key: number]: LandsatProfileData;
        };
        objectIds: number[];
    };
};

export const initialAnalysisState: AnalysisState = {
    tool: 'mask',
    spectralIndex4MaskTool: 'water',
    maskLayerOpacity: 1,
    shouldClipMaskLayer: false,
    maskOptionsBySpectralIndex: {
        moisture: {
            selectedRange: [0, 1],
            color: [89, 255, 252],
        },
        vegetation: {
            selectedRange: [0, 1],
            color: [115, 255, 132],
        },
        water: {
            selectedRange: [0, 1],
            color: [89, 214, 255],
        },
    },
    queryLocation4ProfileTool: null,
    acquisitionMonth4ProfileTool: getCurrentMonth(),
    profileData: {
        byObjectId: {},
        objectIds: [],
    },
};

const slice = createSlice({
    name: 'Analysis',
    initialState: initialAnalysisState,
    reducers: {
        activeAnalysisToolChanged: (
            state,
            action: PayloadAction<AnalysisTool>
        ) => {
            state.tool = action.payload;
        },
        spectralIndex4MaskToolChanged: (
            state,
            action: PayloadAction<SpectralIndex>
        ) => {
            state.spectralIndex4MaskTool = action.payload;
        },
        maskOptionsChanged: (state, action: PayloadAction<MaskOptions>) => {
            const spectralIndex = state.spectralIndex4MaskTool;
            state.maskOptionsBySpectralIndex[spectralIndex] = action.payload;
        },
        maskLayerOpacityChanged: (state, action: PayloadAction<number>) => {
            state.maskLayerOpacity = action.payload;
        },
        shouldClipMaskLayerToggled: (state, action: PayloadAction<boolean>) => {
            state.shouldClipMaskLayer = !state.shouldClipMaskLayer;
        },
        queryLocation4ProfileToolChanged: (
            state,
            action: PayloadAction<Point>
        ) => {
            state.queryLocation4ProfileTool = action.payload;
        },
        acquisitionMonth4ProfileToolChanged: (
            state,
            action: PayloadAction<number>
        ) => {
            state.acquisitionMonth4ProfileTool = action.payload;
        },
        profileDataUpdated: (
            state,
            action: PayloadAction<LandsatProfileData[]>
        ) => {
            const objectIds = [];
            const byObjectId = {};

            for (const item of action.payload) {
                const { objectId } = item;
                objectIds.push(objectId);
                byObjectId[objectId] = item;
            }

            state.profileData = {
                objectIds,
                byObjectId,
            };
        },
    },
});

const { reducer } = slice;

export const {
    activeAnalysisToolChanged,
    spectralIndex4MaskToolChanged,
    maskOptionsChanged,
    maskLayerOpacityChanged,
    shouldClipMaskLayerToggled,
    queryLocation4ProfileToolChanged,
    acquisitionMonth4ProfileToolChanged,
    profileDataUpdated,
} = slice.actions;

export default reducer;
