import GroupLayer from '@arcgis/core/layers/GroupLayer';
import ImageryTileLayer from '@arcgis/core/layers/ImageryTileLayer';
import { mask } from '@arcgis/core/layers/support/rasterFunctionUtils';
import React, { FC, useEffect, useRef } from 'react';
import { GLOBAL_WATER_LAND_MASK_LAYER_ITEM_ID } from '../../contans';

type WaterLandMaskLayerCategory = 'land' | 'water';

type Props = {
    /**
     * the visibility of this imagery tile layer
     */
    visible: boolean;
    /**
     * the visible category
     */
    visibleCategory: WaterLandMaskLayerCategory;
    /**
     * group layer that contains this water/land mask layer
     */
    groupLayer: GroupLayer;
};

/**
 * Get the mask raster function to filter the pixel values based on the visible category.
 * @param visibleCategory - The category of pixels to make visible ('land' or 'water').
 * @returns The raster function to be applied on the imagery tile layer.
 */
const getRasterFunction = (visibleCategory: WaterLandMaskLayerCategory) => {
    return mask({
        includedRanges:
            visibleCategory === 'land'
                ? [[0, 1]] // Pixels in the range [0, 1] are included for 'land'.
                : [[2, 3]], // Pixels in the range [2, 3] are included for 'water'.
        noDataValues: [],
    });
};

/**
 * The Water and Land Mask layer component. This component is used to mask the Sentinel-1 Index Mask layer
 * when the selected index is either 'ship' or 'urban'. This masking is necessary because the 'ship' and 'urban'
 * indices are calculated using the same method. Distinguishing them requires masking pixels on 'water' versus
 * pixels on 'land'.
 * @param Props - The props for the component, including visibility, visible category, and group layer.
 * @returns A React component that manages the water/land mask layer.
 */
export const WaterLandMaskLayer: FC<Props> = ({
    visible,
    visibleCategory,
    groupLayer,
}) => {
    const layerRef = useRef<ImageryTileLayer>();

    const init = () => {
        layerRef.current = new ImageryTileLayer({
            portalItem: {
                id: GLOBAL_WATER_LAND_MASK_LAYER_ITEM_ID,
            },
            rasterFunction: getRasterFunction(visibleCategory),
            blendMode: visible ? 'destination-in' : 'normal',
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

        layerRef.current.visible = visible;
        layerRef.current.blendMode = visible ? 'destination-in' : 'normal';
    }, [visible]);

    useEffect(() => {
        if (!layerRef.current) {
            return;
        }

        layerRef.current.rasterFunction = getRasterFunction(visibleCategory);
    }, [visibleCategory]);

    return null;
};
