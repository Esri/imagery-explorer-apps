import React, { useState } from 'react';
import { useFormattedSpectralSamplingData } from '../SamplingPointsList/useFormattedSpectralSamplingData';
import { useSelector } from 'react-redux';
import { selectClassifictionNameOfSpectralSamplingTask } from '@shared/store/SpectralSamplingTool/selectors';
import { convert2csv } from '@shared/utils/snippets/convert2csv';
import { saveLandsatSamplingResults } from './helpers';

export const SaveSamplingResults = () => {
    const data = useFormattedSpectralSamplingData();

    const classification = useSelector(
        selectClassifictionNameOfSpectralSamplingTask
    );

    /**
     * If true, it is in progress of saving the sampling results
     */
    const [isSaving, setIsSaving] = useState(false);

    const saveSamplingResults = () => {
        saveLandsatSamplingResults(classification, data);
    };

    return (
        <div className="mt-1 text-right pr-4">
            <span
                className="cursor-pointer underline text-xs"
                onClick={saveSamplingResults}
            >
                Save sampling results
            </span>
        </div>
    );
};
