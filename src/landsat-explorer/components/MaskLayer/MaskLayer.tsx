import React, { FC, useEffect, useRef, useState } from 'react';
import ImageryLayer from '@arcgis/core/layers/ImageryLayer';
import MosaicRule from '@arcgis/core/layers/support/MosaicRule';
import { LANDSAT_LEVEL_2_SERVICE_URL } from '@shared/services/landsat-level-2/config';
import MapView from '@arcgis/core/views/MapView';
import { getMosaicRule } from '../LandsatLayer/useLandsatLayer';
import RasterFunction from '@arcgis/core/layers/support/RasterFunction';
import PixelBlock from '@arcgis/core/layers/support/PixelBlock';
import GroupLayer from '@arcgis/core/layers/GroupLayer';
import { getBandIndexesBySpectralIndex } from '@shared/services/landsat-level-2/helpers';
import { SpectralIndex } from '@typing/imagery-service';

type Props = {
    mapView?: MapView;
    groupLayer?: GroupLayer;
    /**
     * name of selected spectral index that will be used to create raster function render the mask layer
     */
    spectralIndex: SpectralIndex;
    /**
     * object id of the selected Landsat scene
     */
    objectId?: number;
    /**
     * visibility of the landsat layer
     */
    visible?: boolean;
    /**
     * user selected mask index range
     */
    selectedRange: number[];
    /**
     * color in format of [red, green, blue]
     */
    color: number[];
    /**
     * opacity of the mask layer
     */
    opacity: number;
    /**
     * if true, use the mask layer to clip the landsat scene via blend mode
     */
    shouldClip: boolean;
};

type PixelData = {
    pixelBlock: PixelBlock;
};

export const getRasterFunctionBySpectralIndex = async (
    spectralIndex: SpectralIndex
): Promise<RasterFunction> => {
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

export const MaskLayer: FC<Props> = ({
    mapView,
    groupLayer,
    spectralIndex,
    objectId,
    visible,
    selectedRange,
    color,
    opacity,
    shouldClip,
}) => {
    const layerRef = useRef<ImageryLayer>();

    const selectedRangeRef = useRef<number[]>();

    const colorRef = useRef<number[]>();

    /**
     * initialize landsat layer using mosaic created using the input year
     */
    const init = async () => {
        const mosaicRule = objectId ? await getMosaicRule(objectId) : null;

        const rasterFunction = await getRasterFunctionBySpectralIndex(
            spectralIndex
        );

        layerRef.current = new ImageryLayer({
            // URL to the imagery service
            url: LANDSAT_LEVEL_2_SERVICE_URL,
            mosaicRule,
            format: 'lerc',
            rasterFunction,
            visible,
            pixelFilter: maskPixels,
            blendMode: shouldClip ? 'destination-atop' : null,
            effect: 'drop-shadow(2px, 2px, 3px, #000)',
        });

        groupLayer.add(layerRef.current);
    };

    const maskPixels = (pixelData: PixelData) => {
        const color = colorRef.current || [255, 255, 255];

        const { pixelBlock } = pixelData || {};

        if (!pixelBlock) {
            return;
        }

        const { pixels, width, height } = pixelBlock;

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

        for (let i = 0; i < numPixels; i++) {
            if (p1[i] < min || p1[i] > max || p1[i] === 0) {
                // should exclude pixels that are outside of the user selected range and
                // pixels with value of 0 since those are pixels
                // outside of the mask layer's actual boundary
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
        (async () => {
            if (!layerRef.current) {
                return;
            }

            layerRef.current.rasterFunction =
                (await getRasterFunctionBySpectralIndex(spectralIndex)) as any;
        })();
    }, [spectralIndex]);

    useEffect(() => {
        (async () => {
            if (!layerRef.current) {
                return;
            }

            layerRef.current.mosaicRule = await getMosaicRule(objectId);
        })();
    }, [objectId]);

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
        selectedRangeRef.current = selectedRange;
        colorRef.current = color;

        if (layerRef.current) {
            layerRef.current.redraw();
        }
    }, [selectedRange, color]);

    useEffect(() => {
        if (layerRef.current) {
            layerRef.current.opacity = opacity;
        }
    }, [opacity]);

    useEffect(() => {
        if (layerRef.current) {
            // layerRef.current.blendMode = shouldClip
            //     ? 'destination-atop'
            //     : null;

            if (shouldClip) {
                layerRef.current.blendMode = 'destination-atop';
            } else {
                // in order to reset the blend mode to null,
                // we need to remove the exiting mask layer and create a new instance of the mask layer
                groupLayer.remove(layerRef.current);
                init();
            }
        }
    }, [shouldClip]);

    return null;
};
