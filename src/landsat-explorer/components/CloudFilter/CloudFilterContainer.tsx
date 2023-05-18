import React from 'react';
import { CloudFilter } from '../../../shared/components/CloudFilter';
import { useSelector } from 'react-redux';
import { selectQueryParams4SceneInSelectedMode } from '../../../shared/store/Landsat/selectors';
import { useDispatch } from 'react-redux';
import { updateCloudCover } from '../../../shared/store/Landsat/thunks';

export const CloudFilterContainer = () => {
    const dispatch = useDispatch();

    const { cloudCover } = useSelector(selectQueryParams4SceneInSelectedMode);

    return (
        <CloudFilter
            cloudCoverage={cloudCover}
            onChange={(newValue) => {
                // console.log(value)
                dispatch(updateCloudCover(newValue));
            }}
        />
    );
};
