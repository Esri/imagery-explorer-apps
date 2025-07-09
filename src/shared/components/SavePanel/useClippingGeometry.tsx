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

import { selectQueryParams4MainScene } from '@shared/store/ImageryScene/selectors';
import { getToken } from '@shared/utils/esri-oauth';
import React, { useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '@shared/store/configureStore';

import Geometry from '@arcgis/core/geometry/Geometry';
import { getFeatureByObjectId } from '@shared/services/helpers/getFeatureById';
import Point from '@arcgis/core/geometry/Point';
import Polygon from '@arcgis/core/geometry/Polygon';
import Polyline from '@arcgis/core/geometry/Polyline';

export const useClippingGeometry = (serviceUrl: string) => {
    const queryParams4MainScene = useAppSelector(selectQueryParams4MainScene);

    const [clippingGeometry, setClippingGeometry] = useState<Geometry | null>(
        null
    );

    useEffect(() => {
        (async () => {
            if (
                !queryParams4MainScene ||
                !queryParams4MainScene?.objectIdOfSelectedScene
            ) {
                setClippingGeometry(null);
                return;
            }

            const token = getToken();

            if (!token) {
                setClippingGeometry(null);
                return;
            }

            try {
                const feature = await getFeatureByObjectId(
                    serviceUrl,
                    queryParams4MainScene.objectIdOfSelectedScene,
                    {
                        token,
                    }
                );

                const clippingGeometry = feature?.geometry as
                    | Point
                    | Polygon
                    | Polyline;

                setClippingGeometry(clippingGeometry);
            } catch (error) {
                console.error('failed to get clipping geometry', error);
                setClippingGeometry(null);
            }
        })();
    }, [queryParams4MainScene?.objectIdOfSelectedScene]);

    return clippingGeometry;
};
