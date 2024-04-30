import React from 'react';
import { AnalysisToolSelector } from '@shared/components/AnalysisToolSelector';
import { AnalyzeToolSelectorData } from '@shared/components/AnalysisToolSelector/AnalysisToolSelectorContainer';

const data: AnalyzeToolSelectorData[] = [
    {
        tool: 'temporal composite',
        title: 'Temporal',
        subtitle: 'composite',
    },
];

export const AnalyzeToolSelector4Sentinel1 = () => {
    return <AnalysisToolSelector data={data} />;
};
