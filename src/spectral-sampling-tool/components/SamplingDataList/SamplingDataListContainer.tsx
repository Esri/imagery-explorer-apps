import React, { useEffect } from 'react';
import { SamplingDataList } from './SamplingDataList';
import {
    selectListOfQueryParams,
    selectIdOfSelectedItemInListOfQueryParams,
} from '@shared/store/ImageryScene/selectors';
import { useSelector } from 'react-redux';
import { SamplingDataControls } from './SamplingDataControls';
import { useDispatch } from 'react-redux';
import { addNewItemToListOfQueryParams } from '@shared/store/ImageryScene/thunks';

export const SamplingDataListContainer = () => {
    const dispatch = useDispatch();

    const queryParamsForSamplingPoints = useSelector(selectListOfQueryParams);

    useEffect(() => {
        // we should add a sampling point using query params from the main scene
        // when there is no sampling point. Only need to do this when the Animation Controls is mounted.
        if (queryParamsForSamplingPoints.length === 0) {
            dispatch(addNewItemToListOfQueryParams());
        }
    }, []);

    return (
        <div className="w-full h-full relative">
            <SamplingDataList
            // data={queryParamsForSamplingPoints}
            />

            <SamplingDataControls
                shouldDisableAddButton={
                    queryParamsForSamplingPoints?.length >= 10
                }
                addButtonOnClick={() => {
                    dispatch(addNewItemToListOfQueryParams());
                }}
            />

            {queryParamsForSamplingPoints &&
            queryParamsForSamplingPoints.length <= 1 ? (
                <div className="absolute w-full left-0 bottom-0">
                    <p className="text-xs opacity-50">
                        Add sampling points to this list.
                    </p>
                </div>
            ) : null}
        </div>
    );
};
