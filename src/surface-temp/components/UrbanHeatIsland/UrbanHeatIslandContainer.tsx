import React from 'react';
import { CreateNewSurfaceHeatIndexJob } from './CreateNewJob';
import { APP_NAME } from '@shared/config';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@shared/store/configureStore';
import { selectActivePanel4UrbanHeatIslandTool } from '@shared/store/UrbanHeatIslandTool/selectors';
import { ViewPendingJob } from './PendingJob';
import { ViewFinishedJobs } from './FinishedJobs';

export const UrbanHeatIslandContainer = () => {
    const { t } = useTranslation();

    const activePanel = useAppSelector(selectActivePanel4UrbanHeatIslandTool);

    return (
        <div className="relative h-full">
            <div className="mb-3 w-full text-center">
                <span className="uppercase text-sm">
                    {t('siuhi_full_name', { ns: APP_NAME })}
                </span>
            </div>
            <div className="w-full flex h-[160px]">
                {activePanel === 'create new job' && (
                    <CreateNewSurfaceHeatIndexJob />
                )}
                {activePanel === 'view pending job' && <ViewPendingJob />}
                {activePanel === 'view previous jobs' && <ViewFinishedJobs />}
            </div>
        </div>
    );
};
