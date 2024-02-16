import React, { FC, useEffect } from 'react';

import IMapView from '@arcgis/core/views/MapView';
import useSentinel2Layer from './useSentinel2Layer';
import { useSelector } from 'react-redux';
import {
    selectMapMode,
    selectShouldShowSentinel2Layer,
    selectIsSentinel2LayerOutOfVisibleRange,
    selectYear,
} from '@landcover-explorer/store/Map/selectors';
import { selectAnimationMode } from '@landcover-explorer/store/UI/selectors';

type Props = {
    mapView?: IMapView;
};

const Sentinel2Layer: FC<Props> = ({ mapView }: Props) => {
    const year = useSelector(selectYear);

    const mode = useSelector(selectMapMode);

    const animationMode = useSelector(selectAnimationMode);

    const shouldShowSentinel2Layer = useSelector(
        selectShouldShowSentinel2Layer
    );

    const isSentinel2LayerOutOfVisibleRange = useSelector(
        selectIsSentinel2LayerOutOfVisibleRange
    );

    const getVisibility = () => {
        if (!shouldShowSentinel2Layer) {
            return false;
        }

        if (animationMode && animationMode !== 'loading') {
            return false;
        }

        return mode === 'step' || isSentinel2LayerOutOfVisibleRange;
    };

    const layer = useSentinel2Layer({
        year,
        visible: getVisibility(),
    });

    useEffect(() => {
        if (mapView && layer) {
            mapView.map.add(layer);
        }
    }, [mapView, layer]);

    return null;
};

export default Sentinel2Layer;
