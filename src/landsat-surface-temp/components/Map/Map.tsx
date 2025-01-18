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
import { GroupLayer } from '@shared/components/GroupLayer';
import { AnalysisToolQueryLocation } from '@shared/components/AnalysisToolQueryLocation';
import { Zoom2NativeScale } from '@shared/components/Zoom2NativeScale/Zoom2NativeScale';
import { MapPopUpAnchorPoint } from '@shared/components/MapPopUpAnchorPoint';
import { HillshadeLayer } from '@shared/components/HillshadeLayer/HillshadeLayer';

import { ScreenshotWidget } from '@shared/components/ScreenshotWidget/ScreenshotWidget';
// import { ZoomToExtent } from '@landsat-explorer/components/ZoomToExtent';
import { Popup } from '@landsat-explorer/components/PopUp/';
import { MaskLayer } from '@landsat-explorer/components/MaskLayer';
import { LandsatLayer } from '../LandsatLayer';
import { SwipeWidget } from '../SwipeWidget';
import { CrosshairCursor } from './CrosshairCursor';
import { updateQueryLocation4TrendTool } from '@shared/store/TrendTool/thunks';
import { updateQueryLocation4SpectralProfileTool } from '@shared/store/SpectralProfileTool/thunks';
import { useAppDispatch } from '@shared/store/configureStore';

const Map = () => {
    const dispatch = useAppDispatch();

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
                <AnalysisToolQueryLocation />
                <MapPopUpAnchorPoint />
            </GroupLayer>
            <SwipeWidget />
            <HillshadeLayer />
            {/* <Zoom2NativeScale
                nativeScale={113386}
                tooltip={"Zoom to Landsat's native resolution"}
            />
            <ZoomToExtent />
            <ScreenshotWidget /> */}
            <Popup />
            {/* use crosshair cursor for the map component all the time */}
            <CrosshairCursor />
        </MapViewContainer>
    );
};

export default Map;
