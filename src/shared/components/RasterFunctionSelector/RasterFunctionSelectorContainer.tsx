import React, { useEffect, useMemo, useState } from 'react';
import { RasterFunctionSelector } from './RasterFunctionSelector';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectQueryParams4SceneInSelectedMode } from '@shared/store/Landsat/selectors';
import { updateRasterFunctionName } from '@shared/store/Landsat/thunks';
import { selectIsAnimationPlaying } from '@shared/store/UI/selectors';
import { useRasterFunctionInfosWithThumbnail } from './useRasterFunctionInfosWithThumbnail';

export const RasterFunctionSelectorContainer = () => {
    const dispatch = useDispatch();

    const isAnimationPlaying = useSelector(selectIsAnimationPlaying);

    const rasterFunctionInfos = useRasterFunctionInfosWithThumbnail();

    const {
        rasterFunctionName,
        // objectIdOfSelectedScene
    } = useSelector(selectQueryParams4SceneInSelectedMode) || {};

    if (!rasterFunctionInfos || !rasterFunctionInfos.length) {
        return null;
    }

    return (
        <RasterFunctionSelector
            rasterFunctionInfos={rasterFunctionInfos}
            nameOfSelectedRasterFunction={rasterFunctionName}
            disabled={!rasterFunctionName || isAnimationPlaying}
            onChange={(rasterFunctionName) => {
                dispatch(updateRasterFunctionName(rasterFunctionName));
            }}
        />
    );
};