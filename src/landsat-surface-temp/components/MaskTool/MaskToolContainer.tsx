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
} from '@shared/store/ImageryScene/selectors';
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
} from '@shared/services/landsat-level-2/config';
import { MaskLayerOpacityControl } from './MaskToolControl';
import {
    SurfaceTempCelsiusPixelRangeSlider,
    SurfaceTempFarhenheitPixelRangeSlider,
} from '@landsat-explorer/components/MaskTool/SurfaceTempPixelRangeSlider';

export const MaskToolContainer = () => {
    const dispatch = useDispatch();

    const tool = useSelector(selectActiveAnalysisTool);

    const selectedSpectralIndex = useSelector(selectSpectralIndex4MaskTool);

    const { objectIdOfSelectedScene } =
        useSelector(selectQueryParams4SceneInSelectedMode) || {};

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
                    <SurfaceTempCelsiusPixelRangeSlider />
                )}
                {selectedSpectralIndex === 'temperature farhenheit' && (
                    <SurfaceTempFarhenheitPixelRangeSlider />
                )}
            </div>

            <MaskLayerOpacityControl />
        </div>
    );
};
