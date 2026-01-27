import MapView from '@arcgis/core/views/MapView';
import React, { FC } from 'react';
import { UrbanAreaLayer } from './UrbanAreaLayer';
import { useAppSelector } from '@shared/store/configureStore';
import {
    selectActiveAnalysisTool,
    selectAppMode,
} from '@shared/store/ImageryScene/selectors';
type Props = {
    mapView?: MapView;
};
export const UrbanAreaLayerContainer: FC<Props> = ({ mapView }) => {
    const mode = useAppSelector(selectAppMode);

    const activeTool = useAppSelector(selectActiveAnalysisTool);
    const visible = activeTool === 'urban heat island' && mode === 'analysis';
    return <UrbanAreaLayer mapView={mapView} visible={visible} />;
};
