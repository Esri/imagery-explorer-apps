/* Copyright 2025 Esri
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
import { useAppDispatch } from '@shared/store/configureStore';
import { useAppSelector } from '@shared/store/configureStore';
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
import { selectIsTemporalCompositeLayerOn } from '@shared/store/TemporalCompositeTool/selectors';

type Props = {
    /**
     * tooltip text that will be displayed when user hovers the info icon next to the header
     */
    headerTooltip: string;
    /**
     * The width of header tooltip container in px. The default width is 240px and this value can be used to override that value
     */
    widthOfTooltipContainer?: number;
    /**
     * list of raster functions of the imagery service
     */
    data: RasterFunctionInfo[];
};

export const RasterFunctionSelectorContainer: FC<Props> = ({
    headerTooltip,
    widthOfTooltipContainer,
    data,
}) => {
    const dispatch = useAppDispatch();

    const mode = useAppSelector(selectAppMode);

    const analysisTool = useAppSelector(selectActiveAnalysisTool);

    const isAnimationPlaying = useAppSelector(selectIsAnimationPlaying);

    // const rasterFunctionInfo = useRasterFunctionInfo();

    const isChangeCompareLayerOn = useAppSelector(selectChangeCompareLayerIsOn);

    const { rasterFunctionName, objectIdOfSelectedScene } =
        useAppSelector(selectQueryParams4SceneInSelectedMode) || {};

    const shouldHide = useMemo(() => {
        if (mode === 'analysis' && analysisTool === 'temporal composite') {
            return true;
        }

        return false;
    }, [mode, analysisTool]);

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

    if (!data || !data.length || shouldHide) {
        return null;
    }

    // if (mode === 'analysis' && analysisTool === 'change') {
    //     return null;
    // }

    return (
        <RasterFunctionSelector
            headerTooltip={headerTooltip}
            rasterFunctionInfo={data}
            nameOfSelectedRasterFunction={rasterFunctionName}
            disabled={shouldDisable()}
            widthOfTooltipContainer={widthOfTooltipContainer}
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
