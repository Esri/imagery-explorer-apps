import { batch } from 'react-redux';
import { getLandsatScenes } from '@shared/services/landsat-2/getLandsatScenes';
import { selectMapCenter } from '../Map/selectors';
import { RootState, StoreDispatch, StoreGetState } from '../configureStore';
import {
    QueryParams4ImageryScene,
    availableScenesUpdated,
    queryParams4MainSceneChanged,
    queryParams4ScenesInAnimationModeChanged,
    queryParams4SceneInSwipeModeChanged,
    queryParams4SceneInSelectedAnimationFrameChanged,
    selectedAnimationFrameIdChanged,
} from './reducer';
import {
    selectAppMode,
    selectQueryParams4SceneInNewAnimationFrame,
    selectQueryParams4SceneInSelectedMode,
    selectQueryParams4ScenesInAnimateMode,
    selectSelectedAnimationFrameId,
} from './selectors';
import { generate } from 'shortid';
import { LandsatScene } from '@typing/imagery-service';
import { getYearFromFormattedDateString } from '@shared/utils/date-time/formatDateString';

/**
 * Query Landsat Scenes that intersect with center point of map view that were acquired within the user selected acquisition year.
 * @param year use selected acquisition year
 * @returns
 */
export const queryAvailableScenes =
    (acquisitionYear: number) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        try {
            const { acquisitionDate } =
                selectQueryParams4SceneInSelectedMode(getState()) || {};

            const center = selectMapCenter(getState());

            // get scenes that were acquired within the acquisition year
            const scenes = await getLandsatScenes({
                acquisitionYear,
                mapPoint: center,
            });

            // If the year of the acquisition date is different from the input acquisition year, we need to query Landsat scenes acquired on the acquisition date.
            // Why are we doing this? Selecting a different year triggers this function to query available scenes for that year.
            // However, we don't want the Landsat Scene on the map and its information to disappear before a new acquisition date is selected.
            // By adding the scene acquired on the acquisition date, we ensure that the currently selected scene will remain visible until a new acquisition date is chosen.
            if (
                acquisitionDate &&
                getYearFromFormattedDateString(acquisitionDate) !==
                    acquisitionYear
            ) {
                const scenesByAcquisitionDate = await getLandsatScenes({
                    formattedAcquisitionDate: acquisitionDate,
                    mapPoint: center,
                });

                for (const scene of scenesByAcquisitionDate) {
                    scenes.push(scene);
                }
            }

            const availableScenes: LandsatScene[] = [];

            for (const scene of scenes) {
                const { formattedAcquisitionDate } = scene;

                // Only need to keep the one Landsat Scene for each day
                if (
                    availableScenes.length &&
                    availableScenes[availableScenes.length - 1]
                        .formattedAcquisitionDate == formattedAcquisitionDate
                ) {
                    continue;
                }

                availableScenes.push(scene);
            }

            batch(() => {
                dispatch(availableScenesUpdated(availableScenes));
            });
        } catch (err) {
            console.error(err);
        }
    };

/**
 * update query params that will be used to find the Landsat Scene in the selected mode
 * @param updatedQueryParams
 * @returns
 */
export const updateQueryParams4SceneInSelectedMode =
    (updatedQueryParams: QueryParams4ImageryScene) =>
    (dispatch: StoreDispatch, getState: StoreGetState) => {
        const mode = selectAppMode(getState());

        if (mode === 'find a scene' || mode === 'analysis') {
            dispatch(queryParams4MainSceneChanged(updatedQueryParams));
            return;
        }

        if (mode === 'swipe') {
            dispatch(queryParams4SceneInSwipeModeChanged(updatedQueryParams));
            return;
        }

        if (mode === 'animate') {
            dispatch(
                queryParams4SceneInSelectedAnimationFrameChanged(
                    updatedQueryParams
                )
            );
        }
    };

export const updateRasterFunctionName =
    (rasterFunctionName: string) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        try {
            const queryParams = selectQueryParams4SceneInSelectedMode(
                getState()
            );

            // it is possible that there won't be any scene in Animation mode
            // before user adds a frame. Therefore we should just abort
            if (!queryParams) {
                return;
            }

            const updatedQueryParams: QueryParams4ImageryScene = {
                ...queryParams,
                rasterFunctionName,
            };

            dispatch(updateQueryParams4SceneInSelectedMode(updatedQueryParams));
        } catch (err) {
            console.error(err);
        }
    };

export const updateObjectIdOfSelectedScene =
    (objectIdOfSelectedScene: number) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        try {
            const queryParams = selectQueryParams4SceneInSelectedMode(
                getState()
            );

            if (!queryParams) {
                return;
            }

            const updatedQueryParams: QueryParams4ImageryScene = {
                ...queryParams,
                objectIdOfSelectedScene,
            };

            dispatch(updateQueryParams4SceneInSelectedMode(updatedQueryParams));
        } catch (err) {
            console.error(err);
        }
    };

// export const updateAcquisitionYear =
//     (acquisitionYear: number) =>
//     async (dispatch: StoreDispatch, getState: StoreGetState) => {
//         try {
//             const queryParams = selectQueryParams4SceneInSelectedMode(
//                 getState()
//             );

//             if (!queryParams) {
//                 return;
//             }

//             const updatedQueryParams: QueryParams4ImageryScene = {
//                 ...queryParams,
//                 acquisitionYear,
//             };

//             dispatch(updateQueryParams4SceneInSelectedMode(updatedQueryParams));
//         } catch (err) {
//             console.error(err);
//         }
//     };

export const updateCloudCover =
    (cloudCover: number) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        try {
            const queryParams = selectQueryParams4SceneInSelectedMode(
                getState()
            );

            if (!queryParams) {
                return;
            }

            const updatedQueryParams: QueryParams4ImageryScene = {
                ...queryParams,
                cloudCover,
            };

            dispatch(updateQueryParams4SceneInSelectedMode(updatedQueryParams));
        } catch (err) {
            console.error(err);
        }
    };

// export const updateAcquisitionMonth =
//     (acquisitionMonth: number) =>
//     async (dispatch: StoreDispatch, getState: StoreGetState) => {
//         try {
//             const queryParams = selectQueryParams4SceneInSelectedMode(
//                 getState()
//             );

//             const updatedQueryParams: QueryParams4ImageryScene = {
//                 ...queryParams,
//                 acquisitionMonth,
//             };

//             dispatch(updateLandsatQueryParams4SelectedMode(updatedQueryParams));
//         } catch (err) {
//             console.error(err);
//         }
//     };

export const updateAcquisitionDate =
    (acquisitionDate: string) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        try {
            const queryParams = selectQueryParams4SceneInSelectedMode(
                getState()
            );

            if (!queryParams) {
                return;
            }

            const updatedQueryParams: QueryParams4ImageryScene = {
                ...queryParams,
                acquisitionDate,
            };

            dispatch(updateQueryParams4SceneInSelectedMode(updatedQueryParams));
        } catch (err) {
            console.error(err);
        }
    };

export const addAnimationFrame =
    () => async (dispatch: StoreDispatch, getState: StoreGetState) => {
        const queryParams4ExistingScenes =
            selectQueryParams4ScenesInAnimateMode(getState());

        const queryParams4SceneInNewFrame =
            selectQueryParams4SceneInNewAnimationFrame(getState());

        const idOfFrame2BeAdded = generate();

        batch(() => {
            dispatch(
                queryParams4ScenesInAnimationModeChanged([
                    ...queryParams4ExistingScenes,
                    {
                        ...queryParams4SceneInNewFrame,
                        animationFrameId: idOfFrame2BeAdded,
                    },
                ])
            );

            dispatch(selectedAnimationFrameIdChanged(idOfFrame2BeAdded));
        });
    };

export const removeAnimationFrame =
    (idOfFrame2BeRemoved: string) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        const queryParams4ExistingScenes =
            selectQueryParams4ScenesInAnimateMode(getState());

        // remove the scene associated with the frame that user wants to remove
        const updatedQueryParams4ScenesInAnimateMode =
            queryParams4ExistingScenes.filter(
                (d) => d.animationFrameId !== idOfFrame2BeRemoved
            );

        const selectedAnimationFrameId = selectSelectedAnimationFrameId(
            getState()
        );

        dispatch(
            queryParams4ScenesInAnimationModeChanged(
                updatedQueryParams4ScenesInAnimateMode
            )
        );

        // selected frame got removed, therefore we should select a new frame
        if (selectedAnimationFrameId === idOfFrame2BeRemoved) {
            const newSelectedAnimationFrameId =
                updatedQueryParams4ScenesInAnimateMode[0]?.animationFrameId ||
                null;

            dispatch(
                selectedAnimationFrameIdChanged(newSelectedAnimationFrameId)
            );
        }
    };
