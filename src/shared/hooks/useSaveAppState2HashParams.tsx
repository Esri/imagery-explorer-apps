import {
    selectActiveAnalysisTool,
    selectMaskOptions,
    selectShouldClipMaskLayer,
    selectSpectralIndex4MaskTool,
} from '@shared/store/Analysis/selectors';
import {
    selectAppMode,
    selectQueryParams4MainScene,
    selectQueryParams4SceneInSelectedMode,
    selectQueryParams4SecondaryScene,
} from '@shared/store/Landsat/selectors';
import {
    saveQueryParams4MainSceneToHashParams,
    saveQueryParams4SecondarySceneToHashParams,
    updateHashParams,
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

    useEffect(() => {
        updateHashParams('mode', mode);

        saveQueryParams4MainSceneToHashParams(queryParams4MainScene);

        saveQueryParams4SecondarySceneToHashParams(
            mode === 'swipe' ? queryParams4SecondaryScene : null
        );
    }, [mode, queryParams4MainScene, queryParams4SecondaryScene]);

    useEffect(() => {
        if (mode !== 'analysis') {
            // remove analysis tool from hash params
            updateHashParams('tool', null);
            return;
        }

        updateHashParams('tool', analysisTool);
    }, [mode, analysisTool]);
};
