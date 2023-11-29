import { batch } from 'react-redux';
import { StoreDispatch, StoreGetState } from '../configureStore';
import {
    QueryParams4ImageryScene,
    // availableScenesUpdated,
    queryParams4MainSceneChanged,
    queryParams4ScenesInAnimationModeChanged,
    queryParams4SceneInSwipeModeChanged,
    queryParams4SceneInSelectedAnimationFrameChanged,
    selectedAnimationFrameIdChanged,
    queryParams4SecondarySceneChanged,
} from './reducer';
import {
    selectAppMode,
    selectQueryParams4MainScene,
    selectQueryParamsOfPreviousAnimationFrame,
    selectQueryParams4SceneInSelectedMode,
    selectQueryParams4ScenesInAnimateMode,
    selectQueryParams4SecondaryScene,
    selectSelectedAnimationFrameId,
    selectActiveAnalysisTool,
    // selectLandsatMissionsToBeExcluded,
} from './selectors';
import { nanoid } from 'nanoid';
import { getYearFromFormattedDateString } from '@shared/utils/date-time/formatDateString';
import { selectActiveScene4ChangeCompareTool } from '../ChangeCompareTool/selectors';

const updateQueryParams4ActiveSceneInChangeCompareTool =
    (updatedQueryParams: QueryParams4ImageryScene) =>
    (dispatch: StoreDispatch, getState: StoreGetState) => {
        const activeScene = selectActiveScene4ChangeCompareTool(getState());

        if (activeScene === 'scene a') {
            dispatch(queryParams4MainSceneChanged(updatedQueryParams));
        } else {
            dispatch(queryParams4SecondarySceneChanged(updatedQueryParams));
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
        const analysisTool = selectActiveAnalysisTool(getState());

        if (mode === 'find a scene' || mode === 'dynamic') {
            dispatch(queryParams4MainSceneChanged(updatedQueryParams));
            return;
        }

        if (mode === 'analysis') {
            // the change compare tool uses both main and secondary scene based on selected active scene in the tool
            // therefore it needs to be handled by a updateQueryParams4ActiveSceneInChangeCompareTool thunk function
            if (analysisTool === 'change') {
                dispatch(
                    updateQueryParams4ActiveSceneInChangeCompareTool(
                        updatedQueryParams
                    )
                );
                return;
            }

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
                acquisitionYearFromPreviousAnimationFrame: null, // reset this value whenever user makes an update to the acquisition date
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

        const queryParamsOfPreviousFrame =
            selectQueryParamsOfPreviousAnimationFrame(getState());

        const queryParamsOfNewFrame: QueryParams4ImageryScene = {
            ...queryParamsOfPreviousFrame,
            animationFrameId: nanoid(5),
            // acquisition date should not be cloned over to the new animation frame
            acquisitionDate: '',
            // try to save the acquistion year from the previous animation frame if the previous frame has a acquistion date selected
            acquisitionYearFromPreviousAnimationFrame:
                queryParamsOfPreviousFrame.acquisitionDate
                    ? getYearFromFormattedDateString(
                          queryParamsOfPreviousFrame.acquisitionDate
                      )
                    : null,
        };

        batch(() => {
            dispatch(
                queryParams4ScenesInAnimationModeChanged([
                    ...queryParams4ExistingScenes,
                    queryParamsOfNewFrame,
                ])
            );

            dispatch(
                selectedAnimationFrameIdChanged(
                    queryParamsOfNewFrame.animationFrameId
                )
            );
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

export const swapMainAndSecondaryScenes =
    () => async (dispatch: StoreDispatch, getState: StoreGetState) => {
        try {
            const queryParams4MainScene = selectQueryParams4MainScene(
                getState()
            );

            const queryParams4SecondaryScene = selectQueryParams4SecondaryScene(
                getState()
            );

            batch(() => {
                dispatch(
                    queryParams4MainSceneChanged({
                        ...queryParams4SecondaryScene,
                    })
                );

                dispatch(
                    queryParams4SecondarySceneChanged({
                        ...queryParams4MainScene,
                    })
                );
            });
        } catch (err) {
            console.error(err);
        }
    };
