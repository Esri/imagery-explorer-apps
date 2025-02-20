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

import MapView from '@arcgis/core/views/MapView';
import { MapActionButtonGroup } from '@shared/components/MapActionButton/MapActionButtonGroup';
import { Zoom2NativeScale } from '@shared/components/Zoom2NativeScale/Zoom2NativeScale';
import { ScreenshotWidget } from '@shared/components/ScreenshotWidget/ScreenshotWidget';
import { CopyLinkWidget } from '@shared/components/CopyLinkWidget';
import { ZoomWidget } from '@shared/components/MapView/ZoomWidget';
import { SearchWidget } from '@shared/components/SearchWidget';
import React, { FC } from 'react';
import { useAppSelector } from '@shared/store/configureStore';
import { selectTargetService } from '@shared/store/SpectralSamplingTool/selectors';

type Props = {
    mapView?: MapView;
};

export const MapActionButtonGroup4SpectralSamplingTool: FC<Props> = ({
    mapView,
}) => {
    const targetService = useAppSelector(selectTargetService);

    if (!mapView) return null;

    return (
        <MapActionButtonGroup>
            <SearchWidget mapView={mapView} />
            <ZoomWidget mapView={mapView} />
            <Zoom2NativeScale
                mapView={mapView}
                nativeScale={targetService === 'sentinel-2' ? 37795 : 113386}
                tooltip={"Zoom to layer's native resolution"}
            />
        </MapActionButtonGroup>
    );
};
