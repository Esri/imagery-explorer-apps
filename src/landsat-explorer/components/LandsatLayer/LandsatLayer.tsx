import MapView from 'esri/views/MapView';
import React, { FC, useEffect } from 'react';
import useLandsatLayer from './useLandsatLayer';
import { useSelector } from 'react-redux';
import { selectLandsatRasterFunction } from '../../../shared/store/Landsat/selectors';

type Props = {
    mapView?: MapView;
};

const LandsatLayer: FC<Props> = ({ mapView }: Props) => {
    const rasterFunction = useSelector(selectLandsatRasterFunction);

    const getVisibility = () => {
        return true;
    };

    const layer = useLandsatLayer({
        visible: getVisibility(),
        rasterFunction,
    });

    useEffect(() => {
        if (mapView && layer) {
            mapView.map.add(layer);
        }
    }, [mapView, layer]);

    return null;
};

export default LandsatLayer;
