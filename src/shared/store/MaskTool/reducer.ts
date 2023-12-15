import {
    createSlice,
    // createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';
import { SpectralIndex } from '@typing/imagery-service';

export type MaskOptions = {
    selectedRange: number[];
    /**
     * color array in RGB format
     */
    color: number[];
};

type MaskOptionsBySpectralIndex = Record<SpectralIndex, MaskOptions>;

export type MaskToolState = {
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

export const initialMaskToolState: MaskToolState = {
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
        'temperature farhenheit': {
            // selectedRange: [30, 140],
            // the mask layer throws error when using farhenheit as input unit,
            // therefore we will just use celsius degrees in the selectedRange
            selectedRange: [0, 60],
            color: [251, 182, 100],
        },
        'temperature celcius': {
            selectedRange: [0, 60], // default range should be between 0-60 celcius degrees
            color: [251, 182, 100],
        },
    },
};

const slice = createSlice({
    name: 'MaskTool',
    initialState: initialMaskToolState,
    reducers: {
        spectralIndex4MaskToolChanged: (
            state,
            action: PayloadAction<SpectralIndex>
        ) => {
            state.spectralIndex = action.payload;
        },
        maskOptionsChanged: (state, action: PayloadAction<MaskOptions>) => {
            const spectralIndex = state.spectralIndex;
            state.maskOptionsBySpectralIndex[spectralIndex] = action.payload;
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
    // activeAnalysisToolChanged,
    spectralIndex4MaskToolChanged,
    maskOptionsChanged,
    maskLayerOpacityChanged,
    shouldClipMaskLayerToggled,
} = slice.actions;

export default reducer;
