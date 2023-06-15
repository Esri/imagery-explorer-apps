import React, { FC, useEffect, useRef, useState } from 'react';
import IImageryLayer from 'esri/layers/ImageryLayer';
import { loadModules } from 'esri-loader';
import IMosaicRule from 'esri/layers/support/MosaicRule';
import { LANDSAT_LEVEL_2_SERVICE_URL } from '@shared/services/landsat-2/config';
import MapView from 'esri/views/MapView';
import { getMosaicRule } from '../LandsatLayer/useLandsatLayer';
import { MaskMethod } from '@shared/store/Analysis/reducer';
import IRasterFunction from 'esri/layers/support/RasterFunction';
import PixelBlock from 'esri/layers/support/PixelBlock';
import GroupLayer from 'esri/layers/GroupLayer';

type Props = {
    mapView?: MapView;
    groupLayer?: GroupLayer;
    /**
     * name of selected mask method that will be used to create raster function render the mask layer
     */
    method: MaskMethod;
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

/**
 * Band Index by Mask Method
 *
 * - Band 1: Coastal aerosol (0.43 - 0.45 µm)
 * - Band 2: Blue (0.450 - 0.51 µm)
 * - Band 3: Green (0.53 - 0.59 µm)
 * - Band 4: Red (0.64 - 0.67 µm)
 * - Band 5: Near-Infrared (0.85 - 0.88 µm)
 * - Band 6: SWIR 1 (1.57 - 1.65 µm)
 * - Band 7: SWIR 2 (2.11 - 2.29 µm)
 * - Band 8: Panchromatic (15 meters)
 *
 * @see https://pro.arcgis.com/en/pro-app/3.0/help/analysis/raster-functions/band-arithmetic-function.htm
 */
const BandIndexesLookup: Record<MaskMethod, string> = {
    /**
     * The Normalized Difference Moisture Index (NDMI) is sensitive to the moisture levels in vegetation.
     * It is used to monitor droughts as well as monitor fuel levels in fire-prone areas.
     * It uses NIR and SWIR bands to create a ratio designed to mitigate illumination and atmospheric effects.
     *
     * NDMI = (NIR - SWIR1)/(NIR + SWIR1)
     * - NIR = pixel values from the near-infrared band
     * - SWIR1 = pixel values from the first shortwave infrared band
     */
    moisture: '(B5-B6)/(B5+B6)',
    /**
     * The Green Normalized Difference Vegetation Index (GNDVI) method is a vegetation index for estimating photo synthetic activity
     * and is a commonly used vegetation index to determine water and nitrogen uptake into the plant canopy.
     *
     * GNDVI = (NIR-Green)/(NIR+Green)
     * - NIR = pixel values from the near-infrared band
     * - Green = pixel values from the green band
     *
     * This index outputs values between -1.0 and 1.0.
     */
    vegetation: '(B5-B4)/(B5+B4)',
    /**
     * The Modified Normalized Difference Water Index (MNDWI) uses green and SWIR bands for the enhancement of open water features.
     *
     * MNDWI = (Green - SWIR) / (Green + SWIR)
     * - Green = pixel values from the green band
     * - SWIR = pixel values from the shortwave infrared band
     */
    water: '(B3-B6)/(B3+B6)',
};

export const getRasterFunctionByMaskMethod = async (
    method: MaskMethod
): Promise<IRasterFunction> => {
    if (!method) {
        return null;
    }

    type Modules = [typeof IRasterFunction];

    const [RasterFunction] = await (loadModules([
        'esri/layers/support/RasterFunction',
    ]) as Promise<Modules>);

    return new RasterFunction({
        functionName: 'BandArithmetic',
        outputPixelType: 'f32',
        functionArguments: {
            Method: 0,
            BandIndexes: BandIndexesLookup[method],
        },
    });
};

export const MaskLayer: FC<Props> = ({
    mapView,
    groupLayer,
    method,
    objectId,
    visible,
    selectedRange,
    color,
    opacity,
    shouldClip,
}) => {
    const layerRef = useRef<IImageryLayer>();

    const selectedRangeRef = useRef<number[]>();

    const colorRef = useRef<number[]>();

    /**
     * initialize landsat layer using mosaic created using the input year
     */
    const init = async () => {
        type Modules = [typeof IImageryLayer];

        const [ImageryLayer] = await (loadModules([
            'esri/layers/ImageryLayer',
        ]) as Promise<Modules>);

        const mosaicRule = objectId ? await getMosaicRule(objectId) : null;

        const renderingRule = await getRasterFunctionByMaskMethod(method);

        layerRef.current = new ImageryLayer({
            // URL to the imagery service
            url: LANDSAT_LEVEL_2_SERVICE_URL,
            mosaicRule,
            format: 'lerc',
            renderingRule,
            visible,
            pixelFilter: maskPixels,
            blendMode: shouldClip ? 'destination-atop' : null,
        });

        groupLayer.add(layerRef.current);
    };

    const maskPixels = (pixelData: PixelData) => {
        const color = colorRef.current || [255, 255, 255];

        const { pixelBlock } = pixelData || {};

        if (!pixelBlock) {
            return;
        }

        const { pixels, width, height, mask } = pixelBlock;

        if (!pixels) {
            return;
        }

        const p1 = pixels[0];

        const n = pixels[0].length;

        if (!mask) {
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
                mask[i] = 0;
                continue;
            }

            mask[i] = 1;

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

            layerRef.current.renderingRule =
                (await getRasterFunctionByMaskMethod(method)) as any;
        })();
    }, [method]);

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
