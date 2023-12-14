import { shouldShowAboutThisAppToggled } from '@shared/store/UI/reducer';
import { selectShouldShowAboutThisApp } from '@shared/store/UI/selectors';
import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

export const useOpenAboutThisAppLink = (): void => {
    const dispatch = useDispatch();

    const show = useSelector(selectShouldShowAboutThisApp);

    useEffect(() => {
        if (show) {
            // Landsat Surface Temp app has no About This App Modal,
            // we will just open this link in a new tab whenever user clicks on the About button
            window.open(
                'https://www.usgs.gov/landsat-missions/landsat-collection-2-surface-temperature',
                '_blank'
            );

            // set shouldShowAboutThisApp back to false, so this event can be triggered again
            dispatch(shouldShowAboutThisAppToggled());
        }
    }, [show]);
};
