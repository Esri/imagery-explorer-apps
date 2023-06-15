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
    /**
     * opacity of the mask layer
     */
    maskLayerOpacity: number;
    /**
     * if true, mask layer should be used to clip the landsat scene
     */
    shouldClipMaskLayer: boolean;
};

export const initialAnalysisState: AnalysisState = {
    tool: 'mask',
    maskMethod: 'water',
    maskLayerOpacity: 1,
    shouldClipMaskLayer: false,
    maskOptionsByMethodName: {
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
        maskOptionsChanged: (state, action: PayloadAction<MaskOptions>) => {
            const maskMethod = state.maskMethod;
            state.maskOptionsByMethodName[maskMethod] = action.payload;
        },
        maskLayerOpacityChanged: (state, action: PayloadAction<number>) => {
            state.maskLayerOpacity = action.payload;
        },
        shouldClipMaskLayerToggled: (state, action: PayloadAction<boolean>) => {
            state.shouldClipMaskLayer = !state.shouldClipMaskLayer;
        },
    },
});

const { reducer } = slice;

export const {
    activeAnalysisToolChanged,
    maskMethodChanged,
    maskOptionsChanged,
    maskLayerOpacityChanged,
    shouldClipMaskLayerToggled,
} = slice.actions;

export default reducer;
