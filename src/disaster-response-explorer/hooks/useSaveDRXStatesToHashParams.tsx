import { useAppSelector } from '@shared/store/configureStore';
import { selectSelectedEventName } from '@shared/store/DisasterResponse/selectors';
import { updateHashParams } from '@shared/utils/url-hash-params';
import React, { useEffect } from 'react';

export const useSaveDRXStatesToHashParams = () => {
    const eventName = useAppSelector(selectSelectedEventName);

    useEffect(() => {
        updateHashParams('disasterResponseEvent', eventName || '');
    }, [eventName]);
};
