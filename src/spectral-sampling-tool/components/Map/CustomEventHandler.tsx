import { watch } from '@arcgis/core/core/reactiveUtils';
import { Extent, Point } from '@arcgis/core/geometry';
import MapView from '@arcgis/core/views/MapView';
import { updateLocationOfSpectralSamplingPoint } from '@shared/store/SpectralSamplingTool/thunks';
import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';

type Props = {
    mapView?: MapView;
};

export const CustomEventHandlers: FC<Props> = ({ mapView }) => {
    const dispatch = useDispatch();

    const initEventHandlers = async () => {
        mapView.on('click', (evt) => {
            dispatch(updateLocationOfSpectralSamplingPoint(evt.mapPoint));
            console.log(evt.mapPoint);
            // onClickHandler(evt.mapPoint);
        });
    };

    useEffect(() => {
        if (!mapView) {
            return;
        }

        initEventHandlers();
    }, [mapView]);

    return null;
};
