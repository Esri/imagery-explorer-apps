import {
    selectActiveAnalysisTool,
    selectMaskToolState,
    selectProfileToolState,
} from '@shared/store/Analysis/selectors';
import {
    selectAppMode,
    selectQueryParams4MainScene,
    selectQueryParams4ScenesInAnimateMode,
    // selectQueryParams4SceneInSelectedMode,
    selectQueryParams4SecondaryScene,
} from '@shared/store/Landsat/selectors';
import {
    saveMaskToolToHashParams,
    saveTemporalProfileToolToHashParams,
    saveQueryParams4MainSceneToHashParams,
    saveQueryParams4SecondarySceneToHashParams,
    updateHashParams,
    saveQueryParams4ScenesInAnimationToHashParams,
} from '@shared/utils/url-hash-params';
import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const useSaveAppState2HashParams = () => {
    const mode = useSelector(selectAppMode);

    const analysisTool = useSelector(selectActiveAnalysisTool);

    const queryParams4MainScene = useSelector(selectQueryParams4MainScene);

    const queryParams4SecondaryScene = useSelector(
        selectQueryParams4SecondaryScene
    );

    const maskToolState = useSelector(selectMaskToolState);

    const profileToolState = useSelector(selectProfileToolState);

    const queryParams4ScenesInAnimationMode = useSelector(
        selectQueryParams4ScenesInAnimateMode
    );

    useEffect(() => {
        updateHashParams('mode', mode);

        saveQueryParams4MainSceneToHashParams(queryParams4MainScene);
    }, [mode, queryParams4MainScene]);

    useEffect(() => {
        saveQueryParams4SecondarySceneToHashParams(
            mode === 'swipe' ? queryParams4SecondaryScene : null
        );
    }, [mode, queryParams4SecondaryScene]);

    useEffect(() => {
        saveMaskToolToHashParams(
            mode === 'analysis' && analysisTool === 'mask'
                ? maskToolState
                : null
        );
    }, [mode, analysisTool, maskToolState]);

    useEffect(() => {
        saveTemporalProfileToolToHashParams(
            mode === 'analysis' && analysisTool === 'profile'
                ? profileToolState
                : null
        );
    }, [mode, analysisTool, profileToolState]);

    useEffect(() => {
        // saveQueryParams4ScenesInAnimationToHashParams(
        //     mode === 'animate'
        //         ? queryParams4ScenesInAnimationMode
        //         : null
        // );
    }, [mode, queryParams4ScenesInAnimationMode]);
};
