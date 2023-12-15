import {
    createSlice,
    // createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';
// import { getCurrentYear } from '@shared/utils/date-time/getCurrentYear';
import { LandsatScene } from '@typing/imagery-service';

export type LandsatState = {
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
     * list of Landat missions to be excluded
     */
    missionsToBeExcluded: number[];
};

export const initialLandsatState: LandsatState = {
    availableScenes: {
        byObjectId: {},
        objectIds: [],
    },
    missionsToBeExcluded: [],
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

            const byObjectId: {
                [key: number]: LandsatScene;
            } = {};

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
        missionsToBeExcludedUpdated: (
            state,
            action: PayloadAction<number[]>
        ) => {
            state.missionsToBeExcluded = action.payload;
        },
    },
});

const { reducer } = slice;

export const { availableScenesUpdated, missionsToBeExcludedUpdated } =
    slice.actions;

export default reducer;
