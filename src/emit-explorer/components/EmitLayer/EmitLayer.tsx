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
import GroupLayer from '@arcgis/core/layers/GroupLayer';
// import { selectChangeCompareLayerIsOn } from '@shared/store/ChangeCompareTool/selectors';
import ImageryLayerByObjectID from '@shared/components/ImageryLayer/ImageryLayerByObjectID';
import {
    EMIT_LEVEL_2a_SERVICE_SORT_FIELD,
    EMIT_LEVEL_2a_SERVICE_SORT_VALUE,
    EMIT_LEVEL_2a_SERVICE_URL,
} from '@shared/services/emit-level-2a/config';
import MosaicRule from '@arcgis/core/layers/support/MosaicRule';

type Props = {
    mapView?: MapView;
    groupLayer?: GroupLayer;
};

const EmitLayer: FC<Props> = ({ mapView, groupLayer }: Props) => {
    // const mode = useSelector(selectAppMode);

    // const { rasterFunctionName, objectIdOfSelectedScene } =
    //     useSelector(selectQueryParams4SceneInSelectedMode) || {};

    // const animationStatus = useSelector(selectAnimationStatus);

    // const analysisTool = useSelector(selectActiveAnalysisTool);

    // const changeCompareLayerIsOn = useSelector(selectChangeCompareLayerIsOn);

    // const getVisibility = () => {
    //     if (mode === 'dynamic') {
    //         return true;
    //     }

    //     if (mode === 'find a scene' || mode === 'spectral sampling') {
    //         return objectIdOfSelectedScene !== null;
    //     }

    //     if (mode === 'analysis') {
    //         // no need to show landsat layer when user is viewing change layer in the change compare tool
    //         if (analysisTool === 'change' && changeCompareLayerIsOn) {
    //             return false;
    //         }

    //         return objectIdOfSelectedScene !== null;
    //     }

    //     // when in animate mode, only need to show landsat layer if animation is not playing
    //     if (
    //         mode === 'animate' &&
    //         objectIdOfSelectedScene &&
    //         animationStatus === null
    //     ) {
    //         return true;
    //     }

    //     return false;
    // };

    // const getObjectId = () => {
    //     // should ignore the object id of selected scene if in dynamic mode,
    //     if (mode === 'dynamic') {
    //         return null;
    //     }

    //     return objectIdOfSelectedScene;
    // };

    // const layer = useLandsatLayer({
    //     visible: getVisibility(),
    //     rasterFunction: rasterFunctionName,
    //     objectId: getObjectId(),
    // });

    // useEffect(() => {
    //     if (groupLayer && layer) {
    //         groupLayer.add(layer);
    //         groupLayer.reorder(layer, 0);
    //     }
    // }, [groupLayer, layer]);

    // return null;

    const defaultMosaicRule = useMemo(() => {
        return new MosaicRule({
            ascending: true,
            method: 'attribute',
            operation: 'first',
            sortField: EMIT_LEVEL_2a_SERVICE_SORT_FIELD,
            sortValue: EMIT_LEVEL_2a_SERVICE_SORT_VALUE,
        });
    }, []);

    return (
        <ImageryLayerByObjectID
            groupLayer={groupLayer}
            serviceUrl={EMIT_LEVEL_2a_SERVICE_URL}
            defaultMosaicRule={defaultMosaicRule}
        />
    );
};

export default EmitLayer;
