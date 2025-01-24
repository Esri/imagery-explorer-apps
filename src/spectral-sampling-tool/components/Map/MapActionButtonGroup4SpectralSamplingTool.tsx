import MapView from '@arcgis/core/views/MapView';
import { MapActionButtonGroup } from '@shared/components/MapActionButton/MapActionButtonGroup';
import { Zoom2NativeScale } from '@shared/components/Zoom2NativeScale/Zoom2NativeScale';
import { ScreenshotWidget } from '@shared/components/ScreenshotWidget/ScreenshotWidget';
import { CopyLinkWidget } from '@shared/components/CopyLinkWidget';
import { ZoomWidget } from '@shared/components/MapView/ZoomWidget';
import { SearchWidget } from '@shared/components/SearchWidget';
import React, { FC } from 'react';
import { useAppSelector } from '@shared/store/configureStore';
import { selectTargetService } from '@shared/store/SpectralSamplingTool/selectors';

type Props = {
    mapView?: MapView;
};

export const MapActionButtonGroup4SpectralSamplingTool: FC<Props> = ({
    mapView,
}) => {
    const targetService = useAppSelector(selectTargetService);

    if (!mapView) return null;

    return (
        <MapActionButtonGroup>
            <SearchWidget mapView={mapView} />
            <ZoomWidget mapView={mapView} />
            <Zoom2NativeScale
                mapView={mapView}
                nativeScale={targetService === 'sentinel-2' ? 37795 : 113386}
                tooltip={"Zoom to layer's native resolution"}
            />
        </MapActionButtonGroup>
    );
};
