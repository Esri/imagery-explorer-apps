import { IMAGERY_EXPLORER_APPS } from '@shared/components/AppHeader/AppHeader';
import { APP_NAME } from '@shared/config';
import React, { useMemo } from 'react';

/**
 * This hook returns the title of the app.
 * @returns
 */
export const useAppTitle = () => {
    const title = useMemo(() => {
        return (
            IMAGERY_EXPLORER_APPS.find((app) => app.appName === APP_NAME)
                ?.title || 'Imagery Explorer'
        );
    }, []);

    return title;
};
