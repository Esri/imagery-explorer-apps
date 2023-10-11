import { AnalysisToolHeader } from '@shared/components/AnalysisToolHeader';
// import { PixelRangeSlider as MaskLayerPixelRangeSlider4SpectralIndex } from '@shared/components/MaskTool/PixelRangeSlider';
// import { PixelRangeSlider as MaskLayerPixelRangeSlider4SurfaceTemp } from './PixelRangeSlider4SurfaceTemp';
import { MaskLayerRenderingControls } from '@shared/components/MaskTool';
import { spectralIndex4MaskToolChanged } from '@shared/store/MaskTool/reducer';
import {
    selectSpectralIndex4MaskTool,
    selectMaskOptions,
    // selectActiveAnalysisTool,
} from '@shared/store/MaskTool/selectors';
import { updateSelectedRange } from '@shared/store/MaskTool/thunks';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
    selectActiveAnalysisTool,
    selectQueryParams4MainScene,
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/Landsat/selectors';
import classNames from 'classnames';
import { celsius2fahrenheit } from '@shared/utils/temperature-conversion';
import { MASK_TOOL_HEADER_TOOLTIP } from '@shared/components/MaskTool/config';
import { SpectralIndex } from '@typing/imagery-service';
import { PixelRangeSlider } from '@shared/components/PixelRangeSlider';
import {
    LANDSAT_SURFACE_TEMPERATURE_MIN_CELSIUS,
    LANDSAT_SURFACE_TEMPERATURE_MIN_FAHRENHEIT,
    LANDSAT_SURFACE_TEMPERATURE_MAX_CELSIUS,
    LANDSAT_SURFACE_TEMPERATURE_MAX_FAHRENHEIT,
} from '@shared/services/landsat/config';

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

    const queryParams4MainScene = useSelector(selectQueryParams4MainScene);

    useEffect(() => {
        if (!queryParams4MainScene?.rasterFunctionName) {
            return;
        }

        // when user selects a different renderer for the selected landsat scene,
        // we want to try to sync the selected spectral index for the mask tool because
        // that is probably what the user is interested in seeing
        let spectralIndex: SpectralIndex = null;

        if (/Temperature/i.test(queryParams4MainScene?.rasterFunctionName)) {
            spectralIndex = 'temperature farhenheit';
        } else if (/NDVI/.test(queryParams4MainScene?.rasterFunctionName)) {
            spectralIndex = 'vegetation';
        }

        if (spectralIndex) {
            dispatch(spectralIndex4MaskToolChanged(spectralIndex));
        }
    }, [queryParams4MainScene?.rasterFunctionName]);

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
                        spectralIndex4MaskToolChanged(val as SpectralIndex)
                    );
                }}
            />

            <div className="w-full h-[120px]">
                {selectedSpectralIndex === 'temperature celcius' && (
                    <PixelRangeSlider
                        values={getValues4SurfaceTempSlider()}
                        min={LANDSAT_SURFACE_TEMPERATURE_MIN_CELSIUS}
                        max={LANDSAT_SURFACE_TEMPERATURE_MAX_CELSIUS}
                        steps={1}
                        valuesOnChange={(values) => {
                            dispatch(updateSelectedRange(values));
                        }}
                        countOfTicks={0}
                        tickLabels={[-30, -15, 0, 15, 30, 45, 60, 75, 90]}
                        showSliderTooltip={true}
                    />
                )}
                {selectedSpectralIndex === 'temperature farhenheit' && (
                    <PixelRangeSlider
                        values={getValues4SurfaceTempSlider()}
                        min={LANDSAT_SURFACE_TEMPERATURE_MIN_FAHRENHEIT}
                        max={LANDSAT_SURFACE_TEMPERATURE_MAX_FAHRENHEIT}
                        steps={1}
                        valuesOnChange={(values) => {
                            values = values.map((value) =>
                                Math.trunc(((value - 32) * 5) / 9)
                            );

                            dispatch(updateSelectedRange(values));
                        }}
                        countOfTicks={0}
                        tickLabels={[-20, 0, 30, 60, 90, 120, 150, 180]}
                        showSliderTooltip={true}
                    />
                )}

                {selectedSpectralIndex !== 'temperature celcius' &&
                    selectedSpectralIndex !== 'temperature farhenheit' && (
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
        </div>
    );
};
