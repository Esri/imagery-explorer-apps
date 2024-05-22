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
// import { PixelRangeSlider as MaskLayerPixelRangeSlider4SpectralIndex } from '@shared/components/MaskTool/PixelRangeSlider';
// import { PixelRangeSlider as MaskLayerPixelRangeSlider4SurfaceTemp } from './PixelRangeSlider4SurfaceTemp';
import {
    MaskLayerRenderingControls,
    MaskToolWarnigMessage,
} from '@shared/components/MaskTool';
import { selectedIndex4MaskToolChanged } from '@shared/store/MaskTool/reducer';
import {
    selectSelectedIndex4MaskTool,
    selectMaskOptions,
    // selectActiveAnalysisTool,
} from '@shared/store/MaskTool/selectors';
import { updateSelectedRange } from '@shared/store/MaskTool/thunks';
import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
    selectActiveAnalysisTool,
    selectQueryParams4MainScene,
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/ImageryScene/selectors';
import classNames from 'classnames';
import { MASK_TOOL_HEADER_TOOLTIP } from '@shared/components/MaskTool/config';
import { SpectralIndex } from '@typing/imagery-service';
import { PixelRangeSlider } from '@shared/components/PixelRangeSlider';
import {
    SurfaceTempCelsiusPixelRangeSlider,
    SurfaceTempFarhenheitPixelRangeSlider,
} from './SurfaceTempPixelRangeSlider';

export const MaskToolContainer = () => {
    const dispatch = useDispatch();

    const tool = useSelector(selectActiveAnalysisTool);

    const selectedSpectralIndex = useSelector(selectSelectedIndex4MaskTool);

    const maskOptions = useSelector(selectMaskOptions);

    const { objectIdOfSelectedScene } =
        useSelector(selectQueryParams4SceneInSelectedMode) || {};

    const queryParams4MainScene = useSelector(selectQueryParams4MainScene);

    const shouldBeDisabled = useMemo(() => {
        return !objectIdOfSelectedScene;
    }, [objectIdOfSelectedScene]);

    // useEffect(() => {
    //     if (!queryParams4MainScene?.rasterFunctionName) {
    //         return;
    //     }

    //     // when user selects a different renderer for the selected landsat scene,
    //     // we want to try to sync the selected spectral index for the mask tool because
    //     // that is probably what the user is interested in seeing
    //     let spectralIndex: SpectralIndex = null;

    //     if (/Temperature/i.test(queryParams4MainScene?.rasterFunctionName)) {
    //         spectralIndex = 'temperature farhenheit';
    //     } else if (/NDVI/.test(queryParams4MainScene?.rasterFunctionName)) {
    //         spectralIndex = 'vegetation';
    //     }

    //     if (spectralIndex) {
    //         dispatch(selectedIndex4MaskToolChanged(spectralIndex));
    //     }
    // }, [queryParams4MainScene?.rasterFunctionName]);

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
                    {
                        value: 'temperature farhenheit' as SpectralIndex,
                        label: 'SURFACE TEMP °F',
                    },
                    {
                        value: 'temperature celcius' as SpectralIndex,
                        label: 'SURFACE TEMP °C',
                    },
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
                    <div className={classNames('w-full h-[120px]')}>
                        {selectedSpectralIndex === 'temperature celcius' && (
                            <SurfaceTempCelsiusPixelRangeSlider />
                        )}
                        {selectedSpectralIndex === 'temperature farhenheit' && (
                            <SurfaceTempFarhenheitPixelRangeSlider />
                        )}

                        {selectedSpectralIndex !== 'temperature celcius' &&
                            selectedSpectralIndex !==
                                'temperature farhenheit' && (
                                <PixelRangeSlider
                                    values={maskOptions.selectedRange}
                                    min={-1}
                                    max={1}
                                    valuesOnChange={(values) => {
                                        dispatch(updateSelectedRange(values));
                                    }}
                                    countOfTicks={17}
                                    tickLabels={[-1, -0.5, 0, 0.5, 1]}
                                    showSliderTooltip={true}
                                />
                            )}
                    </div>

                    <MaskLayerRenderingControls />
                </>
            )}
        </div>
    );
};
