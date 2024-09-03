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

import MapView from '@arcgis/core/views/MapView';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
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
import { SpectralIndex } from '@typing/imagery-service';
import RasterFunction from '@arcgis/core/layers/support/RasterFunction';
import { getPixelColor4ChangeCompareLayer } from '@shared/components/ChangeCompareTool/helpers';
import { ImageryLayerWithPixelFilter } from '@shared/components/ImageryLayerWithPixelFilter';
import { useCalculateTotalAreaByPixelsCount } from '@shared/hooks/useCalculateTotalAreaByPixelsCount';
import { useDispatch } from 'react-redux';
import { countOfVisiblePixelsChanged } from '@shared/store/Map/reducer';
import { getChangeCompareLayerRasterFunction } from '@shared/components/ChangeCompareLayer/helpers';
import { useChangeCompareLayerVisibility } from '@shared/components/ChangeCompareLayer';
import { getBandIndexesBySpectralIndex } from '@shared/services/sentinel-2/helpers';
import { getSentinel2FeatureByObjectId } from '@shared/services/sentinel-2/getSentinel2Scenes';
import { SENTINEL_2_SERVICE_URL } from '@shared/services/sentinel-2/config';

type Props = {
    mapView?: MapView;
    groupLayer?: GroupLayer;
};

export const ChangeLayerContainer: FC<Props> = ({ mapView, groupLayer }) => {
    const dispatach = useDispatch();

    const spectralIndex = useSelector(
        selectSelectedOption4ChangeCompareTool
    ) as SpectralIndex;

    const queryParams4SceneA = useSelector(selectQueryParams4MainScene);

    const queryParams4SceneB = useSelector(selectQueryParams4SecondaryScene);

    const selectedRange = useSelector(
        selectUserSelectedRangeInChangeCompareTool
    );

    const fullPixelValueRange = useSelector(
        selectFullPixelValuesRangeInChangeCompareTool
    );

    const [rasterFunction, setRasterFunction] = useState<RasterFunction>();

    const isVisible = useChangeCompareLayerVisibility();

    useEffect(() => {
        (async () => {
            try {
                const bandIndex = getBandIndexesBySpectralIndex(spectralIndex);

                const feature = await getSentinel2FeatureByObjectId(
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
        serviceURL: SENTINEL_2_SERVICE_URL,
        pixelSize: mapView.resolution,
    });

    return (
        <ImageryLayerWithPixelFilter
            mapView={mapView}
            groupLayer={groupLayer}
            serviceURL={SENTINEL_2_SERVICE_URL}
            rasterFunction={rasterFunction}
            visible={isVisible}
            selectedPixelValueRange={selectedRange}
            fullPixelValueRange={fullPixelValueRange}
            getPixelColor={getPixelColor4ChangeCompareLayer}
            countOfPixelsOnChange={(totalPixels, visiblePixels) => {
                dispatach(countOfVisiblePixelsChanged(visiblePixels));
            }}
        />
    );
};
