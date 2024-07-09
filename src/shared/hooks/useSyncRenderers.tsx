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
import React, { FC, useEffect, useMemo } from 'react';
import SwipeWidget from '@shared/components/SwipeWidget/SwipeWidget';
import { useSelector } from 'react-redux';
import {
    selectActiveAnalysisTool,
    selectAppMode,
    selectIsSwipeModeOn,
    selectQueryParams4MainScene,
    selectQueryParams4SecondaryScene,
} from '@shared/store/ImageryScene/selectors';
import { useDispatch } from 'react-redux';
import {
    QueryParams4ImageryScene,
    queryParams4SecondarySceneChanged,
} from '@shared/store/ImageryScene/reducer';

/**
 * Custom hook to synchronize the renderer of the secondary imagery scene with the main scene.
 *
 * This hook ensures that the renderer of the secondary scene matches the main scene's renderer
 * when the user has not explicitly updated it. This is especially useful in Swipe Mode and the
 * Change Compare tool to provide a consistent user experience.
 */
export const useSyncRenderers = () => {
    const dispatch = useDispatch();

    const mode = useSelector(selectAppMode);

    const analyzeTool = useSelector(selectActiveAnalysisTool);

    const isSwipeWidgetVisible = useSelector(selectIsSwipeModeOn);

    const queryParams4MainScene = useSelector(selectQueryParams4MainScene);

    const queryParams4SecondaryScene = useSelector(
        selectQueryParams4SecondaryScene
    );

    /**
     * Determines whether the renderer should be synchronized based on the current mode
     * and visibility of the swipe widget.
     */
    const shouldSync = useMemo(() => {
        return (
            isSwipeWidgetVisible ||
            (mode === 'analysis' && analyzeTool === 'change')
        );
    }, [isSwipeWidgetVisible, mode, analyzeTool]);

    useEffect(() => {
        if (!shouldSync) {
            return;
        }

        // If a raster function is not explicitly selected for the secondary scene,
        // inherit the raster function from the main scene.
        if (!queryParams4SecondaryScene?.rasterFunctionName) {
            const updatedQueryParams: QueryParams4ImageryScene = {
                ...queryParams4SecondaryScene,
                rasterFunctionName: queryParams4MainScene.rasterFunctionName,
            };

            dispatch(queryParams4SecondarySceneChanged(updatedQueryParams));
        }
    }, [queryParams4SecondaryScene?.rasterFunctionName, shouldSync]);
};
