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
import { DisasterResponseLayer } from '../DisasterResponseLayer/DisasterResponseLayer';
import { AnimationLayer } from '@shared/components/AnimationLayer';
import { GroupLayer } from '@shared/components/GroupLayer';
// import { Popup } from '../PopUp';
import { MapPopUpAnchorPoint } from '@shared/components/MapPopUpAnchorPoint';
import { HillshadeLayer } from '@shared/components/HillshadeLayer/HillshadeLayer';
import CustomMapArrtribution from '@shared/components/CustomMapArrtribution/CustomMapArrtribution';
import { useAppDispatch } from '@shared/store/configureStore';
import { useTranslation } from 'react-i18next';
import { APP_NAME } from '@shared/config';
import { SwipeComponent4ImageryLayers } from '@shared/components/SwipeWidget/SwipeComponent4ImageryLayers';
import { DISASTER_RESPONSE_IMAGERY_SERVICE_URL } from '@shared/services/disaster-response/config';
import { ZoomToExtentOfSelectedSceneAndEvent } from './ZoomToExtentOfSelectedSceneAndEvent';
import { DisasterResponseFootprintsLayer } from '../DisasterResponseFootprintsLayer/DisasterResponseFootprintsLayer';
import { MapActionButtonGroup } from '@shared/components/MapActionButton/';
import { DRXTemporalCompositeLayer } from '../TemporalCompositeLayer';
import { DRXChangeCompareLayer } from '../ChangeCompareLayer';
import { SwipeComponent4ImageryAndBasemapLayers } from '@shared/components/SwipeWidget/SwipeComponent4ImageryAndBasemapLayers';
import { DIExPopup } from '../Popup';

export const Map = () => {
    const dispatch = useAppDispatch();

    const { t } = useTranslation();

    return (
        <MapViewContainer
            hideMapCenterIndicator={true}
            mapOnClick={(point) => {
                console.log('map clicked at: ', point);
            }}
        >
            <GroupLayer
                // this group layer should be added at index of one so that the
                // hillsahde/terrain layer can be added on top of it with blend mode applied
                index={1}
            >
                <DisasterResponseFootprintsLayer />

                <DisasterResponseLayer />

                <MapPopUpAnchorPoint />

                <DRXTemporalCompositeLayer />

                <DRXChangeCompareLayer />
            </GroupLayer>

            <SwipeComponent4ImageryLayers
                serviceUrl={DISASTER_RESPONSE_IMAGERY_SERVICE_URL}
            />

            <SwipeComponent4ImageryAndBasemapLayers
                serviceUrl={DISASTER_RESPONSE_IMAGERY_SERVICE_URL}
            />

            <HillshadeLayer />

            <MapActionButtonGroup
                nativeScale={1937}
                serviceName={'Disaster Response Imagery Service'}
                serviceUrl={DISASTER_RESPONSE_IMAGERY_SERVICE_URL}
            />

            {/* <Popup />
            <MapMagnifier /> */}
            <CustomMapArrtribution
                atrribution={t('drx_attribution', {
                    ns: APP_NAME,
                })}
            />

            <ZoomToExtentOfSelectedSceneAndEvent />

            <DIExPopup />
        </MapViewContainer>
    );
};
