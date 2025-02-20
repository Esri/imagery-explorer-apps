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
import { LandsatLayer } from '@landsat-explorer/components/LandsatLayer';
import { GroupLayer } from '@shared/components/GroupLayer';
import { CustomEventHandlers } from './CustomEventHandler';
import { SamplingPointsLayer } from '../SamplingPointsLayer';
import { useAppSelector } from '@shared/store/configureStore';
import { selectTargetService } from '@shared/store/SpectralSamplingTool/selectors';
import { Sentinel2Layer } from '@sentinel2-explorer/components/Sentinel2Layer';
import { MapActionButtonGroup4SpectralSamplingTool } from './MapActionButtonGroup4SpectralSamplingTool';

const Map = () => {
    const targetService = useAppSelector(selectTargetService);

    return (
        <MapViewContainer>
            <GroupLayer>
                {targetService === 'landsat' ? <LandsatLayer /> : <></>}
                {targetService === 'sentinel-2' ? <Sentinel2Layer /> : <></>}
                {/* <LandsatLayer /> */}
                <SamplingPointsLayer />
            </GroupLayer>
            <CustomEventHandlers />
            <MapActionButtonGroup4SpectralSamplingTool />
        </MapViewContainer>
    );
};

export default Map;
