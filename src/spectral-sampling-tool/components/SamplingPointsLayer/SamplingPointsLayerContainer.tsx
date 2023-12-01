import GroupLayer from '@arcgis/core/layers/GroupLayer';
import React, { FC, useMemo } from 'react';
import { SamplingPoints } from './SamplingPointsLayer';
import MapView from '@arcgis/core/views/MapView';
import { useSelector } from 'react-redux';
import {
    selectSelectedSpectralSamplingPointData,
    selectSpectralSamplingPointsData,
} from '@shared/store/SpectralSamplingTool/selectors';
import { Point } from '@arcgis/core/geometry';

type Props = {
    mapView?: MapView;
    groupLayer?: GroupLayer;
};

export const SamplingPointsLayerContainer: FC<Props> = ({
    mapView,
    groupLayer,
}) => {
    const samplingPointsData = useSelector(selectSpectralSamplingPointsData);

    const selectedSamplingPoint = useSelector(
        selectSelectedSpectralSamplingPointData
    );

    const points: Point[] = useMemo(() => {
        if (!samplingPointsData || !samplingPointsData.length) {
            return [];
        }

        return samplingPointsData
            .filter((d) => d.location !== null)
            .map((d) => {
                const { location } = d;
                return location;
            });
    }, [samplingPointsData]);

    return (
        <SamplingPoints
            groupLayer={groupLayer}
            mapView={mapView}
            selectedPoint={selectedSamplingPoint?.location}
            points={points}
        />
    );
};
