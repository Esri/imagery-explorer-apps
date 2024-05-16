import { selectSelectedIndex4TrendTool } from '@shared/store/TrendTool/selectors';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { AnalysisToolHeader } from '../AnalysisToolHeader';
import { RadarIndex, SpectralIndex } from '@typing/imagery-service';
import { useDispatch } from 'react-redux';
import { selectedIndex4TrendToolChanged } from '@shared/store/TrendTool/reducer';

type Props = {
    options: {
        value: SpectralIndex | RadarIndex;
        label: string;
    }[];
    tooltipText: string;
};

export const TemporalProfileToolHeader: FC<Props> = ({
    options,
    tooltipText,
}) => {
    const dispatch = useDispatch();

    const spectralIndex = useSelector(selectSelectedIndex4TrendTool);

    return (
        <AnalysisToolHeader
            title="Trend"
            dropdownListOptions={options}
            selectedValue={spectralIndex}
            dropdownMenuSelectedItemOnChange={(val) => {
                dispatch(selectedIndex4TrendToolChanged(val as SpectralIndex));
            }}
            tooltipText={tooltipText}
        />
    );
};
