import { activeAnalysisToolChanged } from '@shared/store/ImageryScene/reducer';
import { AnalysisToolSelector } from './AnalysisToolSelector';
import {
    selectActiveAnalysisTool,
    selectAppMode,
} from '@shared/store/ImageryScene/selectors';
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
