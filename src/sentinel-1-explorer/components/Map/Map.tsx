/* Copyright 2024 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { FC } from 'react';
import MapViewContainer from '@shared/components/MapView/MapViewContainer';
// import { LandsatLayer } from '../LandsatLayer';
// import { SwipeWidget } from '../SwipeWidget';
import { AnimationLayer } from '@shared/components/AnimationLayer';
import { GroupLayer } from '@shared/components/GroupLayer';
import { AnalysisToolQueryLocation } from '@shared/components/AnalysisToolQueryLocation';
import { Zoom2NativeScale } from '@shared/components/Zoom2NativeScale/Zoom2NativeScale';
import { MapPopUpAnchorPoint } from '@shared/components/MapPopUpAnchorPoint';
import { HillshadeLayer } from '@shared/components/HillshadeLayer/HillshadeLayer';
// import { ChangeLayer } from '../ChangeLayer';
// import { ZoomToExtent } from '../ZoomToExtent';
import { ScreenshotWidget } from '@shared/components/ScreenshotWidget/ScreenshotWidget';
import { MapMagnifier } from '@shared/components/MapMagnifier';
import CustomMapArrtribution from '@shared/components/CustomMapArrtribution/CustomMapArrtribution';
import { MapActionButtonsGroup } from '@shared/components/MapActionButton';
import { CopyLinkWidget } from '@shared/components/CopyLinkWidget';

export const Map = () => {
    return (
        <MapViewContainer>
            <GroupLayer
                // this group layer should be added at index of one so that the
                // hillsahde/terrain layer can be added on top of it with blend mode applied
                index={1}
            >
                {/* <LandsatLayer />
                <MaskLayer /> */}
                {/* <ChangeLayer /> */}
                <AnalysisToolQueryLocation />
                <MapPopUpAnchorPoint />
            </GroupLayer>
            {/* <SwipeWidget /> */}
            <AnimationLayer />
            <HillshadeLayer />

            <MapActionButtonsGroup>
                <Zoom2NativeScale
                    nativeScale={1000000}
                    tooltip={"Zoom to Sentinel-1's native resolution"}
                />
                {/* <ZoomToExtent /> */}
                <ScreenshotWidget />
                <CopyLinkWidget />
            </MapActionButtonsGroup>

            {/* <Popup /> */}
            <MapMagnifier />
            <CustomMapArrtribution atrribution="THIS IS A PLACEHOLDER TEXT FOR SENTINEL-1 IMAGERY SERVICE" />
        </MapViewContainer>
    );
};

export default Map;
