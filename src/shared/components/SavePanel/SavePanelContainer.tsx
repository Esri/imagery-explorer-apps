import React from 'react';
import { SavePanel } from './SavePanel';
import { useSelector } from 'react-redux';
import { selectShowSavePanel } from '@shared/store/UI/selectors';

export const SavePanelContainer = () => {
    const shouldShowSavePanel = useSelector(selectShowSavePanel);

    if (!shouldShowSavePanel) {
        return null;
    }

    return <SavePanel />;
};
