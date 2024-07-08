import {
    selectPolarizationFilter,
    selectSentinel1OrbitDirection,
    selectSentinel1State,
} from '@shared/store/Sentinel1/selectors';
import { saveSentinel1StateToHashParams } from '@shared/utils/url-hash-params/sentinel1';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const useSaveSentinel1State2HashParams = () => {
    const orbitDirection = useSelector(selectSentinel1OrbitDirection);

    const polarizationFilter = useSelector(selectPolarizationFilter);

    const sentinel1State = useSelector(selectSentinel1State);

    useEffect(() => {
        saveSentinel1StateToHashParams(sentinel1State);
    }, [orbitDirection, polarizationFilter]);
};
