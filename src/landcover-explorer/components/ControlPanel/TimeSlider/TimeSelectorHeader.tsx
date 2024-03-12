import {
    selectMapMode,
    selectShouldShowSentinel2Layer,
} from '@shared/store/LandcoverExplorer/selectors';
import React from 'react';
import { useSelector } from 'react-redux';
import HeaderText from '../HeaderText/HeaderText';

export const TimeSelectorHeader = () => {
    const mode = useSelector(selectMapMode);

    const shouldShowSentinel2Layer = useSelector(
        selectShouldShowSentinel2Layer
    );

    return (
        <HeaderText
            title={`${
                shouldShowSentinel2Layer
                    ? 'Sentinel-2 Imagery'
                    : '10m Land Cover'
            }`}
            subTitle={
                mode === 'swipe'
                    ? 'Choose Two Years to Compare'
                    : 'Choose a Year to View'
            }
        />
    );
};
