import React from 'react';
import { CloudFilter } from '../../../shared/components/CloudFilter';
import { useSelector } from 'react-redux';
import { selectQueryParams4SceneInSelectedMode } from '../../../shared/store/Landsat/selectors';
import { useDispatch } from 'react-redux';
import { updateCloudCover } from '../../../shared/store/Landsat/thunks';
import { selectIsAnimationPlaying } from '../../../shared/store/UI/selectors';

export const CloudFilterContainer = () => {
    const dispatch = useDispatch();

    const isAnimationPlaying = useSelector(selectIsAnimationPlaying);

    const { cloudCover } =
        useSelector(selectQueryParams4SceneInSelectedMode) || {};

    return (
        <CloudFilter
            cloudCoverage={cloudCover}
            disabled={cloudCover === undefined || isAnimationPlaying}
            onChange={(newValue) => {
                // console.log(value)
                dispatch(updateCloudCover(newValue));
            }}
        />
    );
};
