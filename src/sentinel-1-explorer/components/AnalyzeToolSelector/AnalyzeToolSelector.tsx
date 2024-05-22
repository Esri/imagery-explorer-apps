import React from 'react';
import { AnalysisToolSelector } from '@shared/components/AnalysisToolSelector';
import { AnalyzeToolSelectorData } from '@shared/components/AnalysisToolSelector/AnalysisToolSelectorContainer';

const data: AnalyzeToolSelectorData[] = [
    {
        tool: 'mask',
        title: 'Index',
        subtitle: 'mask',
    },
    {
        tool: 'trend',
        title: 'Temporal',
        subtitle: 'profile',
    },
    {
        tool: 'change',
        title: 'Change',
        subtitle: 'detecion',
    },
    {
        tool: 'temporal composite',
        title: 'Temporal',
        subtitle: 'composite',
    },
];

export const Sentinel1AnalyzeToolSelector = () => {
    return <AnalysisToolSelector data={data} />;
};
