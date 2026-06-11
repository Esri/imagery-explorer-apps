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

import { useMemo } from 'react';
import { useAppSelector } from '@shared/store/configureStore';
import {
    selectActiveAnalysisTool,
    selectAppMode,
    selectQueryParams4MainScene,
    selectQueryParams4SecondaryScene,
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/ImageryScene/selectors';
import { selectIsTemporalCompositeLayerOn } from '@shared/store/TemporalCompositeTool/selectors';

/**
 * Determines the visibility of the final output of temporal composite layer
 * @returns
 */
export const useTemporalCompositeFinalOutputLayerVisibility = (): boolean => {
    const mode = useAppSelector(selectAppMode);

    const anailysisTool = useAppSelector(selectActiveAnalysisTool);

    const isTemporalCompositeLayerOn = useAppSelector(
        selectIsTemporalCompositeLayerOn
    );

    const queryParams4SceneA = useAppSelector(selectQueryParams4MainScene);

    const queryParams4SceneB = useAppSelector(selectQueryParams4SecondaryScene);

    if (mode !== 'analysis') {
        return false;
    }

    if (anailysisTool !== 'temporal composite') {
        return false;
    }

    return isTemporalCompositeLayerOn &&
        queryParams4SceneA?.objectIdOfSelectedScene &&
        queryParams4SceneB?.objectIdOfSelectedScene
        ? true
        : false;
};

/**
 * Determines the visibility of the temporal composite layer
 * @returns {boolean} True if the layer should be visible, otherwise false.
 */
export const useTemporalCompositeLayerVisibility = () => {
    const mode = useAppSelector(selectAppMode);

    const isTemporalCompositeLayerOn = useAppSelector(
        selectIsTemporalCompositeLayerOn
    );

    const anailysisTool = useAppSelector(selectActiveAnalysisTool);

    const queryParams4SelectedScene = useAppSelector(
        selectQueryParams4SceneInSelectedMode
    );

    const visibilityOfFinalOutput =
        useTemporalCompositeFinalOutputLayerVisibility();

    const visibilityOfIndividualScene = useMemo(() => {
        if (mode !== 'analysis') {
            return false;
        }

        if (anailysisTool !== 'temporal composite') {
            return false;
        }

        // When displaying an individual selected scene on the map as part of the temporal composite analysis, ensure that the selected scene has an object ID assigned.
        if (
            isTemporalCompositeLayerOn === false &&
            queryParams4SelectedScene?.objectIdOfSelectedScene
        ) {
            return true;
        }

        // return false to hide the layer
        return false;
    }, [
        mode,
        anailysisTool,
        isTemporalCompositeLayerOn,
        queryParams4SelectedScene,
    ]);

    return visibilityOfFinalOutput || visibilityOfIndividualScene;
};
