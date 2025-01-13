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
import {
    getTimeExtentByYear,
    // TimeExtentData,
} from '@shared/services/sentinel-2-10m-landcover/timeInfo';
import ImageryLayer from '@arcgis/core/layers/ImageryLayer';
import { SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL } from '@shared/services/sentinel-2-10m-landcover/config';
import {
    getRasterFunctionByLandCoverClassName,
    LandCoverClassification,
} from '@shared/services/sentinel-2-10m-landcover/rasterAttributeTable';
import { useSelector } from 'react-redux';
import { selectActiveLandCoverType } from '@shared/store/LandcoverExplorer/selectors';
// import IMapView from '@arcgis/core/views/MapView';

type UseLandCoverLayerParams = {
    year: number;
    visible?: boolean;
    // mapView?: IMapView;
};

export const LandCoverLayerEffect =
    'brightness(110%) drop-shadow(2px, 2px, 3px, #000)';

export const LandCoverLayerBlendMode = 'multiply';

const useLandCoverLayer = ({
    year,
    visible = true,
}: UseLandCoverLayerParams) => {
    const activeLandCoverType = useSelector(selectActiveLandCoverType);

    const layerRef = useRef<ImageryLayer>();

    const [landCoverLayer, setLandCoverLayer] = useState<ImageryLayer>();

    /**
     * get land cover layer using time extent for the input year
     */
    const getLandCoverLayer = async () => {
        const timeExtent = await getTimeExtentByYear(year);

        layerRef.current = new ImageryLayer({
            // URL to the imagery service
            url: SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL,
            timeExtent,
            rasterFunction: {
                functionName:
                    getRasterFunctionByLandCoverClassName(activeLandCoverType),
            },
            effect: LandCoverLayerEffect,
            blendMode: LandCoverLayerBlendMode,
            visible,
        });

        setLandCoverLayer(layerRef.current);
    };

    const updateTimeExtent = async () => {
        const timeExtent = await getTimeExtentByYear(year);
        layerRef.current.timeExtent = timeExtent as any;
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
            functionName:
                getRasterFunctionByLandCoverClassName(activeLandCoverType),
        } as any;
    }, [activeLandCoverType]);

    useEffect(() => {
        if (!layerRef.current) {
            return;
        }

        layerRef.current.visible = visible;
    }, [visible]);

    return landCoverLayer;
};

export default useLandCoverLayer;
