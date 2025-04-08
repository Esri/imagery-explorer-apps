/* Copyright 2025 Esri
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
import { MapPopUpAnchorPoint } from '@shared/components/MapPopUpAnchorPoint';
import { HillshadeLayer } from '@shared/components/HillshadeLayer/HillshadeLayer';
// import { ChangeLayer } from '../ChangeLayer';
import { MapMagnifier } from '@shared/components/MapMagnifier';
import CustomMapArrtribution from '@shared/components/CustomMapArrtribution/CustomMapArrtribution';
// import { MapActionButtonsGroup } from '@shared/components/MapActionButton';
import { Sentinel1Layer } from '../Sentinel1Layer';
import { SwipeWidget4ImageryLayers } from '@shared/components/SwipeWidget/SwipeWidget4ImageryLayers';
import { SENTINEL_1_SERVICE_URL } from '@shared/services/sentinel-1/config';
import { Popup } from '../Popup';
import { TemporalCompositeLayer } from '../TemporalCompositeLayer';
import { ChangeCompareLayer4Sentinel1 } from '../ChangeCompareLayer';
import { updateQueryLocation4TrendTool } from '@shared/store/TrendTool/thunks';
import { useAppDispatch } from '@shared/store/configureStore';
import { Sentinel1MaskLayer } from '../MaskLayer';
import { LockedRelativeOrbitFootprintLayer } from '../LockedRelativeOrbitFootprintLayer';
import { MapActionButtonGroup } from '@shared/components/MapActionButton';
import { useTranslation } from 'react-i18next';
import { APP_NAME } from '@shared/config';
import { FootPrintOfSelectedScene } from '@shared/components/FootPrintOfSelectedScene';
// import { MapNavButtonsGroup } from '@shared/components/MapActionButton/MapActionButtonsGroup';

export const Map = () => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    return (
        <MapViewContainer
            mapOnClick={(point) => {
                dispatch(updateQueryLocation4TrendTool(point));
            }}
        >
            <FootPrintOfSelectedScene serviceUrl={SENTINEL_1_SERVICE_URL} />
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
                animationMetadataSources={t('animation_metadata', {
                    ns: APP_NAME,
                })}
            />
            <HillshadeLayer />

            <MapActionButtonGroup
                nativeScale={37795}
                serviceName={'Sentinel-1'}
                serviceUrl={SENTINEL_1_SERVICE_URL}
            />

            <Popup />
            <MapMagnifier />
            <CustomMapArrtribution
                atrribution={t('senitnel1_explorer_attribution', {
                    ns: APP_NAME,
                })}
            />
        </MapViewContainer>
    );
};

export default Map;
