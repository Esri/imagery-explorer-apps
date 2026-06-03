import { useAppSelector } from '@shared/store/configureStore';
import {
    selectSelectedEventName,
    // selectSelectedPageIndex,
} from '@shared/store/DisasterImageryExplorer/selectors';
import {
    selectAppMode,
    selectAvailableSwipeSubModes,
    selectIsBasemapOnRightSideOfSwipe,
    selectIsSwipeModeOn,
    selectSwipeSubMode,
} from '@shared/store/ImageryScene/selectors';
import { updateHashParams } from '@shared/utils/url-hash-params';
import { saveSwipeSubModeToHashParams } from '@shared/utils/url-hash-params/swipeSubMode';
import React, { useEffect } from 'react';

export const useSaveDIEXStatesToHashParams = () => {
    const eventName = useAppSelector(selectSelectedEventName);

    // const pageIndex = useAppSelector(selectSelectedPageIndex);

    const isSwipeModeOn = useAppSelector(selectIsSwipeModeOn);

    const swipeSubMode = useAppSelector(selectSwipeSubMode);

    const availableSubModes = useAppSelector(selectAvailableSwipeSubModes);

    const isBasemapOnRightSideOfSwipe = useAppSelector(
        selectIsBasemapOnRightSideOfSwipe
    );

    useEffect(() => {
        updateHashParams('disasterResponseEvent', eventName || null);
    }, [eventName]);

    useEffect(() => {
        saveSwipeSubModeToHashParams({
            isSwipeModeOn,
            selectedSubMode: swipeSubMode,
            availableSubModes,
            isBasemapOnRightSideOfSwipe,
        });
    }, [swipeSubMode, isSwipeModeOn, isBasemapOnRightSideOfSwipe]);
};
