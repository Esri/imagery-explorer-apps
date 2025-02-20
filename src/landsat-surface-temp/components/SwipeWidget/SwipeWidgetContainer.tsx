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

import React, { FC, useEffect } from 'react';
import SwipeWidget from '@shared/components/SwipeWidget/SwipeWidget';
import { useAppSelector } from '@shared/store/configureStore';
import { useAppDispatch } from '@shared/store/configureStore';
import { swipeWidgetHanlderPositionChanged } from '@shared/store/Map/reducer';
import { useLandsatLayer } from '@landsat-explorer/components/LandsatLayer';
import {
    selectActiveAnalysisTool,
    selectAppMode,
    selectQueryParams4MainScene,
} from '@shared/store/ImageryScene/selectors';
import MapView from '@arcgis/core/views/MapView';
import { LandsatRasterFunctionName } from '@shared/services/landsat-level-2/config';

type Props = {
    mapView?: MapView;
};

export const SwipeWidgetContainer: FC<Props> = ({ mapView }: Props) => {
    const dispatch = useAppDispatch();

    const mode = useAppSelector(selectAppMode);

    const activeAnalysisTool = useAppSelector(selectActiveAnalysisTool);

    const isSwipeWidgetVisible =
        mode === 'analysis' && activeAnalysisTool === 'trend';

    const queryParams4MainScene = useAppSelector(selectQueryParams4MainScene);

    const leadingLayer = useLandsatLayer({
        visible:
            isSwipeWidgetVisible &&
            queryParams4MainScene?.objectIdOfSelectedScene !== null,
        rasterFunction: queryParams4MainScene?.rasterFunctionName || '',
        objectId: queryParams4MainScene?.objectIdOfSelectedScene,
    });

    const trailingLayer = useLandsatLayer({
        visible:
            isSwipeWidgetVisible &&
            queryParams4MainScene?.objectIdOfSelectedScene !== null,
        rasterFunction: 'Natural Color with DRA' as LandsatRasterFunctionName,
        objectId: queryParams4MainScene?.objectIdOfSelectedScene,
    });

    return (
        <SwipeWidget
            visible={isSwipeWidgetVisible}
            leadingLayer={leadingLayer}
            trailingLayer={trailingLayer}
            mapView={mapView}
            positionOnChange={(pos) => {
                // console.log(pos)
                dispatch(swipeWidgetHanlderPositionChanged(Math.trunc(pos)));
            }}
            referenceInfoOnToggle={() => {
                //
            }}
        />
    );
};
