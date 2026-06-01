import { useAppSelector } from '@shared/store/configureStore';
import {
    selectAppMode,
    selectAvailableSwipeSubModes,
} from '@shared/store/ImageryScene/selectors';
import React from 'react';

export const useShouldShowSwipeSubModeToggle = () => {
    const mode = useAppSelector(selectAppMode);

    const availableSwipeSubModes = useAppSelector(selectAvailableSwipeSubModes);

    const shouldShowSwipeSubModeToggle =
        mode === 'swipe' &&
        availableSwipeSubModes &&
        availableSwipeSubModes.length > 1;

    return shouldShowSwipeSubModeToggle;
};
