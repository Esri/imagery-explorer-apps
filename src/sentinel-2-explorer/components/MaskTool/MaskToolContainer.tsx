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

import { AnalysisToolHeader } from '@shared/components/AnalysisToolHeader';
import {
    MaskLayerRenderingControls,
    MaskToolWarnigMessage,
} from '@shared/components/MaskTool';
import { selectedIndex4MaskToolChanged } from '@shared/store/MaskTool/reducer';
import {
    selectSelectedIndex4MaskTool,
    selectMaskLayerPixelValueRange,
} from '@shared/store/MaskTool/selectors';
import { updateMaskLayerSelectedRange } from '@shared/store/MaskTool/thunks';
import React, { useEffect, useMemo } from 'react';
import { useAppDispatch } from '@shared/store/configureStore';
import { useAppSelector } from '@shared/store/configureStore';
import {
    selectActiveAnalysisTool,
    selectQueryParams4MainScene,
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/ImageryScene/selectors';
import classNames from 'classnames';
import { MASK_TOOL_HEADER_TOOLTIP } from '@shared/components/MaskTool/config';
import { SpectralIndex } from '@typing/imagery-service';
import { PixelRangeSlider } from '@shared/components/PixelRangeSlider';
import { TotalVisibleAreaInfo } from '@shared/components/TotalAreaInfo/TotalAreaInfo';
import { useSentinel2MaskToolFullPixelValueRange } from './useSentinel2MaskToolFullPixelValueRange';

export const MaskToolContainer = () => {
    const dispatch = useAppDispatch();

    const tool = useAppSelector(selectActiveAnalysisTool);

    const selectedSpectralIndex = useAppSelector(selectSelectedIndex4MaskTool);

    const maskOptions = useAppSelector(selectMaskLayerPixelValueRange);

    const { objectIdOfSelectedScene } =
        useAppSelector(selectQueryParams4SceneInSelectedMode) || {};

    const shouldBeDisabled = useMemo(() => {
        return !objectIdOfSelectedScene;
    }, [objectIdOfSelectedScene]);

    const fullPixelValueRange = useSentinel2MaskToolFullPixelValueRange();

    if (tool !== 'mask') {
        return null;
    }

    return (
        <div className={classNames('w-full h-full')}>
            <AnalysisToolHeader
                title="Index"
                dropdownListOptions={[
                    {
                        value: 'water' as SpectralIndex,
                        label: 'WATER INDEX',
                    },
                    {
                        value: 'vegetation' as SpectralIndex,
                        label: 'VEGETATION INDEX',
                    },
                    {
                        value: 'moisture' as SpectralIndex,
                        label: 'MOISTURE INDEX',
                    },
                    // {
                    //     value: 'urban' as SpectralIndex,
                    //     label: 'URBAN',
                    // },
                    // {
                    //     value: 'burn' as SpectralIndex,
                    //     label: 'BURN INDEX',
                    // },
                ]}
                selectedValue={selectedSpectralIndex}
                tooltipText={MASK_TOOL_HEADER_TOOLTIP}
                dropdownMenuSelectedItemOnChange={(val) => {
                    dispatch(
                        selectedIndex4MaskToolChanged(val as SpectralIndex)
                    );
                }}
            />

            {shouldBeDisabled ? (
                <MaskToolWarnigMessage />
            ) : (
                <>
                    <div className={classNames('relative w-full h-[120px]')}>
                        <div className="absolute top-3 right-0">
                            <TotalVisibleAreaInfo label="Estimated Mask Area" />
                        </div>

                        <PixelRangeSlider
                            values={maskOptions.selectedRange}
                            min={fullPixelValueRange[0]}
                            max={fullPixelValueRange[1]}
                            valuesOnChange={(values) => {
                                dispatch(updateMaskLayerSelectedRange(values));
                            }}
                            countOfTicks={17}
                            tickLabels={[-1, -0.5, 0, 0.5, 1]}
                            showSliderTooltip={true}
                        />
                    </div>

                    <MaskLayerRenderingControls />
                </>
            )}
        </div>
    );
};
