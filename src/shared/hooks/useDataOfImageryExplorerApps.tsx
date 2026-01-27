import { APP_NAME, AppName } from '@shared/config';
import React from 'react';
import { useTranslation } from 'react-i18next';

import config from '../../config.json';

/**
 * Type representing the information for an Imagery Explorer App.
 * This type includes the app name, title, URL, and an optional tooltip.
 */
export type ImageryExplorerAppInfo = {
    appName: AppName;
    title: string;
    url: string;
    tooltip?: string; // Optional tooltip for the app
};

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
        const data: ImageryExplorerAppInfo[] = [
            {
                appName: 'landsatexplorer',
                title: t('landsat_explorer'),
                url: config.landsatexplorer.pathname,
                tooltip: t('launch_landsat_explorer'),
            },
            {
                appName: 'sentinel2explorer',
                title: t('sentinel_2_explorer'),
                url: config.sentinel2explorer.pathname,
                tooltip: t('launch_sentinel_2_explorer'),
            },
            {
                appName: 'sentinel1explorer',
                title: t('sentinel_1_explorer'),
                url: config.sentinel1explorer.pathname,
                tooltip: t('launch_sentinel_1_explorer'),
            },
            {
                appName: 'landcoverexplorer',
                title: t('landcover_explorer'),
                url: config.landcoverexplorer.pathname,
                tooltip: t('launch_landcover_explorer'),
            },
            {
                appName: 'nlcdlandcoverexplorer',
                title: t('nlcd_landcover_explorer'),
                url: config.nlcdlandcoverexplorer.pathname,
                tooltip: t('launch_nlcd_landcover_explorer'),
            },
        ];

        return data;
    }, []);

    return dataOfImageryExplorerApps;
};

export const useDataOfImageryUtilityApps = () => {
    const { t } = useTranslation();

    const dataOfImageryExplorerApps = React.useMemo(() => {
        const data: ImageryExplorerAppInfo[] = [
            {
                appName: 'spectralsampler',
                title: t('spectral_sampler'),
                url: config.spectralsampler.pathname,
                tooltip: t('launch_spectral_sampler'),
            },
        ];

        return data; // Exclude the current app
    }, []);

    return dataOfImageryExplorerApps;
};
