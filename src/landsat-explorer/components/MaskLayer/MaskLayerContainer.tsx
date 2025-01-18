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
    selectMaskLayerPixelValueRange,
    selectShouldClipMaskLayer,
    selectMaskLayerOpcity,
    selectSelectedIndex4MaskTool,
    selectMaskLayerPixelColor,
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
import {
    LANDSAT_LEVEL_2_SERVICE_URL,
    // LANDSAT_SURFACE_TEMPERATURE_MAX_CELSIUS,
    // LANDSAT_SURFACE_TEMPERATURE_MAX_FAHRENHEIT,
    // LANDSAT_SURFACE_TEMPERATURE_MIN_CELSIUS,
    // LANDSAT_SURFACE_TEMPERATURE_MIN_FAHRENHEIT,
} from '@shared/services/landsat-level-2/config';
import { useCalculateTotalAreaByPixelsCount } from '@shared/hooks/useCalculateTotalAreaByPixelsCount';
import { useAppDispatch } from '@shared/store/configureStore';
import { countOfVisiblePixelsChanged } from '@shared/store/Map/reducer';
import { useMaskLayerVisibility } from '@shared/components/MaskLayer/useMaskLayerVisibility';
import { useLandsatMaskToolFullPixelValueRange } from '../MaskTool/useLandsatMaskToolFullPixelValueRange';

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
    const dispatch = useAppDispatch();

    const spectralIndex = useSelector(
        selectSelectedIndex4MaskTool
    ) as SpectralIndex;

    const { selectedRange } = useSelector(selectMaskLayerPixelValueRange);

    const pixelColor = useSelector(selectMaskLayerPixelColor);

    const opacity = useSelector(selectMaskLayerOpcity);

    const shouldClip = useSelector(selectShouldClipMaskLayer);

    const { objectIdOfSelectedScene } =
        useSelector(selectQueryParams4SceneInSelectedMode) || {};

    const isVisible = useMaskLayerVisibility();

    const rasterFunction = useMemo(() => {
        return getRasterFunctionBySpectralIndex(spectralIndex);
    }, [spectralIndex]);

    // const fullPixelValueRange = useMemo(() => {
    //     if (spectralIndex === 'temperature celcius') {
    //         return [
    //             LANDSAT_SURFACE_TEMPERATURE_MIN_CELSIUS,
    //             LANDSAT_SURFACE_TEMPERATURE_MAX_CELSIUS,
    //         ];
    //     }

    //     if (spectralIndex === 'temperature farhenheit') {
    //         return [
    //             LANDSAT_SURFACE_TEMPERATURE_MIN_FAHRENHEIT,
    //             LANDSAT_SURFACE_TEMPERATURE_MAX_FAHRENHEIT,
    //         ];
    //     }

    //     return [-1, 1];
    // }, [spectralIndex]);

    const fullPixelValueRange = useLandsatMaskToolFullPixelValueRange();

    useCalculateTotalAreaByPixelsCount({
        objectId: objectIdOfSelectedScene,
        serviceURL: LANDSAT_LEVEL_2_SERVICE_URL,
        pixelSize: mapView.resolution,
    });

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
            pixelColor={pixelColor}
            opacity={opacity}
            blendMode={shouldClip ? 'destination-atop' : 'normal'}
            countOfPixelsOnChange={(totalPixels, visiblePixels) => {
                dispatch(countOfVisiblePixelsChanged(visiblePixels));
            }}
        />
    );
};
