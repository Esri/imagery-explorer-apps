import React, { FC, useEffect } from 'react';

import IMapView from '@arcgis/core/views/MapView';
import { useSelector } from 'react-redux';
import {
    selectMapMode,
    selectShouldShowSentinel2Layer,
    selectYear,
} from '@landcover-explorer/store/Map/selectors';
import useLandCoverLayer from './useLandCoverLayer';
import { selectAnimationMode } from '@landcover-explorer/store/UI/selectors';

type Props = {
    mapView?: IMapView;
};

const LandcoverLayer: FC<Props> = ({ mapView }: Props) => {
    const year = useSelector(selectYear);

    const mode = useSelector(selectMapMode);

    const animationMode = useSelector(selectAnimationMode);

    const shouldShowSentinel2Layer = useSelector(
        selectShouldShowSentinel2Layer
    );

    const getVisibility = () => {
        if (shouldShowSentinel2Layer) {
            return false;
        }

        if (animationMode && animationMode !== 'loading') {
            return false;
        }

        return mode === 'step';
    };

    const layer = useLandCoverLayer({
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

export default LandcoverLayer;
