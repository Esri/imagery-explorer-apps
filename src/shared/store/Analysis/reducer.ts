import {
    createSlice,
    // createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';
import {
    getCurrentMonth,
    getCurrentYear,
} from '@shared/utils/date-time/getCurrentDateTime';
import { TemporalProfileData, SpectralIndex } from '@typing/imagery-service';
import { Point } from 'esri/geometry';

// export type AnalysisTool = 'mask' | 'profile' | 'spectral';

// export type MaskOptions = {
//     selectedRange: number[];
//     /**
//      * color array in RGB format
//      */
//     color: number[];
// };

/**
 * The trend (temporal profile) tool has two options
 */
export type TrendToolOption = 'year-to-year' | 'month-to-month';

// type MaskOptionsBySpectralIndex = Partial<Record<SpectralIndex, MaskOptions>>;

export type AnalysisState = {
    // /**
    //  * active analysis tool
    //  */
    // tool: AnalysisTool;
    // maskTool: {
    //     /**
    //      * user selected spectral index to be used in the mask tool
    //      */
    //     spectralIndex: SpectralIndex;
    //     /**
    //      * maks tool options by spectral index name
    //      */
    //     maskOptionsBySpectralIndex: MaskOptionsBySpectralIndex;
    //     /**
    //      * opacity of the mask layer
    //      */
    //     maskLayerOpacity: number;
    //     /**
    //      * if true, mask layer should be used to clip the imagery scene
    //      */
    //     shouldClipMaskLayer: boolean;
    // };
    profileTool: {
        /**
         * user selected option for trend tool.
         * The default value should be `year-to-year` as that is the only option that we had in the beta release.
         */
        option: TrendToolOption;
        /**
         * Query Location for Temporal trend tool
         */
        queryLocation: Point;
        /**
         * acquisition month to be used to fetch temporal trend data for a given month (Year to Year)
         */
        acquisitionMonth: number;
        /**
         * acquisition year to be used to fetch temporal trend data for a given year (Month to Month)
         */
        acquisitionYear: number;
        /**
         * user selected spectral index to be used in the Temporal trend tool
         */
        spectralIndex: SpectralIndex;
        /**
         * imagery temporal trend data
         */
        temporalProfileData: {
            byObjectId: {
                [key: number]: TemporalProfileData;
            };
            objectIds: number[];
        };
        /**
         * if ture, it is in process of loading data to render trend tool
         */
        loading: boolean;
    };
};

// export type MaskToolData = AnalysisState['maskTool'];

export type TemporalProfileToolData = AnalysisState['profileTool'];

export const initialAnalysisState: AnalysisState = {
    // tool: 'mask',
    // maskTool: {
    //     spectralIndex: 'water',
    //     maskLayerOpacity: 1,
    //     shouldClipMaskLayer: false,
    //     maskOptionsBySpectralIndex: {
    //         moisture: {
    //             selectedRange: [0, 1],
    //             color: [89, 255, 252],
    //         },
    //         vegetation: {
    //             selectedRange: [0, 1],
    //             color: [115, 255, 132],
    //         },
    //         water: {
    //             selectedRange: [0, 1],
    //             color: [89, 214, 255],
    //         },
    //         'temperature farhenheit': {
    //             // selectedRange: [30, 140],
    //             // the mask layer throws error when using farhenheit as input unit,
    //             // therefore we will just use celsius degrees in the selectedRange
    //             selectedRange: [0, 60],
    //             color: [251, 182, 100],
    //         },
    //         'temperature celcius': {
    //             selectedRange: [0, 60], // default range should be between 0-60 celcius degrees
    //             color: [251, 182, 100],
    //         },
    //     },
    // },
    profileTool: {
        option: 'year-to-year',
        queryLocation: null,
        acquisitionMonth: getCurrentMonth(),
        acquisitionYear: getCurrentYear(),
        spectralIndex: 'moisture',
        temporalProfileData: {
            byObjectId: {},
            objectIds: [],
        },
        loading: false,
        // samplingTemporalResolution: 1,
    },
};

const slice = createSlice({
    name: 'Analysis',
    initialState: initialAnalysisState,
    reducers: {
        // spectralIndex4MaskToolChanged: (
        //     state,
        //     action: PayloadAction<SpectralIndex>
        // ) => {
        //     state.maskTool.spectralIndex = action.payload;
        // },
        // maskOptionsChanged: (state, action: PayloadAction<MaskOptions>) => {
        //     const spectralIndex = state.maskTool.spectralIndex;
        //     state.maskTool.maskOptionsBySpectralIndex[spectralIndex] =
        //         action.payload;
        // },
        // maskLayerOpacityChanged: (state, action: PayloadAction<number>) => {
        //     state.maskTool.maskLayerOpacity = action.payload;
        // },
        // shouldClipMaskLayerToggled: (state, action: PayloadAction<boolean>) => {
        //     state.maskTool.shouldClipMaskLayer =
        //         !state.maskTool.shouldClipMaskLayer;
        // },
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
        acquisitionYear4ProfileToolChanged: (
            state,
            action: PayloadAction<number>
        ) => {
            state.profileTool.acquisitionYear = action.payload;
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
        trendToolOptionChanged: (
            state,
            action: PayloadAction<TrendToolOption>
        ) => {
            state.profileTool.option = action.payload;
        },
        trendingToolIsLoadingChanged: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.profileTool.loading = action.payload;
        },
    },
});

const { reducer } = slice;

export const {
    // activeAnalysisToolChanged,
    // spectralIndex4MaskToolChanged,
    // maskOptionsChanged,
    // maskLayerOpacityChanged,
    // shouldClipMaskLayerToggled,
    queryLocation4ProfileToolChanged,
    acquisitionMonth4ProfileToolChanged,
    acquisitionYear4ProfileToolChanged,
    temporalProfileDataUpdated,
    spectralIndex4ProfileToolChanged,
    trendToolOptionChanged,
    trendingToolIsLoadingChanged,
    // samplingTemporalResolutionChanged,
} = slice.actions;

export default reducer;
