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

import React, { FC, useEffect, useRef, useState } from 'react';
import ImageryLayer from '@arcgis/core/layers/ImageryLayer';
import MapView from '@arcgis/core/views/MapView';
import RasterFunction from '@arcgis/core/layers/support/RasterFunction';
import GroupLayer from '@arcgis/core/layers/GroupLayer';
import { QueryParams4ImageryScene } from '@shared/store/ImageryScene/reducer';
import {
    SENTINEL_1_SERVICE_URL,
    Sentinel1FunctionName,
} from '@shared/services/sentinel-1/config';
import {
    colormap,
    compositeBand,
} from '@arcgis/core/layers/support/rasterFunctionUtils.js';
import Color from '@arcgis/core/Color';
import AlgorithmicColorRamp from '@arcgis/core/rest/support/AlgorithmicColorRamp';

export type ColorBand = 'red' | 'green' | 'blue';

type Props = {
    mapView?: MapView;
    groupLayer?: GroupLayer;
    /**
     * name of the selected raster function
     */
    rasterFunctionName: Sentinel1FunctionName;
    /**
     * object id of the imagery scene to be used as the red band
     */
    objectIdOfRedBand: number;
    /**
     * object id of the imagery scene to be used as the green band
     */
    objectIdOfGreenBand: number;
    /**
     * object id of the imagery scene to be used as the blue band
     */
    objectIdOfBlueBand: number;
    /**
     * Represents the color band selected by the user. If a color band is selected (not null),
     * this indicates that the imagery scene associated with this color band should be displayed,
     * utilizing the colormap raster function associated with this band to render the layer.
     */
    selectedColorband: ColorBand;
    /**
     * visibility of the Temporal Composite layer
     */
    visible?: boolean;
};

const getColormapRasterFunction = (
    colorBand: ColorBand,
    /**
     * object id of the imagery scene to be used as the red band
     */
    objectIdOfRedBand: number,
    /**
     * object id of the imagery scene to be used as the green band
     */
    objectIdOfGreenBand: number,
    /**
     * object id of the imagery scene to be used as the blue band
     */
    objectIdOfBlueBand: number,
    /**
     * name of the raster function to use to get the pixels before applying the colormap
     */
    functionName: Sentinel1FunctionName
): RasterFunction => {
    let objectId = null;

    if (colorBand === 'red') {
        objectId = objectIdOfRedBand;
    } else if (colorBand === 'green') {
        objectId = objectIdOfGreenBand;
    } else if (colorBand === 'blue') {
        objectId = objectIdOfBlueBand;
    }

    if (!objectId || !colorBand) {
        return null;
    }

    const inputRasterFunction = new RasterFunction({
        functionName,
        functionArguments: {
            raster: '$' + objectId,
        },
    });

    const maxRed = colorBand === 'red' ? 255 : 0;
    const maxGreen = colorBand === 'green' ? 255 : 0;
    const maxBlue = colorBand === 'blue' ? 255 : 0;

    return colormap({
        // colorRampName: "red",
        colorRamp: new AlgorithmicColorRamp({
            algorithm: 'hsv',
            fromColor: new Color([0, 0, 0]),
            toColor: new Color([maxRed, maxGreen, maxBlue]),
        }),
        raster: inputRasterFunction,
    });
};

/**
 * Create a composite bands raster function that combines three sentinel-1 scenes
 * into a single raster image.
 * @see https://developers.arcgis.com/documentation/common-data-types/raster-function-objects.htm#ESRI_SECTION1_190E1B4F19CA447B9B319BB56C193283
 * @see https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-support-rasterFunctionUtils.html#compositeBands
 */
export const getCompositeBandsRasterFunction = (
    /**
     * object id of the imagery scene to be used as the red band
     */
    objectIdOfRedBand: number,
    /**
     * object id of the imagery scene to be used as the green band
     */
    objectIdOfGreenBand: number,
    /**
     * object id of the imagery scene to be used as the blue band
     */
    objectIdOfBlueBand: number,
    /**
     * name of the raster function to use to get the pixels before composition
     */
    functionName: Sentinel1FunctionName
): RasterFunction => {
    if (!objectIdOfRedBand || !objectIdOfGreenBand || !objectIdOfBlueBand) {
        return null;
    }

    return compositeBand({
        outputPixelType: 'u8',
        rasters: [
            objectIdOfRedBand,
            objectIdOfGreenBand,
            objectIdOfBlueBand,
        ].map((oid) => {
            return new RasterFunction({
                functionName,
                functionArguments: {
                    raster: '$' + oid,
                },
            });
        }),
    });
};

export const TemporalCompositeLayer: FC<Props> = ({
    mapView,
    groupLayer,
    rasterFunctionName,
    objectIdOfRedBand,
    objectIdOfBlueBand,
    objectIdOfGreenBand,
    selectedColorband,
    visible,
}) => {
    const layerRef = useRef<ImageryLayer>(null);

    const init = () => {
        const rasterFunction = selectedColorband
            ? getColormapRasterFunction(
                  selectedColorband,
                  objectIdOfRedBand,
                  objectIdOfGreenBand,
                  objectIdOfBlueBand,
                  rasterFunctionName
              )
            : getCompositeBandsRasterFunction(
                  objectIdOfRedBand,
                  objectIdOfGreenBand,
                  objectIdOfBlueBand,
                  rasterFunctionName
              );

        layerRef.current = new ImageryLayer({
            // URL to the imagery service
            url: SENTINEL_1_SERVICE_URL,
            mosaicRule: null,
            // format: 'lerc',
            rasterFunction,
            visible,
        });

        groupLayer.add(layerRef.current);
    };

    useEffect(() => {
        if (groupLayer && !layerRef.current) {
            init();
        }
    }, [groupLayer]);

    useEffect(() => {
        if (!layerRef.current) {
            return;
        }

        layerRef.current.rasterFunction = selectedColorband
            ? getColormapRasterFunction(
                  selectedColorband,
                  objectIdOfRedBand,
                  objectIdOfGreenBand,
                  objectIdOfBlueBand,
                  rasterFunctionName
              )
            : getCompositeBandsRasterFunction(
                  objectIdOfRedBand,
                  objectIdOfGreenBand,
                  objectIdOfBlueBand,
                  rasterFunctionName
              );
    }, [
        objectIdOfRedBand,
        objectIdOfGreenBand,
        objectIdOfBlueBand,
        selectedColorband,
        rasterFunctionName,
    ]);

    useEffect(() => {
        if (!layerRef.current) {
            return;
        }

        layerRef.current.visible = visible;
    }, [visible]);

    return null;
};
