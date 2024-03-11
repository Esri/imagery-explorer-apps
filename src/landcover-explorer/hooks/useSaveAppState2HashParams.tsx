import React, { FC, useEffect } from 'react';

import { selectYearsForSwipeWidgetLayers } from '@shared/store/LandcoverExplorer/selectors';

import {
    saveActiveYearToHashParams,
    saveTimeExtentToHashParams,
} from '@landcover-explorer/utils/URLHashParams';

import {
    selectMapMode,
    selectYear,
} from '@shared/store/LandcoverExplorer/selectors';

import { useSelector } from 'react-redux';

export const useSaveAppState2HashParams = () => {
    const { year4LeadingLayer, year4TrailingLayer } = useSelector(
        selectYearsForSwipeWidgetLayers
    );

    const mode = useSelector(selectMapMode);

    const year = useSelector(selectYear);

    useEffect(() => {
        saveTimeExtentToHashParams(year4LeadingLayer, year4TrailingLayer);
    }, [year4LeadingLayer, year4TrailingLayer]);

    useEffect(() => {
        saveActiveYearToHashParams(mode === 'step' ? year : null);
    }, [year, mode]);
};
