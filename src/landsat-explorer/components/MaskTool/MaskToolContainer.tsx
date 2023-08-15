import { AnalysisToolHeader } from '@shared/components/AnalysisToolHeader';
import { PixelRangeSlider as MaskLayerPixelRangeSlider4SpectralIndex } from '@shared/components/MaskTool/PixelRangeSlider';
import { PixelRangeSlider as MaskLayerPixelRangeSlider4SurfaceTemp } from './PixelRangeSlider4SurfaceTemp';

import { MaskLayerRenderingControls } from '@shared/components/MaskTool';
import { spectralIndex4MaskToolChanged } from '@shared/store/Analysis/reducer';
import {
    selectSpectralIndex4MaskTool,
    selectMaskOptions,
    selectActiveAnalysisTool,
} from '@shared/store/Analysis/selectors';
import { updateSelectedRange } from '@shared/store/Analysis/thunks';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectQueryParams4SceneInSelectedMode } from '@shared/store/Landsat/selectors';
import classNames from 'classnames';
import { celsius2fahrenheit } from '@shared/utils/temperature-conversion';
import { MASK_TOOL_HEADER_TOOLTIP } from '@shared/components/MaskTool/config';

export const MaskToolContainer = () => {
    const dispatch = useDispatch();

    const tool = useSelector(selectActiveAnalysisTool);

    const selectedSpectralIndex = useSelector(selectSpectralIndex4MaskTool);

    const maskOptions = useSelector(selectMaskOptions);

    const { objectIdOfSelectedScene } =
        useSelector(selectQueryParams4SceneInSelectedMode) || {};

    const getValues4SurfaceTempSlider = () => {
        if (selectedSpectralIndex === 'temperature celcius') {
            return [...maskOptions.selectedRange];
        }

        return [
            celsius2fahrenheit(maskOptions.selectedRange[0]),
            celsius2fahrenheit(maskOptions.selectedRange[1]),
        ];
    };

    if (tool !== 'mask') {
        return null;
    }

    return (
        <div
            className={classNames('w-analysis-tool-container-width h-full', {
                'is-disabled': !objectIdOfSelectedScene,
            })}
        >
            <AnalysisToolHeader
                title="Mask"
                data={[
                    {
                        value: 'water',
                        label: 'WATER INDEX',
                    },
                    {
                        value: 'vegetation',
                        label: 'VEGETATION INDEX',
                    },
                    {
                        value: 'moisture',
                        label: 'MOISTURE INDEX',
                    },
                    {
                        value: 'temperature farhenheit',
                        label: 'SURFACE TEMP °F',
                    },
                    {
                        value: 'temperature celcius',
                        label: 'SURFACE TEMP °C',
                    },
                ]}
                selectedSpectralIndex={selectedSpectralIndex}
                tooltipText={MASK_TOOL_HEADER_TOOLTIP}
                selectedSpectralIndexOnChange={(val) => {
                    dispatch(spectralIndex4MaskToolChanged(val));
                }}
            />

            {selectedSpectralIndex === 'temperature celcius' ||
            selectedSpectralIndex === 'temperature farhenheit' ? (
                <MaskLayerPixelRangeSlider4SurfaceTemp
                    values={getValues4SurfaceTempSlider()}
                    unit={
                        selectedSpectralIndex === 'temperature celcius'
                            ? 'celsius'
                            : 'farhenheit'
                    }
                    valOnChange={(index, value) => {
                        if (
                            selectedSpectralIndex === 'temperature farhenheit'
                        ) {
                            value = Math.trunc(((value - 32) * 5) / 9);
                        }

                        dispatch(updateSelectedRange(index, value));
                    }}
                />
            ) : (
                <MaskLayerPixelRangeSlider4SpectralIndex
                    values={maskOptions.selectedRange}
                    valOnChange={(index, value) => {
                        dispatch(updateSelectedRange(index, value));
                    }}
                />
            )}

            <MaskLayerRenderingControls />
        </div>
    );
};