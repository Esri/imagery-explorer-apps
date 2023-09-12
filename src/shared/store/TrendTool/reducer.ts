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

/**
 * The trend tool has two options
 */
export type TrendToolOption = 'year-to-year' | 'month-to-month';

// type MaskOptionsBySpectralIndex = Partial<Record<SpectralIndex, MaskOptions>>;

export type TrendToolState = {
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

export const initialTrendToolState: TrendToolState = {
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
};

const slice = createSlice({
    name: 'TrendTool',
    initialState: initialTrendToolState,
    reducers: {
        queryLocation4ProfileToolChanged: (
            state,
            action: PayloadAction<Point>
        ) => {
            state.queryLocation = action.payload;
        },
        acquisitionMonth4ProfileToolChanged: (
            state,
            action: PayloadAction<number>
        ) => {
            state.acquisitionMonth = action.payload;
        },
        acquisitionYear4ProfileToolChanged: (
            state,
            action: PayloadAction<number>
        ) => {
            state.acquisitionYear = action.payload;
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

            state.temporalProfileData = {
                objectIds,
                byObjectId,
            };
        },
        spectralIndex4ProfileToolChanged: (
            state,
            action: PayloadAction<SpectralIndex>
        ) => {
            state.spectralIndex = action.payload;
        },
        trendToolOptionChanged: (
            state,
            action: PayloadAction<TrendToolOption>
        ) => {
            state.option = action.payload;
        },
        trendingToolIsLoadingChanged: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.loading = action.payload;
        },
    },
});

const { reducer } = slice;

export const {
    queryLocation4ProfileToolChanged,
    acquisitionMonth4ProfileToolChanged,
    acquisitionYear4ProfileToolChanged,
    temporalProfileDataUpdated,
    spectralIndex4ProfileToolChanged,
    trendToolOptionChanged,
    trendingToolIsLoadingChanged,
} = slice.actions;

export default reducer;
