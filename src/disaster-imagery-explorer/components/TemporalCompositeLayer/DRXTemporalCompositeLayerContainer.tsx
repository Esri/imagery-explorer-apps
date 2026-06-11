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
import React, { FC, useMemo } from 'react';
import { useAppSelector } from '@shared/store/configureStore';
import {
    selectActiveAnalysisTool,
    selectAppMode,
    selectListOfQueryParams,
    selectQueryParams4MainScene,
    selectQueryParams4SecondaryScene,
    // selectQueryParams4MainScene,
    // selectQueryParams4SecondaryScene,
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/ImageryScene/selectors';
import GroupLayer from '@arcgis/core/layers/GroupLayer';
import { selectIsTemporalCompositeLayerOn } from '@shared/store/TemporalCompositeTool/selectors';
import { DRXTemporalCompositeLayer } from './DRXTemporalCompositeLayer';
import { useTemporalCompositeLayerVisibility } from './useTemporalCompositeLayerVisibility';

type Props = {
    mapView?: MapView;
    groupLayer?: GroupLayer;
};

export const DRXTemporalCompositeLayerContainer: FC<Props> = ({
    mapView,
    groupLayer,
}) => {
    const mode = useAppSelector(selectAppMode);

    const isTemporalCompositeLayerOn = useAppSelector(
        selectIsTemporalCompositeLayerOn
    );

    const anailysisTool = useAppSelector(selectActiveAnalysisTool);

    const queryParams4SceneA = useAppSelector(selectQueryParams4MainScene);

    const queryParams4SceneB = useAppSelector(selectQueryParams4SecondaryScene);

    const queryParams4SelectedScene = useAppSelector(
        selectQueryParams4SceneInSelectedMode
    );

    // /**
    //  * Determines the visibility of the temporal composite layer
    //  * @returns {boolean} True if the layer should be visible, otherwise false.
    //  */
    // const isVisible = useMemo(() => {
    //     if (mode !== 'analysis') {
    //         return false;
    //     }

    //     if (anailysisTool !== 'temporal composite') {
    //         return false;
    //     }

    //     // When displaying the final composite result that combines the two scenes, ensure that the main and secondary scenes both have an object ID assigned.
    //     if (
    //         isTemporalCompositeLayerOn &&
    //         queryParams4SceneA?.objectIdOfSelectedScene &&
    //         queryParams4SceneB?.objectIdOfSelectedScene
    //     ) {
    //         return true;
    //     }

    //     // When displaying an individual selected scene on the map as part of the temporal composite analysis, ensure that the selected scene has an object ID assigned.
    //     if (
    //         isTemporalCompositeLayerOn === false &&
    //         queryParams4SelectedScene?.objectIdOfSelectedScene
    //     ) {
    //         return true;
    //     }

    //     // return false to hide the layer
    //     return false;
    // }, [
    //     mode,
    //     anailysisTool,
    //     isTemporalCompositeLayerOn,
    //     queryParams4SelectedScene,
    // ]);
    const isVisible = useTemporalCompositeLayerVisibility();

    return (
        <DRXTemporalCompositeLayer
            mapView={mapView}
            groupLayer={groupLayer}
            visible={isVisible}
            isTemporalCompositeLayerOn={isTemporalCompositeLayerOn}
            objectIdOfSceneA={queryParams4SceneA?.objectIdOfSelectedScene}
            objectIdOfSceneB={queryParams4SceneB?.objectIdOfSelectedScene}
            objectIdOfSelectedScene={
                queryParams4SelectedScene?.objectIdOfSelectedScene
            }
        />
    );
};
