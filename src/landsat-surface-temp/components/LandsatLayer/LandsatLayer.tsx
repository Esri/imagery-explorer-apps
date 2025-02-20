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
import { useAppSelector } from '@shared/store/configureStore';
import MapView from '@arcgis/core/views/MapView';
import GroupLayer from '@arcgis/core/layers/GroupLayer';
import {
    selectActiveAnalysisTool,
    selectAppMode,
    selectQueryParams4MainScene,
} from '@shared/store/ImageryScene/selectors';
import { useLandsatLayer } from '@landsat-explorer/components/LandsatLayer';

type Props = {
    mapView?: MapView;
    groupLayer?: GroupLayer;
};

export const LandsatLayer: FC<Props> = ({ mapView, groupLayer }: Props) => {
    const mode = useAppSelector(selectAppMode);

    const { rasterFunctionName, objectIdOfSelectedScene } =
        useAppSelector(selectQueryParams4MainScene) || {};

    const activeAnalysisTool = useAppSelector(selectActiveAnalysisTool);

    const getVisibility = () => {
        if (mode === 'dynamic') {
            return true;
        }

        if (mode === 'find a scene') {
            return objectIdOfSelectedScene !== null;
        }

        if (mode === 'analysis') {
            return (
                activeAnalysisTool === 'mask' &&
                objectIdOfSelectedScene !== null
            );
        }

        return false;
    };

    const getObjectId = () => {
        // should ignore the object id of selected scene if in dynamic mode,
        if (mode === 'dynamic') {
            return null;
        }

        return objectIdOfSelectedScene;
    };

    const layer = useLandsatLayer({
        visible: getVisibility(),
        rasterFunction: rasterFunctionName,
        objectId: getObjectId(),
    });

    useEffect(() => {
        if (groupLayer && layer) {
            groupLayer.add(layer);
            groupLayer.reorder(layer, 0);
        }
    }, [groupLayer, layer]);

    return null;
};
