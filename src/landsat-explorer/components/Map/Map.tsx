import React, { FC } from 'react';
import MapViewContainer from '@shared/components/MapView/MapViewContainer';
import { LandsatLayer } from '../LandsatLayer';
import { SwipeWidget } from '../SwipeWidget';
import { AnimationLayer } from '@shared/components/AnimationLayer';
import { MaskLayer } from '../MaskLayer';
import { GroupLayer } from '@shared/components/GroupLayer';
import { AnalysisToolQueryLocation } from '@shared/components/AnalysisToolQueryLocation';
import { Zoom2NativeScale } from '@shared/components/Zoom2NativeScale/Zoom2NativeScale';
import { Popup } from '../PopUp/PopUp';
import { MapPopUpAnchorPoint } from '@shared/components/MapPopUpAnchorPoint';
import { HillshadeLayer } from '@shared/components/HillshadeLayer/HillshadeLayer';
import { ChangeLayer } from '../ChangeLayer';

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
                <ChangeLayer />
                <AnalysisToolQueryLocation />
                <MapPopUpAnchorPoint />
            </GroupLayer>
            <SwipeWidget />
            <AnimationLayer />
            <HillshadeLayer />
            <Zoom2NativeScale tooltip={"Zoom to Landsat's native resolution"} />
            <Popup />
        </MapViewContainer>
    );
};

export default Map;
