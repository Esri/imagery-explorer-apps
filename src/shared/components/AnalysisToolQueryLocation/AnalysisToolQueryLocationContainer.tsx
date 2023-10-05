import { selectQueryLocation4ProfileTool } from '@shared/store/TrendTool/selectors';
import MapView from 'esri/views/MapView';
import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { AnalysisToolQueryLocation } from './AnalysisToolQueryLocation';
import {
    selectActiveAnalysisTool,
    selectAppMode,
} from '@shared/store/Landsat/selectors';
import GroupLayer from 'esri/layers/GroupLayer';
import { selectQueryLocation4SpectralProfileTool } from '@shared/store/SpectralProfileTool/selectors';

type Props = {
    mapView?: MapView;
    groupLayer?: GroupLayer;
};

export const AnalysisToolQueryLocationContainer: FC<Props> = ({
    mapView,
    groupLayer,
}) => {
    const queryLocation4TrendTool = useSelector(
        selectQueryLocation4ProfileTool
    );

    const queryLocation4SpectralProfileTool = useSelector(
        selectQueryLocation4SpectralProfileTool
    );

    const mode = useSelector(selectAppMode);

    const analysisTool = useSelector(selectActiveAnalysisTool);

    const visible = useMemo(() => {
        if (mode !== 'analysis') {
            return false;
        }

        return analysisTool === 'trend' || analysisTool === 'spectral';
    }, [mode, analysisTool]);

    return (
        <AnalysisToolQueryLocation
            queryLocation={
                analysisTool === 'trend'
                    ? queryLocation4TrendTool
                    : queryLocation4SpectralProfileTool
            }
            visible={visible}
            mapView={mapView}
            groupLayer={groupLayer}
        />
    );
};
