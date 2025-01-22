import MapView from '@arcgis/core/views/MapView';
import { MapActionButtonGroup } from '@shared/components/MapActionButton/MapActionButtonGroup';
import { Zoom2NativeScale } from '@shared/components/Zoom2NativeScale/Zoom2NativeScale';
import { ScreenshotWidget } from '@shared/components/ScreenshotWidget/ScreenshotWidget';
import { CopyLinkWidget } from '@shared/components/CopyLinkWidget';
import { ZoomWidget } from '@shared/components/MapView/ZoomWidget';
import { SearchWidget } from '@shared/components/SearchWidget';
import React, { FC } from 'react';

type Props = {
    mapView?: MapView;
};

export const MapActionButtonGroup4LandcoverExplorer: FC<Props> = ({
    mapView,
}) => {
    if (!mapView) return null;

    return (
        <MapActionButtonGroup>
            <SearchWidget mapView={mapView} />
            <ZoomWidget mapView={mapView} />
            <Zoom2NativeScale
                mapView={mapView}
                nativeScale={37795}
                tooltip={"Zoom to Land cover layer's native resolution"}
            />
            <ScreenshotWidget mapView={mapView} />
            <CopyLinkWidget />
        </MapActionButtonGroup>
    );
};
