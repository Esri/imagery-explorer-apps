import React, { useEffect, useMemo, useState } from 'react';
import { RasterFunctionSelector } from './RasterFunctionSelector';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
    selectAppMode,
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/Landsat/selectors';
import { updateRasterFunctionName } from '@shared/store/Landsat/thunks';
import { selectIsAnimationPlaying } from '@shared/store/UI/selectors';
import { useRasterFunctionInfosWithThumbnail } from './useRasterFunctionInfosWithThumbnail';
import { tooltipDataChanged } from '@shared/store/UI/reducer';

export const RasterFunctionSelectorContainer = () => {
    const dispatch = useDispatch();

    const mode = useSelector(selectAppMode);

    const isAnimationPlaying = useSelector(selectIsAnimationPlaying);

    const rasterFunctionInfos = useRasterFunctionInfosWithThumbnail();

    const { rasterFunctionName, objectIdOfSelectedScene } =
        useSelector(selectQueryParams4SceneInSelectedMode) || {};

    const shouldDisable = () => {
        if (mode === 'dynamic') {
            return false;
        }

        if (
            !rasterFunctionName ||
            isAnimationPlaying ||
            !objectIdOfSelectedScene
        ) {
            return true;
        }

        return false;
    };

    if (!rasterFunctionInfos || !rasterFunctionInfos.length) {
        return null;
    }

    return (
        <RasterFunctionSelector
            rasterFunctionInfos={rasterFunctionInfos}
            nameOfSelectedRasterFunction={rasterFunctionName}
            disabled={shouldDisable()}
            onChange={(rasterFunctionName) => {
                dispatch(updateRasterFunctionName(rasterFunctionName));
            }}
            itemOnHover={(rasterFunctionData) => {
                const data = rasterFunctionData
                    ? {
                          title: rasterFunctionData.label,
                          content: rasterFunctionData.description,
                      }
                    : null;

                dispatch(tooltipDataChanged(data));
            }}
        />
    );
};
