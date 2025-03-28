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

import React, { useCallback, useMemo } from 'react';
import {
    SceneInfoTable,
    SceneInfoTableData,
} from '@shared/components/SceneInfoTable';
import { DATE_FORMAT } from '@shared/constants/UI';
import { useAppSelector } from '@shared/store/configureStore';
import { selectAppMode } from '@shared/store/ImageryScene/selectors';
import { formatInUTCTimeZone } from '@shared/utils/date-time/formatInUTCTimeZone';
import { useDataFromSelectedImageryScene } from '@shared/components/SceneInfoTable/useDataFromSelectedScene';
import { LandsatScene } from '@typing/imagery-service';
import { getLandsatSceneByObjectId } from '@shared/services/landsat-level-2/getLandsatScenes';
import { useTranslation } from 'react-i18next';

export const SceneInfoContainer = () => {
    const { t } = useTranslation();

    const mode = useAppSelector(selectAppMode);

    const fetchSceneByObjectId = useCallback(async (objectId: number) => {
        const res = await getLandsatSceneByObjectId(objectId);
        return res;
    }, []);

    const data =
        useDataFromSelectedImageryScene<LandsatScene>(fetchSceneByObjectId);

    const tableData: SceneInfoTableData[] = useMemo(() => {
        if (!data) {
            return [];
        }

        const {
            satellite,
            row,
            path,
            acquisitionDate,
            sensor,
            formattedCloudCover,
            // collectionCategory,
            // collectionNumber,
            correctionLevel,
            // processingDate,
            name,
            sunAzimuth,
            sunElevation,
        } = data;

        return [
            // the produt id is too long to be displayed in one row,
            // therefore we need to split it into two separate rows
            {
                // name: 'Scene ID',
                name: t('scene_id'),
                value: name, //name.slice(0, 17),
                clickToCopy: true,
            },
            // {
            //     name: '',
            //     value: name.slice(17),
            // },
            {
                // name: 'Satellite',
                name: t('satellite'),
                value: satellite,
            },
            {
                // name: 'Sensor',
                name: t('sensor'),
                value: sensor,
            },
            {
                // name: 'Correction',
                name: t('correction'),
                value: correctionLevel,
            },
            {
                // name: 'Path, Row',
                name: t('path_row'),
                value: path.toString() + ', ' + row.toString(),
            },
            // {
            //     name: 'Row',
            //     value: row.toString(),
            // },
            {
                // name: 'Acquired',
                name: t('acquired'),
                value: formatInUTCTimeZone(acquisitionDate, DATE_FORMAT),
            },
            {
                // name: 'Sun Elevation',
                name: t('sun_elevation'),
                value: sunElevation.toFixed(3),
            },
            {
                // name: 'Sun Azimuth',
                name: t('sun_azimuth'),
                value: sunAzimuth.toFixed(3),
            },
            {
                // name: 'Cloud Cover',
                name: t('cloud_cover'),
                value: `${formattedCloudCover}%`,
            },
        ];
    }, [data]);

    if (mode === 'dynamic' || mode === 'analysis') {
        return null;
    }

    // if (!tableData || !tableData.length) {
    //     return null;
    // }

    return <SceneInfoTable data={tableData} />;
};
