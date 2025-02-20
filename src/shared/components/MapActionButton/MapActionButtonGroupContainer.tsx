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
import React, { FC } from 'react';
import { MapActionButtonGroup } from './MapActionButtonGroup';
import { OpenSavePanelButton } from '../OpenSavePanelButton';
import { CopyLinkWidget } from '../CopyLinkWidget';
import { ScreenshotWidget } from '../ScreenshotWidget/ScreenshotWidget';
import { ZoomToExtent } from '../ZoomToExtent';
import { ZoomWidget } from '../MapView/ZoomWidget';
import { Zoom2NativeScale } from '../Zoom2NativeScale/Zoom2NativeScale';
import { SearchWidget } from '../SearchWidget';

type Props = {
    mapView?: MapView;
    /**
     * The URL of image service that will be used to zoom to its extent
     */
    serviceUrl: string;
    /**
     * The native scale of the image service
     */
    nativeScale: number;
    /**
     * The name of the image service
     */
    serviceName: string;
};

export const MapActionButtonGroupContainer: FC<Props> = ({
    mapView,
    serviceUrl,
    serviceName,
    nativeScale,
}) => {
    if (!mapView) return null;

    return (
        <MapActionButtonGroup>
            <SearchWidget mapView={mapView} />
            <ZoomWidget mapView={mapView} />
            <Zoom2NativeScale
                mapView={mapView}
                nativeScale={nativeScale}
                tooltip={`Zoom to ${serviceName}'s native resolution`}
            />
            <ZoomToExtent mapView={mapView} serviceUrl={serviceUrl} />

            <div className="h-[1px] my-[5px] w-map-action-button-size bg-custom-background"></div>

            <ScreenshotWidget mapView={mapView} />
            <CopyLinkWidget />
            <OpenSavePanelButton />
        </MapActionButtonGroup>
    );
};
