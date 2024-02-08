import React, { FC, useEffect, useMemo, useState } from 'react';
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
import { updateTooltipData } from '@shared/store/UI/thunks';
import { RasterFunctionInfo } from '@typing/imagery-service';
import { selectChangeCompareLayerIsOn } from '@shared/store/ChangeCompareTool/selectors';

type Props = {
    /**
     * list of raster functions of the imagery service
     */
    data: RasterFunctionInfo[];
};

export const RasterFunctionSelectorContainer: FC<Props> = ({ data }) => {
    const dispatch = useDispatch();

    const mode = useSelector(selectAppMode);

    const analysisTool = useSelector(selectActiveAnalysisTool);

    const isAnimationPlaying = useSelector(selectIsAnimationPlaying);

    // const rasterFunctionInfo = useRasterFunctionInfo();

    const isChangeCompareLayerOn = useSelector(selectChangeCompareLayerIsOn);

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

        if (
            mode === 'analysis' &&
            analysisTool === 'change' &&
            isChangeCompareLayerOn
        ) {
            return true;
        }

        return false;
    };

    if (!data || !data.length) {
        return null;
    }

    // if (mode === 'analysis' && analysisTool === 'change') {
    //     return null;
    // }

    return (
        <RasterFunctionSelector
            rasterFunctionInfo={data}
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
