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
        const data = [
            {
                value: 'Sentinel-1 RTC VV dB with DRA' as Sentinel1FunctionName,
                label: 'V V dB',
            },
            {
                value: 'Sentinel-1 RTC VH dB with DRA' as Sentinel1FunctionName,
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
            <div className="w-full text-center">
                <h3 className="uppercase">Composite</h3>
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
