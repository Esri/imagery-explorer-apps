import React, { useEffect, useMemo } from 'react';
import { AnalysisToolHeader } from '@shared/components/AnalysisToolHeader';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
    selectActiveAnalysisTool,
    selectListOfQueryParams,
    selectQueryParams4MainScene,
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/ImageryScene/selectors';
import classNames from 'classnames';
import {
    selectIsTemporalCompositeLayerOn,
    selectRasterFunction4TemporalCompositeTool,
} from '@shared/store/TemporalCompositeTool/selectors';
import { Sentinel1FunctionName } from '@shared/services/sentinel-1/config';
import { rasterFunction4TemporalCompositeToolChanged } from '@shared/store/TemporalCompositeTool/reducer';
import { TemproalCompositeToolLegend } from './Legend';
import { TemproalCompositeToolControls } from './Controls';
import { DropdownData } from '@shared/components/Dropdown';
import { initialChangeCompareToolState } from '@shared/store/ChangeCompareTool/reducer';
import { initiateImageryScenes4TemporalCompositeTool } from '@shared/store/TemporalCompositeTool/thunks';
import { Tooltip } from '@shared/components/Tooltip';

export const TemporalCompositeTool = () => {
    const dispatch = useDispatch();

    const tool = useSelector(selectActiveAnalysisTool);

    const isTemporalCompositeLayerOn = useSelector(
        selectIsTemporalCompositeLayerOn
    );

    const rasterFunction = useSelector(
        selectRasterFunction4TemporalCompositeTool
    );

    const listOfQueryParams = useSelector(selectListOfQueryParams);

    const rasterFunctionDropdownOptions: DropdownData[] = useMemo(() => {
        const VVdBRasterFunction: Sentinel1FunctionName = 'VV dB Colorized';
        const VHdBRasterFunction: Sentinel1FunctionName = 'VH dB Colorized';

        const data = [
            {
                value: VVdBRasterFunction,
                label: 'V V dB',
            },
            {
                value: VHdBRasterFunction,
                label: 'V H dB',
            },
        ];

        return data.map((d) => {
            return {
                ...d,
                selected: d.value === rasterFunction,
            };
        });
    }, [rasterFunction]);

    if (tool !== 'temporal composite') {
        return null;
    }

    return (
        <div className={classNames('w-full h-full')}>
            <div className="flex w-full justify-center">
                <Tooltip
                    content={
                        'View changes over time for up to three selected images at once. Each selected image is used as an individual band in a dynamically generated three band RGB composite image. Color variations in the resulting composite image represent changes in the land cover over time. <br/>For example, elements with a high backscatter in the scene used as the red band will have a stronger red hue in the composite image. Elements with a high backscatter in the red scene and the blue scene, and low backscatter in the green scene, will appear purple. And so on. Areas with more consistent backscatter, meaning little to no change over time, will appear as shades of gray.'
                    }
                    width={400}
                >
                    <calcite-icon scale="s" icon="information" />
                </Tooltip>

                <span className="uppercase text-sm ml-1">Composite</span>
            </div>

            <div className="flex">
                <div className="grow mt-2 mr-8 pr-3 border-r border-custom-light-blue-25">
                    <TemproalCompositeToolControls
                        isTemporalCompositeLayerOn={isTemporalCompositeLayerOn}
                        rasterFunctionsDropdownData={
                            rasterFunctionDropdownOptions
                        }
                        rasterFunctionOnChange={(
                            val: Sentinel1FunctionName
                        ) => {
                            dispatch(
                                rasterFunction4TemporalCompositeToolChanged(val)
                            );
                        }}
                        clearSelectedScenesButtonOnClick={() => {
                            // call this thunk function to reset the list of imagery scenes to be used for temporal composite tool
                            dispatch(
                                initiateImageryScenes4TemporalCompositeTool(
                                    false
                                )
                            );
                        }}
                    />
                </div>

                <div className="shrink-0">
                    <TemproalCompositeToolLegend
                        isTemporalCompositeLayerOn={isTemporalCompositeLayerOn}
                        acquisitionDateOfImageryScene4RedBand={
                            listOfQueryParams[0]?.acquisitionDate
                        }
                        acquisitionDateOfImageryScene4GreenBand={
                            listOfQueryParams[1]?.acquisitionDate
                        }
                        acquisitionDateOfImageryScene4BlueBand={
                            listOfQueryParams[2]?.acquisitionDate
                        }
                    />
                </div>
            </div>
        </div>
    );
};
