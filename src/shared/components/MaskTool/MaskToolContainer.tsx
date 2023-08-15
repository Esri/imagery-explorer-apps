import { AnalysisToolHeader } from '@shared/components/AnalysisToolHeader';
import { PixelRangeSlider as MaskPixelRangeSlider4SpectralIndex } from './PixelRangeSlider';
import { PixelRangeSlider as MaskPixelRangeSlider4SurfaceTemp } from './PixelRangeSlider4SurfaceTemp';

import { RenderingControls as MaskRenderingControls } from './RenderingControls';
import {
    maskLayerOpacityChanged,
    shouldClipMaskLayerToggled,
    spectralIndex4MaskToolChanged,
} from '@shared/store/Analysis/reducer';
import {
    selectMaskLayerOpcity,
    selectSpectralIndex4MaskTool,
    selectMaskOptions,
    selectShouldClipMaskLayer,
    selectActiveAnalysisTool,
} from '@shared/store/Analysis/selectors';
import {
    updateMaskColor,
    updateSelectedRange,
} from '@shared/store/Analysis/thunks';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
    selectQueryParams4MainScene,
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/Landsat/selectors';
import classNames from 'classnames';
import { celsius2fahrenheit } from '@shared/utils/temperature-conversion';

export const MaskToolContainer = () => {
    const dispatch = useDispatch();

    const tool = useSelector(selectActiveAnalysisTool);

    const selectedSpectralIndex = useSelector(selectSpectralIndex4MaskTool);

    const maskOptions = useSelector(selectMaskOptions);

    const opacity = useSelector(selectMaskLayerOpcity);

    const shouldClip = useSelector(selectShouldClipMaskLayer);

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
                title="Mask Index"
                data={[
                    {
                        value: 'water',
                        label: 'WATER',
                    },
                    {
                        value: 'vegetation',
                        label: 'VEGETATION',
                    },
                    {
                        value: 'moisture',
                        label: 'MOISTURE',
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
                tooltipText={`
                    A mask index calculates the likeliness that a pixel belongs to a certain land cover category.</br> 
                    An index value of +1 is 100% confident match.</br>
                    An index of 0 is completely neutral.</br>
                    An index value of -1 is 100% confidence of a non-macth.`}
                selectedSpectralIndexOnChange={(val) => {
                    dispatch(spectralIndex4MaskToolChanged(val));
                }}
            />
            {selectedSpectralIndex === 'temperature celcius' ||
            selectedSpectralIndex === 'temperature farhenheit' ? (
                <MaskPixelRangeSlider4SurfaceTemp
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
                <MaskPixelRangeSlider4SpectralIndex
                    values={maskOptions.selectedRange}
                    valOnChange={(index, value) => {
                        dispatch(updateSelectedRange(index, value));
                    }}
                />
            )}

            <MaskRenderingControls
                selectedOpacity={opacity}
                shouldClip={shouldClip}
                color={maskOptions.color}
                colorOnChange={(color) => {
                    dispatch(updateMaskColor(color));
                }}
                shouldClipOnToggle={() => {
                    dispatch(shouldClipMaskLayerToggled());
                }}
                opacityOnChange={(val) => {
                    dispatch(maskLayerOpacityChanged(val));
                }}
            />
        </div>
    );
};
