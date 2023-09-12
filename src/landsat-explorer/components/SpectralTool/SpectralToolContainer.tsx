import { AnalysisToolHeader } from '@shared/components/AnalysisToolHeader';
import { selectActiveAnalysisTool } from '@shared/store/Analysis/selectors';
import { selectQueryParams4SceneInSelectedMode } from '@shared/store/Landsat/selectors';
import classNames from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export const SpectralToolContainer = () => {
    const dispatch = useDispatch();

    const tool = useSelector(selectActiveAnalysisTool);

    const { objectIdOfSelectedScene } =
        useSelector(selectQueryParams4SceneInSelectedMode) || {};

    if (tool !== 'spectral') {
        return null;
    }

    return (
        <div
            className={classNames('w-analysis-tool-container-width h-full', {
                'is-disabled': !objectIdOfSelectedScene,
            })}
        >
            <AnalysisToolHeader
                title="Spectral"
                dropdownListOptions={[
                    {
                        value: 'water',
                        label: 'WATER INDEX',
                    },
                ]}
                selectedValue={null}
                tooltipText={''}
                dropdownMenuSelectedItemOnChange={(val) => {
                    // dispatch(spectralIndex4MaskToolChanged(val));
                }}
            />
        </div>
    );
};
