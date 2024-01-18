import { selectMapCenter, selectMapZoom } from '@shared/store/Map/selectors';
import { nameOfSelectedInterestingPlaceChanged } from '@shared/store/UI/reducer';
import { InterestingPlaceData } from '@typing/shared';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export const useResetSelectedInterestingPlace = (
    selectedInterestingPlace: InterestingPlaceData
): void => {
    const dispatch = useDispatch();

    const mapCenter = useSelector(selectMapCenter);

    const zoom = useSelector(selectMapZoom);

    useEffect(() => {
        if (!selectedInterestingPlace) {
            return;
        }

        const { location } = selectedInterestingPlace;

        if (
            Math.abs(mapCenter[0] - location.center[0]) > 0.01 ||
            Math.abs(mapCenter[1] - location.center[1]) > 0.01 ||
            zoom !== location.zoom
        ) {
            // console.log()
            dispatch(nameOfSelectedInterestingPlaceChanged(''));
        }
    }, [mapCenter, zoom]);

    useEffect(() => {
        return () => {
            // reset selected interesting place when component is unmounted
            dispatch(nameOfSelectedInterestingPlaceChanged(''));
        };
    }, []);
};
