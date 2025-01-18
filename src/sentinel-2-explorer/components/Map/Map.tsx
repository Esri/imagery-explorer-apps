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
import { AnimationLayer } from '@shared/components/AnimationLayer';
import { GroupLayer } from '@shared/components/GroupLayer';
import { AnalysisToolQueryLocation } from '@shared/components/AnalysisToolQueryLocation';
import { Popup } from '../PopUp';
import { MapPopUpAnchorPoint } from '@shared/components/MapPopUpAnchorPoint';
import { HillshadeLayer } from '@shared/components/HillshadeLayer/HillshadeLayer';
import { MapMagnifier } from '@shared/components/MapMagnifier';
import CustomMapArrtribution from '@shared/components/CustomMapArrtribution/CustomMapArrtribution';
import { MapActionButtonGroup } from '@shared/components/MapActionButton';
import { useAppDispatch } from '@shared/store/configureStore';
import { updateQueryLocation4TrendTool } from '@shared/store/TrendTool/thunks';
import { updateQueryLocation4SpectralProfileTool } from '@shared/store/SpectralProfileTool/thunks';
import { SwipeWidget4ImageryLayers } from '@shared/components/SwipeWidget/SwipeWidget4ImageryLayers';
import { ZoomToExtent } from '@shared/components/ZoomToExtent';
import { SENTINEL_2_SERVICE_URL } from '@shared/services/sentinel-2/config';
import { Sentinel2Layer } from '../Sentinel2Layer';
import { Sentinel2MaskLayer } from '../MaskLayer';
import { Sentinel2ChangeLayer } from '../ChangeCompareLayer';

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
                <Sentinel2Layer />
                <Sentinel2MaskLayer />
                <Sentinel2ChangeLayer />
                <AnalysisToolQueryLocation />
                <MapPopUpAnchorPoint />
            </GroupLayer>
            <SwipeWidget4ImageryLayers serviceUrl={SENTINEL_2_SERVICE_URL} />
            <AnimationLayer
                imageryServiceUrl={SENTINEL_2_SERVICE_URL}
                authoringAppName="sentinel2"
            />
            <HillshadeLayer />

            <MapActionButtonGroup
                nativeScale={37795}
                serviceName={'Sentinel-2'}
                serviceUrl={SENTINEL_2_SERVICE_URL}
            />

            <Popup />
            <MapMagnifier />
            <CustomMapArrtribution atrribution="Custom Attribution for Sentinel-2 Imagery service" />
        </MapViewContainer>
    );
};

export default Map;
