import { AnalysisToolHeader } from '@shared/components/AnalysisToolHeader';
import { PixelRangeSlider } from '@shared/components/PixelRangeSlider';
import {
    selectedRangeUpdated,
    spectralIndex4ChangeCompareToolChanged,
} from '@shared/store/ChangeCompareTool/reducer';
import {
    selectIsViewingChangeInChangeCompareTool,
    selectSpectralIndex4ChangeCompareTool,
    selectUserSelectedRangeInChangeCompareTool,
} from '@shared/store/ChangeCompareTool/selectors';
import { selectActiveAnalysisTool } from '@shared/store/Landsat/selectors';
import { SpectralIndex } from '@typing/imagery-service';
import classNames from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export const ChangeCompareToolContainer = () => {
    const dispatch = useDispatch();

    const tool = useSelector(selectActiveAnalysisTool);

    const selectedRange = useSelector(
        selectUserSelectedRangeInChangeCompareTool
    );

    const selectedSpectralIndex = useSelector(
        selectSpectralIndex4ChangeCompareTool
    );

    const isChangeLayerOn = useSelector(
        selectIsViewingChangeInChangeCompareTool
    );

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
                tooltipText={''}
                dropdownMenuSelectedItemOnChange={(val) => {
                    dispatch(
                        spectralIndex4ChangeCompareToolChanged(
                            val as SpectralIndex
                        )
                    );
                }}
            />

            <div className="w-full h-[120px]">
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
                />
            </div>
        </div>
    );
};
