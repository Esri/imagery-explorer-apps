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
import { selectAnimationStatus } from '@shared/store/UI/selectors';
import useLandCoverLayer from '@landcover-explorer/components/LandcoverLayer/useLandCoverLayer';
import { NLCD_LANDCOVER_IMAGE_SERVICE_URL } from '@shared/services/nlcd-landcover/config';
import { useLandcoverLayerVisibility } from '@landcover-explorer/components/LandcoverLayer/useLandcoverLayerVisibility';
import { useNLCDLandCoverLayerRasterFunctionName } from './useNLCDLandCoverLayerRasterFunctionName';
import GroupLayer from '@arcgis/core/layers/GroupLayer';

type Props = {
    /**
     * The GroupLayer to which the NLCD-Land cover layer will be added
     * This is to ensure the NLCD-Land cover layer is added under the hillshade layer
     * with the blend mode applied
     */
    groupLayer?: GroupLayer;
    mapView?: IMapView;
};

export const NLCDLandcoverLayer: FC<Props> = ({
    mapView,
    groupLayer,
}: Props) => {
    const year = useAppSelector(selectYear);

    const visible = useLandcoverLayerVisibility();

    const rasterFunctionName = useNLCDLandCoverLayerRasterFunctionName();

    const layer = useLandCoverLayer({
        serviceUrl: NLCD_LANDCOVER_IMAGE_SERVICE_URL,
        year,
        rasterFunctionName,
        visible,
    });

    useEffect(() => {
        if (groupLayer && layer) {
            groupLayer.add(layer);
        }
    }, [groupLayer, layer]);

    return null;
};
