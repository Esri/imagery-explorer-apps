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
        tool: 'spectral',
        title: 'Spectral',
        subtitle: 'profile',
    },
    {
        tool: 'change',
        title: 'Change',
        subtitle: 'detection',
    },
];

export const AnalyzeToolSelector4Landsat = () => {
    return <AnalysisToolSelector data={data} />;
};
