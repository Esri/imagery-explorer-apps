import { batch } from 'react-redux';
import { StoreDispatch, StoreGetState } from '../configureStore';
import {
    QueryParams4ImageryScene,
    // availableScenesUpdated,
    queryParams4MainSceneChanged,
    queryParamsListChanged,
    queryParams4SceneInSwipeModeChanged,
    queryParams4SelectedItemInListChanged,
    selectedItemIdOfQueryParamsListChanged,
    queryParams4SecondarySceneChanged,
} from './reducer';
import {
    selectAppMode,
    selectQueryParams4MainScene,
    selectSelectedItemFromListOfQueryParams,
    selectQueryParams4SceneInSelectedMode,
    selectListOfQueryParams,
    selectQueryParams4SecondaryScene,
    selectIdOfSelectedItemInListOfQueryParams,
    selectActiveAnalysisTool,
    // selectLandsatMissionsToBeExcluded,
} from './selectors';
// import { nanoid } from 'nanoid';
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

        if (mode === 'animate' || mode === 'spectral sampling') {
            dispatch(queryParams4SelectedItemInListChanged(updatedQueryParams));
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
                inheritedAcquisitionYear: null, // reset this value whenever user makes an update to the acquisition date
            };

            dispatch(updateQueryParams4SceneInSelectedMode(updatedQueryParams));
        } catch (err) {
            console.error(err);
        }
    };

export const addNewItemToQueryParamsList =
    (uniqueId: string) =>
    (dispatch: StoreDispatch, getState: StoreGetState) => {
        const queryParams4ExistingScenes = selectListOfQueryParams(getState());

        // Try to inherit data from currently selected item from the list of query params,
        // or use the data from the main scene
        const queryParamsToInheritDataFrom =
            selectSelectedItemFromListOfQueryParams(getState()) ||
            selectQueryParams4MainScene(getState());

        const queryParamsOfNewFrame: QueryParams4ImageryScene = {
            ...queryParamsToInheritDataFrom,
            uniqueId,
            // acquisition date should not be cloned over to the new animation frame
            acquisitionDate: '',
            // try to save the acquistion year from the previous animation frame if the previous frame has a acquistion date selected
            inheritedAcquisitionYear:
                queryParamsToInheritDataFrom.acquisitionDate
                    ? getYearFromFormattedDateString(
                          queryParamsToInheritDataFrom.acquisitionDate
                      )
                    : null,
        };

        dispatch(
            queryParamsListChanged({
                queryParams: [
                    ...queryParams4ExistingScenes,
                    queryParamsOfNewFrame,
                ],
                selectedItemID: queryParamsOfNewFrame.uniqueId,
            })
        );
    };

export const removeItemFromQueryParamsList =
    (idOfItem2Removed: string) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        const queryParams4ExistingScenes = selectListOfQueryParams(getState());

        // remove the scene associated with the frame that user wants to remove
        const updatedListOfQueryParams = queryParams4ExistingScenes.filter(
            (d) => d.uniqueId !== idOfItem2Removed
        );

        const idOfSelectedItem = selectIdOfSelectedItemInListOfQueryParams(
            getState()
        );

        let updatedIdOfSelectedItem = idOfSelectedItem;

        // selected frame got removed, therefore we should select a new frame
        if (idOfSelectedItem === idOfItem2Removed) {
            updatedIdOfSelectedItem =
                updatedListOfQueryParams[0]?.uniqueId || null;
        }

        dispatch(
            queryParamsListChanged({
                queryParams: updatedListOfQueryParams,
                selectedItemID: updatedIdOfSelectedItem,
            })
        );
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
