import { AnalysisToolHeader } from '@shared/components/AnalysisToolHeader';
import { PixelRangeSlider } from '@shared/components/PixelRangeSlider';
import {
    selectedRangeUpdated,
    spectralIndex4ChangeCompareToolChanged,
} from '@shared/store/ChangeCompareTool/reducer';
import {
    selectChangeCompareLayerIsOn,
    selectSpectralIndex4ChangeCompareTool,
    selectUserSelectedRangeInChangeCompareTool,
} from '@shared/store/ChangeCompareTool/selectors';
import { selectActiveAnalysisTool } from '@shared/store/ImageryScene/selectors';
import { SpectralIndex } from '@typing/imagery-service';
import classNames from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getChangeCompareLayerColorrampAsCSSGradient } from '../ChangeLayer/helpers';

export const ChangeCompareToolContainer = () => {
    const dispatch = useDispatch();

    const tool = useSelector(selectActiveAnalysisTool);

    const selectedRange = useSelector(
        selectUserSelectedRangeInChangeCompareTool
    );

    const selectedSpectralIndex = useSelector(
        selectSpectralIndex4ChangeCompareTool
    );

    const isChangeLayerOn = useSelector(selectChangeCompareLayerIsOn);

    if (tool !== 'change') {
        return null;
    }

    return (
        <div
            className={classNames('w-analysis-tool-container-width h-full', {
                'is-disabled': isChangeLayerOn === false,
            })}
        >
            <AnalysisToolHeader
                title="Change"
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
                ]}
                selectedValue={selectedSpectralIndex}
                tooltipText={
                    'Compare and report changes between two selected images. Change is always calculated and reported chronologically from oldest to newest.'
                }
                dropdownMenuSelectedItemOnChange={(val) => {
                    dispatch(
                        spectralIndex4ChangeCompareToolChanged(
                            val as SpectralIndex
                        )
                    );
                }}
            />

            <div className="w-full h-[0px] pt-[50px]">
                <div className="w-full">
                    {/* <div className="flex items-center text-sm">
                        <div className="w-1/3">
                            <span>decrease</span>
                        </div>
                        <div className="w-1/3 text-center">
                            <span>no change</span>
                        </div>
                        <div className="w-1/3 text-right">
                            <span>increase</span>
                        </div>
                    </div> */}

                    <div
                        className="w-full h-2"
                        style={{
                            background:
                                getChangeCompareLayerColorrampAsCSSGradient(),
                        }}
                    ></div>
                </div>

                <PixelRangeSlider
                    values={selectedRange}
                    valuesOnChange={(vals: number[]) => {
                        dispatch(selectedRangeUpdated(vals));
                    }}
                    min={-2}
                    max={2}
                    steps={0.1}
                    tickLabels={[-2, -1, 0, 1, 2]}
                    countOfTicks={17}
                    showSliderTooltip={true}
                />

                <div className="w-full mt-12">
                    <div className="flex items-center text-xs">
                        <div className="w-1/3">
                            <span>decrease</span>
                        </div>
                        <div className="w-1/3 text-center">
                            <span>no change</span>
                        </div>
                        <div className="w-1/3 text-right">
                            <span>increase</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
