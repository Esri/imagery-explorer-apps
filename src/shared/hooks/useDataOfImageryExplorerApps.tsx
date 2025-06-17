import { AppName } from '@shared/config';
import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Custom hook that provides data for Imagery Explorer Apps.
 *
 * This hook uses the `useTranslation` hook to get the translation function `t`
 * and returns a memoized array of objects containing information about different
 * imagery explorer applications.
 *
 * Each object in the array contains:
 * - `appName`: The name of the application.
 * - `title`: The translated title of the application.
 * - `url`: The URL path to the application.
 *
 * @returns {Array<{ appName: AppName; title: string; url: string }>} An array of objects containing app data.
 */
export const useDataOfImageryExplorerApps = () => {
    const { t } = useTranslation();

    const dataOfImageryExplorerApps = React.useMemo(() => {
        const data: {
            appName: AppName;
            title: string;
            url: string;
            tooltip?: string; // Optional tooltip for the app
        }[] = [
            {
                appName: 'landcoverexplorer',
                title: t('landcover_explorer'),
                url: '/landcoverexplorer',
                tooltip: t('launch_landcover_explorer'),
            },
            {
                appName: 'landsatexplorer',
                title: t('landsat_explorer'),
                url: '/landsatexplorer',
                tooltip: t('launch_landsat_explorer'),
            },
            {
                appName: 'sentinel1explorer',
                title: t('sentinel_1_explorer'),
                url: '/sentinel1explorer',
                tooltip: t('launch_sentinel1_explorer'),
            },
            {
                appName: 'sentinel2explorer',
                title: t('sentinel_2_explorer'),
                url: '/sentinel2explorer',
                tooltip: t('launch_sentinel2_explorer'),
            },
            {
                appName: 'nlcdlandcoverexplorer',
                title: t('nlcd_landcover_explorer'),
                url: '/nlcdlandcoverexplorer',
                tooltip: t('launch_nlcd_landcover_explorer'),
            },
        ];

        return data;
    }, []);

    return dataOfImageryExplorerApps;
};
