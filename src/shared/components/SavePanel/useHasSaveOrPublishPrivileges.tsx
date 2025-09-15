import {
    checkCanCreateItem,
    getAccountType,
} from '@shared/services/arcgis-online/account';
import {
    getUserLicense,
    UserLicenseData,
} from '@shared/services/arcgis-online/getUserLicense';
import { hasRasterAnalysisPrivileges } from '@shared/services/raster-analysis/checkUserRoleAndPrivileges';
import { getSignedInUser } from '@shared/utils/esri-oauth';
import { set } from 'date-fns';
import React, { useEffect } from 'react';

type CanSaveOrPublishPrivileges = {
    canSaveWebMappingApp: boolean;
    canSaveWebMap: boolean;
    canPublishHostedImagery: boolean;
};

/**
 * This hook checks if the signed-in user has the privilege to save web mapping apps, web maps, and publish hosted imagery layers.
 *
 * @returns an object indicating if the user has the privilege to save web mapping apps, web maps, and publish hosted imagery layers.
 */
export const useHasSaveOrPublishPrivileges = (): CanSaveOrPublishPrivileges => {
    const [canSaveWebMappingApp, setCanSaveWebMappingApp] =
        React.useState<boolean>(false);
    const [canSaveWebMap, setCanSaveWebMap] = React.useState<boolean>(false);
    const [canPublishHostedImagery, setCanPublishHostedImagery] =
        React.useState<boolean>(false);

    const [userLicenseData, setUserLicenseData] =
        React.useState<UserLicenseData>(null);

    /**
     * The type of ArcGIS Online account the user is signed in with.
     * Possible values are "organizational" or "public" (for free accounts).
     */
    const arcgisOnlineAccountType = getAccountType();

    /**
     * Check if the user has the privilege to create items in ArcGIS Online.
     */
    const canCreateItem = checkCanCreateItem();

    useEffect(() => {
        // if the user is signed in with a public account, they can only save web mapping apps.
        // why can't they save web maps? because saving a web map requires the user to have a valid
        // ArcGIS Online Org account, which public accounts do not have.
        if (arcgisOnlineAccountType === 'public') {
            setCanSaveWebMappingApp(true);
            setCanSaveWebMap(false);
            setCanPublishHostedImagery(false);
            return;
        }

        // for organizational accounts, we should first check if the user has the privilege to create items.
        // if they don't, we can set all privileges to false.
        if (canCreateItem === false) {
            setCanSaveWebMappingApp(false);
            setCanSaveWebMap(false);
            setCanPublishHostedImagery(false);
            return;
        }

        // if the user can create items, we can set the privileges to true for saving web maps and web mapping apps.
        setCanSaveWebMappingApp(true);
        setCanSaveWebMap(true);

        // for publishing hosted imagery, we need to check if the user has the raster analysis privilege.
        const canUseRasterAnalysis = userLicenseData
            ? hasRasterAnalysisPrivileges(userLicenseData?.userLicenseTypeId)
            : false;
        setCanPublishHostedImagery(canUseRasterAnalysis);
    }, [arcgisOnlineAccountType, canCreateItem, userLicenseData]);

    useEffect(() => {
        (async () => {
            if (arcgisOnlineAccountType !== 'organizational') {
                return;
            }

            try {
                const signedInUser = getSignedInUser();

                if (!signedInUser) {
                    return;
                }

                const data = await getUserLicense(signedInUser.username);

                setUserLicenseData(data);
            } catch (err) {
                console.error('Error checking user license:', err);
            }
        })();
    }, [arcgisOnlineAccountType]);

    return {
        canSaveWebMappingApp,
        canSaveWebMap,
        canPublishHostedImagery,
    };
};
