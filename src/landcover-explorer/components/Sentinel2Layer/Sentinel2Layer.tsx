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

import React, { FC, useEffect } from 'react';

import IMapView from '@arcgis/core/views/MapView';
import useSentinel2Layer from './useSentinel2Layer';
import { useAppSelector } from '@shared/store/configureStore';
import {
    selectMapMode,
    selectShouldShowSentinel2Layer,
    selectIsSentinel2LayerOutOfVisibleRange,
    selectYear,
} from '@shared/store/LandcoverExplorer/selectors';
import { selectAnimationStatus } from '@shared/store/UI/selectors';

type Props = {
    mapView?: IMapView;
};

const Sentinel2Layer: FC<Props> = ({ mapView }: Props) => {
    const year = useAppSelector(selectYear);

    const mode = useAppSelector(selectMapMode);

    const animationMode = useAppSelector(selectAnimationStatus);

    const shouldShowSentinel2Layer = useAppSelector(
        selectShouldShowSentinel2Layer
    );

    const isSentinel2LayerOutOfVisibleRange = useAppSelector(
        selectIsSentinel2LayerOutOfVisibleRange
    );

    const getVisibility = () => {
        if (!shouldShowSentinel2Layer) {
            return false;
        }

        if (animationMode !== null) {
            return false;
        }

        return mode === 'step' || isSentinel2LayerOutOfVisibleRange;
    };

    const layer = useSentinel2Layer({
        year,
        visible: getVisibility(),
    });

    useEffect(() => {
        if (mapView && layer) {
            mapView.map.add(layer);
        }
    }, [mapView, layer]);

    return null;
};

export default Sentinel2Layer;
