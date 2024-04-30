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

import React, { useEffect, useRef, useState } from 'react';
import ImageryLayer from '@arcgis/core/layers/ImageryLayer';
import MosaicRule from '@arcgis/core/layers/support/MosaicRule';

type Props = {
    /**
     * service url
     */
    url: string;
    /**
     * name of selected raster function that will be used to render the imagery layer
     */
    rasterFunction: string;
    /**
     * object id of the selected scene
     */
    objectId?: number;
    /**
     * visibility of the imagery layer
     */
    visible?: boolean;
};

/**
 * Get the mosaic rule that will be used to define how the Imagery images should be mosaicked.
 * @param objectId - object id of the selected Imagery scene
 * @returns A Promise that resolves to an IMosaicRule object representing the mosaic rule.
 *
 * @see https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-support-MosaicRule.html
 */
export const getMosaicRule = (objectId: number): MosaicRule => {
    if (!objectId) {
        return null;
    }

    // {"mosaicMethod":"esriMosaicLockRaster","where":"objectid in (2969545)","ascending":false,"lockRasterIds":[2969545]}
    return new MosaicRule({
        method: 'lock-raster',
        ascending: false,
        where: `objectid in (${objectId})`,
        lockRasterIds: [objectId],
    });
};

/**
 * A custom React hook that returns an Imagery Layer instance .
 * The hook also updates the Imagery Layer when the input parameters are changed.
 *
 * @returns {IImageryLayer} - The Imagery Layer.
 */
export const useImageryLayerByObjectId = ({
    url,
    visible,
    rasterFunction,
    objectId,
}: Props) => {
    const layerRef = useRef<ImageryLayer>();

    const [layer, setLayer] = useState<ImageryLayer>();

    /**
     * initialize imagery layer using mosaic created using the input year
     */
    const init = async () => {
        const mosaicRule = objectId ? getMosaicRule(objectId) : null;

        layerRef.current = new ImageryLayer({
            // URL to the imagery service
            url,
            mosaicRule,
            rasterFunction: {
                functionName: rasterFunction,
            },
            visible,
            // blendMode: 'multiply'
        });

        setLayer(layerRef.current);
    };

    useEffect(() => {
        if (!layerRef.current) {
            init();
        } else {
            // layerRef.current.mosaicRule = createMosaicRuleByYear(
            //     year,
            //     aquisitionMonth
            // ) as any;
        }
    }, []);

    useEffect(() => {
        if (!layerRef.current) {
            return;
        }

        layerRef.current.rasterFunction = {
            functionName: rasterFunction,
        } as any;
    }, [rasterFunction]);

    useEffect(() => {
        (async () => {
            if (!layerRef.current) {
                return;
            }

            layerRef.current.mosaicRule = getMosaicRule(objectId);
        })();
    }, [objectId]);

    useEffect(() => {
        if (!layerRef.current) {
            return;
        }

        layerRef.current.visible = visible;
    }, [visible]);

    return layer;
};
