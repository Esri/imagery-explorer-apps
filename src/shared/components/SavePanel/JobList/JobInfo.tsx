/* Copyright 2025 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
    PublishAndDownloadJob,
    PublishAndDownloadJobStatus,
    PublishAndDownloadJobType,
} from '@shared/store/PublishAndDownloadJobs/reducer';
import React, { FC, useMemo } from 'react';
import { jobTypeLabels } from '../constants';
import { useTranslation } from 'react-i18next';

type JobInfoProps = {
    job: PublishAndDownloadJob;
};

export const JobInfo: FC<JobInfoProps> = ({ job }) => {
    const jobTypeLabel = jobTypeLabels[job.type];

    const { t } = useTranslation();

    const extraJobInfo = useMemo(() => {
        if (job.errormessage) {
            return job.errormessage;
        }

        if (
            job.type === PublishAndDownloadJobType.SaveWebMappingApp ||
            job.type ===
                PublishAndDownloadJobType.SaveWebMapWithMultipleScenes ||
            job.type ===
                PublishAndDownloadJobType.SaveWebMapWithMultipleScenesInSingleLayer
        ) {
            return null;
        }

        return job.sceneId || t('no_selected_scene');
    }, [job]);

    if (
        job.status === PublishAndDownloadJobStatus.Submitted &&
        job.publishToHostedImageryService &&
        job.outputItemId === undefined
    ) {
        return <p>{t('submitting_raster_analysis_job')}</p>;
    }

    return (
        <div className=" ">
            <div className="">{t(jobTypeLabel)}</div>

            {extraJobInfo && (
                <div className=" italic break-words max-w-[480px]">
                    <span>{extraJobInfo}</span>
                </div>
            )}
        </div>
    );
};
