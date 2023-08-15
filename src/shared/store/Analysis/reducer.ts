import {
    createSlice,
    // createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';
import { getCurrentMonth } from '@shared/utils/date-time/getCurrentDateTime';
import { TemporalProfileData, SpectralIndex } from '@typing/imagery-service';
import { Point } from 'esri/geometry';

export type AnalysisTool = 'mask' | 'profile';

export type MaskOptions = {
    selectedRange: number[];
    /**
     * color array in RGB format
     */
    color: number[];
};

type MaskOptionsBySpectralIndex = Partial<Record<SpectralIndex, MaskOptions>>;

export type AnalysisState = {
    /**
     * active analysis tool
     */
    tool: AnalysisTool;
    maskTool: {
        /**
         * user selected spectral index to be used in the mask tool
         */
        spectralIndex: SpectralIndex;
        /**
         * maks tool options by spectral index name
         */
        maskOptionsBySpectralIndex: MaskOptionsBySpectralIndex;
        /**
         * opacity of the mask layer
         */
        maskLayerOpacity: number;
        /**
         * if true, mask layer should be used to clip the imagery scene
         */
        shouldClipMaskLayer: boolean;
    };
    profileTool: {
        /**
         * Query Location for Temporal Profile tool
         */
        queryLocation: Point;
        /**
         * acquisition month to be used to fetch Temporal Profile data
         */
        acquisitionMonth: number;
        /**
         * user selected spectral index to be used in the Temporal profile tool
         */
        spectralIndex: SpectralIndex;
        /**
         * Determines the frequency of collecting samples for the annual resolution.
         * The minimum value is 1, indicating that imagery scenes acquired in the user-selected month
         * will be sampled for each year. The maximum value is 5, indicating that imagery scenes will be sampled
         * every 5 years.
         */
        samplingTemporalResolution: number;
        /**
         * imagery temporal profile data using object id as key
         */
        temporalProfileData: {
            byObjectId: {
                [key: number]: TemporalProfileData;
            };
            objectIds: number[];
        };
    };
};

export type MaskToolData = AnalysisState['maskTool'];

export type TemporalProfileToolData = AnalysisState['profileTool'];

export const initialAnalysisState: AnalysisState = {
    tool: 'mask',
    maskTool: {
        spectralIndex: 'water',
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
            // 'temperature farhenheit': {
            //     selectedRange: [0, 200],
            //     color: [251, 182, 100],
            // },
            'temperature celcius': {
                selectedRange: [0, 60], // default range should be between 0-60 celcius degrees
                color: [251, 182, 100],
            },
        },
    },
    profileTool: {
        queryLocation: null,
        acquisitionMonth: getCurrentMonth(),
        spectralIndex: 'moisture',
        temporalProfileData: {
            byObjectId: {},
            objectIds: [],
        },
        samplingTemporalResolution: 1,
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
            state.maskTool.spectralIndex = action.payload;
        },
        maskOptionsChanged: (state, action: PayloadAction<MaskOptions>) => {
            const spectralIndex = state.maskTool.spectralIndex;
            state.maskTool.maskOptionsBySpectralIndex[spectralIndex] =
                action.payload;
        },
        maskLayerOpacityChanged: (state, action: PayloadAction<number>) => {
            state.maskTool.maskLayerOpacity = action.payload;
        },
        shouldClipMaskLayerToggled: (state, action: PayloadAction<boolean>) => {
            state.maskTool.shouldClipMaskLayer =
                !state.maskTool.shouldClipMaskLayer;
        },
        queryLocation4ProfileToolChanged: (
            state,
            action: PayloadAction<Point>
        ) => {
            state.profileTool.queryLocation = action.payload;
        },
        acquisitionMonth4ProfileToolChanged: (
            state,
            action: PayloadAction<number>
        ) => {
            state.profileTool.acquisitionMonth = action.payload;
        },
        temporalProfileDataUpdated: (
            state,
            action: PayloadAction<TemporalProfileData[]>
        ) => {
            const objectIds = [];
            const byObjectId = {};

            for (const item of action.payload) {
                const { objectId } = item;
                objectIds.push(objectId);
                byObjectId[objectId] = item;
            }

            state.profileTool.temporalProfileData = {
                objectIds,
                byObjectId,
            };
        },
        spectralIndex4ProfileToolChanged: (
            state,
            action: PayloadAction<SpectralIndex>
        ) => {
            state.profileTool.spectralIndex = action.payload;
        },
        samplingTemporalResolutionChanged: (
            state,
            action: PayloadAction<number>
        ) => {
            state.profileTool.samplingTemporalResolution = action.payload;
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
    temporalProfileDataUpdated,
    spectralIndex4ProfileToolChanged,
    samplingTemporalResolutionChanged,
} = slice.actions;

export default reducer;
