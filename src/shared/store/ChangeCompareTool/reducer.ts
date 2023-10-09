import {
    createSlice,
    // createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';
import { SpectralIndex } from '@typing/imagery-service';

export type ActiveScene4ChangeCompareTool = 'scene a' | 'scene b';

export type ChangeCompareToolState = {
    /**
     * use selected spectral index
     */
    spectralIndex: SpectralIndex;
    /**
     * indicator of the active scene for change compare tool
     */
    activeScene: ActiveScene4ChangeCompareTool;
    /**
     * if true, user is viewing change on the map
     */
    isViewingChange: boolean;
};

export const initialChangeCompareToolState: ChangeCompareToolState = {
    spectralIndex: 'vegetation',
    activeScene: 'scene a',
    isViewingChange: false,
};

const slice = createSlice({
    name: 'ChangeCompareTool',
    initialState: initialChangeCompareToolState,
    reducers: {
        spectralIndexChanged: (state, action: PayloadAction<SpectralIndex>) => {
            state.spectralIndex = action.payload;
        },
        activeSceneChanged: (
            state,
            action: PayloadAction<ActiveScene4ChangeCompareTool>
        ) => {
            state.activeScene = action.payload;
        },
        isViewingChangeUpdated: (state, action: PayloadAction<boolean>) => {
            state.isViewingChange = action.payload;
        },
    },
});

const { reducer } = slice;

export const {
    spectralIndexChanged,
    activeSceneChanged,
    isViewingChangeUpdated,
} = slice.actions;

export default reducer;
