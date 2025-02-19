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

import { Geometry } from '@arcgis/core/geometry';
import { createClipRasterFunction } from '@shared/services/raster-analysis/rasterFunctions';
import { selectQueryParams4MainScene } from '@shared/store/ImageryScene/selectors';
import React, { useEffect, useMemo } from 'react';
import { useAppSelector } from '@shared/store/configureStore';

type Props = {
    originalServiceUrl: string;
    clippingGeometry: Geometry;
    token: string;
};

export const usePublishSceneRasterFunction = ({
    originalServiceUrl,
    clippingGeometry,
    token,
}: Props) => {
    const queryParams4MainScene = useAppSelector(selectQueryParams4MainScene);

    const rasterFunction = useMemo(() => {
        if (
            !queryParams4MainScene ||
            !queryParams4MainScene?.objectIdOfSelectedScene ||
            !clippingGeometry
        ) {
            return null;
        }

        return createClipRasterFunction({
            serviceUrl: originalServiceUrl,
            objectId: queryParams4MainScene?.objectIdOfSelectedScene,
            token,
            clippingGeometry,
        });
    }, [clippingGeometry, queryParams4MainScene?.objectIdOfSelectedScene]);

    return rasterFunction;
};
