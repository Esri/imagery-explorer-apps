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
} from '@shared/store/PublishAndDownloadJobs/reducer';
import React, { FC, useMemo } from 'react';
import { jobTypeLabels } from '../constants';

type JobStatusProps = {
    job: PublishAndDownloadJob;
};

export const JobIcon: FC<JobStatusProps> = ({ job }) => {
    const content = useMemo(() => {
        if (job.status === PublishAndDownloadJobStatus.Succeeded) {
            return <calcite-icon icon="check" scale="s" />;
        }

        if (job.status === PublishAndDownloadJobStatus.Failed) {
            return <calcite-icon icon="exclamation-mark-circle" scale="s" />;
        }

        return <calcite-loader inline active />;
    }, [job]);

    return <div className="flex justify-center items-center">{content}</div>;
};
