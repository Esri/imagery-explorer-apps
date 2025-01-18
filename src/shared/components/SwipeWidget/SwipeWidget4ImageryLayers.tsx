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
import React, { FC, useEffect } from 'react';
import SwipeWidget from '@shared/components/SwipeWidget/SwipeWidget';
import { useAppSelector } from '@shared/store/configureStore';
import {
    selectAppMode,
    selectIsSwipeModeOn,
    selectQueryParams4MainScene,
    selectQueryParams4SecondaryScene,
} from '@shared/store/ImageryScene/selectors';
import { useAppDispatch } from '@shared/store/configureStore';
import { swipeWidgetHanlderPositionChanged } from '@shared/store/Map/reducer';
import { useImageryLayerByObjectId } from '../ImageryLayer/useImageLayer';
import {
    QueryParams4ImageryScene,
    queryParams4SecondarySceneChanged,
} from '@shared/store/ImageryScene/reducer';

type Props = {
    /**
     * URL of the imagery service layer to be used in the Swipe Widget
     */
    serviceUrl: string;
    mapView?: MapView;
};

export const SwipeWidget4ImageryLayers: FC<Props> = ({
    serviceUrl,
    mapView,
}: Props) => {
    const dispatch = useAppDispatch();

    const isSwipeWidgetVisible = useAppSelector(selectIsSwipeModeOn);

    const queryParams4LeftSide = useAppSelector(selectQueryParams4MainScene);

    const queryParams4RightSide = useAppSelector(
        selectQueryParams4SecondaryScene
    );

    const leadingLayer = useImageryLayerByObjectId({
        url: serviceUrl,
        visible:
            isSwipeWidgetVisible &&
            queryParams4LeftSide?.objectIdOfSelectedScene !== null,
        rasterFunction: queryParams4LeftSide?.rasterFunctionName || '',
        objectId: queryParams4LeftSide?.objectIdOfSelectedScene,
    });

    const trailingLayer = useImageryLayerByObjectId({
        url: serviceUrl,
        visible:
            isSwipeWidgetVisible &&
            queryParams4RightSide?.objectIdOfSelectedScene !== null,
        rasterFunction: queryParams4RightSide?.rasterFunctionName || '',
        objectId: queryParams4RightSide?.objectIdOfSelectedScene,
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
