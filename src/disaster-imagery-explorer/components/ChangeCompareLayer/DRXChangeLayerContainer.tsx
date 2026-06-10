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

import MapView from '@arcgis/core/views/MapView';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '@shared/store/configureStore';
import {
    selectActiveAnalysisTool,
    selectAppMode,
    selectQueryParams4MainScene,
    selectQueryParams4SecondaryScene,
} from '@shared/store/ImageryScene/selectors';
import GroupLayer from '@arcgis/core/layers/GroupLayer';
// import { ChangeLayer } from './ChangeLayer';
import {
    selectFullPixelValuesRangeInChangeCompareTool,
    selectSelectedOption4ChangeCompareTool,
    selectSelectedRange2InChangeCompareTool,
    selectUserSelectedRangeInChangeCompareTool,
} from '@shared/store/ChangeCompareTool/selectors';
import RasterFunction from '@arcgis/core/layers/support/RasterFunction';
import { getPixelColor4ChangeCompareLayer } from '@shared/components/ChangeCompareTool/helpers';
import { ImageryLayerWithPixelFilter } from '@shared/components/ImageryLayerWithPixelFilter';
import { useCalculateTotalAreaByPixelsCount } from '@shared/hooks/useCalculateTotalAreaByPixelsCount';
import { useAppDispatch } from '@shared/store/configureStore';
import { countOfVisiblePixelsChanged } from '@shared/store/Map/reducer';
import { getChangeCompareLayerRasterFunction } from '@shared/components/ChangeCompareLayer/helpers';
import { useChangeCompareLayerVisibility } from '@shared/components/ChangeCompareLayer';
import { getBandIndexesBySpectralIndex } from '@shared/services/sentinel-2/helpers';
import { getSentinel2FeatureByObjectId } from '@shared/services/sentinel-2/getSentinel2Scenes';
import { SENTINEL_2_SERVICE_URL } from '@shared/services/sentinel-2/config';
import { DISASTER_RESPONSE_IMAGERY_SERVICE_URL } from '@shared/services/disaster-response/config';
import { getGrayscaleRasterFunction } from '../../utils/getGrayscaleRasterFunction';
import { minus } from '@arcgis/core/layers/support/rasterFunctionUtils';

type Props = {
    mapView?: MapView;
    groupLayer?: GroupLayer;
};

export const DRXChangeCompareLayerContainer: FC<Props> = ({
    mapView,
    groupLayer,
}) => {
    const dispatch = useAppDispatch();

    const queryParams4SceneA = useAppSelector(selectQueryParams4MainScene);

    const queryParams4SceneB = useAppSelector(selectQueryParams4SecondaryScene);

    const selectedRange = useAppSelector(
        selectUserSelectedRangeInChangeCompareTool
    );

    const selectedRange2 = useAppSelector(
        selectSelectedRange2InChangeCompareTool
    );

    const fullPixelValueRange = useAppSelector(
        selectFullPixelValuesRangeInChangeCompareTool
    );

    const isVisible = useChangeCompareLayerVisibility();

    const rasterFunction = useMemo(() => {
        if (!queryParams4SceneA || !queryParams4SceneB || !isVisible) {
            return null;
        }

        const sortedScenes = [queryParams4SceneA, queryParams4SceneB].sort(
            (a, b) =>
                a.acquisitionTimestampOfSelectedScene -
                b.acquisitionTimestampOfSelectedScene
        );

        const greyscaleRasterFunction4EarlierScene = getGrayscaleRasterFunction(
            sortedScenes[0].objectIdOfSelectedScene
        );

        const greyscaleRasterFunction4LaterScene = getGrayscaleRasterFunction(
            sortedScenes[1].objectIdOfSelectedScene
        );

        return minus({
            raster: greyscaleRasterFunction4EarlierScene,
            raster2: greyscaleRasterFunction4LaterScene,
        });
    }, [queryParams4SceneA, queryParams4SceneB, isVisible]);

    useCalculateTotalAreaByPixelsCount({
        objectId:
            queryParams4SceneA?.objectIdOfSelectedScene ||
            queryParams4SceneB?.objectIdOfSelectedScene,
        serviceURL: DISASTER_RESPONSE_IMAGERY_SERVICE_URL,
        pixelSize: mapView.resolution,
    });

    return (
        <ImageryLayerWithPixelFilter
            mapView={mapView}
            groupLayer={groupLayer}
            serviceURL={DISASTER_RESPONSE_IMAGERY_SERVICE_URL}
            rasterFunction={rasterFunction}
            visible={isVisible}
            selectedPixelValueRange={selectedRange}
            selectedPixelValueRange2={selectedRange2}
            fullPixelValueRange={fullPixelValueRange}
            getPixelColor={getPixelColor4ChangeCompareLayer}
            countOfPixelsOnChange={(totalPixels, visiblePixels) => {
                dispatch(countOfVisiblePixelsChanged(visiblePixels));
            }}
        />
    );
};
