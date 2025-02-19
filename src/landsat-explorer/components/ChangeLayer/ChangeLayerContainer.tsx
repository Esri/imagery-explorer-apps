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
    selectChangeCompareLayerIsOn,
    selectFullPixelValuesRangeInChangeCompareTool,
    selectSelectedOption4ChangeCompareTool,
    selectUserSelectedRangeInChangeCompareTool,
} from '@shared/store/ChangeCompareTool/selectors';
import { getBandIndexesBySpectralIndex } from '@shared/services/landsat-level-2/helpers';
import { SpectralIndex } from '@typing/imagery-service';
import { QueryParams4ImageryScene } from '@shared/store/ImageryScene/reducer';
import { getLandsatFeatureByObjectId } from '@shared/services/landsat-level-2/getLandsatScenes';
import { formattedDateString2Unixtimestamp } from '@shared/utils/date-time/formatDateString';
import RasterFunction from '@arcgis/core/layers/support/RasterFunction';
import { LANDSAT_LEVEL_2_SERVICE_URL } from '@shared/services/landsat-level-2/config';
import { getPixelColor4ChangeCompareLayer } from '@shared/components/ChangeCompareTool/helpers';
import { ImageryLayerWithPixelFilter } from '@shared/components/ImageryLayerWithPixelFilter';
import { useCalculateTotalAreaByPixelsCount } from '@shared/hooks/useCalculateTotalAreaByPixelsCount';
import { useAppDispatch } from '@shared/store/configureStore';
import { countOfVisiblePixelsChanged } from '@shared/store/Map/reducer';
import { getChangeCompareLayerRasterFunction } from '@shared/components/ChangeCompareLayer/helpers';
import { Polygon } from '@arcgis/core/geometry';
import { useChangeCompareLayerVisibility } from '@shared/components/ChangeCompareLayer';

type Props = {
    mapView?: MapView;
    groupLayer?: GroupLayer;
};

export const ChangeLayerContainer: FC<Props> = ({ mapView, groupLayer }) => {
    const dispatch = useAppDispatch();

    const mode = useAppSelector(selectAppMode);

    const spectralIndex = useAppSelector(
        selectSelectedOption4ChangeCompareTool
    ) as SpectralIndex;

    const changeCompareLayerIsOn = useAppSelector(selectChangeCompareLayerIsOn);

    const queryParams4SceneA = useAppSelector(selectQueryParams4MainScene);

    const queryParams4SceneB = useAppSelector(selectQueryParams4SecondaryScene);

    const anailysisTool = useAppSelector(selectActiveAnalysisTool);

    const selectedRange = useAppSelector(
        selectUserSelectedRangeInChangeCompareTool
    );

    const fullPixelValueRange = useAppSelector(
        selectFullPixelValuesRangeInChangeCompareTool
    );

    const [rasterFunction, setRasterFunction] = useState<RasterFunction>();

    const isVisible = useChangeCompareLayerVisibility();

    useEffect(() => {
        (async () => {
            try {
                const bandIndex = getBandIndexesBySpectralIndex(spectralIndex);

                const feature = await getLandsatFeatureByObjectId(
                    queryParams4SceneA?.objectIdOfSelectedScene
                );

                const rasterFunction =
                    await getChangeCompareLayerRasterFunction({
                        bandIndex,
                        clippingGeometry: feature.geometry as any,
                        queryParams4SceneA,
                        queryParams4SceneB,
                    });

                setRasterFunction(rasterFunction);
            } catch (err) {
                setRasterFunction(null);
            }
        })();
    }, [spectralIndex, queryParams4SceneA, queryParams4SceneB]);

    useCalculateTotalAreaByPixelsCount({
        objectId:
            queryParams4SceneA?.objectIdOfSelectedScene ||
            queryParams4SceneB?.objectIdOfSelectedScene,
        serviceURL: LANDSAT_LEVEL_2_SERVICE_URL,
        pixelSize: mapView.resolution,
    });

    return (
        <ImageryLayerWithPixelFilter
            mapView={mapView}
            groupLayer={groupLayer}
            serviceURL={LANDSAT_LEVEL_2_SERVICE_URL}
            rasterFunction={rasterFunction}
            visible={isVisible}
            selectedPixelValueRange={selectedRange}
            fullPixelValueRange={fullPixelValueRange}
            getPixelColor={getPixelColor4ChangeCompareLayer}
            countOfPixelsOnChange={(totalPixels, visiblePixels) => {
                dispatch(countOfVisiblePixelsChanged(visiblePixels));
            }}
        />
    );
};
