import { useAppSelector } from '@shared/store/configureStore';
import {
    selectActiveAnalysisTool,
    selectAppMode,
    selectQueryParams4MainScene,
    selectQueryParams4SecondaryScene,
} from '@shared/store/ImageryScene/selectors';
import React from 'react';

export const useObjectIdsOfSelectedScenes4CompositeTool = () => {
    const queryParams4MainScene = useAppSelector(selectQueryParams4MainScene);

    const queryParams4SecondaryScene = useAppSelector(
        selectQueryParams4SecondaryScene
    );

    const mode = useAppSelector(selectAppMode);

    const analyzeTool = useAppSelector(selectActiveAnalysisTool);

    if (mode !== 'analysis') {
        return [];
    }

    if (analyzeTool !== 'temporal composite') {
        return [];
    }

    if (
        queryParams4MainScene?.objectIdOfSelectedScene ===
        queryParams4SecondaryScene?.objectIdOfSelectedScene
    ) {
        return [];
    }

    return [
        queryParams4MainScene.objectIdOfSelectedScene,
        queryParams4SecondaryScene.objectIdOfSelectedScene,
    ];
};
