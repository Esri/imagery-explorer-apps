import { useAppSelector } from '@shared/store/configureStore';
import {
    selectSelectedEventName,
    // selectSelectedPageIndex,
} from '@shared/store/DisasterImageryExplorer/selectors';
import { updateHashParams } from '@shared/utils/url-hash-params';
import React, { useEffect } from 'react';

export const useSaveDRXStatesToHashParams = () => {
    const eventName = useAppSelector(selectSelectedEventName);

    // const pageIndex = useAppSelector(selectSelectedPageIndex);

    useEffect(() => {
        updateHashParams('disasterResponseEvent', eventName || null);
    }, [eventName]);

    // useEffect(() => {
    //     const pageIndexToSave =
    //         pageIndex && !isNaN(pageIndex) ? pageIndex.toString() : null;
    //     updateHashParams('pageIndex', pageIndexToSave);
    // }, [pageIndex]);
};
