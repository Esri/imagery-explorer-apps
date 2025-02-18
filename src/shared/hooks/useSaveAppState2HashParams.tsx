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

import { selectTrendToolState } from '@shared/store/TrendTool/selectors';
import {
    selectAppMode,
    selectQueryParams4MainScene,
    selectListOfQueryParams,
    // selectQueryParams4SceneInSelectedMode,
    selectQueryParams4SecondaryScene,
    selectActiveAnalysisTool,
} from '@shared/store/ImageryScene/selectors';
import {
    selectAutoSwipeSpeed,
    selectAutoSwipeStatus,
    selectShowBasemap,
    selectShowMapLabel,
    selectShowTerrain,
} from '@shared/store/Map/selectors';
import { selectMaskToolState } from '@shared/store/MaskTool/selectors';
import {
    selectAnimationSpeed,
    selectAnimationStatus,
    selectShowSavePanel,
} from '@shared/store/UI/selectors';
import {
    saveMaskToolToHashParams,
    saveTrendToolStateToHashParams,
    saveQueryParams4MainSceneToHashParams,
    saveQueryParams4SecondarySceneToHashParams,
    updateHashParams,
    saveQueryParams4ScenesInAnimationToHashParams,
    saveAnimationSpeedToHashParams,
    saveSpectralProfileToolStateToHashParams,
    saveChangeCompareToolStateToHashParams,
    saveTemporalCompositeToolStateToHashParams,
} from '@shared/utils/url-hash-params';
import React, { FC, useEffect } from 'react';
import { useAppSelector } from '@shared/store/configureStore';
import { selectSpectralProfileToolState } from '@shared/store/SpectralProfileTool/selectors';
import { QueryParams4ImageryScene } from '@shared/store/ImageryScene/reducer';
import { selectChangeCompareToolState } from '@shared/store/ChangeCompareTool/selectors';
import { saveListOfQueryParamsToHashParams } from '@shared/utils/url-hash-params/queryParams4ImageryScene';
import { selectTemporalCompositeToolState } from '@shared/store/TemporalCompositeTool/selectors';

export const useSaveAppState2HashParams = () => {
    const mode = useAppSelector(selectAppMode);

    const analysisTool = useAppSelector(selectActiveAnalysisTool);

    const queryParams4MainScene = useAppSelector(selectQueryParams4MainScene);

    const queryParams4SecondaryScene = useAppSelector(
        selectQueryParams4SecondaryScene
    );

    const maskToolState = useAppSelector(selectMaskToolState);

    const trendToolState = useAppSelector(selectTrendToolState);

    const spectralToolState = useAppSelector(selectSpectralProfileToolState);

    const listOfQueryParams = useAppSelector(selectListOfQueryParams);

    const animationStatus = useAppSelector(selectAnimationStatus);

    const animationSpeed = useAppSelector(selectAnimationSpeed);

    const showMapLabel = useAppSelector(selectShowMapLabel);

    const showTerrain = useAppSelector(selectShowTerrain);

    const showBasemap = useAppSelector(selectShowBasemap);

    const changeCompareToolState = useAppSelector(selectChangeCompareToolState);

    const temporalCompositeToolState = useAppSelector(
        selectTemporalCompositeToolState
    );

    // const showSavePanel = useAppSelector(selectShowSavePanel);

    const autoSwipeStatus = useAppSelector(selectAutoSwipeStatus);

    const autoSwipeSpeed = useAppSelector(selectAutoSwipeSpeed);

    useEffect(() => {
        updateHashParams('mode', mode);

        saveQueryParams4MainSceneToHashParams(queryParams4MainScene);
    }, [mode, queryParams4MainScene]);

    useEffect(() => {
        let queryParams: QueryParams4ImageryScene = null;

        if (mode === 'swipe') {
            queryParams = queryParams4SecondaryScene;
        }

        if (mode === 'analysis' && analysisTool === 'change') {
            queryParams = queryParams4SecondaryScene;
        }

        saveQueryParams4SecondarySceneToHashParams(queryParams);
    }, [mode, analysisTool, queryParams4SecondaryScene]);

    useEffect(() => {
        saveMaskToolToHashParams(
            mode === 'analysis' && analysisTool === 'mask'
                ? maskToolState
                : null
        );
    }, [mode, analysisTool, maskToolState]);

    useEffect(() => {
        saveTrendToolStateToHashParams(
            mode === 'analysis' && analysisTool === 'trend'
                ? trendToolState
                : null
        );
    }, [mode, analysisTool, trendToolState]);

    useEffect(() => {
        saveSpectralProfileToolStateToHashParams(
            mode === 'analysis' && analysisTool === 'spectral'
                ? spectralToolState
                : null
        );
    }, [mode, analysisTool, spectralToolState]);

    useEffect(() => {
        saveChangeCompareToolStateToHashParams(
            mode === 'analysis' && analysisTool === 'change'
                ? changeCompareToolState
                : null
        );
    }, [mode, analysisTool, changeCompareToolState]);

    useEffect(() => {
        updateHashParams('tool', mode === 'analysis' ? analysisTool : null);
    }, [mode, analysisTool]);

    useEffect(() => {
        saveQueryParams4ScenesInAnimationToHashParams(
            mode === 'animate' ? listOfQueryParams : null
        );
    }, [mode, listOfQueryParams]);

    useEffect(() => {
        saveListOfQueryParamsToHashParams(
            mode === 'analysis' && analysisTool === 'temporal composite'
                ? listOfQueryParams
                : null
        );
    }, [mode, analysisTool, listOfQueryParams]);

    useEffect(() => {
        saveTemporalCompositeToolStateToHashParams(
            mode === 'analysis' && analysisTool === 'temporal composite'
                ? temporalCompositeToolState
                : null
        );
    }, [mode, analysisTool, temporalCompositeToolState]);

    useEffect(() => {
        saveAnimationSpeedToHashParams(
            mode === 'animate' && animationStatus === 'playing'
                ? animationSpeed
                : null
        );
    }, [mode, animationStatus, animationSpeed]);

    useEffect(() => {
        updateHashParams(
            'hideMapLabels',
            showMapLabel === false ? 'true' : null
        );
    }, [showMapLabel]);

    useEffect(() => {
        updateHashParams('hideBasemap', showBasemap === false ? 'true' : null);
    }, [showBasemap]);

    useEffect(() => {
        updateHashParams('hideTerrain', showTerrain === false ? 'true' : null);
    }, [showTerrain]);

    useEffect(() => {
        if (!autoSwipeStatus) {
            updateHashParams('autoSwipeSpeed', null);
        } else {
            updateHashParams('autoSwipeSpeed', autoSwipeSpeed.toString());
        }
    }, [autoSwipeSpeed, autoSwipeStatus]);
};
