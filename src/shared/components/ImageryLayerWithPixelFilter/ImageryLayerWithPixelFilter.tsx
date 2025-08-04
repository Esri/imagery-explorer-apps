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
import PixelBlock from '@arcgis/core/layers/support/PixelBlock';
import GroupLayer from '@arcgis/core/layers/GroupLayer';
import { getLockRasterMosaicRule } from '../ImageryLayer/useImageLayer';
import { BlendMode } from '@typing/argis-sdk-for-javascript';
import { max } from 'date-fns';

type Props = {
    mapView?: MapView;
    groupLayer?: GroupLayer;
    /**
     * url of the imagery service
     */
    serviceURL: string;
    /**
     * object id of selected imagery scene
     */
    objectId?: number;
    /**
     * raster function for the imagery layer
     */
    rasterFunction: RasterFunction;
    /**
     * visibility of the imagery layer
     */
    visible: boolean;
    /**
     * user selected pixel value range
     */
    selectedPixelValueRange: number[];
    /**
     * user selected pixel value range for band 2.
     */
    selectedPixelValueRange4Band2?: number[];
    /**
     * full pixel value range
     */
    fullPixelValueRange: number[];
    /**
     * blend mode to be used by this layer
     */
    blendMode?: BlendMode;
    /**
     * opacity of the layer
     */
    opacity?: number;
    /**
     * the color to render the pixels
     */
    pixelColor?: number[];
    /**
     * Get the RGB color corresponding to a given value within a predefined pixel value range
     * @param val - The pixel value
     * @param pixelValueRange - The range of pixel values
     * @returns The RGB color as an array of numbers
     */
    getPixelColor?: (val: number, pixelValueRange: number[]) => number[];
    /**
     * Emits when percent of visible pixels changes
     * @param totalPixels total number of pixels of the mask layer
     * @param visiblePixels total number of visible pixels (within the user selected pixel value range) of the mask layer
     * @returns
     */
    countOfPixelsOnChange?: (
        totalPixels: number,
        visiblePixels: number
    ) => void;
};

type PixelData = {
    pixelBlock: PixelBlock;
};

export const ImageryLayerWithPixelFilter: FC<Props> = ({
    mapView,
    groupLayer,
    serviceURL,
    objectId,
    rasterFunction,
    visible,
    selectedPixelValueRange,
    selectedPixelValueRange4Band2,
    fullPixelValueRange,
    blendMode,
    opacity,
    pixelColor,
    getPixelColor,
    countOfPixelsOnChange,
}) => {
    const layerRef = useRef<ImageryLayer>(null);

    /**
     * user selected pixel value range for band 1
     */
    const selectedRangeRef = useRef<number[]>(null);

    /**
     * user selected pixel value range for band 2
     */
    const selectedRange4Band2Ref = useRef<number[]>(null);

    /**
     * full pixel value range
     */
    const fullPixelValueRangeRef = useRef<number[]>(null);

    const pixelColorRef = useRef<number[]>(null);

    /**
     * initialize landsat layer using mosaic created using the input year
     */
    const init = () => {
        layerRef.current = new ImageryLayer({
            // URL to the imagery service
            url: serviceURL,
            mosaicRule: objectId ? getLockRasterMosaicRule(objectId) : null,
            format: 'lerc',
            rasterFunction,
            visible,
            pixelFilter: pixelFilterFunction,
            blendMode: blendMode || null,
            opacity: opacity || 1,
            effect: 'drop-shadow(2px, 2px, 3px, #000)',
            interpolation: 'nearest',
        });

        groupLayer.add(layerRef.current);
    };

    /**
     * Pixel filter function to process and filter pixel data based on the provided ranges and colors
     * @param pixelData - The pixel data to filter
     */
    const pixelFilterFunction = (pixelData: PixelData) => {
        // const color = colorRef.current || [255, 255, 255];

        const { pixelBlock } = pixelData || {};

        if (!pixelBlock) {
            return;
        }

        const { pixels, width, height } = pixelBlock;
        // console.log(pixelBlock)

        if (!pixels) {
            return;
        }

        const band1 = pixels[0];
        const band2 = pixels[1];
        // console.log(band2)

        const n = pixels[0].length;

        // total number of pixels with in the selected scenes
        let totalPixels = n;
        // total number of visible pixels that with in the selected pixel range
        let visiblePixels = n;

        let containsPixelsOutsideOfSelectedScene = true;

        // Initialize the mask if it doesn't exist, indicating all pixels are within the selected scene.
        if (!pixelBlock.mask) {
            pixelBlock.mask = new Uint8Array(n);
            containsPixelsOutsideOfSelectedScene = false;
        }

        const pr = new Uint8Array(n);
        const pg = new Uint8Array(n);
        const pb = new Uint8Array(n);

        const numPixels = width * height;

        const [minValSelectedPixelRange4Band1, maxValSelectedPixelRange4Band1] =
            selectedRangeRef.current || [0, 0];
        // console.log(min, max)

        const [minValSelectedPixelRange4Band2, maxValSelectedPixelRange4Band2] =
            selectedRange4Band2Ref.current || [undefined, undefined];

        const [minValOfFullRange, maxValOfFulRange] =
            fullPixelValueRangeRef.current || [0, 0];

        for (let i = 0; i < numPixels; i++) {
            // Adjust the pixel value to ensure it fits within the full pixel value range.
            // If the pixel value is less than the minimum value of the full range, set it to the minimum value.
            // If the pixel value is greater than the maximum value of the full range, set it to the maximum value.
            let adjustedPixelValueFromBand1 = band1[i];
            adjustedPixelValueFromBand1 = Math.max(
                adjustedPixelValueFromBand1,
                minValOfFullRange
            );
            adjustedPixelValueFromBand1 = Math.min(
                adjustedPixelValueFromBand1,
                maxValOfFulRange
            );

            // Decrease the total pixel count if the pixel is outside the selected scene.
            if (
                containsPixelsOutsideOfSelectedScene &&
                pixelBlock.mask[i] === 0
            ) {
                totalPixels--;
            }

            // If the adjusted pixel value is outside the selected range, or if the original pixel value is 0, hide this pixel.
            // A pixel value of 0 typically indicates it is outside the extent of the selected imagery scene.
            if (
                adjustedPixelValueFromBand1 < minValSelectedPixelRange4Band1 ||
                adjustedPixelValueFromBand1 > maxValSelectedPixelRange4Band1 ||
                band1[i] === 0
            ) {
                pixelBlock.mask[i] = 0;
                visiblePixels--;
                continue;
            }

            // If band 2 exists, adjust its pixel value to ensure it fits within the full pixel value range.
            let adjustedPixelValueFromBand2 = band2 ? band2[i] : undefined;

            if (adjustedPixelValueFromBand2 !== undefined) {
                adjustedPixelValueFromBand2 = Math.max(
                    adjustedPixelValueFromBand2,
                    minValOfFullRange
                );
                adjustedPixelValueFromBand2 = Math.min(
                    adjustedPixelValueFromBand2,
                    maxValOfFulRange
                );
            }

            // If band 2 exists and a pixel range for band 2 is provided,
            // filter the pixels to retain only those within the selected range for band 2.
            if (
                adjustedPixelValueFromBand2 !== undefined &&
                minValSelectedPixelRange4Band2 !== undefined &&
                maxValSelectedPixelRange4Band2 !== undefined &&
                (adjustedPixelValueFromBand2 < minValSelectedPixelRange4Band2 ||
                    adjustedPixelValueFromBand2 >
                        maxValSelectedPixelRange4Band2)
            ) {
                pixelBlock.mask[i] = 0;
                visiblePixels--;
                continue;
            }

            // use the color provided by the user,
            // or call the getPixelColor function to determine the color that will be used to render this pixel
            const color =
                pixelColorRef.current ||
                getPixelColor(band1[i], fullPixelValueRangeRef.current);

            // should not render this pixel if the color is undefined.
            if (!color) {
                pixelBlock.mask[i] = 0;
                continue;
            }

            pixelBlock.mask[i] = 1;

            pr[i] = color[0];
            pg[i] = color[1];
            pb[i] = color[2];
        }

        pixelBlock.pixels = [pr, pg, pb];

        pixelBlock.pixelType = 'u8';

        if (countOfPixelsOnChange) {
            // const pctOfVisiblePixels = visiblePixels / totalPixels;
            // console.log(pctVisiblePixels)
            countOfPixelsOnChange(totalPixels, visiblePixels);
        }
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

        layerRef.current.rasterFunction = rasterFunction;
    }, [rasterFunction]);

    useEffect(() => {
        if (!layerRef.current) {
            return;
        }

        layerRef.current.mosaicRule = objectId
            ? getLockRasterMosaicRule(objectId)
            : null;
    }, [objectId]);

    useEffect(() => {
        if (!layerRef.current) {
            return;
        }

        layerRef.current.opacity = opacity;
    }, [opacity]);

    // useEffect(() => {
    //     if (!layerRef.current) {
    //         return;
    //     }

    //     layerRef.current.visible = visible;

    //     // if (visible) {
    //     //     // reorder it to make sure it is the top most layer on the map
    //     //     groupLayer.reorder(layerRef.current, mapView.map.layers.length - 1);
    //     // }
    // }, [visible]);

    useEffect(() => {
        selectedRangeRef.current = selectedPixelValueRange;
        selectedRange4Band2Ref.current = selectedPixelValueRange4Band2;
        fullPixelValueRangeRef.current = fullPixelValueRange;
        pixelColorRef.current = pixelColor;

        if (!layerRef.current) {
            return;
        }

        layerRef.current.visible = visible;

        if (visible) {
            layerRef.current.redraw();
        }
    }, [
        selectedPixelValueRange,
        selectedPixelValueRange4Band2,
        fullPixelValueRange,
        pixelColor,
        visible,
    ]);

    useEffect(() => {
        if (!layerRef.current) {
            return;
        }

        layerRef.current.blendMode = blendMode || 'normal';
    }, [blendMode]);

    return null;
};
