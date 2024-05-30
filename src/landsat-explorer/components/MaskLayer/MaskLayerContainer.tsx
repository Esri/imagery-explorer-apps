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

import MapView from '@arcgis/core/views/MapView';
import React, { FC, useEffect, useMemo } from 'react';
// import { MaskLayer } from './MaskLayer';
import { useSelector } from 'react-redux';
import {
    selectMaskOptions,
    selectShouldClipMaskLayer,
    selectMaskLayerOpcity,
    selectSelectedIndex4MaskTool,
} from '@shared/store/MaskTool/selectors';
import {
    selectActiveAnalysisTool,
    selectAppMode,
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/ImageryScene/selectors';
import GroupLayer from '@arcgis/core/layers/GroupLayer';
import { SpectralIndex } from '@typing/imagery-service';
import { ImageryLayerWithPixelFilter } from '@shared/components/ImageryLayerWithPixelFilter';
import RasterFunction from '@arcgis/core/layers/support/RasterFunction';
import { getBandIndexesBySpectralIndex } from '@shared/services/landsat-level-2/helpers';
import { LANDSAT_LEVEL_2_SERVICE_URL } from '@shared/services/landsat-level-2/config';

type Props = {
    mapView?: MapView;
    groupLayer?: GroupLayer;
};

export const getRasterFunctionBySpectralIndex = (
    spectralIndex: SpectralIndex
): RasterFunction => {
    if (!spectralIndex) {
        return null;
    }

    return new RasterFunction({
        functionName: 'BandArithmetic',
        outputPixelType: 'f32',
        functionArguments: {
            Method: 0,
            BandIndexes: getBandIndexesBySpectralIndex(spectralIndex),
        },
    });
};

export const MaskLayerContainer: FC<Props> = ({ mapView, groupLayer }) => {
    const mode = useSelector(selectAppMode);

    const spectralIndex = useSelector(
        selectSelectedIndex4MaskTool
    ) as SpectralIndex;

    const { selectedRange, color } = useSelector(selectMaskOptions);

    const opacity = useSelector(selectMaskLayerOpcity);

    const shouldClip = useSelector(selectShouldClipMaskLayer);

    const { objectIdOfSelectedScene } =
        useSelector(selectQueryParams4SceneInSelectedMode) || {};

    const anailysisTool = useSelector(selectActiveAnalysisTool);

    const isVisible = useMemo(() => {
        if (mode !== 'analysis' || anailysisTool !== 'mask') {
            return false;
        }

        if (!objectIdOfSelectedScene) {
            return false;
        }

        return true;
    }, [mode, anailysisTool, objectIdOfSelectedScene]);

    const rasterFunction = useMemo(() => {
        return getRasterFunctionBySpectralIndex(spectralIndex);
    }, [spectralIndex]);

    const fullPixelValueRange = useMemo(() => {
        return [-1, 1];
    }, []);

    // return (
    //     <MaskLayer
    //         mapView={mapView}
    //         groupLayer={groupLayer}
    //         spectralIndex={spectralIndex}
    //         objectId={objectIdOfSelectedScene}
    //         visible={isVisible}
    //         selectedRange={selectedRange}
    //         color={color}
    //         opacity={opacity}
    //         shouldClip={shouldClip}
    //     />
    // );

    return (
        <ImageryLayerWithPixelFilter
            serviceURL={LANDSAT_LEVEL_2_SERVICE_URL}
            // mapView={mapView}
            groupLayer={groupLayer}
            objectId={objectIdOfSelectedScene}
            rasterFunction={rasterFunction}
            visible={isVisible}
            selectedPixelValueRange={selectedRange}
            fullPixelValueRange={fullPixelValueRange}
            pixelColor={color}
            opacity={opacity}
            blendMode={shouldClip ? 'destination-atop' : 'normal'}
        />
    );
};
