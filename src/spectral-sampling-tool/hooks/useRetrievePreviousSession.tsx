import {
    getSessionDataFromIndexedDB,
    SpectralSamplingToolSessionData,
} from '@shared/utils/indexedDB/sessioOfSpectralSamplingTool';
import React, { useEffect, useState } from 'react';

export const useRetrievePreviousSession = () => {
    const [previousSession, setPreviousSession] =
        useState<SpectralSamplingToolSessionData>(null);

    useEffect(() => {
        (async () => {
            try {
                const sessionData = await getSessionDataFromIndexedDB();
                if (sessionData) {
                    setPreviousSession(sessionData);
                } else {
                    setPreviousSession(null);
                }
            } catch (error) {
                console.error(
                    'Error retrieving session data from IndexedDB:',
                    error
                );
            }
        })();
    }, []);

    return previousSession;
};
