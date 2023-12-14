import React, { FC } from 'react';
import MapViewContainer from '@shared/components/MapView/MapViewContainer';
import { GroupLayer } from '@shared/components/GroupLayer';
import { AnalysisToolQueryLocation } from '@shared/components/AnalysisToolQueryLocation';
import { Zoom2NativeScale } from '@shared/components/Zoom2NativeScale/Zoom2NativeScale';
import { MapPopUpAnchorPoint } from '@shared/components/MapPopUpAnchorPoint';
import { HillshadeLayer } from '@shared/components/HillshadeLayer/HillshadeLayer';

import { ScreenshotWidget } from '@shared/components/ScreenshotWidget/ScreenshotWidget';
import { ZoomToExtent } from '@landsat-explorer/components/ZoomToExtent';
import { Popup } from '@landsat-explorer/components/PopUp/PopUp';
import { MaskLayer } from '@landsat-explorer/components/MaskLayer';
import { LandsatLayer } from '../LandsatLayer';
import { SwipeWidget } from '../SwipeWidget';

const Map = () => {
    return (
        <MapViewContainer>
            <GroupLayer
                // this group layer should be added at index of one so that the
                // hillsahde/terrain layer can be added on top of it with blend mode applied
                index={1}
            >
                <LandsatLayer />
                <MaskLayer />
                <AnalysisToolQueryLocation />
                <MapPopUpAnchorPoint />
            </GroupLayer>
            <SwipeWidget />
            <HillshadeLayer />
            <Zoom2NativeScale
                nativeScale={113386}
                tooltip={"Zoom to Landsat's native resolution"}
            />
            <ZoomToExtent />
            <ScreenshotWidget />
            <Popup />
        </MapViewContainer>
    );
};

export default Map;
