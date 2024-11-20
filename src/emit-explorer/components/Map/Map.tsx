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
import { EmitLayer } from '../EmitLayer';
// import { SwipeWidget } from '../SwipeWidget';
import { AnimationLayer } from '@shared/components/AnimationLayer';
import { MaskLayer } from '../MaskLayer';
import { GroupLayer } from '@shared/components/GroupLayer';
import { AnalysisToolQueryLocation } from '@shared/components/AnalysisToolQueryLocation';
import { Zoom2NativeScale } from '@shared/components/Zoom2NativeScale/Zoom2NativeScale';
import { Popup } from '../PopUp';
import { MapPopUpAnchorPoint } from '@shared/components/MapPopUpAnchorPoint';
import { HillshadeLayer } from '@shared/components/HillshadeLayer/HillshadeLayer';
import { ChangeLayer } from '../ChangeLayer';
import { ScreenshotWidget } from '@shared/components/ScreenshotWidget/ScreenshotWidget';
import { MapMagnifier } from '@shared/components/MapMagnifier';
import CustomMapArrtribution from '@shared/components/CustomMapArrtribution/CustomMapArrtribution';
import { MapActionButtonsGroup } from '@shared/components/MapActionButton';
import { CopyLinkWidget } from '@shared/components/CopyLinkWidget';
import { EMIT_LEVEL_2a_SERVICE_URL } from '@shared/services/emit-level-2a/config';
import { useDispatch } from 'react-redux';
import { updateQueryLocation4TrendTool } from '@shared/store/TrendTool/thunks';
import { updateQueryLocation4SpectralProfileTool } from '@shared/store/SpectralProfileTool/thunks';
import { SwipeWidget4ImageryLayers } from '@shared/components/SwipeWidget/SwipeWidget4ImageryLayers';
import { ZoomToExtent } from '@shared/components/ZoomToExtent';

const Map = () => {
    const dispatch = useDispatch();

    return (
        <MapViewContainer
            mapOnClick={(point) => {
                dispatch(updateQueryLocation4TrendTool(point));

                dispatch(updateQueryLocation4SpectralProfileTool(point));
            }}
        >
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
            {/* <SwipeWidget /> */}
            <SwipeWidget4ImageryLayers
                serviceUrl={EMIT_LEVEL_2a_SERVICE_URL}
            />
            <AnimationLayer
                imageryServiceUrl={EMIT_LEVEL_2a_SERVICE_URL}
                authoringAppName="landsat"
            />
            <HillshadeLayer />

            <MapActionButtonsGroup>
                <Zoom2NativeScale
                    nativeScale={113386}
                    tooltip={"Zoom to Landsat's native resolution"}
                />
                <ZoomToExtent serviceUrl={EMIT_LEVEL_2a_SERVICE_URL} />
                <ScreenshotWidget />
                <CopyLinkWidget />
            </MapActionButtonsGroup>

            <Popup />
            <MapMagnifier />
            <CustomMapArrtribution atrribution="EMIT imagery courtesy of USGS, NASA, and Microsoft" />
        </MapViewContainer>
    );
};

export default Map;
