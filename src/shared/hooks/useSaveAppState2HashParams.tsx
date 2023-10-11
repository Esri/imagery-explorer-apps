import { selectTrendToolState } from '@shared/store/TrendTool/selectors';
import {
    selectAppMode,
    selectQueryParams4MainScene,
    selectQueryParams4ScenesInAnimateMode,
    // selectQueryParams4SceneInSelectedMode,
    selectQueryParams4SecondaryScene,
    selectActiveAnalysisTool,
} from '@shared/store/Landsat/selectors';
import {
    selectShowMapLabel,
    selectShowTerrain,
} from '@shared/store/Map/selectors';
import { selectMaskToolState } from '@shared/store/MaskTool/selectors';
import {
    selectAnimationSpeed,
    selectAnimationStatus,
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
} from '@shared/utils/url-hash-params';
import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectSpectralProfileToolState } from '@shared/store/SpectralProfileTool/selectors';
import { QueryParams4ImageryScene } from '@shared/store/Landsat/reducer';
import { selectChangeCompareToolState } from '@shared/store/ChangeCompareTool/selectors';

export const useSaveAppState2HashParams = () => {
    const mode = useSelector(selectAppMode);

    const analysisTool = useSelector(selectActiveAnalysisTool);

    const queryParams4MainScene = useSelector(selectQueryParams4MainScene);

    const queryParams4SecondaryScene = useSelector(
        selectQueryParams4SecondaryScene
    );

    const maskToolState = useSelector(selectMaskToolState);

    const trendToolState = useSelector(selectTrendToolState);

    const spectralToolState = useSelector(selectSpectralProfileToolState);

    const queryParams4ScenesInAnimationMode = useSelector(
        selectQueryParams4ScenesInAnimateMode
    );

    const animationStatus = useSelector(selectAnimationStatus);

    const animationSpeed = useSelector(selectAnimationSpeed);

    const showMapLabel = useSelector(selectShowMapLabel);

    const showTerrain = useSelector(selectShowTerrain);

    const changeCompareToolState = useSelector(selectChangeCompareToolState);

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
    }, [mode, queryParams4SecondaryScene]);

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
            mode === 'animate' ? queryParams4ScenesInAnimationMode : null
        );
    }, [mode, queryParams4ScenesInAnimationMode]);

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
        updateHashParams('hideTerrain', showTerrain === false ? 'true' : null);
    }, [showTerrain]);
};
