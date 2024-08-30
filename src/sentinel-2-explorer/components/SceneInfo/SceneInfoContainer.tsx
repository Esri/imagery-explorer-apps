/* Copyright 2024 Esri
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

import React, { useMemo } from 'react';
import {
    SceneInfoTable,
    SceneInfoTableData,
} from '@shared/components/SceneInfoTable';
import { useDataFromSelectedLandsatScene } from './useDataFromSelectedScene';
import { DATE_FORMAT } from '@shared/constants/UI';
import { useSelector } from 'react-redux';
import { selectAppMode } from '@shared/store/ImageryScene/selectors';
import { formatInUTCTimeZone } from '@shared/utils/date-time/formatInUTCTimeZone';

export const SceneInfoContainer = () => {
    const mode = useSelector(selectAppMode);

    const data = useDataFromSelectedLandsatScene();

    const tableData: SceneInfoTableData[] = useMemo(() => {
        if (!data) {
            return [];
        }

        const { acquisitionDate, formattedCloudCover, name } = data;

        return [
            {
                name: 'Scene ID',
                value: name, //name.slice(0, 17),
                clickToCopy: true,
            },
            {
                name: 'Acquired',
                value: formatInUTCTimeZone(acquisitionDate, DATE_FORMAT),
            },
            {
                name: 'Cloud Cover',
                value: `${formattedCloudCover}%`,
            },
        ];
    }, [data]);

    if (mode === 'dynamic' || mode === 'analysis') {
        return null;
    }

    return <SceneInfoTable data={tableData} />;
};
