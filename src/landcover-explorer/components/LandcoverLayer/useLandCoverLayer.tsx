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

import React, { useEffect, useRef, useState } from 'react';
// import {
//     // getTimeExtentByYear,
//     // TimeExtentData,
// } from '@shared/services/sentinel-2-10m-landcover/timeInfo';
import ImageryLayer from '@arcgis/core/layers/ImageryLayer';
import { useAppSelector } from '@shared/store/configureStore';
import { selectTimeExtentByYear } from '@shared/store/LandcoverExplorer/selectors';
// import { SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL } from '@shared/services/sentinel-2-10m-landcover/config';
// import {
//     getRasterFunctionByLandCoverClassName,
//     LandCoverClassification,
// } from '@shared/services/sentinel-2-10m-landcover/rasterAttributeTable';
// import { useAppSelector } from '@shared/store/configureStore';
// import { selectActiveLandCoverType } from '@shared/store/LandcoverExplorer/selectors';
// import IMapView from '@arcgis/core/views/MapView';

type UseLandCoverLayerParams = {
    /**
     * URL to the Land Cover image service
     */
    serviceUrl: string;
    /**
     * Year for which the land cover layer is requested
     */
    year: number;
    /**
     * Whether the layer should be visible
     */
    visible?: boolean;
    /**
     *
     */
    rasterFunctionName: string;
    // mapView?: IMapView;
};

export const LandCoverLayerEffect =
    'brightness(110%) drop-shadow(2px, 2px, 3px, #000)';

export const LandCoverLayerBlendMode = 'multiply';

const useLandCoverLayer = ({
    serviceUrl,
    year,
    rasterFunctionName,
    visible = true,
}: UseLandCoverLayerParams) => {
    // const activeLandCoverType = useAppSelector(selectActiveLandCoverType);

    const layerRef = useRef<ImageryLayer>(null);

    const [landCoverLayer, setLandCoverLayer] = useState<ImageryLayer>();

    const timeExtentByYear = useAppSelector(selectTimeExtentByYear);

    /**
     * get land cover layer using time extent for the input year
     */
    const getLandCoverLayer = async () => {
        try {
            const timeExtent = timeExtentByYear[year]; //await getTimeExtentByYear(year, serviceUrl);

            layerRef.current = new ImageryLayer({
                // URL to the imagery service
                url: serviceUrl,
                timeExtent,
                rasterFunction: {
                    functionName: rasterFunctionName,
                    // getRasterFunctionByLandCoverClassName(activeLandCoverType),
                },
                effect: LandCoverLayerEffect,
                // blendMode: LandCoverLayerBlendMode,
                visible,
            });

            setLandCoverLayer(layerRef.current);
        } catch (error) {
            console.error('Error creating land cover layer:', error);
        }
    };

    const updateTimeExtent = async () => {
        try {
            const timeExtent = timeExtentByYear[year]; //await getTimeExtentByYear(year, serviceUrl);
            layerRef.current.timeExtent = timeExtent as any;
        } catch (error) {
            console.error('Error updating time extent:', error);
        }
    };

    useEffect(() => {
        if (!layerRef.current) {
            getLandCoverLayer();
        } else {
            updateTimeExtent();
        }
    }, [year]);

    useEffect(() => {
        if (!layerRef.current) {
            return;
        }

        layerRef.current.rasterFunction = {
            functionName: rasterFunctionName,
            // getRasterFunctionByLandCoverClassName(activeLandCoverType),
        } as any;
    }, [rasterFunctionName]);

    useEffect(() => {
        if (!layerRef.current) {
            return;
        }

        layerRef.current.visible = visible;
    }, [visible]);

    return landCoverLayer;
};

export default useLandCoverLayer;
