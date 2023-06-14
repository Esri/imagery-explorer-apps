import {
    createSlice,
    // createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';

export type AnalysisTool = 'mask' | 'profile';

export type MaskMethod = 'water' | 'vegetation' | 'moisture';

export type MaskOptions = {
    selectedRange: number[];
    /**
     * color array in RGB format
     */
    color: number[];
    opacity: number;
    shouldClip: boolean;
};

export type AnalysisState = {
    /**
     * active analysis tool
     */
    tool: AnalysisTool;
    /**
     * method to be used in the mask tool
     */
    maskMethod: MaskMethod;
    /**
     * maks tool options by method name
     */
    maskOptionsByMethodName: Record<MaskMethod, MaskOptions>;
};

const MaskOptionsDefaultValues: MaskOptions = {
    selectedRange: [-1, 1],
    opacity: 1,
    shouldClip: false,
    color: [255, 255, 255],
};

export const initialAnalysisState: AnalysisState = {
    tool: 'mask',
    maskMethod: 'water',
    maskOptionsByMethodName: {
        moisture: {
            ...MaskOptionsDefaultValues,
            color: [0, 255, 255],
        },
        vegetation: {
            ...MaskOptionsDefaultValues,
            color: [0, 255, 0],
        },
        water: {
            ...MaskOptionsDefaultValues,
            color: [0, 0, 255],
        },
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
        maskMethodChanged: (state, action: PayloadAction<MaskMethod>) => {
            state.maskMethod = action.payload;
        },
        maskOptionChanged: (state, action: PayloadAction<MaskOptions>) => {
            const maskMethod = state.maskMethod;
            state.maskOptionsByMethodName[maskMethod] = action.payload;
        },
    },
});

const { reducer } = slice;

export const {
    activeAnalysisToolChanged,
    maskMethodChanged,
    maskOptionChanged,
} = slice.actions;

export default reducer;
