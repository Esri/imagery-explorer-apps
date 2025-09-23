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

import React, { FC, useEffect, useMemo } from 'react';

import IMapView from '@arcgis/core/views/MapView';
import { useAppSelector } from '@shared/store/configureStore';
import {
    selectActiveLandCoverType,
    selectMapMode,
    selectShouldShowSatelliteImageryLayer,
    selectYear,
} from '@shared/store/LandcoverExplorer/selectors';
import useLandCoverLayer from './useLandCoverLayer';
import { selectAnimationStatus } from '@shared/store/UI/selectors';
import { SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL } from '@shared/services/sentinel-2-10m-landcover/config';
// import { getRasterFunctionByLandCoverClassName } from '@shared/services/sentinel-2-10m-landcover/rasterAttributeTable';
import { useSentinel2LandCoverLayerRasterFunctionName } from './useSentinel2LandCoverLayerRasterFunctionName';
import { useLandcoverLayerVisibility } from './useLandcoverLayerVisibility';
import GroupLayer from '@arcgis/core/layers/GroupLayer';

type Props = {
    /**
     * The GroupLayer to which the landcover layer will be added
     * This is to ensure the landcover layer is added under the hillshade layer
     * with the blend mode applied
     */
    groupLayer?: GroupLayer;
    mapView?: IMapView;
};

const LandcoverLayer: FC<Props> = ({ groupLayer, mapView }: Props) => {
    const year = useAppSelector(selectYear);

    const visible = useLandcoverLayerVisibility();

    const rasterFunctionName = useSentinel2LandCoverLayerRasterFunctionName();

    const layer = useLandCoverLayer({
        serviceUrl: SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL,
        year,
        rasterFunctionName,
        visible,
    });

    useEffect(() => {
        if (mapView && layer) {
            groupLayer.add(layer);
        }
    }, [mapView, layer]);

    return null;
};

export default LandcoverLayer;
