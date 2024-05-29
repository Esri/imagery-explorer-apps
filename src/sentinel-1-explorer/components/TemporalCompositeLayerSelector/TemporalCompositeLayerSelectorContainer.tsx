import React, { useEffect, useMemo } from 'react';
import { TemporalCompositeLayerSelector } from './TemporalCompositeLayerSelector';
import { useDispatch } from 'react-redux';
import {
    initiateImageryScenes4TemporalCompositeTool,
    swapImageryScenesInTemporalCompositeTool,
} from '@shared/store/TemporalCompositeTool/thunks';
import { useSelector } from 'react-redux';
import {
    selectIdOfSelectedItemInListOfQueryParams,
    selectListOfQueryParams,
} from '@shared/store/ImageryScene/selectors';
import { selectedItemIdOfQueryParamsListChanged } from '@shared/store/ImageryScene/reducer';
import { isTemporalCompositeLayerOnUpdated } from '@shared/store/TemporalCompositeTool/reducer';
import { selectIsTemporalCompositeLayerOn } from '@shared/store/TemporalCompositeTool/selectors';
import { useSyncCalendarDateRange } from '../../hooks/useSyncCalendarDateRange';

export const TemporalCompositeLayerSelectorContainer = () => {
    const dispatch = useDispatch();

    const listOfQueryParams = useSelector(selectListOfQueryParams);

    const idOfSelectedQueryParams = useSelector(
        selectIdOfSelectedItemInListOfQueryParams
    );

    const isCompositeLayerOn = useSelector(selectIsTemporalCompositeLayerOn);

    const isViewCompositeLayerDisabled = useMemo(() => {
        if (!listOfQueryParams || !listOfQueryParams.length) {
            return true;
        }

        const queryParamsWithoutAcquisitionDate = listOfQueryParams.filter(
            (d) => !d.acquisitionDate
        );

        if (queryParamsWithoutAcquisitionDate?.length) {
            return true;
        }

        return false;
    }, [listOfQueryParams]);

    useSyncCalendarDateRange();

    useEffect(() => {
        dispatch(initiateImageryScenes4TemporalCompositeTool(true));
    }, []);

    return (
        <TemporalCompositeLayerSelector
            idOfSelectedQueryParams={idOfSelectedQueryParams}
            queryParams4ImagerySceneOfRedBand={listOfQueryParams[0]}
            queryParams4ImagerySceneOfGreenBand={listOfQueryParams[1]}
            queryParams4ImagerySceneOfBlueBand={listOfQueryParams[2]}
            isCompositeLayerOn={isCompositeLayerOn}
            viewCompositeLayerDisabled={isViewCompositeLayerDisabled}
            activeSceneOnChange={(uniqueId) => {
                dispatch(selectedItemIdOfQueryParamsListChanged(uniqueId));
                dispatch(isTemporalCompositeLayerOnUpdated(false));
            }}
            viewCompositeLayerButtonOnClick={() => {
                dispatch(isTemporalCompositeLayerOnUpdated(true));
            }}
            swapButtonOnClick={(
                indexOfSceneA: number,
                indexOfSceneB: number
            ) => {
                dispatch(
                    swapImageryScenesInTemporalCompositeTool(
                        indexOfSceneA,
                        indexOfSceneB
                    )
                );
            }}
        />
    );
};
