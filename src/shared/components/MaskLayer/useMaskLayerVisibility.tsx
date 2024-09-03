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
import React, { FC, useEffect, useMemo } from 'react';
// import { MaskLayer } from './MaskLayer';
import { useSelector } from 'react-redux';
import {
    selectActiveAnalysisTool,
    selectAppMode,
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/ImageryScene/selectors';

/**
 * This custom hook determines the visibility of the Mask Layer
 * @returns
 */
export const useMaskLayerVisibility = () => {
    const mode = useSelector(selectAppMode);

    const { objectIdOfSelectedScene } =
        useSelector(selectQueryParams4SceneInSelectedMode) || {};

    const anailysisTool = useSelector(selectActiveAnalysisTool);

    const isVisible = useMemo(() => {
        if (mode !== 'analysis' || anailysisTool !== 'mask') {
            return false;
        }

        if (!objectIdOfSelectedScene) {
            return false;
        }

        return true;
    }, [mode, anailysisTool, objectIdOfSelectedScene]);

    return isVisible;
};
