import { AnalysisToolSelector } from './AnalysisToolSelector';
import { activeAnalysisToolChanged } from '@shared/store/Analysis/reducer';
import { selectActiveAnalysisTool } from '@shared/store/Analysis/selectors';
import { selectAppMode } from '@shared/store/Landsat/selectors';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export const AnalysisToolSelectorContainer = () => {
    const dispatch = useDispatch();

    const mode = useSelector(selectAppMode);

    const analysisTool = useSelector(selectActiveAnalysisTool);

    if (mode !== 'analysis') {
        return null;
    }

    return (
        <AnalysisToolSelector
            selectedTool={analysisTool}
            onChange={(tool) => {
                dispatch(activeAnalysisToolChanged(tool));
            }}
        />
    );
};
