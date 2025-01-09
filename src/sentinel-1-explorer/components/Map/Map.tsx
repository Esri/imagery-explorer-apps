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
import { ScreenshotWidget } from '@shared/components/ScreenshotWidget/ScreenshotWidget';
import { MapMagnifier } from '@shared/components/MapMagnifier';
import CustomMapArrtribution from '@shared/components/CustomMapArrtribution/CustomMapArrtribution';
import { MapActionButtonsGroup } from '@shared/components/MapActionButton';
import { CopyLinkWidget } from '@shared/components/CopyLinkWidget';
import { Sentinel1Layer } from '../Sentinel1Layer';
import { SwipeWidget4ImageryLayers } from '@shared/components/SwipeWidget/SwipeWidget4ImageryLayers';
import { SENTINEL_1_SERVICE_URL } from '@shared/services/sentinel-1/config';
import { Popup } from '../Popup';
import { TemporalCompositeLayer } from '../TemporalCompositeLayer';
import { ChangeCompareLayer4Sentinel1 } from '../ChangeCompareLayer';
import { updateQueryLocation4TrendTool } from '@shared/store/TrendTool/thunks';
import { useDispatch } from 'react-redux';
import { Sentinel1MaskLayer } from '../MaskLayer';
import { LockedRelativeOrbitFootprintLayer } from '../LockedRelativeOrbitFootprintLayer';
import { ZoomToExtent } from '@shared/components/ZoomToExtent';
import { OpenSavePanelButton } from '@shared/components/OpenSavePanelButton';
import { MapNavButtonsGroup } from '@shared/components/MapActionButton/MapActionButtonsGroup';

export const Map = () => {
    const dispatch = useDispatch();

    return (
        <MapViewContainer
            mapOnClick={(point) => {
                dispatch(updateQueryLocation4TrendTool(point));
            }}
        >
            <GroupLayer
                // this group layer should be added at index of one so that the
                // hillsahde/terrain layer can be added on top of it with blend mode applied
                index={1}
            >
                <LockedRelativeOrbitFootprintLayer />
                <Sentinel1Layer />
                <Sentinel1MaskLayer />
                <ChangeCompareLayer4Sentinel1 />
                <TemporalCompositeLayer />
                <AnalysisToolQueryLocation />
                <MapPopUpAnchorPoint />
            </GroupLayer>
            <SwipeWidget4ImageryLayers serviceUrl={SENTINEL_1_SERVICE_URL} />
            <AnimationLayer
                imageryServiceUrl={SENTINEL_1_SERVICE_URL}
                authoringAppName="sentinel1"
            />
            <HillshadeLayer />

            <MapActionButtonsGroup>
                <ScreenshotWidget />
                <CopyLinkWidget />
                <OpenSavePanelButton />
            </MapActionButtonsGroup>

            <MapNavButtonsGroup>
                <Zoom2NativeScale
                    nativeScale={37795}
                    tooltip={"Zoom to Sentinel-1's native resolution"}
                />
                <ZoomToExtent serviceUrl={SENTINEL_1_SERVICE_URL} />
            </MapNavButtonsGroup>

            <Popup />
            <MapMagnifier />
            <CustomMapArrtribution atrribution="Sentinel-1 imagery courtesy of European Space Agency, European Commission, and Microsoft" />
        </MapViewContainer>
    );
};

export default Map;
