import React from 'react';
import { CreateNewSurfaceHeatIndexJob } from './CreateNewJob';
import { APP_NAME } from '@shared/config';
import { useTranslation } from 'react-i18next';

export const UrbanHeatIslandContainer = () => {
    const { t } = useTranslation();
    return (
        <div>
            <div className="mb-1">
                <span className="uppercase text-sm">
                    {t('siuhi_full_name', { ns: APP_NAME })}
                </span>
            </div>
            <div className="w-full flex">
                <CreateNewSurfaceHeatIndexJob />
            </div>
        </div>
    );
};
