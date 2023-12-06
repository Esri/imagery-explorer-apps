import React, { useState } from 'react';
import { useFormattedSpectralSamplingData } from '../SamplingPointsList/useFormattedSpectralSamplingData';
import { useSelector } from 'react-redux';
import { selectClassifictionNameOfSpectralSamplingTask } from '@shared/store/SpectralSamplingTool/selectors';
import { convert2csv } from '@shared/utils/snippets/convert2csv';
import { saveLandsatSamplingResults } from './helpers';
import { useAveragedBandValues } from './useAveragedSamplingResults';

export const SaveSamplingResults = () => {
    const samplingPointsData = useFormattedSpectralSamplingData();

    const averagedBandValues = useAveragedBandValues();

    const classification = useSelector(
        selectClassifictionNameOfSpectralSamplingTask
    );

    const saveSamplingResults = () => {
        saveLandsatSamplingResults(
            classification,
            samplingPointsData,
            averagedBandValues
        );
    };

    return (
        <div className="text-right pr-4 flex items-center justify-end">
            <calcite-icon icon="download-to" scale="s" />
            <span
                className="cursor-pointer underline text-xs"
                onClick={saveSamplingResults}
            >
                Download
            </span>
        </div>
    );
};
