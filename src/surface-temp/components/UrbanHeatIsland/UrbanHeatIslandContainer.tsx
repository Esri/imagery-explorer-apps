import React, { useEffect, useMemo } from 'react';
import { CreateNewSurfaceHeatIndexJob } from './CreateNewJob';
import { APP_NAME } from '@shared/config';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@shared/store/configureStore';
import { selectActivePanel4UrbanHeatIslandTool } from '@shared/store/UrbanHeatIslandTool/selectors';
import { ViewPendingJob } from './PendingJob';
import { ViewFinishedJobs } from './FinishedJobs';
import { isAnonymouns } from '@shared/utils/esri-oauth';
import { useHasSaveOrPublishPrivileges } from '@shared/components/SavePanel/useHasSaveOrPublishPrivileges';
import { SignInPanel } from './SignInPanel';

export const UrbanHeatIslandContainer = () => {
    const { t } = useTranslation();

    const activePanel = useAppSelector(selectActivePanel4UrbanHeatIslandTool);

    const { canPublishHostedImagery, isCheckingPrivileges } =
        useHasSaveOrPublishPrivileges();

    const notSignedIn = isAnonymouns();

    const getContent = () => {
        if (notSignedIn || !canPublishHostedImagery) {
            return (
                <SignInPanel
                    notSignedIn={notSignedIn}
                    // canPublishHostedImagery={canPublishHostedImagery}
                    isCheckingPrivileges={isCheckingPrivileges}
                />
            );
        }

        if (activePanel === 'create new job') {
            return <CreateNewSurfaceHeatIndexJob />;
        }
        if (activePanel === 'view pending job') {
            return <ViewPendingJob />;
        }
        if (activePanel === 'view previous jobs') {
            return <ViewFinishedJobs />;
        }
        return null;
    };

    return (
        <div className="relative h-full">
            <div className="mb-3 w-full text-center">
                <span className="uppercase text-sm">
                    {t('siuhi_full_name', { ns: APP_NAME })}
                </span>
            </div>
            <div className="w-full max-w-5xl flex h-[160px]">
                {getContent()}
            </div>
        </div>
    );
};
