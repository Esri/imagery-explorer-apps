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
import ImageryLayer from '@arcgis/core/layers/ImageryLayer';
// import IMapView from '@arcgis/core/views/MapView';
// import {
//     // SENTINEL_2_IMAGE_SERVICE_FIELD_NAMES,
//     // SENTINEL_2_IMAGE_SERVICE_URL,
// } from './config';
import { useAppSelector } from '@shared/store/configureStore';
import {
    selectSatelliteImageryLayerAquisitionMonth,
    selectSatelliteImageryLayerRasterFunction,
} from '@shared/store/LandcoverExplorer/selectors';
import { getMosaicRuleByAcquisitionDate } from '../SatelliteImageryLayer/exportSatelliteImage';
import { SENTINEL_2_SERVICE_URL } from '@shared/services/sentinel-2/config';

type UseLandCoverLayerParams = {
    year: number;
    visible?: boolean;
    // mapView?: IMapView;
};

// const { AcquisitionDate, CloudCover } = SENTINEL_2_IMAGE_SERVICE_FIELD_NAMES;

const createMosaicRuleByYear = (year: number, month: number) => {
    // const monthStr = month < 10 ? '0' + month : month.toString();

    const { where, sortField, sortValue, ascending } =
        getMosaicRuleByAcquisitionDate(year, month);

    return {
        method: `attribute`,
        where,
        sortField,
        sortValue,
        ascending,
    };
};

const useSentinel2Layer = ({
    year,
    visible = true,
}: UseLandCoverLayerParams) => {
    const layerRef = useRef<ImageryLayer>();

    const [sentinel2Layer, setSentinel2Layer] = useState<ImageryLayer>();

    const selectedRasterFunction = useAppSelector(
        selectSatelliteImageryLayerRasterFunction
    );

    const aquisitionMonth = useAppSelector(
        selectSatelliteImageryLayerAquisitionMonth
    );

    /**
     * get sentinel 2 layer using mosaic created using the input year
     */
    const getSentinel2Layer = async () => {
        layerRef.current = new ImageryLayer({
            // URL to the imagery service
            url: SENTINEL_2_SERVICE_URL,
            mosaicRule: createMosaicRuleByYear(year, aquisitionMonth) as any,
            rasterFunction: {
                functionName: selectedRasterFunction,
            },
            visible,
            // blendMode: 'multiply'
        });

        setSentinel2Layer(layerRef.current);
    };

    useEffect(() => {
        if (!layerRef.current) {
            getSentinel2Layer();
        } else {
            layerRef.current.mosaicRule = createMosaicRuleByYear(
                year,
                aquisitionMonth
            ) as any;
        }
    }, [year, aquisitionMonth]);

    useEffect(() => {
        // console.log(selectedRasterFunction);

        if (layerRef.current) {
            layerRef.current.rasterFunction = {
                functionName: selectedRasterFunction || '',
            } as any;
        }
    }, [selectedRasterFunction]);

    useEffect(() => {
        if (!layerRef.current) {
            return;
        }

        layerRef.current.visible = visible;
    }, [visible]);

    return sentinel2Layer;
};

export default useSentinel2Layer;
