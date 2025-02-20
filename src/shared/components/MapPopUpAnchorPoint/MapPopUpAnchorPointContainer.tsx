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
import GroupLayer from '@arcgis/core/layers/GroupLayer';
import { MapPopUpAnchorPoint } from './MapPopUpAnchorPoint';
import { useAppSelector } from '@shared/store/configureStore';
import { selectMapPopupAnchorLocation } from '@shared/store/Map/selectors';

type Props = {
    mapView?: MapView;
    groupLayer?: GroupLayer;
};

export const MapPopUpAnchorPointContainer: FC<Props> = ({
    mapView,
    groupLayer,
}) => {
    const anchorLocation = useAppSelector(selectMapPopupAnchorLocation);

    return (
        <MapPopUpAnchorPoint
            anchorLocation={anchorLocation}
            mapView={mapView}
            groupLayer={groupLayer}
        />
    );
};
