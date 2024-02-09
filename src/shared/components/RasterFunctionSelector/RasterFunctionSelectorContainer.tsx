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
