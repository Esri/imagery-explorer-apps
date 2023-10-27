import { selectAnimationStatus } from '@shared/store/UI/selectors';
import classNames from 'classnames';
import { map } from 'd3';
import MapView from '@arcgis/core/views/MapView';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { MapActionButton } from '../MapActionButton/MapActionButton';

type Props = {
    /**
     * native scale of the imagery service
     */
    nativeScale: number;
    tooltip: string;
    mapView?: MapView;
};

export const Zoom2NativeScale: FC<Props> = ({
    mapView,
    tooltip,
    nativeScale,
}) => {
    const onClickHandler = () => {
        // mapView.scale = 113386;

        mapView.goTo({
            scale: nativeScale,
        });
    };

    return (
        <MapActionButton
            topPosition={130}
            onClickHandler={onClickHandler}
            tooltip={tooltip}
        >
            <span className="text-sm italic">1:1</span>
        </MapActionButton>
    );
};
