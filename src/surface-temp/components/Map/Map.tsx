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
import { GroupLayer } from '@shared/components/GroupLayer';
import { AnalysisToolQueryLocation } from '@shared/components/AnalysisToolQueryLocation';
// import { Zoom2NativeScale } from '@shared/components/Zoom2NativeScale/Zoom2NativeScale';
import { MapPopUpAnchorPoint } from '@shared/components/MapPopUpAnchorPoint';
import { HillshadeLayer } from '@shared/components/HillshadeLayer/HillshadeLayer';

// import { ScreenshotWidget } from '@shared/components/ScreenshotWidget/ScreenshotWidget';
// import { ZoomToExtent } from '@landsat-explorer/components/ZoomToExtent';
import { Popup } from '@landsat-explorer/components/PopUp/';
import { MaskLayer } from '@landsat-explorer/components/MaskLayer';
import { LandsatLayer } from '../LandsatLayer';
// import { SwipeWidget } from '../SwipeWidget';
// import { CrosshairCursor } from './CrosshairCursor';
import { updateQueryLocation4TrendTool } from '@shared/store/TrendTool/thunks';
// import { updateQueryLocation4SpectralProfileTool } from '@shared/store/SpectralProfileTool/thunks';
import { useAppDispatch } from '@shared/store/configureStore';
import { SwipeWidget4ImageryLayers } from '@shared/components/SwipeWidget/SwipeWidget4ImageryLayers';
import { LANDSAT_LEVEL_2_SERVICE_URL } from '@shared/services/landsat-level-2/config';
import { AnimationLayer } from '@shared/components/AnimationLayer';
import { useTranslation } from 'react-i18next';
import { APP_NAME } from '@shared/config';
import { UrbanAreaLayer } from '../UrbanAreaLayer';
import { updateQueryLocation4UrbanHeatIslandTool } from '@shared/store/UrbanHeatIslandTool/thunks';

const Map = () => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    return (
        <MapViewContainer
            mapOnClick={(point) => {
                dispatch(updateQueryLocation4TrendTool(point));

                dispatch(updateQueryLocation4UrbanHeatIslandTool(point));
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
                <AnimationLayer
                    imageryServiceUrl={LANDSAT_LEVEL_2_SERVICE_URL}
                    authoringAppName="landsat-surface-temperature"
                    animationMetadataSources={t('animation_metadata', {
                        ns: APP_NAME,
                    })}
                />
                <UrbanAreaLayer />
            </GroupLayer>
            {/* <SwipeWidget /> */}

            <SwipeWidget4ImageryLayers
                serviceUrl={LANDSAT_LEVEL_2_SERVICE_URL}
            />
            <HillshadeLayer />
            <Popup />
            {/* use crosshair cursor for the map component all the time */}
            {/* <CrosshairCursor /> */}
        </MapViewContainer>
    );
};

export default Map;
