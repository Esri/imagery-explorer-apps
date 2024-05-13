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

import React, { FC, useEffect, useRef, useState } from 'react';
import ImageryLayer from '@arcgis/core/layers/ImageryLayer';
import MapView from '@arcgis/core/views/MapView';
import RasterFunction from '@arcgis/core/layers/support/RasterFunction';
import PixelBlock from '@arcgis/core/layers/support/PixelBlock';
import GroupLayer from '@arcgis/core/layers/GroupLayer';

type Props = {
    mapView?: MapView;
    groupLayer?: GroupLayer;
    /**
     * url of the imagery service
     */
    serviceURL: string;
    /**
     * raster function for the change compare layer
     */
    rasterFunction: RasterFunction;
    /**
     * visibility of the imagery layer
     */
    visible: boolean;
    /**
     * user selected pixel value range
     */
    pixelValueRange: number[];
    /**
     * full pixel value range
     */
    fullPixelValueRange: number[];
    /**
     * Get the RGB color corresponding to a given value within a predefined pixel value range
     * @param val
     * @returns
     */
    getPixelColor: (val: number, pixelValueRange: number[]) => number[];
};

type PixelData = {
    pixelBlock: PixelBlock;
};

export const ImageryLayerWithPixelFilter: FC<Props> = ({
    mapView,
    groupLayer,
    serviceURL,
    rasterFunction,
    visible,
    pixelValueRange,
    fullPixelValueRange,
    getPixelColor,
}) => {
    const layerRef = useRef<ImageryLayer>();

    /**
     * user selected pixel value range
     */
    const selectedRangeRef = useRef<number[]>();

    /**
     * full pixel value range
     */
    const fullPixelValueRangeRef = useRef<number[]>();

    /**
     * initialize landsat layer using mosaic created using the input year
     */
    const init = async () => {
        layerRef.current = new ImageryLayer({
            // URL to the imagery service
            url: serviceURL,
            mosaicRule: null,
            format: 'lerc',
            rasterFunction,
            visible,
            pixelFilter: pixelFilterFunction,
            effect: 'drop-shadow(2px, 2px, 3px, #000)',
        });

        groupLayer.add(layerRef.current);
    };

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

        const p1 = pixels[0];

        const n = pixels[0].length;

        if (!pixelBlock.mask) {
            pixelBlock.mask = new Uint8Array(n);
        }

        const pr = new Uint8Array(n);
        const pg = new Uint8Array(n);
        const pb = new Uint8Array(n);

        const numPixels = width * height;

        const [min, max] = selectedRangeRef.current || [0, 0];
        // console.log(min, max)

        for (let i = 0; i < numPixels; i++) {
            if (p1[i] < min || p1[i] > max || p1[i] === 0) {
                pixelBlock.mask[i] = 0;
                continue;
            }

            const color = getPixelColor(p1[i], fullPixelValueRangeRef.current);

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

        layerRef.current.visible = visible;

        if (visible) {
            // reorder it to make sure it is the top most layer on the map
            groupLayer.reorder(layerRef.current, mapView.map.layers.length - 1);
        }
    }, [visible]);

    useEffect(() => {
        selectedRangeRef.current = pixelValueRange;
        fullPixelValueRangeRef.current = fullPixelValueRange;

        if (layerRef.current) {
            layerRef.current.redraw();
        }
    }, [pixelValueRange, fullPixelValueRange]);

    return null;
};
