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

import React, { FC, useMemo } from 'react';
import { useAppSelector } from '@shared/store/configureStore';
import {
    selectActiveAnalysisTool,
    selectAppMode,
    selectQueryParams4MainScene,
    selectQueryParams4SecondaryScene,
} from '@shared/store/ImageryScene/selectors';
import GroupLayer from '@arcgis/core/layers/GroupLayer';
import {
    selectChangeCompareLayerIsOn,
    selectSelectedOption4ChangeCompareTool,
    selectUserSelectedRangeInChangeCompareTool,
} from '@shared/store/ChangeCompareTool/selectors';

export const useChangeCompareLayerVisibility = () => {
    const mode = useAppSelector(selectAppMode);

    const changeCompareLayerIsOn = useAppSelector(selectChangeCompareLayerIsOn);

    const queryParams4SceneA = useAppSelector(selectQueryParams4MainScene);

    const queryParams4SceneB = useAppSelector(selectQueryParams4SecondaryScene);

    const anailysisTool = useAppSelector(selectActiveAnalysisTool);

    const isVisible = useMemo(() => {
        if (mode !== 'analysis') {
            return false;
        }

        if (anailysisTool !== 'change') {
            return false;
        }

        if (
            !queryParams4SceneA?.objectIdOfSelectedScene ||
            !queryParams4SceneB?.objectIdOfSelectedScene
        ) {
            return false;
        }

        return changeCompareLayerIsOn;
    }, [
        mode,
        anailysisTool,
        changeCompareLayerIsOn,
        queryParams4SceneA,
        queryParams4SceneB,
    ]);

    return isVisible;
};
