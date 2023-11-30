import React, { useEffect, useMemo, useState } from 'react';
import { RasterFunctionSelector } from './RasterFunctionSelector';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
    selectActiveAnalysisTool,
    selectAppMode,
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/ImageryScene/selectors';
import { updateRasterFunctionName } from '@shared/store/ImageryScene/thunks';
import { selectIsAnimationPlaying } from '@shared/store/UI/selectors';
import { useRasterFunctionInfo } from './useRasterFunctionInfo';
import { tooltipDataChanged } from '@shared/store/UI/reducer';
import { updateTooltipData } from '@shared/store/UI/thunks';

export const RasterFunctionSelectorContainer = () => {
    const dispatch = useDispatch();

    const mode = useSelector(selectAppMode);

    const analysisTool = useSelector(selectActiveAnalysisTool);

    const isAnimationPlaying = useSelector(selectIsAnimationPlaying);

    const rasterFunctionInfo = useRasterFunctionInfo();

    const { rasterFunctionName, objectIdOfSelectedScene } =
        useSelector(selectQueryParams4SceneInSelectedMode) || {};

    const shouldDisable = () => {
        if (mode === 'dynamic') {
            return false;
        }

        if (
            // !rasterFunctionName ||
            isAnimationPlaying ||
            !objectIdOfSelectedScene
        ) {
            return true;
        }

        return false;
    };

    if (!rasterFunctionInfo || !rasterFunctionInfo.length) {
        return null;
    }

    if (mode === 'analysis' && analysisTool === 'change') {
        return null;
    }

    return (
        <RasterFunctionSelector
            rasterFunctionInfo={rasterFunctionInfo}
            nameOfSelectedRasterFunction={rasterFunctionName}
            disabled={shouldDisable()}
            onChange={(rasterFunctionName) => {
                dispatch(updateRasterFunctionName(rasterFunctionName));
            }}
            itemOnHover={(rasterFunctionData) => {
                const { label, description, legend } = rasterFunctionData || {};

                const data = rasterFunctionData
                    ? {
                          title: label,
                          content: description,
                          legendImage: legend,
                      }
                    : null;

                dispatch(updateTooltipData(data));
            }}
        />
    );
};
