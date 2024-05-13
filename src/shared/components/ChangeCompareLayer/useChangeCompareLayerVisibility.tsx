import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
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
    const mode = useSelector(selectAppMode);

    const changeCompareLayerIsOn = useSelector(selectChangeCompareLayerIsOn);

    const queryParams4SceneA = useSelector(selectQueryParams4MainScene);

    const queryParams4SceneB = useSelector(selectQueryParams4SecondaryScene);

    const anailysisTool = useSelector(selectActiveAnalysisTool);

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
